import React from 'react';
import { Link2, AlertCircle } from 'lucide-react';

interface URLInputProps {
  url: string;
  onChange: (url: string) => void;
  error?: string;
}

const URLInput: React.FC<URLInputProps> = ({ url, onChange, error }) => {
  const validateURL = (input: string): boolean => {
    try {
      new URL(input);
      return true;
    } catch {
      return false;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="space-y-2">
      <label htmlFor="url-input" className="block text-sm font-medium text-gray-700">
        Website URL
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Link2 className="h-5 w-5 text-gray-400" />
        </div>
        <input
          id="url-input"
          type="url"
          value={url}
          onChange={handleChange}
          placeholder="https://example.com"
          className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base ${
            error ? 'border-red-300' : 'border-gray-300'
          }`}
        />
      </div>
      {error && (
        <div className="flex items-center space-x-2 text-red-600 text-sm">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default URLInput;
