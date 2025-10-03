import React, { useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import UploadPhoto from './components/UploadPhoto';
import PromptEditor from './components/PromptEditor';
import AllResultsView from './components/AllResultsView';

function App() {
  const [step, setStep] = useState(1);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [generatedImages, setGeneratedImages] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUpload = (image) => {
    setUploadedImage(image);
    setStep(2);
  };

  const handleGenerate = async (prompts) => {
    setStep(3);
    setIsLoading(true);

    try {
      // Use local backend in development, Vercel API in production
      const apiUrl = process.env.NODE_ENV === 'production'
        ? '/api/generate-all'
        : 'http://localhost:5001/api/generate-all';

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageData: uploadedImage,
          prompts: prompts,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setGeneratedImages(data.generatedImages);
      } else {
        console.error('Generation failed:', data.error);
        alert('Failed to generate headshots. Please try again.');
      }
    } catch (error) {
      console.error('API Error:', error);
      alert('Failed to connect to server. Please make sure the backend is running.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setStep(1);
    setUploadedImage(null);
    setGeneratedImages(null);
    setIsLoading(false);
  };

  return (
    <>
      <Analytics />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
            Professional Headshot AI
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Transform your photo into four stunning professional headshots using AI
          </p>

          {/* Showcase Image */}
          {step === 1 && (
            <div className="max-w-4xl mx-auto mb-8">
              <div className="relative overflow-hidden" style={{ height: '450px' }}>
                <img
                  src="/showcase.png"
                  alt="AI Headshot Examples"
                  className="rounded-2xl shadow-2xl w-full object-cover object-top"
                  style={{
                    maskImage: 'linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)'
                  }}
                />
              </div>
              <p className="text-sm text-gray-400 mt-4 text-center">
                See the difference: Original → AI Transformation → Elegant Professional
              </p>
            </div>
          )}
        </div>

        {/* Progress Indicator */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="grid grid-cols-3 gap-4">
            {[
              { num: 1, label: 'Upload' },
              { num: 2, label: 'Edit Prompts' },
              { num: 3, label: 'Results' }
            ].map(({ num, label }, index) => (
              <div key={num} className="flex flex-col items-center">
                <div className="flex items-center w-full">
                  {index > 0 && (
                    <div
                      className={`flex-1 h-1 mr-2 transition-all ${
                        step > index ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gray-700'
                      }`}
                    />
                  )}
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                      step >= num
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50'
                        : 'bg-gray-700 text-gray-400'
                    }`}
                  >
                    {num}
                  </div>
                  {index < 2 && (
                    <div
                      className={`flex-1 h-1 ml-2 transition-all ${
                        step > num ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gray-700'
                      }`}
                    />
                  )}
                </div>
                <span className="mt-2 text-sm text-gray-400 text-center">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {step === 1 && (
            <div className="space-y-6">
              <UploadPhoto onImageUpload={handleImageUpload} />
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <PromptEditor onGenerate={handleGenerate} />
              <div className="text-center">
                <button
                  onClick={handleReset}
                  className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Back to Upload
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <AllResultsView
                originalImage={uploadedImage}
                generatedImages={generatedImages}
                isLoading={isLoading}
              />
              <div className="text-center">
                <button
                  onClick={handleReset}
                  className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Start Over
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
}

export default App;
