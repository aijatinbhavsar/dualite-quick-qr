export interface QRCodeOptions {
  url: string;
  logo?: File;
  color?: string;
  backgroundColor?: string;
  cornerStyle?: 'square' | 'rounded' | 'extra-rounded';
  expiryTime?: string;
}

export interface GeneratedQR {
  id: string;
  url: string;
  originalUrl: string;
  dataUrl: string;
  timestamp: number;
  expiryTime?: string;
  hasLogo: boolean;
}

export interface QRHistory {
  qrCodes: GeneratedQR[];
}
