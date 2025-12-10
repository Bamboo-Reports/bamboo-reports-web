import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

interface DisclaimerData {
  reportTitle: string;
  dateGenerated: string;
  userName: string;
  userEmail: string;
}

/**
 * Generates a disclaimer/cover page as a PDF
 * This page will be prepended as Page 1 to all downloaded reports
 */
export async function generateDisclaimerPage(data: DisclaimerData): Promise<Uint8Array> {
  // Create a new PDF document
  const pdfDoc = await PDFDocument.create();
  
  // Add a blank page (US Letter size: 8.5" x 11")
  const page = pdfDoc.addPage([612, 792]);
  
  // Embed fonts
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
  
  const { width, height } = page.getSize();
  
  // Define colors
  const primaryColor = rgb(0.1, 0.1, 0.1); // Dark gray for text
  const accentColor = rgb(0.2, 0.6, 0.4); // Green accent
  const subtextColor = rgb(0.4, 0.4, 0.4); // Medium gray
  
  // Current Y position (start from top with margin)
  let y = height - 80;
  
  // Draw border/frame
  const margin = 40;
  page.drawRectangle({
    x: margin,
    y: margin,
    width: width - (margin * 2),
    height: height - (margin * 2),
    borderColor: rgb(0.8, 0.8, 0.8),
    borderWidth: 2,
  });
  
  // Company branding
  page.drawText('BAMBOO REPORTS', {
    x: width / 2 - 110,
    y: y,
    size: 28,
    font: boldFont,
    color: accentColor,
  });
  
  y -= 15;
  page.drawText('ResearchNXT', {
    x: width / 2 - 50,
    y: y,
    size: 14,
    font: regularFont,
    color: subtextColor,
  });
  
  y -= 60;
  
  // Horizontal line
  page.drawLine({
    start: { x: margin + 20, y },
    end: { x: width - margin - 20, y },
    thickness: 1,
    color: rgb(0.8, 0.8, 0.8),
  });
  
  y -= 50;
  
  // Report Details Section
  page.drawText('REPORT DETAILS', {
    x: margin + 40,
    y: y,
    size: 14,
    font: boldFont,
    color: primaryColor,
  });
  
  y -= 30;
  
  // Report Title
  page.drawText('Report Title:', {
    x: margin + 40,
    y: y,
    size: 11,
    font: boldFont,
    color: subtextColor,
  });
  
  y -= 18;
  
  // Wrap report title if too long
  const maxWidth = width - (margin * 2) - 80;
  const titleLines = wrapText(data.reportTitle, maxWidth, 13, boldFont);
  
  for (const line of titleLines) {
    page.drawText(line, {
      x: margin + 40,
      y: y,
      size: 13,
      font: boldFont,
      color: primaryColor,
    });
    y -= 20;
  }
  
  y -= 10;
  
  // Date Generated
  page.drawText('Date Generated:', {
    x: margin + 40,
    y: y,
    size: 11,
    font: boldFont,
    color: subtextColor,
  });
  
  y -= 18;
  page.drawText(data.dateGenerated, {
    x: margin + 40,
    y: y,
    size: 12,
    font: regularFont,
    color: primaryColor,
  });
  
  y -= 50;
  
  // User License Information Section
  page.drawText('USER LICENSE INFORMATION', {
    x: margin + 40,
    y: y,
    size: 14,
    font: boldFont,
    color: primaryColor,
  });
  
  y -= 30;
  
  // User Name
  page.drawText('Licensed to:', {
    x: margin + 40,
    y: y,
    size: 11,
    font: boldFont,
    color: subtextColor,
  });
  
  y -= 18;
  page.drawText(data.userName, {
    x: margin + 40,
    y: y,
    size: 12,
    font: regularFont,
    color: primaryColor,
  });
  
  y -= 25;
  
  // User Email
  page.drawText('Email:', {
    x: margin + 40,
    y: y,
    size: 11,
    font: boldFont,
    color: subtextColor,
  });
  
  y -= 18;
  page.drawText(data.userEmail, {
    x: margin + 40,
    y: y,
    size: 12,
    font: regularFont,
    color: primaryColor,
  });
  
  y -= 50;
  
  // Legal Disclaimer Section
  page.drawText('LEGAL NOTICE', {
    x: margin + 40,
    y: y,
    size: 14,
    font: boldFont,
    color: primaryColor,
  });
  
  y -= 30;
  
  // Legal text
  const legalText = 
    'This document is the intellectual property of Bamboo Reports (Legal Entity: ResearchNXT). ' +
    'It is exclusively licensed for personal use to the specific user listed above. ' +
    'Unauthorized distribution, copying, or public sharing of this document is strictly ' +
    'prohibited and monitored.';
  
  const legalLines = wrapText(legalText, maxWidth, 10, regularFont);
  
  for (const line of legalLines) {
    page.drawText(line, {
      x: margin + 40,
      y: y,
      size: 10,
      font: regularFont,
      color: subtextColor,
    });
    y -= 16;
  }
  
  // Footer
  y = margin + 30;
  page.drawText('Confidential Document | Bamboo Reports © 2024', {
    x: width / 2 - 130,
    y: y,
    size: 9,
    font: regularFont,
    color: subtextColor,
  });
  
  // Save the PDF and return as bytes
  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}

/**
 * Helper function to wrap text to fit within a maximum width
 */
function wrapText(text: string, maxWidth: number, fontSize: number, font: any): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = '';
  
  // Approximate character width (this is a rough estimate)
  const charWidth = fontSize * 0.5;
  const maxChars = Math.floor(maxWidth / charWidth);
  
  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    
    if (testLine.length <= maxChars) {
      currentLine = testLine;
    } else {
      if (currentLine) {
        lines.push(currentLine);
      }
      currentLine = word;
    }
  }
  
  if (currentLine) {
    lines.push(currentLine);
  }
  
  return lines;
}
