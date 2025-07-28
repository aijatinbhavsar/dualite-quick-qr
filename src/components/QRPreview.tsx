import React from 'react';
import { Download, Share2, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

interface QRPreviewProps {
  qrDataUrl: string | null;
  isGenerating: boolean;
  onDownload: (format: 'png' | 'svg' | 'pdf') => void;
  onShare: (platform: 'whatsapp' | 'telegram' | 'email') => void;
  originalUrl: string;
}

const QRPreview: React.FC<QRPreviewProps> = ({
  qrDataUrl,
  isGenerating,
  onDownload,
  onShare,
  originalUrl
}) => {
  if (isGenerating) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <RefreshCw className="w-8 h-8 text-blue-600" />
        </motion.div>
        <p className="mt-4 text-gray-600">Generating QR code...</p>
      </div>
    );
  }

  if (!qrDataUrl) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
        <div className="w-16 h-16 bg-gray-300 rounded-lg mb-4"></div>
        <p className="text-gray-500">QR code will appear here</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      {/* QR Code Display */}
      <div className="bg-white p-6 rounded-lg shadow-lg border">
        <div className="flex justify-center">
          <img
            src={qrDataUrl}
            alt="Generated QR Code"
            className="w-64 h-64 border border-gray-200 rounded-lg"
          />
        </div>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600 break-all">{originalUrl}</p>
        </div>
      </div>

      {/* Download Options */}
      <div className="bg-white p-4 rounded-lg shadow border">
        <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center space-x-1">
          <Download className="w-4 h-4" />
          <span>Download</span>
        </h4>
        <div className="flex flex-wrap gap-2">
          {['png', 'svg', 'pdf'].map((format) => (
            <button
              key={format}
              onClick={() => onDownload(format as any)}
              className="px-3 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              {format.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Share Options */}
      <div className="bg-white p-4 rounded-lg shadow border">
        <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center space-x-1">
          <Share2 className="w-4 h-4" />
          <span>Share</span>
        </h4>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onShare('whatsapp')}
            className="px-3 py-2 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            WhatsApp
          </button>
          <button
            onClick={() => onShare('telegram')}
            className="px-3 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Telegram
          </button>
          <button
            onClick={() => onShare('email')}
            className="px-3 py-2 text-sm bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
          >
            Email
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default QRPreview;
