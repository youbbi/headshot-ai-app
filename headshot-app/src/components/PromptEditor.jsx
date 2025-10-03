import React, { useState } from 'react';

const defaultPrompts = {
  'corporate-classic': 'Professional LinkedIn-style corporate headshot. Subject facing camera with confident, approachable expression. Neutral solid background (light gray or soft blue). Clean business attire visible. Studio lighting with soft shadows. Sharp focus on face. Professional color grading. High-quality executive portrait suitable for business profiles and corporate communications.',
  'creative-professional': 'Modern creative professional headshot. Close-up portrait with shallow depth of field. Soft bokeh background with warm, natural lighting. Subject with friendly, engaging expression. Contemporary style with subtle artistic touches. Balanced exposure with natural skin tones. Professional yet approachable aesthetic. Perfect for creative industry portfolios and modern business profiles.',
  'executive-portrait': 'Dramatic black and white executive portrait. High-contrast artistic lighting with defined shadows. Professional subject with commanding presence. Clean composition focusing on facial features and expression. Editorial magazine quality. Sophisticated monochrome treatment. Sharp details with rich tonal range. Premium portrait suitable for executive profiles and high-end publications.'
};

const styleNames = {
  'corporate-classic': 'Corporate Classic',
  'creative-professional': 'Creative Professional',
  'executive-portrait': 'Executive Portrait'
};

const PromptEditor = ({ onGenerate }) => {
  const [prompts, setPrompts] = useState(defaultPrompts);
  const [editingStyle, setEditingStyle] = useState(null);

  const handlePromptChange = (style, value) => {
    setPrompts(prev => ({ ...prev, [style]: value }));
  };

  const handleReset = (style) => {
    setPrompts(prev => ({ ...prev, [style]: defaultPrompts[style] }));
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Review & Edit Prompts
        </h2>
        <p className="text-gray-600">
          Review the AI prompts for each style. Click "Edit" to customize them.
        </p>
      </div>

      <div className="space-y-4">
        {Object.keys(prompts).map((style) => (
          <div key={style} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-800">
                {styleNames[style]}
              </h3>
              <div className="space-x-2">
                {editingStyle === style ? (
                  <>
                    <button
                      onClick={() => handleReset(style)}
                      className="px-3 py-1 text-sm bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                    >
                      Reset
                    </button>
                    <button
                      onClick={() => setEditingStyle(null)}
                      className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                    >
                      Done
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setEditingStyle(style)}
                    className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>

            {editingStyle === style ? (
              <textarea
                value={prompts[style]}
                onChange={(e) => handlePromptChange(style, e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-32"
                rows={4}
              />
            ) : (
              <p className="text-gray-700 text-sm">{prompts[style]}</p>
            )}
          </div>
        ))}
      </div>

      <div className="text-center pt-4">
        <button
          onClick={() => onGenerate(prompts)}
          className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
        >
          Generate All 3 Headshots
        </button>
      </div>
    </div>
  );
};

export default PromptEditor;
