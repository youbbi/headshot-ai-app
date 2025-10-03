import React, { useState } from 'react';

const defaultPrompts = {
  'corporate-classic': 'Professional LinkedIn-style corporate headshot. Subject facing camera with confident, approachable expression. Neutral solid background (light gray or soft blue). Clean business attire visible. Studio lighting with soft shadows. Sharp focus on face. Professional color grading. High-quality executive portrait suitable for business profiles and corporate communications.',
  'creative-professional': 'Modern creative professional headshot. Close-up portrait with shallow depth of field. Soft bokeh background with warm, natural lighting. Subject with friendly, engaging expression. Contemporary style with subtle artistic touches. Balanced exposure with natural skin tones. Professional yet approachable aesthetic. Perfect for creative industry portfolios and modern business profiles.',
  'executive-portrait': 'Dramatic black and white executive portrait. High-contrast artistic lighting with defined shadows. Professional subject with commanding presence. Clean composition focusing on facial features and expression. Editorial magazine quality. Sophisticated monochrome treatment. Sharp details with rich tonal range. Premium portrait suitable for executive profiles and high-end publications.',
  'artistic-fusion': 'Creative artistic portrait with surreal fruit headdress. Subject\'s head adorned with an elaborate arrangement of fresh colorful fruits - apples, kiwis, grapes, peaches, oranges, berries - mixed with tropical leaves and flowers. Dramatic studio lighting against pure black background. Subject with glamorous makeup featuring bold red lips and shimmering eye shadow. Fruits appear to be growing from and merging with the subject\'s hair and head in an organic, artistic way. Professional fashion photography style with vibrant colors and sharp details. The composition shows upper body and face with fruits creating a crown-like arrangement. Hyper-realistic yet fantastical aesthetic blending natural elements with high fashion.'
};

const styleNames = {
  'corporate-classic': 'Corporate Classic',
  'creative-professional': 'Creative Professional',
  'executive-portrait': 'Executive Portrait',
  'artistic-fusion': 'Artistic Fusion'
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
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-2">
          Review & Edit Prompts
        </h2>
        <p className="text-gray-300">
          Review the AI prompts for each style. Click "Edit" to customize them.
        </p>
      </div>

      <div className="space-y-4">
        {Object.keys(prompts).map((style) => (
          <div key={style} className="bg-slate-800/50 rounded-lg shadow-lg shadow-purple-500/10 p-6 border border-purple-500/20">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-purple-300">
                {styleNames[style]}
              </h3>
              <div className="space-x-2">
                {editingStyle === style ? (
                  <>
                    <button
                      onClick={() => handleReset(style)}
                      className="px-3 py-1 text-sm bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
                    >
                      Reset
                    </button>
                    <button
                      onClick={() => setEditingStyle(null)}
                      className="px-3 py-1 text-sm bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded hover:from-green-600 hover:to-emerald-600 transition-all"
                    >
                      Done
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setEditingStyle(style)}
                    className="px-3 py-1 text-sm bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded hover:from-purple-600 hover:to-pink-600 transition-all"
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
                className="w-full p-3 bg-slate-900/50 border border-purple-500/30 text-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent min-h-32"
                rows={4}
              />
            ) : (
              <p className="text-gray-300 text-sm">{prompts[style]}</p>
            )}
          </div>
        ))}
      </div>

      <div className="text-center pt-4">
        <button
          onClick={() => onGenerate(prompts)}
          className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50"
        >
          Generate All 4 Headshots
        </button>
      </div>
    </div>
  );
};

export default PromptEditor;
