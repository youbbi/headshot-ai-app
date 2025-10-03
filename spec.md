# Professional Headshot AI App - Specification

## Overview
A web application that transforms user-uploaded photos into professional headshots using AI, with style selection and side-by-side comparison capabilities.

## Requirements

### Functional Requirements
- Users can upload a photo (JPEG, PNG)
- Users can select from three predefined styles:
  - **Corporate Classic**: Traditional business headshot with neutral background
  - **Creative Professional**: Modern, approachable style with subtle artistic touches
  - **Executive Portrait**: High-end, polished look with professional lighting
- Generate professional headshot using selected style
- Display original photo and generated headshot side-by-side for comparison
- Allow users to download the generated headshot

### Non-Functional Requirements
- Responsive design (mobile and desktop)
- Fast image processing (< 30 seconds per generation)
- Secure file upload and handling
- Clear error messages for invalid uploads or API failures

## Tech Stack

### Frontend
- **Framework**: React
- **Styling**: CSS Modules / Tailwind CSS v3 (instead of V4)
- **HTTP Client**: Axios / Fetch API
- **State Management**: React Hooks (useState, useEffect)

### Backend
- **Framework**: Express.js
- **File Upload**: Multer
- **Image Processing**: Sharp (for preprocessing)
- **AI Integration**: Google Gemini API Nano Banana API
- **Environment Management**: dotenv

### Infrastructure
- **File Storage**: Local filesystem (temporary storage)
- **API**: RESTful endpoints

## Milestones

### Milestone 1: UI Setup and Core Frontend
**Goal**: Build the complete user interface with all interactions (without AI integration)

**Deliverables**:
- React application setup with routing
- Build with tailwind v3 CSS V3
- Photo upload component with drag-and-drop support
- Style selection interface (3 style cards with previews/descriptions)
- Side-by-side comparison view layout
- Download button UI
- Mock data integration to simulate API responses
- Responsive design for mobile and desktop
- Basic error handling and loading states

**Success Criteria**:
- Users can upload images
- Users can select styles
- UI displays mock results in comparison view
- All components are responsive and accessible

### Milestone 2: AI Integration with Google Gemini API Nano Banana API
**Goal**: Integrate Google's Gemini Banana Nano API for actual headshot generation https://ai.google.dev/gemini-api/docs/image-generation. 

**Deliverables**:
- Express backend setup with API endpoints
- File upload endpoint (`POST /api/upload`)
- Headshot generation endpoint (`POST /api/generate`)
- Integration with Google Gemini Nano Banana API
- Image preprocessing (resizing, format conversion)
- Style-specific prompt engineering for each style option
- Error handling for API failures
- Temporary file cleanup
- Frontend-backend integration
- Image download functionality

**API Documentation**: [Google Gemini Image Generation](https://ai.google.dev/gemini-api/docs/image-generation)

**Success Criteria**:
- Backend successfully receives and processes uploaded images
- API generates headshots based on selected styles
- Generated images are returned and displayed to users
- Users can download generated headshots
- Proper error handling throughout the pipeline
- Temporary files are cleaned up after processing
