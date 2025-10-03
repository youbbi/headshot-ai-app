const { GoogleGenAI } = require('@google/genai');
const sharp = require('sharp');

const stylePrompts = {
  'corporate-classic': 'Professional LinkedIn-style corporate headshot. Subject facing camera with confident, approachable expression. Neutral solid background (light gray or soft blue). Clean business attire visible. Studio lighting with soft shadows. Sharp focus on face. Professional color grading. High-quality executive portrait suitable for business profiles and corporate communications.',
  'creative-professional': 'Modern creative professional headshot. Close-up portrait with shallow depth of field. Soft bokeh background with warm, natural lighting. Subject with friendly, engaging expression. Contemporary style with subtle artistic touches. Balanced exposure with natural skin tones. Professional yet approachable aesthetic. Perfect for creative industry portfolios and modern business profiles.',
  'executive-portrait': 'Dramatic black and white executive portrait. High-contrast artistic lighting with defined shadows. Professional subject with commanding presence. Clean composition focusing on facial features and expression. Editorial magazine quality. Sophisticated monochrome treatment. Sharp details with rich tonal range. Premium portrait suitable for executive profiles and high-end publications.',
  'artistic-fusion': 'Creative artistic portrait with surreal fruit headdress. Subject\'s head adorned with an elaborate arrangement of fresh colorful fruits - apples, kiwis, grapes, peaches, oranges, berries - mixed with tropical leaves and flowers. Dramatic studio lighting against pure black background. Subject with glamorous makeup featuring bold red lips and shimmering eye shadow. Fruits appear to be growing from and merging with the subject\'s hair and head in an organic, artistic way. Professional fashion photography style with vibrant colors and sharp details. The composition shows upper body and face with fruits creating a crown-like arrangement. Hyper-realistic yet fantastical aesthetic blending natural elements with high fashion.'
};

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { imageData, prompts } = req.body;

    if (!imageData || !prompts) {
      return res.status(400).json({ error: 'Missing image data or prompts' });
    }

    // Initialize Google AI client
    const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

    // Remove base64 prefix if present
    const base64Data = imageData.replace(/^data:image\/\w+;base64,/, '');
    const imageBuffer = Buffer.from(base64Data, 'base64');

    // Preprocess image
    const processedBuffer = await sharp(imageBuffer)
      .resize(1024, 1024, { fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 90 })
      .toBuffer();

    const processedImageBase64 = processedBuffer.toString('base64');

    // Generate images for all 4 styles
    const results = {};
    const styles = ['corporate-classic', 'creative-professional', 'executive-portrait', 'artistic-fusion'];

    for (const style of styles) {
      try {
        console.log(`Generating ${style}...`);

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
          console.log(`Successfully generated ${style}`);
        } else {
          // Fallback to processed image
          results[style] = `data:image/jpeg;base64,${processedImageBase64}`;
          console.log(`No image generated for ${style}, using fallback`);
        }
      } catch (error) {
        console.error(`Error generating ${style}:`, error.message);
        // Use processed image as fallback on error
        results[style] = `data:image/jpeg;base64,${processedImageBase64}`;
      }
    }

    return res.status(200).json({
      success: true,
      generatedImages: results
    });

  } catch (error) {
    console.error('Generation error:', error);
    return res.status(500).json({
      error: 'Failed to generate headshot',
      details: error.message
    });
  }
};
