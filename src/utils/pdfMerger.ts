import { PDFDocument } from 'pdf-lib';

/**
 * Merges a disclaimer PDF with an original PDF from a URL
 * The disclaimer will be prepended as Page 1
 */
export async function mergePDFWithDisclaimer(
    disclaimerBytes: Uint8Array,
    originalPdfUrl: string
): Promise<Blob> {
    try {
        // Fetch the original PDF
        const response = await fetch(originalPdfUrl);
        if (!response.ok) {
            throw new Error(`Failed to fetch PDF: ${response.statusText}`);
        }
        const originalPdfBytes = await response.arrayBuffer();

        // Load both PDFs
        const disclaimerDoc = await PDFDocument.load(disclaimerBytes);
        const originalDoc = await PDFDocument.load(originalPdfBytes);

        // Create a new PDF document for the merged result
        const mergedDoc = await PDFDocument.create();

        // Copy disclaimer page(s) first
        const disclaimerPages = await mergedDoc.copyPages(
            disclaimerDoc,
            disclaimerDoc.getPageIndices()
        );
        disclaimerPages.forEach((page) => mergedDoc.addPage(page));

        // Then copy all pages from the original PDF
        const originalPages = await mergedDoc.copyPages(
            originalDoc,
            originalDoc.getPageIndices()
        );
        originalPages.forEach((page) => mergedDoc.addPage(page));

        // Save the merged PDF
        const mergedPdfBytes = await mergedDoc.save();

        // Convert to Blob for download
        return new Blob([mergedPdfBytes], { type: 'application/pdf' });
    } catch (error) {
        throw new Error(`Failed to merge PDFs: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}

/**
 * Triggers a browser download of a PDF blob
 */
export function downloadPDF(blob: Blob, filename: string): void {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}
