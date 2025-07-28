import React from 'react';
import { QrCode, Zap } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-center space-x-3">
          <div className="relative">
            <QrCode className="w-8 h-8" />
            <Zap className="w-4 h-4 absolute -top-1 -right-1 text-yellow-300" />
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-bold">Quick QR</h1>
            <p className="text-blue-100 text-sm">Generate custom QR codes in seconds</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
