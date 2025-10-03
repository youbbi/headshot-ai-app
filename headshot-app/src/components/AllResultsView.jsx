import React from 'react';

const styleNames = {
  'corporate-classic': 'Corporate Classic',
  'creative-professional': 'Creative Professional',
  'executive-portrait': 'Executive Portrait',
  'artistic-fusion': 'Artistic Fusion'
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
      <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-8 text-center">
        Your Professional Headshots
      </h2>

      {/* Original Image */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-purple-300 text-center mb-4">
          Original Photo
        </h3>
        <div className="max-w-md mx-auto bg-slate-800/50 rounded-lg shadow-lg shadow-purple-500/10 p-4 border border-purple-500/20">
          <img
            src={originalImage}
            alt="Original"
            className="w-full h-auto rounded-lg"
          />
        </div>
      </div>

      {/* Generated Images Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {Object.entries(styleNames).map(([styleId, styleName]) => (
          <div key={styleId} className="space-y-3">
            <h3 className="text-lg font-semibold text-purple-300 text-center">
              {styleName}
            </h3>
            <div className="bg-slate-800/50 rounded-lg shadow-lg shadow-purple-500/10 p-4 border border-purple-500/20 relative">
              {isLoading ? (
                <div className="aspect-square flex items-center justify-center bg-slate-900/50 rounded-lg">
                  <div className="text-center space-y-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
                    <p className="text-sm text-gray-300">Generating...</p>
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
                    className="mt-3 w-full px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all text-sm shadow-lg shadow-purple-500/30"
                  >
                    Download
                  </button>
                </>
              ) : (
                <div className="aspect-square flex items-center justify-center bg-slate-900/50 rounded-lg">
                  <p className="text-gray-400 text-sm">Awaiting generation</p>
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
