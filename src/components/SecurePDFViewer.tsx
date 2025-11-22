import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, X } from 'lucide-react';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Configure PDF.js worker - use local file instead of CDN
pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';

interface SecurePDFViewerProps {
  fileUrl: string;
  userEmail: string;
  onClose: () => void;
}

export function SecurePDFViewer({ fileUrl, userEmail, onClose }: SecurePDFViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);
  const [error, setError] = useState<string | null>(null);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setError(null);
  }

  function onDocumentLoadError(error: Error) {
    console.error('Error loading PDF:', error);
    console.error('PDF URL:', fileUrl);
    setError(`Failed to load PDF: ${error.message}`);
  }

  const goToPrevPage = () => setPageNumber(prev => Math.max(1, prev - 1));
  const goToNextPage = () => setPageNumber(prev => Math.min(numPages, prev + 1));
  const zoomIn = () => setScale(prev => Math.min(2.0, prev + 0.2));
  const zoomOut = () => setScale(prev => Math.max(0.5, prev - 0.2));

  // Prevent right-click
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    return false;
  };

  // Prevent text selection
  const handleSelectStart = (e: React.SyntheticEvent) => {
    e.preventDefault();
    return false;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex flex-col">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-700 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Navigation */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={goToPrevPage}
              disabled={pageNumber <= 1}
              className="text-white hover:bg-gray-800"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-white text-sm">
              Page {pageNumber} of {numPages}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={goToNextPage}
              disabled={pageNumber >= numPages}
              className="text-white hover:bg-gray-800"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Zoom Controls */}
          <div className="flex items-center gap-2 border-l border-gray-700 pl-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={zoomOut}
              disabled={scale <= 0.5}
              className="text-white hover:bg-gray-800"
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-white text-sm w-12 text-center">
              {Math.round(scale * 100)}%
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={zoomIn}
              disabled={scale >= 2.0}
              className="text-white hover:bg-gray-800"
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Close Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="text-white hover:bg-gray-800"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* PDF Viewer */}
      <div
        className="flex-1 overflow-auto bg-gray-800 flex items-center justify-center p-4 select-none"
        onContextMenu={handleContextMenu}
        onSelectStart={handleSelectStart}
        style={{ userSelect: 'none' }}
      >
        <div className="relative">
          {error ? (
            <div className="text-white text-center p-8">
              <p className="text-red-400 mb-4">{error}</p>
              <Button onClick={onClose} variant="outline">
                Close
              </Button>
            </div>
          ) : (
            <>
              <Document
                file={{
                  url: fileUrl,
                  httpHeaders: {
                    'Accept': 'application/pdf'
                  },
                  withCredentials: false
                }}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={onDocumentLoadError}
                options={{
                  cMapUrl: 'https://unpkg.com/pdfjs-dist@3.11.174/cmaps/',
                  cMapPacked: true,
                  standardFontDataUrl: 'https://unpkg.com/pdfjs-dist@3.11.174/standard_fonts/',
                }}
                loading={
                  <div className="text-white text-center p-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                    <p>Loading PDF...</p>
                  </div>
                }
              >
                <Page
                  pageNumber={pageNumber}
                  scale={scale}
                  renderTextLayer={false} // Disable text selection
                  renderAnnotationLayer={true}
                  className="shadow-2xl"
                />
              </Document>

              {/* Watermark Overlay */}
              <div
                className="absolute inset-0 pointer-events-none flex items-center justify-center"
                style={{
                  background: 'repeating-linear-gradient(45deg, transparent, transparent 100px, rgba(255,255,255,0.02) 100px, rgba(255,255,255,0.02) 200px)'
                }}
              >
                <div
                  className="text-gray-400/30 text-2xl font-bold transform -rotate-45"
                  style={{
                    textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                  }}
                >
                  {userEmail}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Footer Notice */}
      <div className="bg-gray-900 border-t border-gray-700 px-4 py-2 text-center">
        <p className="text-gray-400 text-xs">
          This document is confidential and licensed to {userEmail}. Unauthorized distribution is prohibited.
        </p>
      </div>
    </div>
  );
}
