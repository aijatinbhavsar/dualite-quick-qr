import React from 'react';
import { History, Download, Trash2, Clock } from 'lucide-react';
import { GeneratedQR } from '../types';
import { motion } from 'framer-motion';

interface QRHistoryProps {
  history: GeneratedQR[];
  onDownload: (qr: GeneratedQR, format: 'png' | 'pdf') => void;
  onClearHistory: () => void;
}

const QRHistory: React.FC<QRHistoryProps> = ({ history, onDownload, onClearHistory }) => {
  if (history.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow border p-6">
        <div className="flex items-center space-x-2 mb-4">
          <History className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-800">Recent QR Codes</h3>
        </div>
        <div className="text-center py-8">
          <Clock className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No recent QR codes</p>
          <p className="text-sm text-gray-400">Generate your first QR code to see it here</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow border p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <History className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-800">Recent QR Codes</h3>
        </div>
        <button
          onClick={onClearHistory}
          className="text-red-600 hover:text-red-700 p-2 hover:bg-red-50 rounded-full transition-colors"
          title="Clear history"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-3">
        {history.map((qr, index) => (
          <motion.div
            key={qr.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center space-x-3 min-w-0 flex-1">
              <img
                src={qr.dataUrl}
                alt="QR Code"
                className="w-12 h-12 border border-gray-200 rounded"
              />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {qr.originalUrl}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(qr.timestamp).toLocaleDateString()} • 
                  {qr.hasLogo ? ' With logo' : ' Basic'}
                  {qr.expiryTime && qr.expiryTime !== 'never' && ` • Expires: ${qr.expiryTime}`}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <button
                onClick={() => onDownload(qr, 'png')}
                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                title="Download as PNG"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default QRHistory;
