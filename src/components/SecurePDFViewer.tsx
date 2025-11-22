import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, X } from 'lucide-react';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Configure PDF.js worker - use local file from react-pdf's pdfjs-dist version
pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

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
    <div className="fixed inset-0 z-50 bg-black flex flex-col">
      {/* Modern Header with Glassmorphism */}
      <div className="bg-gradient-to-r from-zinc-950 to-black border-b border-zinc-800/50 backdrop-blur-xl px-6 py-4 flex items-center justify-between shadow-2xl">
        <div className="flex items-center gap-6">
          {/* Navigation Controls */}
          <div className="flex items-center gap-3 bg-zinc-900/50 rounded-xl px-4 py-2 border border-zinc-800/50">
            <Button
              variant="ghost"
              size="sm"
              onClick={goToPrevPage}
              disabled={pageNumber <= 1}
              className="text-zinc-400 hover:text-white hover:bg-zinc-800/80 disabled:opacity-30 disabled:hover:bg-transparent transition-all duration-200 rounded-lg h-8 w-8 p-0"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-zinc-300 text-sm font-medium min-w-[100px] text-center">
              {numPages > 0 ? `${pageNumber} / ${numPages}` : '-- / --'}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={goToNextPage}
              disabled={pageNumber >= numPages}
              className="text-zinc-400 hover:text-white hover:bg-zinc-800/80 disabled:opacity-30 disabled:hover:bg-transparent transition-all duration-200 rounded-lg h-8 w-8 p-0"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Zoom Controls */}
          <div className="flex items-center gap-3 bg-zinc-900/50 rounded-xl px-4 py-2 border border-zinc-800/50">
            <Button
              variant="ghost"
              size="sm"
              onClick={zoomOut}
              disabled={scale <= 0.5}
              className="text-zinc-400 hover:text-white hover:bg-zinc-800/80 disabled:opacity-30 disabled:hover:bg-transparent transition-all duration-200 rounded-lg h-8 w-8 p-0"
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-zinc-300 text-sm font-medium w-14 text-center">
              {Math.round(scale * 100)}%
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={zoomIn}
              disabled={scale >= 2.0}
              className="text-zinc-400 hover:text-white hover:bg-zinc-800/80 disabled:opacity-30 disabled:hover:bg-transparent transition-all duration-200 rounded-lg h-8 w-8 p-0"
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
          className="text-zinc-400 hover:text-white hover:bg-red-950/30 hover:border-red-900/50 border border-transparent transition-all duration-200 rounded-lg h-10 w-10 p-0"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* PDF Viewer with Deep Black Background */}
      <div
        className="flex-1 overflow-auto bg-black flex items-center justify-center p-8 select-none"
        onContextMenu={handleContextMenu}
        onSelectStart={handleSelectStart}
        style={{ userSelect: 'none' }}
      >
        <div className="relative">
          {error ? (
            <div className="text-center p-12 bg-zinc-950/50 backdrop-blur-xl rounded-2xl border border-zinc-800/50 max-w-md">
              <div className="w-16 h-16 rounded-full bg-red-950/30 border border-red-900/50 flex items-center justify-center mx-auto mb-4">
                <X className="h-8 w-8 text-red-400" />
              </div>
              <p className="text-red-400 mb-6 text-sm leading-relaxed">{error}</p>
              <Button
                onClick={onClose}
                className="bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-700 rounded-lg transition-all duration-200"
              >
                Close Viewer
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
                  <div className="text-center p-12 bg-zinc-950/50 backdrop-blur-xl rounded-2xl border border-zinc-800/50">
                    <div className="relative w-16 h-16 mx-auto mb-6">
                      <div className="absolute inset-0 rounded-full border-4 border-zinc-800"></div>
                      <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-emerald-500 animate-spin"></div>
                    </div>
                    <p className="text-zinc-300 font-medium">Loading document...</p>
                    <p className="text-zinc-500 text-sm mt-2">Please wait</p>
                  </div>
                }
              >
                <Page
                  pageNumber={pageNumber}
                  scale={scale}
                  renderTextLayer={false}
                  renderAnnotationLayer={true}
                  className="shadow-[0_0_60px_rgba(0,0,0,0.9)] rounded-lg overflow-hidden border border-zinc-800/30"
                />
              </Document>

              {/* Subtle Watermark Overlay */}
              <div
                className="absolute inset-0 pointer-events-none flex items-center justify-center"
              >
                <div
                  className="text-zinc-700/20 text-2xl font-semibold transform -rotate-45 select-none"
                  style={{
                    textShadow: '0 0 20px rgba(0,0,0,0.5)',
                    letterSpacing: '0.05em'
                  }}
                >
                  {userEmail}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Modern Footer */}
      <div className="bg-gradient-to-r from-zinc-950 to-black border-t border-zinc-800/50 backdrop-blur-xl px-6 py-3 text-center shadow-2xl">
        <p className="text-zinc-500 text-xs font-medium">
          <span className="inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50"></span>
            Licensed to <span className="text-zinc-400">{userEmail}</span>
            <span className="text-zinc-700 mx-2">•</span>
            Confidential & Protected
          </span>
        </p>
      </div>
    </div>
  );
}
