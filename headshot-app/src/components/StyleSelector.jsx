import React from 'react';

const styles = [
  {
    id: 'corporate-classic',
    name: 'Corporate Classic',
    description: 'Traditional business headshot with neutral background',
    icon: '💼',
    features: ['Professional lighting', 'Neutral background', 'Business attire'],
  },
  {
    id: 'creative-professional',
    name: 'Creative Professional',
    description: 'Modern, approachable style with subtle artistic touches',
    icon: '🎨',
    features: ['Contemporary look', 'Artistic touches', 'Warm tones'],
  },
  {
    id: 'executive-portrait',
    name: 'Executive Portrait',
    description: 'High-end, polished look with professional lighting',
    icon: '👔',
    features: ['Premium quality', 'Polished finish', 'Executive presence'],
  },
];

const StyleSelector = ({ selectedStyle, onStyleSelect }) => {
  return (
    <div className="w-full max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Choose Your Style
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {styles.map((style) => (
          <div
            key={style.id}
            onClick={() => onStyleSelect(style.id)}
            className={`cursor-pointer rounded-xl p-6 transition-all duration-200 ${
              selectedStyle === style.id
                ? 'bg-blue-600 text-white shadow-xl scale-105'
                : 'bg-white text-gray-800 shadow-md hover:shadow-lg hover:scale-102'
            }`}
          >
            <div className="text-4xl mb-3">{style.icon}</div>
            <h3 className="text-xl font-bold mb-2">{style.name}</h3>
            <p
              className={`text-sm mb-4 ${
                selectedStyle === style.id ? 'text-blue-100' : 'text-gray-600'
              }`}
            >
              {style.description}
            </p>
            <ul className="space-y-2">
              {style.features.map((feature, idx) => (
                <li key={idx} className="flex items-center text-sm">
                  <svg
                    className={`w-4 h-4 mr-2 ${
                      selectedStyle === style.id
                        ? 'text-blue-200'
                        : 'text-blue-600'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StyleSelector;
