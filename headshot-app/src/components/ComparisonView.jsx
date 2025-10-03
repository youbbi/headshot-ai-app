import React from 'react';

const ComparisonView = ({ originalImage, generatedImage, isLoading, onDownload }) => {
  return (
    <div className="w-full max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Your Professional Headshot
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Original Image */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-700 text-center">
            Original Photo
          </h3>
          <div className="bg-white rounded-lg shadow-lg p-4">
            <img
              src={originalImage}
              alt="Original"
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>

        {/* Generated Image */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-700 text-center">
            Professional Headshot
          </h3>
          <div className="bg-white rounded-lg shadow-lg p-4 relative">
            {isLoading ? (
              <div className="aspect-square flex items-center justify-center bg-gray-100 rounded-lg">
                <div className="text-center space-y-4">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="text-gray-600 font-medium">
                    Generating your headshot...
                  </p>
                  <p className="text-sm text-gray-500">This may take a moment</p>
                </div>
              </div>
            ) : generatedImage ? (
              <img
                src={generatedImage}
                alt="Generated"
                className="w-full h-auto rounded-lg"
              />
            ) : (
              <div className="aspect-square flex items-center justify-center bg-gray-100 rounded-lg">
                <p className="text-gray-500">Your generated headshot will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Download Button */}
      {generatedImage && !isLoading && (
        <div className="mt-8 text-center">
          <button
            onClick={onDownload}
            className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
          >
            Download Headshot
          </button>
        </div>
      )}
    </div>
  );
};

export default ComparisonView;
