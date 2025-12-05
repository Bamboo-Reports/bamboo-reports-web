import { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, X, Sun, Moon } from 'lucide-react';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Configure PDF.js worker - use local file from react-pdf's pdfjs-dist version
pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

interface SecurePDFViewerProps {
  fileUrl: string;
  userEmail: string;
  onClose: () => void;
  documentTitle?: string;
}

export function SecurePDFViewer({ fileUrl, userEmail, onClose, documentTitle }: SecurePDFViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);
  const [error, setError] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [viewportWidth, setViewportWidth] = useState<number>(() =>
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

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
  const toggleTheme = () => setIsDarkMode(prev => !prev);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  // Theme-based styles
  const theme = {
    container: isDarkMode ? 'bg-black' : 'bg-gray-50',
    header: isDarkMode
      ? 'bg-gradient-to-r from-zinc-950 to-black border-b border-zinc-800/50'
      : 'bg-gradient-to-r from-white to-gray-50 border-b border-gray-200',
    title: isDarkMode ? 'text-zinc-300' : 'text-gray-700',
    controlBg: isDarkMode ? 'bg-zinc-900/50 border-zinc-800/50' : 'bg-gray-100 border-gray-300',
    controlText: isDarkMode ? 'text-zinc-300' : 'text-gray-700',
    buttonBase: isDarkMode
      ? 'text-zinc-400 hover:text-white hover:bg-zinc-800/80'
      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200',
    viewerBg: isDarkMode ? 'bg-black' : 'bg-gray-100',
    pageShadow: isDarkMode
      ? 'shadow-[0_0_60px_rgba(0,0,0,0.9)] border-zinc-800/30'
      : 'shadow-[0_0_30px_rgba(0,0,0,0.1)] border-gray-300',
    watermark: isDarkMode ? 'text-zinc-700/20' : 'text-gray-300/40',
    footer: isDarkMode
      ? 'bg-gradient-to-r from-zinc-950 to-black border-t border-zinc-800/50'
      : 'bg-gradient-to-r from-white to-gray-50 border-t border-gray-200',
    footerText: isDarkMode ? 'text-zinc-500' : 'text-gray-500',
    footerEmail: isDarkMode ? 'text-zinc-400' : 'text-gray-700',
    loadingBg: isDarkMode ? 'bg-zinc-950/50 border-zinc-800/50' : 'bg-white border-gray-200',
    loadingText: isDarkMode ? 'text-zinc-300' : 'text-gray-700',
    loadingSubtext: isDarkMode ? 'text-zinc-500' : 'text-gray-500',
  };

  const pageWidth = Math.min(Math.max(320, viewportWidth - 32), 1200);
  const effectivePageWidth = pageWidth * scale;

  return (
    <div
      className={`fixed inset-0 z-50 ${theme.container} flex flex-col`}
      style={{
        paddingTop: 'env(safe-area-inset-top)',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
    >
      {/* Modern Header with Glassmorphism */}
      <div className={`${theme.header} backdrop-blur-xl px-4 sm:px-6 py-3 sm:py-4 flex flex-col gap-3 sm:gap-4 shadow-2xl`}>
        <div className="flex items-center justify-between gap-3 w-full">
          {documentTitle ? (
            <h2 className={`${theme.title} font-semibold text-xs sm:text-sm truncate max-w-[70%] sm:max-w-xs`}>
              {documentTitle}
            </h2>
          ) : (
            <span className={`${theme.title} text-xs sm:text-sm font-semibold`}>Secure PDF Viewer</span>
          )}

          {/* Close Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className={`${theme.buttonBase} hover:bg-red-950/30 hover:border-red-900/50 border border-transparent transition-all duration-micro ease-smooth rounded-lg h-9 w-9 sm:h-10 sm:w-10 p-0`}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex w-full flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
          {/* Navigation Controls */}
          <div
            className={`flex items-center gap-3 ${theme.controlBg} rounded-xl px-3 sm:px-4 py-2 border w-full sm:w-auto overflow-x-auto`}
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={goToPrevPage}
              disabled={pageNumber <= 1}
              className={`${theme.buttonBase} disabled:opacity-30 disabled:hover:bg-transparent transition-all duration-micro ease-smooth rounded-lg h-8 w-8 p-0 flex-shrink-0`}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className={`${theme.controlText} text-xs sm:text-sm font-medium min-w-[90px] sm:min-w-[100px] text-center`}>
              {numPages > 0 ? `${pageNumber} / ${numPages}` : '-- / --'}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={goToNextPage}
              disabled={pageNumber >= numPages}
              className={`${theme.buttonBase} disabled:opacity-30 disabled:hover:bg-transparent transition-all duration-micro ease-smooth rounded-lg h-8 w-8 p-0 flex-shrink-0`}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Zoom Controls */}
          <div
            className={`flex items-center gap-3 ${theme.controlBg} rounded-xl px-3 sm:px-4 py-2 border w-full sm:w-auto overflow-x-auto`}
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={zoomOut}
              disabled={scale <= 0.5}
              className={`${theme.buttonBase} disabled:opacity-30 disabled:hover:bg-transparent transition-all duration-micro ease-smooth rounded-lg h-8 w-8 p-0 flex-shrink-0`}
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className={`${theme.controlText} text-xs sm:text-sm font-medium w-14 text-center`}>
              {Math.round(scale * 100)}%
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={zoomIn}
              disabled={scale >= 2.0}
              className={`${theme.buttonBase} disabled:opacity-30 disabled:hover:bg-transparent transition-all duration-micro ease-smooth rounded-lg h-8 w-8 p-0 flex-shrink-0`}
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
          </div>

          {/* Theme Toggle */}
          <div className="flex items-center justify-between sm:justify-center w-full sm:w-auto">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className={`${theme.buttonBase} transition-all duration-micro ease-smooth rounded-lg h-10 w-full sm:w-10 p-0 max-w-[140px] sm:max-w-none`}
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-medium">
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                <span className="sm:hidden">{isDarkMode ? 'Light' : 'Dark'}</span>
              </div>
            </Button>
          </div>
        </div>
      </div>

      {/* PDF Viewer */}
      <div
        className={`flex-1 overflow-auto ${theme.viewerBg} flex items-center justify-center p-4 sm:p-6 lg:p-8 select-none`}
        onContextMenu={handleContextMenu}
        onSelectStart={handleSelectStart}
        style={{ userSelect: 'none' }}
      >
        <div className="relative max-w-full">
          {error ? (
            <div className={`text-center p-12 ${theme.loadingBg} backdrop-blur-xl rounded-2xl border max-w-md`}>
              <div className="w-16 h-16 rounded-full bg-red-950/30 border border-red-900/50 flex items-center justify-center mx-auto mb-4">
                <X className="h-8 w-8 text-red-400" />
              </div>
              <p className="text-red-400 mb-6 text-sm leading-relaxed">{error}</p>
              <Button
                onClick={onClose}
                className="bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-700 rounded-lg transition-all duration-micro ease-smooth"
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
                  <div className={`text-center p-12 ${theme.loadingBg} backdrop-blur-xl rounded-2xl border`}>
                    <div className="relative w-16 h-16 mx-auto mb-6">
                      <div className={`absolute inset-0 rounded-full border-4 ${isDarkMode ? 'border-zinc-800' : 'border-gray-300'}`}></div>
                      <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-emerald-500 animate-spin"></div>
                    </div>
                    <p className={`${theme.loadingText} font-medium`}>Loading document...</p>
                    <p className={`${theme.loadingSubtext} text-sm mt-2`}>Please wait</p>
                  </div>
                }
              >
                <Page
                  pageNumber={pageNumber}
                  width={effectivePageWidth}
                  renderTextLayer={false}
                  renderAnnotationLayer={true}
                  className={`${theme.pageShadow} rounded-lg overflow-hidden border mx-auto`}
                />
              </Document>

              {/* Subtle Watermark Overlay */}
              <div
                className="absolute inset-0 pointer-events-none flex items-center justify-center"
              >
                <div
                  className={`${theme.watermark} text-2xl font-semibold transform -rotate-45 select-none`}
                  style={{
                    textShadow: isDarkMode ? '0 0 20px rgba(0,0,0,0.5)' : '0 0 20px rgba(255,255,255,0.8)',
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
      <div
        className={`${theme.footer} backdrop-blur-xl px-4 sm:px-6 py-2.5 sm:py-3 text-center shadow-2xl`}
        style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 8px)' }}
      >
        <p className={`${theme.footerText} text-[11px] sm:text-xs font-medium`}>
          <span className="inline-flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50"></span>
            Licensed to <span className={theme.footerEmail}>{userEmail}</span>
            <span className={`${isDarkMode ? 'text-zinc-700' : 'text-gray-400'} mx-1 sm:mx-2`}>ƒ?›</span>
            Confidential & Protected
          </span>
        </p>
      </div>
    </div>
  );
}
