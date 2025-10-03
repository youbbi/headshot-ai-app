import React from 'react';

const styleNames = {
  'corporate-classic': 'Corporate Classic',
  'creative-professional': 'Creative Professional',
  'executive-portrait': 'Executive Portrait'
};

const AllResultsView = ({ originalImage, generatedImages, isLoading }) => {
  const downloadImage = (imageData, styleName) => {
    const link = document.createElement('a');
    link.href = imageData;
    link.download = `headshot-${styleName}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
        Your Professional Headshots
      </h2>

      {/* Original Image */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-700 text-center mb-4">
          Original Photo
        </h3>
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-4">
          <img
            src={originalImage}
            alt="Original"
            className="w-full h-auto rounded-lg"
          />
        </div>
      </div>

      {/* Generated Images Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {Object.entries(styleNames).map(([styleId, styleName]) => (
          <div key={styleId} className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-700 text-center">
              {styleName}
            </h3>
            <div className="bg-white rounded-lg shadow-lg p-4 relative">
              {isLoading ? (
                <div className="aspect-square flex items-center justify-center bg-gray-100 rounded-lg">
                  <div className="text-center space-y-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="text-sm text-gray-600">Generating...</p>
                  </div>
                </div>
              ) : generatedImages?.[styleId] ? (
                <>
                  <img
                    src={generatedImages[styleId]}
                    alt={styleName}
                    className="w-full h-auto rounded-lg"
                  />
                  <button
                    onClick={() => downloadImage(generatedImages[styleId], styleId)}
                    className="mt-3 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                  >
                    Download
                  </button>
                </>
              ) : (
                <div className="aspect-square flex items-center justify-center bg-gray-100 rounded-lg">
                  <p className="text-gray-500 text-sm">Awaiting generation</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllResultsView;
