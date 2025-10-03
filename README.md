# Professional Headshot AI App

A web application that transforms user-uploaded photos into professional headshots using Google's Gemini Imagen 3 API. Upload a photo, customize AI prompts, and generate three different professional headshot styles simultaneously.

![Professional Headshot AI](https://img.shields.io/badge/React-18.x-blue) ![Express](https://img.shields.io/badge/Express-4.x-green) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-cyan)

## Features

- 📸 **Drag-and-drop photo upload** with preview
- 🎨 **Three professional styles**:
  - Corporate Classic: Traditional LinkedIn-style headshot
  - Creative Professional: Modern, approachable style
  - Executive Portrait: Dramatic black and white portrait
- ✏️ **Editable AI prompts** - Customize the generation prompts before creating images
- 🖼️ **Side-by-side comparison** - View original and all generated images together
- ⬇️ **Individual downloads** for each style
- 🚀 **Batch generation** - All 3 styles generated simultaneously

## Tech Stack

### Frontend
- **React** - UI framework
- **Tailwind CSS v3** - Styling
- **React Hooks** - State management

### Backend
- **Express.js** - API server
- **Google Gemini API** - Imagen 3 for image generation
- **Multer** - File upload handling
- **Sharp** - Image preprocessing
- **Axios** - HTTP requests

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Google Gemini API key ([Get one here](https://ai.google.dev/))

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/youbbi/headshot-ai-app.git
   cd headshot-ai-app
   ```

2. **Install frontend dependencies**
   ```bash
   cd headshot-app
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

4. **Set up environment variables**

   Create a `.env` file in the `headshot-app/backend` directory:
   ```bash
   cd backend
   touch .env
   ```

   Add your Google API key:
   ```env
   GOOGLE_API_KEY=your_google_api_key_here
   PORT=5001
   ```

## Running the Application

You need to run both the frontend and backend servers.

### Start the Backend Server

```bash
cd headshot-app/backend
npm start
```

The backend will run on `http://localhost:5001`

### Start the Frontend Server

In a new terminal:

```bash
cd headshot-app
npm start
```

The frontend will run on `http://localhost:3000` and automatically open in your browser.

## Usage

1. **Upload Photo** - Drag and drop or click to upload your photo
2. **Edit Prompts** (Optional) - Review and customize the AI prompts for each style
3. **Generate** - Click "Generate All 3 Headshots" to create images
4. **Download** - View results and download individual headshots

## Project Structure

```
headshot-demo/
├── headshot-app/
│   ├── src/
│   │   ├── components/
│   │   │   ├── UploadPhoto.jsx       # Photo upload with drag-and-drop
│   │   │   ├── PromptEditor.jsx      # Editable prompt interface
│   │   │   ├── AllResultsView.jsx    # Display all 3 results
│   │   │   └── ...
│   │   ├── App.js                    # Main application component
│   │   └── index.css                 # Tailwind CSS imports
│   ├── backend/
│   │   ├── server.js                 # Express server
│   │   ├── prompts.js                # AI prompt definitions
│   │   ├── logger.js                 # Logging utility
│   │   └── .env                      # Environment variables (not in repo)
│   ├── public/                       # Static assets
│   └── package.json
├── spec.md                           # Project specification
├── .gitignore
└── README.md
```

## API Endpoints

### `POST /api/generate-all`
Generate headshots for all three styles.

**Request:**
```json
{
  "imageData": "data:image/jpeg;base64,...",
  "prompts": {
    "corporate-classic": "Professional LinkedIn-style...",
    "creative-professional": "Modern creative...",
    "executive-portrait": "Dramatic black and white..."
  }
}
```

**Response:**
```json
{
  "success": true,
  "generatedImages": {
    "corporate-classic": "data:image/jpeg;base64,...",
    "creative-professional": "data:image/jpeg;base64,...",
    "executive-portrait": "data:image/jpeg;base64,..."
  }
}
```

## Important Notes

### API Quota
- Google Gemini Imagen 3 API has usage limits
- Free tier has **limited quota** for image generation
- You may need to enable billing for production use
- Check [Google's pricing](https://ai.google.dev/pricing) for details

### Security
- **Never commit your `.env` file** to the repository
- The `.gitignore` file is configured to exclude sensitive files
- Rotate your API key if accidentally exposed

## Troubleshooting

### Quota Exceeded Error
If you see a 429 error or "quota exceeded":
- Check your Google Cloud Console for quota limits
- Enable billing if needed
- Wait for quota to reset (usually daily)

### Server Connection Error
- Ensure both frontend (3000) and backend (5001) servers are running
- Check that `.env` file exists with valid API key
- Verify ports are not in use by other applications

### Images Not Generating
- Check backend logs at `headshot-app/backend/server.log`
- Verify API key is valid and has image generation permissions
- Ensure uploaded image is a valid format (JPEG, PNG)

## Development

### View Logs
Backend logs are written to `headshot-app/backend/server.log`:
```bash
tail -f headshot-app/backend/server.log
```

### Customize Prompts
Edit `headshot-app/backend/prompts.js` to change default AI prompts for each style.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the MIT License.

## Acknowledgments

- Built with [React](https://react.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Powered by [Google Gemini API](https://ai.google.dev/)
- Created with assistance from [Claude Code](https://claude.com/claude-code)

## Support

For issues or questions:
- Open an issue on GitHub
- Check the [Google Gemini API documentation](https://ai.google.dev/gemini-api/docs/image-generation)

---

**Note:** This application requires a Google Gemini API key with access to image generation capabilities. Some features may require a paid plan.
