import React, { useState } from 'react';
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
      const response = await fetch('/api/generate-all', {
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Professional Headshot AI
          </h1>
          <p className="text-lg text-gray-600">
            Transform your photo into a professional headshot in seconds
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((num) => (
              <div key={num} className="flex items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    step >= num
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-300 text-gray-600'
                  }`}
                >
                  {num}
                </div>
                {num < 3 && (
                  <div
                    className={`flex-1 h-1 mx-2 ${
                      step > num ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>Upload</span>
            <span>Edit Prompts</span>
            <span>Results</span>
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
  );
}

export default App;
