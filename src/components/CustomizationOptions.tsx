import React from 'react';
import { Palette, Clock } from 'lucide-react';

interface CustomizationOptionsProps {
  color: string;
  backgroundColor: string;
  cornerStyle: 'square' | 'rounded' | 'extra-rounded';
  expiryTime: string;
  onColorChange: (color: string) => void;
  onBackgroundColorChange: (color: string) => void;
  onCornerStyleChange: (style: 'square' | 'rounded' | 'extra-rounded') => void;
  onExpiryTimeChange: (time: string) => void;
}

const CustomizationOptions: React.FC<CustomizationOptionsProps> = ({
  color,
  backgroundColor,
  cornerStyle,
  expiryTime,
  onColorChange,
  onBackgroundColorChange,
  onCornerStyleChange,
  onExpiryTimeChange
}) => {
  return (
    <div className="space-y-6 p-4 bg-gray-50 rounded-lg">
      <h3 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
        <Palette className="w-5 h-5" />
        <span>Customization</span>
      </h3>
      
      {/* Color Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            QR Color
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="color"
              value={color}
              onChange={(e) => onColorChange(e.target.value)}
              className="w-10 h-10 rounded border border-gray-300 cursor-pointer"
            />
            <input
              type="text"
              value={color}
              onChange={(e) => onColorChange(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
              placeholder="#000000"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Background Color
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="color"
              value={backgroundColor}
              onChange={(e) => onBackgroundColorChange(e.target.value)}
              className="w-10 h-10 rounded border border-gray-300 cursor-pointer"
            />
            <input
              type="text"
              value={backgroundColor}
              onChange={(e) => onBackgroundColorChange(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
              placeholder="#FFFFFF"
            />
          </div>
        </div>
      </div>
      
      {/* Corner Style */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Corner Style
        </label>
        <div className="flex space-x-2">
          {[
            { value: 'square', label: 'Square' },
            { value: 'rounded', label: 'Rounded' },
            { value: 'extra-rounded', label: 'Extra Rounded' }
          ].map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => onCornerStyleChange(option.value as any)}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                cornerStyle === option.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
      
      {/* Expiry Time */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center space-x-1">
          <Clock className="w-4 h-4" />
          <span>Expiry Time</span>
        </label>
        <select
          value={expiryTime}
          onChange={(e) => onExpiryTimeChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="never">Never</option>
          <option value="10min">10 Minutes</option>
          <option value="1hour">1 Hour</option>
          <option value="1day">1 Day</option>
          <option value="1week">1 Week</option>
          <option value="1month">1 Month</option>
        </select>
      </div>
    </div>
  );
};

export default CustomizationOptions;
