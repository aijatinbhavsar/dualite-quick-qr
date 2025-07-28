import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const downloadImage = (dataUrl: string, filename: string, format: 'png' | 'svg' = 'png'): void => {
  const link = document.createElement('a');
  link.download = `${filename}.${format}`;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const downloadAsPDF = (dataUrl: string, filename: string): void => {
  const pdf = new jsPDF();
  const imgWidth = 150;
  const imgHeight = 150;
  const x = (pdf.internal.pageSize.getWidth() - imgWidth) / 2;
  const y = 30;
  
  pdf.addImage(dataUrl, 'PNG', x, y, imgWidth, imgHeight);
  pdf.save(`${filename}.pdf`);
};

export const shareToWhatsApp = (url: string): void => {
  const message = `Check out this QR code I generated with Quick QR: ${url}`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');
};

export const shareToTelegram = (url: string): void => {
  const message = `Check out this QR code I generated with Quick QR: ${url}`;
  const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(message)}`;
  window.open(telegramUrl, '_blank');
};

export const shareViaEmail = (url: string): void => {
  const subject = 'QR Code Generated with Quick QR';
  const body = `I generated this QR code using Quick QR: ${url}`;
  const emailUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.open(emailUrl);
};
