import { QRHistory, GeneratedQR } from '../types';

const STORAGE_KEY = 'quick_qr_history';
const MAX_HISTORY_ITEMS = 5;

export const getQRHistory = (): QRHistory => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error reading QR history:', error);
  }
  return { qrCodes: [] };
};

export const saveQRToHistory = (qr: GeneratedQR): void => {
  try {
    const history = getQRHistory();
    
    // Remove existing entry with same URL if exists
    const filteredHistory = history.qrCodes.filter(item => item.url !== qr.url);
    
    // Add new entry at the beginning
    const updatedHistory: QRHistory = {
      qrCodes: [qr, ...filteredHistory].slice(0, MAX_HISTORY_ITEMS)
    };
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
  } catch (error) {
    console.error('Error saving QR to history:', error);
  }
};

export const clearQRHistory = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing QR history:', error);
  }
};
