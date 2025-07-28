import React, { useRef } from 'react';
import { Upload, X, Image } from 'lucide-react';

interface LogoUploadProps {
  logo: File | null;
  onLogoChange: (logo: File | null) => void;
}

const LogoUpload: React.FC<LogoUploadProps> = ({ logo, onLogoChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }
      
      onLogoChange(file);
    }
  };

  const handleRemoveLogo = () => {
    onLogoChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Logo (Optional)
      </label>
      
      {logo ? (
        <div className="relative inline-block">
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border">
            <Image className="w-5 h-5 text-gray-400" />
            <span className="text-sm text-gray-600 truncate max-w-xs">
              {logo.name}
            </span>
            <button
              type="button"
              onClick={handleRemoveLogo}
              className="p-1 hover:bg-gray-200 rounded-full transition-colors"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={handleClick}
          className="w-full flex items-center justify-center space-x-2 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors"
        >
          <Upload className="w-5 h-5 text-gray-400" />
          <span className="text-sm text-gray-600">
            Click to upload logo (PNG, JPG, SVG)
          </span>
        </button>
      )}
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
      
      <p className="text-xs text-gray-500">
        Logo will be placed in the center of the QR code. Max file size: 5MB
      </p>
    </div>
  );
};

export default LogoUpload;
