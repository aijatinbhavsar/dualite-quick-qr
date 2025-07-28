import QRCode from 'qrcode';

export const generateQRCode = async (
  text: string,
  options: {
    color?: string;
    backgroundColor?: string;
    width?: number;
    margin?: number;
  } = {}
): Promise<string> => {
  const defaultOptions = {
    color: {
      dark: options.color || '#000000',
      light: options.backgroundColor || '#FFFFFF'
    },
    width: options.width || 256,
    margin: options.margin || 2,
    errorCorrectionLevel: 'M' as const
  };

  try {
    const dataUrl = await QRCode.toDataURL(text, defaultOptions);
    return dataUrl;
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw new Error('Failed to generate QR code');
  }
};

export const addLogoToQR = async (
  qrDataUrl: string,
  logoFile: File,
  size: number = 256
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      reject(new Error('Could not get canvas context'));
      return;
    }

    canvas.width = size;
    canvas.height = size;

    const qrImage = new Image();
    qrImage.onload = () => {
      // Draw QR code
      ctx.drawImage(qrImage, 0, 0, size, size);

      // Create logo image
      const logoImage = new Image();
      const logoUrl = URL.createObjectURL(logoFile);
      
      logoImage.onload = () => {
        // Calculate logo size (20% of QR code)
        const logoSize = size * 0.2;
        const logoX = (size - logoSize) / 2;
        const logoY = (size - logoSize) / 2;

        // Add white background circle for logo
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(size / 2, size / 2, logoSize / 2 + 5, 0, 2 * Math.PI);
        ctx.fill();

        // Draw logo
        ctx.drawImage(logoImage, logoX, logoY, logoSize, logoSize);
        
        URL.revokeObjectURL(logoUrl);
        resolve(canvas.toDataURL());
      };

      logoImage.onerror = () => {
        URL.revokeObjectURL(logoUrl);
        reject(new Error('Failed to load logo image'));
      };

      logoImage.src = logoUrl;
    };

    qrImage.onerror = () => {
      reject(new Error('Failed to load QR code image'));
    };

    qrImage.src = qrDataUrl;
  });
};

export const appendBrandedHash = (url: string): string => {
  const separator = url.includes('#') ? '_' : '#';
  return `${url}${separator}Quick_QR`;
};
