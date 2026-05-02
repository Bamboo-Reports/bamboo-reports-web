import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Document, Page } from 'react-pdf';
import { ChevronLeft, ChevronRight, Download, Loader2, X } from 'lucide-react';
import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import '@/lib/pdfWorker';

import { Dialog, DialogContent, DialogPortal, DialogOverlay } from '@/components/ui/dialog';
import { logEvent } from '@/lib/eventLogger';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface SecurePdfViewerProps {
  url: string | null;
  userEmail: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reportSlug?: string;
  reportTitle?: string;
}

const PAGE_X_PADDING_MOBILE = 8;
const PAGE_X_PADDING_DESKTOP = 24;
const DEFAULT_REPORT_TITLE = 'GCC Snapshot Q4';
const DEFAULT_REPORT_SLUG = 'gcc-snapshot-q4';
const DEFAULT_DOWNLOAD_FILENAME = 'bamboo-reports-gcc-snapshot-q4.pdf';
const PDF_DOCUMENT_OPTIONS = {
  disableStream: false,
  disableAutoFetch: false,
};

const SecurePdfViewer = ({
  url,
  userEmail,
  open,
  onOpenChange,
  reportSlug = DEFAULT_REPORT_SLUG,
  reportTitle = DEFAULT_REPORT_TITLE,
}: SecurePdfViewerProps) => {
  const downloadFilename = reportSlug
    ? `bamboo-reports-${reportSlug}.pdf`
    : DEFAULT_DOWNLOAD_FILENAME;
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [downloadDialogOpen, setDownloadDialogOpen] = useState(false);
  const [downloadAccepted, setDownloadAccepted] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);
  const [containerSize, setContainerSize] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });
  const [pageAspect, setPageAspect] = useState<number | null>(null);

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (open) {
      setPageNumber(1);
      setDownloadAccepted(false);
      setDownloadError(null);
      setDownloading(false);
      if (url) {
        void logEvent({
          type: 'report_view',
          reportSlug,
          metadata: { title: reportTitle },
        });
      }
    }
  }, [open, url, reportSlug, reportTitle]);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el || !open) return;
    const update = () =>
      setContainerSize({ width: el.clientWidth, height: el.clientHeight });
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [open]);

  const goPrev = () => setPageNumber((p) => Math.max(1, p - 1));
  const goNext = () => setPageNumber((p) => Math.min(numPages || p, p + 1));

  const horizontalPadding =
    containerSize.width < 640 ? PAGE_X_PADDING_MOBILE : PAGE_X_PADDING_DESKTOP;
  const availableWidth = Math.max(0, containerSize.width - horizontalPadding * 2);
  const fitHeight =
    containerSize.height && pageAspect && availableWidth
      ? Math.min(containerSize.height, availableWidth / pageAspect)
      : containerSize.height || 0;
  const renderHeight = fitHeight ? Math.max(1, Math.floor(fitHeight)) : undefined;

  const downloadWatermarkedPdf = async () => {
    if (!url) return;

    setDownloading(true);
    setDownloadError(null);

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Could not fetch the report PDF.');

      const sourceBytes = await response.arrayBuffer();
      const pdfDoc = await PDFDocument.load(sourceBytes);
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

      pdfDoc.getPages().forEach((page) => {
        const { width, height } = page.getSize();
        const fontSize = Math.max(10, Math.min(14, width / 45));
        const xStep = Math.max(180, width / 3);
        const yStep = 120;

        for (let y = -height * 0.1; y < height * 1.15; y += yStep) {
          for (let x = -width * 0.2; x < width * 1.15; x += xStep) {
            page.drawText(userEmail, {
              x,
              y,
              size: fontSize,
              font,
              color: rgb(0.5, 0.5, 0.5),
              opacity: 0.2,
              rotate: degrees(-30),
            });
          }
        }
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const objectUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = objectUrl;
      link.download = downloadFilename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(objectUrl);

      void logEvent({
        type: 'report_download',
        reportSlug,
        metadata: { title: reportTitle, filename: downloadFilename },
      });

      setDownloadDialogOpen(false);
      setDownloadAccepted(false);
    } catch (error) {
      console.error('Watermarked download failed:', error);
      const message = error instanceof Error ? error.message : String(error);
      setDownloadError(`Could not prepare the watermarked download: ${message}`);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogPortal>
          <DialogOverlay className="bg-black/90" />
          <DialogContent
            className={cn(
              'fixed left-0 top-0 z-50 flex h-screen w-screen max-w-none translate-x-0 translate-y-0 overflow-hidden',
              'flex-col gap-0 rounded-none border-0 bg-neutral-950 p-0 shadow-none sm:rounded-none',
              '[&>button]:hidden',
            )}
            onContextMenu={(e) => e.preventDefault()}
          >
          <div className="flex items-center justify-between gap-2 border-b border-white/10 bg-neutral-900/80 px-2 py-2 text-white sm:px-4">
            <div className="hidden truncate text-sm font-medium sm:block">
              {reportTitle}
            </div>
            <div className="flex flex-1 items-center justify-end gap-1 sm:gap-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  setDownloadError(null);
                  setDownloadDialogOpen(true);
                }}
                disabled={!url || downloading}
                className="h-9 w-9 px-0 text-white hover:bg-white/10 hover:text-white sm:h-8 sm:w-auto sm:px-3"
                aria-label="Download report"
              >
                <Download className="h-4 w-4" />
              </Button>
              <div className="mx-1 hidden h-5 w-px bg-white/20 sm:block sm:mx-2" />
              <Button
                size="sm"
                variant="ghost"
                onClick={goPrev}
                disabled={pageNumber <= 1}
                className="h-9 w-9 px-0 text-white hover:bg-white/10 hover:text-white sm:h-8 sm:w-auto sm:px-3"
                aria-label="Previous page"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="min-w-[48px] text-center text-xs tabular-nums sm:min-w-[60px]">
                {pageNumber} / {numPages || '–'}
              </span>
              <Button
                size="sm"
                variant="ghost"
                onClick={goNext}
                disabled={!numPages || pageNumber >= numPages}
                className="h-9 w-9 px-0 text-white hover:bg-white/10 hover:text-white sm:h-8 sm:w-auto sm:px-3"
                aria-label="Next page"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <div className="mx-1 hidden h-5 w-px bg-white/20 sm:block sm:mx-2" />
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onOpenChange(false)}
                className="h-9 w-9 px-0 text-white hover:bg-white/10 hover:text-white sm:h-8 sm:w-auto sm:px-3"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div
            ref={containerRef}
            className="relative min-h-0 flex-1 overflow-hidden bg-neutral-900"
            style={{ userSelect: 'none' }}
            onWheel={(e) => e.preventDefault()}
          >
            <div
              className="flex h-full w-full items-center justify-center"
              style={{ boxSizing: 'border-box', paddingInline: horizontalPadding }}
            >
              {url ? (
                <Document
                  file={url}
                  options={PDF_DOCUMENT_OPTIONS}
                  onLoadSuccess={({ numPages: n }) => setNumPages(n)}
                  loading={
                    <div className="py-12 text-sm text-white/70">Loading report…</div>
                  }
                  error={
                    <div className="py-12 text-sm text-red-300">
                      Could not load the report. Please close and try again.
                    </div>
                  }
                >
                  <div
                    className="relative shrink-0 shadow-2xl"
                    style={
                      renderHeight && pageAspect
                        ? {
                            height: renderHeight,
                            width: Math.floor(renderHeight * pageAspect),
                          }
                        : renderHeight
                        ? { height: renderHeight }
                        : undefined
                    }
                  >
                    <Page
                      key={`${pageNumber}-${renderHeight ?? 'auto'}`}
                      pageNumber={pageNumber}
                      height={renderHeight}
                      devicePixelRatio={Math.min(window.devicePixelRatio || 1, 1.5)}
                      renderTextLayer={false}
                      renderAnnotationLayer={false}
                      onLoadSuccess={(page) => {
                        const { width, height } = page;
                        if (width && height) setPageAspect(width / height);
                        const el = containerRef.current;
                        if (el) {
                          setContainerSize({
                            width: el.clientWidth,
                            height: el.clientHeight,
                          });
                        }
                      }}
                    />
                    <Watermark email={userEmail} />
                  </div>
                </Document>
              ) : (
                <div className="py-12 text-sm text-white/70">Preparing report…</div>
              )}
            </div>
          </div>

          </DialogContent>
        </DialogPortal>
      </Dialog>

      <AlertDialog
        open={downloadDialogOpen}
        onOpenChange={(nextOpen) => {
          if (downloading) return;
          setDownloadDialogOpen(nextOpen);
          if (!nextOpen) {
            setDownloadAccepted(false);
            setDownloadError(null);
          }
        }}
      >
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle>Download your copy</AlertDialogTitle>
            <AlertDialogDescription>
              This PDF is licensed to your account for personal reference. Please don't
              share, distribute, or republish it.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <label className="flex items-start gap-3 rounded-md border p-3 text-sm leading-5">
            <Checkbox
              checked={downloadAccepted}
              onCheckedChange={(checked) => setDownloadAccepted(checked === true)}
              disabled={downloading}
              className="mt-0.5"
            />
            <span>I agree that this copy is for my authorized use only and will not be shared or republished.</span>
          </label>

          {downloadError ? (
            <p className="text-sm text-destructive">{downloadError}</p>
          ) : null}

          <AlertDialogFooter>
            <AlertDialogCancel disabled={downloading}>Cancel</AlertDialogCancel>
            {downloadAccepted ? (
              <Button
                onClick={downloadWatermarkedPdf}
                disabled={downloading || !url}
              >
                {downloading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Preparing
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4" />
                    Download PDF
                  </>
                )}
              </Button>
            ) : null}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};


const Watermark = ({ email }: { email: string }) => {
  const cells = Array.from({ length: 60 });
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 grid select-none overflow-hidden"
      style={{
        gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
        gridAutoRows: '120px',
      }}
    >
      {cells.map((_, i) => (
        <div
          key={i}
          className="flex items-center justify-center"
          style={{
            transform: 'rotate(-30deg)',
            color: 'rgba(128,128,128,0.2)',
            fontSize: '12px',
            fontWeight: 500,
            whiteSpace: 'nowrap',
          }}
        >
          {email}
        </div>
      ))}
    </div>
  );
};

export default SecurePdfViewer;
