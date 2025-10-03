require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs').promises;
const { GoogleGenAI } = require('@google/genai');
const { stylePrompts } = require('./prompts');
const { log } = require('./logger');

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Google AI client
const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const uploadDir = path.join(__dirname, 'uploads');
    try {
      await fs.mkdir(uploadDir, { recursive: true });
      cb(null, uploadDir);
    } catch (error) {
      cb(error);
    }
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// Helper function to convert image to base64
async function imageToBase64(imagePath) {
  const imageBuffer = await fs.readFile(imagePath);
  return imageBuffer.toString('base64');
}

// Helper function to preprocess image
async function preprocessImage(inputPath, outputPath) {
  await sharp(inputPath)
    .resize(1024, 1024, { fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 90 })
    .toFile(outputPath);
  return outputPath;
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Upload endpoint
app.post('/api/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    res.json({
      success: true,
      filename: req.file.filename,
      path: req.file.path
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Failed to upload image' });
  }
});

// Generate all headshots endpoint
app.post('/api/generate-all', async (req, res) => {
  try {
    const { imageData, prompts } = req.body;

    if (!imageData || !prompts) {
      return res.status(400).json({ error: 'Missing image data or prompts' });
    }

    // Remove base64 prefix if present
    const base64Data = imageData.replace(/^data:image\/\w+;base64,/, '');
    const imageBuffer = Buffer.from(base64Data, 'base64');

    // Save temporary file
    const tempDir = path.join(__dirname, 'temp');
    await fs.mkdir(tempDir, { recursive: true });
    const tempInputPath = path.join(tempDir, `input-${Date.now()}.jpg`);
    const tempProcessedPath = path.join(tempDir, `processed-${Date.now()}.jpg`);

    await fs.writeFile(tempInputPath, imageBuffer);

    // Preprocess image
    await preprocessImage(tempInputPath, tempProcessedPath);

    // Read processed image as base64
    const processedImageBase64 = await imageToBase64(tempProcessedPath);

    // Generate images for all 3 styles
    const results = {};
    const styles = ['corporate-classic', 'creative-professional', 'executive-portrait'];

    for (const style of styles) {
      try {
        log(`Generating ${style}...`);

        const promptParts = [
          { text: prompts[style] },
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: processedImageBase64
            }
          }
        ];

        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash-image",
          contents: promptParts
        });

        // Extract generated image from response
        const generatedPart = response.candidates?.[0]?.content?.parts?.find(
          part => part.inlineData
        );

        if (generatedPart) {
          results[style] = `data:image/jpeg;base64,${generatedPart.inlineData.data}`;
          log(`Successfully generated ${style}`);
        } else {
          // Fallback to processed image
          results[style] = `data:image/jpeg;base64,${processedImageBase64}`;
          log(`No image generated for ${style}, using fallback`);
        }
      } catch (error) {
        log(`Error generating ${style}: ${error.message}`, true);
        // Use processed image as fallback on error
        results[style] = `data:image/jpeg;base64,${processedImageBase64}`;
      }
    }

    // Clean up temporary files
    await fs.unlink(tempInputPath).catch(() => {});
    await fs.unlink(tempProcessedPath).catch(() => {});

    res.json({
      success: true,
      generatedImages: results
    });

  } catch (error) {
    log(`Generation error: ${error.message}`, true);
    log(`Full error: ${JSON.stringify(error, null, 2)}`, true);
    res.status(500).json({
      error: 'Failed to generate headshot',
      details: error.message
    });
  }
});

// Start server
app.listen(PORT, () => {
  log(`Server running on http://localhost:${PORT}`);
});
