import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import URLInput from './components/URLInput';
import LogoUpload from './components/LogoUpload';
import CustomizationOptions from './components/CustomizationOptions';
import QRPreview from './components/QRPreview';
import QRHistory from './components/QRHistory';
import { generateQRCode, addLogoToQR, appendBrandedHash } from './utils/qrGenerator';
import { getQRHistory, saveQRToHistory, clearQRHistory } from './utils/storage';
import { downloadImage, downloadAsPDF, shareToWhatsApp, shareToTelegram, shareViaEmail } from './utils/download';
import { GeneratedQR } from './types';
import { Zap, Settings } from 'lucide-react';

function App() {
  const [url, setUrl] = useState('');
  const [logo, setLogo] = useState<File | null>(null);
  const [color, setColor] = useState('#000000');
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');
  const [cornerStyle, setCornerStyle] = useState<'square' | 'rounded' | 'extra-rounded'>('square');
  const [expiryTime, setExpiryTime] = useState('never');
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [urlError, setUrlError] = useState('');
  const [history, setHistory] = useState<GeneratedQR[]>([]);
  const [showCustomization, setShowCustomization] = useState(false);
  const [generationMode, setGenerationMode] = useState<'basic' | 'custom'>('basic');

  // Load history on component mount
  useEffect(() => {
    const savedHistory = getQRHistory();
    setHistory(savedHistory.qrCodes);
  }, []);

  const validateURL = (input: string): boolean => {
    try {
      new URL(input);
      return true;
    } catch {
      return false;
    }
  };

  const handleUrlChange = (newUrl: string) => {
    setUrl(newUrl);
    if (urlError && newUrl) {
      if (validateURL(newUrl)) {
        setUrlError('');
      }
    }
  };

  const generateQR = async () => {
    if (!url.trim()) {
      setUrlError('Please enter a URL');
      return;
    }

    if (!validateURL(url)) {
      setUrlError('Please enter a valid URL');
      return;
    }

    setUrlError('');
    setIsGenerating(true);

    try {
      // Append branded hash to URL
      const brandedUrl = appendBrandedHash(url);
      
      // Generate basic QR code
      const qrDataUrl = await generateQRCode(brandedUrl, {
        color,
        backgroundColor,
        width: 256
      });

      let finalQrDataUrl = qrDataUrl;

      // Add logo if provided and in custom mode
      if (logo && generationMode === 'custom') {
        finalQrDataUrl = await addLogoToQR(qrDataUrl, logo);
      }

      setQrDataUrl(finalQrDataUrl);

      // Save to history
      const qrData: GeneratedQR = {
        id: Date.now().toString(),
        url: brandedUrl,
        originalUrl: url,
        dataUrl: finalQrDataUrl,
        timestamp: Date.now(),
        expiryTime: expiryTime !== 'never' ? expiryTime : undefined,
        hasLogo: !!logo && generationMode === 'custom'
      };

      saveQRToHistory(qrData);
      
      // Update local history state
      const updatedHistory = getQRHistory();
      setHistory(updatedHistory.qrCodes);

    } catch (error) {
      console.error('Error generating QR code:', error);
      alert('Failed to generate QR code. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = (format: 'png' | 'svg' | 'pdf') => {
    if (!qrDataUrl) return;

    const filename = `qr-code-${Date.now()}`;
    
    if (format === 'pdf') {
      downloadAsPDF(qrDataUrl, filename);
    } else {
      downloadImage(qrDataUrl, filename, format);
    }
  };

  const handleHistoryDownload = (qr: GeneratedQR, format: 'png' | 'pdf') => {
    const filename = `qr-code-${qr.id}`;
    
    if (format === 'pdf') {
      downloadAsPDF(qr.dataUrl, filename);
    } else {
      downloadImage(qr.dataUrl, filename, format);
    }
  };

  const handleShare = (platform: 'whatsapp' | 'telegram' | 'email') => {
    const shareUrl = url;
    
    switch (platform) {
      case 'whatsapp':
        shareToWhatsApp(shareUrl);
        break;
      case 'telegram':
        shareToTelegram(shareUrl);
        break;
      case 'email':
        shareViaEmail(shareUrl);
        break;
    }
  };

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear all QR code history?')) {
      clearQRHistory();
      setHistory([]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Generator */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-lg p-6"
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Generate QR Code</h2>
                
                {/* Generation Mode Toggle */}
                <div className="mb-6">
                  <div className="flex bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => setGenerationMode('basic')}
                      className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                        generationMode === 'basic'
                          ? 'bg-white text-blue-600 shadow-sm'
                          : 'text-gray-600 hover:text-gray-800'
                      }`}
                    >
                      Basic QR
                    </button>
                    <button
                      onClick={() => setGenerationMode('custom')}
                      className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                        generationMode === 'custom'
                          ? 'bg-white text-blue-600 shadow-sm'
                          : 'text-gray-600 hover:text-gray-800'
                      }`}
                    >
                      Custom QR
                    </button>
                  </div>
                </div>

                <div className="space-y-6">
                  <URLInput
                    url={url}
                    onChange={handleUrlChange}
                    error={urlError}
                  />

                  {generationMode === 'custom' && (
                    <>
                      <LogoUpload
                        logo={logo}
                        onLogoChange={setLogo}
                      />
                      
                      <div>
                        <button
                          type="button"
                          onClick={() => setShowCustomization(!showCustomization)}
                          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
                        >
                          <Settings className="w-4 h-4" />
                          <span className="text-sm font-medium">
                            {showCustomization ? 'Hide' : 'Show'} Customization Options
                          </span>
                        </button>
                        
                        {showCustomization && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-4"
                          >
                            <CustomizationOptions
                              color={color}
                              backgroundColor={backgroundColor}
                              cornerStyle={cornerStyle}
                              expiryTime={expiryTime}
                              onColorChange={setColor}
                              onBackgroundColorChange={setBackgroundColor}
                              onCornerStyleChange={setCornerStyle}
                              onExpiryTimeChange={setExpiryTime}
                            />
                          </motion.div>
                        )}
                      </div>
                    </>
                  )}

                  <button
                    onClick={generateQR}
                    disabled={isGenerating || !url.trim()}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2"
                  >
                    <Zap className="w-5 h-5" />
                    <span>{isGenerating ? 'Generating...' : 'Generate QR Code'}</span>
                  </button>
                </div>
              </motion.div>

              {/* History Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <QRHistory
                  history={history}
                  onDownload={handleHistoryDownload}
                  onClearHistory={handleClearHistory}
                />
              </motion.div>
            </div>

            {/* Right Column - Preview */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <QRPreview
                  qrDataUrl={qrDataUrl}
                  isGenerating={isGenerating}
                  onDownload={handleDownload}
                  onShare={handleShare}
                  originalUrl={url}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">
            © 2025 Quick QR. All rights reserved. Generate custom QR codes instantly.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
