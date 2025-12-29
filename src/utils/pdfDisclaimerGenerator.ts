import { PDFDocument, rgb, StandardFonts, PDFFont } from 'pdf-lib';

interface DisclaimerData {
  reportTitle: string;
  generatedAt: string;
  planName?: string;
  documentId?: string;
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
  const italicFont = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);
  const serifFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

  const { width, height } = page.getSize();

  // Define colors
  const primaryColor = rgb(0.1, 0.1, 0.1); // Dark gray for text
  const accentColor = rgb(0.2, 0.6, 0.4); // Green accent
  const subtextColor = rgb(0.4, 0.4, 0.4); // Medium gray

  const margin = 40;
  const contentX = margin + 40;
  const contentWidth = width - (margin * 2) - 80;
  const headerSize = 14;
  const labelSize = 10;
  const valueSize = 12;
  const lineHeight = 16;

  // Draw border/frame
  page.drawRectangle({
    x: margin,
    y: margin,
    width: width - (margin * 2),
    height: height - (margin * 2),
    borderColor: rgb(0.8, 0.8, 0.8),
    borderWidth: 2,
  });

  // Company branding
  const brandBandHeight = 90;
  const brandBandY = height - margin - brandBandHeight;
  page.drawRectangle({
    x: margin + 1,
    y: brandBandY,
    width: width - (margin * 2) - 2,
    height: brandBandHeight,
    color: rgb(0.95, 0.98, 0.95),
  });

  const brandTitle = 'BAMBOO REPORTS';
  const brandTitleSize = 28;
  const brandTitleWidth = boldFont.widthOfTextAtSize(brandTitle, brandTitleSize);
  const brandTitleY = brandBandY + brandBandHeight - 38;
  page.drawText(brandTitle, {
    x: (width - brandTitleWidth) / 2,
    y: brandTitleY,
    size: brandTitleSize,
    font: boldFont,
    color: accentColor,
  });

  const brandSubtitle = 'by ResearchNXT';
  const brandSubtitleSize = 13;
  const brandSubtitleWidth = italicFont.widthOfTextAtSize(brandSubtitle, brandSubtitleSize);
  const brandSubtitleY = brandTitleY - 18;
  page.drawText(brandSubtitle, {
    x: (width - brandSubtitleWidth) / 2,
    y: brandSubtitleY,
    size: brandSubtitleSize,
    font: italicFont,
    color: subtextColor,
  });

  const accentLineY = brandSubtitleY - 12;
  page.drawLine({
    start: { x: width / 2 - 50, y: accentLineY },
    end: { x: width / 2 + 50, y: accentLineY },
    thickness: 2,
    color: accentColor,
  });

  // Current Y position (start below branding band)
  let y = brandBandY - 20;

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
    x: contentX,
    y: y,
    size: headerSize,
    font: boldFont,
    color: primaryColor,
  });

  y -= 30;

  // Report Title
  page.drawText('Report Title:', {
    x: contentX,
    y: y,
    size: labelSize,
    font: boldFont,
    color: subtextColor,
  });

  y -= 18;

  // Wrap report title if too long
  const titleLines = wrapText(data.reportTitle, contentWidth, 13, boldFont);

  for (const line of titleLines) {
    page.drawText(line, {
      x: contentX,
      y: y,
      size: 13,
      font: boldFont,
      color: primaryColor,
    });
    y -= 20;
  }

  y -= 8;

  const detailLines = [
    { label: 'Generated At:', value: data.generatedAt },
    { label: 'Plan Name:', value: data.planName },
    { label: 'Document ID:', value: data.documentId },
  ].filter((detail) => detail.value);

  for (const detail of detailLines) {
    page.drawText(detail.label, {
      x: contentX,
      y: y,
      size: labelSize,
      font: boldFont,
      color: subtextColor,
    });

    y -= 18;

    const valueLines = wrapText(detail.value!, contentWidth, valueSize, regularFont);
    for (const line of valueLines) {
      page.drawText(line, {
        x: contentX,
        y: y,
        size: valueSize,
        font: regularFont,
        color: primaryColor,
      });
      y -= lineHeight;
    }

    y -= 12;
  }

  y -= 10;

  // User License Information Section
  page.drawText('USER LICENSE INFORMATION', {
    x: contentX,
    y: y,
    size: headerSize,
    font: boldFont,
    color: primaryColor,
  });

  y -= 30;

  // User Name
  page.drawText('Licensed to:', {
    x: contentX,
    y: y,
    size: labelSize,
    font: boldFont,
    color: subtextColor,
  });

  y -= 18;
  page.drawText(data.userName, {
    x: contentX,
    y: y,
    size: valueSize,
    font: regularFont,
    color: primaryColor,
  });

  y -= 25;

  // User Email
  page.drawText('Email:', {
    x: contentX,
    y: y,
    size: labelSize,
    font: boldFont,
    color: subtextColor,
  });

  y -= 18;
  page.drawText(data.userEmail, {
    x: contentX,
    y: y,
    size: valueSize,
    font: regularFont,
    color: primaryColor,
  });

  y -= 50;

  // Legal Disclaimer Section
  page.drawText('LEGAL NOTICE', {
    x: contentX,
    y: y,
    size: headerSize,
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

  const legalLines = wrapText(legalText, contentWidth, 10.5, serifFont);

  for (const line of legalLines) {
    page.drawText(line, {
      x: contentX,
      y: y,
      size: 10.5,
      font: serifFont,
      color: subtextColor,
    });
    y -= 15;
  }

  // Footer
  y = margin + 30;
  const footerText = 'Confidential Document | Bamboo Reports';
  const footerSize = 9;
  const footerWidth = regularFont.widthOfTextAtSize(footerText, footerSize);
  page.drawText(footerText, {
    x: (width - footerWidth) / 2,
    y: y,
    size: footerSize,
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
function wrapText(text: string, maxWidth: number, fontSize: number, font: PDFFont): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = '';

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;

    if (font.widthOfTextAtSize(testLine, fontSize) <= maxWidth) {
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
