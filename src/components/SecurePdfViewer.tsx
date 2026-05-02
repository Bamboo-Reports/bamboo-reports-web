import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Document, Page } from 'react-pdf';
import { ChevronLeft, ChevronRight, Download, Loader2, X, ZoomIn, ZoomOut } from 'lucide-react';
import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import '@/lib/pdfWorker';

import { Dialog, DialogContent, DialogPortal, DialogOverlay } from '@/components/ui/dialog';
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
}

const MIN_ZOOM = 0.5;
const MAX_ZOOM = 1;
const ZOOM_STEP = 0.2;
const PAGE_PADDING = 24; // matches py-6 on the inner wrapper
const FIT_GUTTER = 12; // absorbs canvas/browser rounding so fit mode does not show scrollbars
const REPORT_TITLE = 'GCC Snapshot Q4';
const DOWNLOAD_FILENAME = 'bamboo-reports-gcc-snapshot-q4.pdf';

const SecurePdfViewer = ({ url, userEmail, open, onOpenChange }: SecurePdfViewerProps) => {
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [zoom, setZoom] = useState(1);
  const [downloadDialogOpen, setDownloadDialogOpen] = useState(false);
  const [downloadAccepted, setDownloadAccepted] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);
  const [containerSize, setContainerSize] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (open) {
      setPageNumber(1);
      setZoom(1);
      setDownloadAccepted(false);
      setDownloadError(null);
      setDownloading(false);
    }
  }, [open, url]);

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
  const zoomIn = () => setZoom((z) => Math.min(MAX_ZOOM, +(z + ZOOM_STEP).toFixed(2)));
  const zoomOut = () => setZoom((z) => Math.max(MIN_ZOOM, +(z - ZOOM_STEP).toFixed(2)));

  const fitHeight = containerSize.height
    ? Math.max(1, Math.floor(containerSize.height - PAGE_PADDING * 2 - FIT_GUTTER))
    : undefined;
  const renderHeight = fitHeight ? Math.max(1, Math.floor(fitHeight * zoom)) : undefined;

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
      link.download = DOWNLOAD_FILENAME;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(objectUrl);

      setDownloadDialogOpen(false);
      setDownloadAccepted(false);
    } catch (error) {
      console.warn(error);
      setDownloadError('Could not prepare the watermarked download. Please try again.');
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
              'fixed left-0 top-0 z-50 flex h-screen w-screen max-w-none translate-x-0 translate-y-0',
              'flex-col gap-0 rounded-none border-0 bg-neutral-950 p-0 shadow-none sm:rounded-none',
              '[&>button]:hidden',
            )}
            onContextMenu={(e) => e.preventDefault()}
          >
          <div className="flex items-center justify-between border-b border-white/10 bg-neutral-900/80 px-4 py-2 text-white">
            <div className="text-sm font-medium">
              {REPORT_TITLE}
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={zoomOut}
                disabled={zoom <= MIN_ZOOM}
                className="text-white hover:bg-white/10 hover:text-white"
                aria-label="Zoom out"
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center text-xs tabular-nums">
                {Math.round(zoom * 100)}%
              </span>
              <Button
                size="sm"
                variant="ghost"
                onClick={zoomIn}
                disabled={zoom >= MAX_ZOOM}
                className="text-white hover:bg-white/10 hover:text-white"
                aria-label="Zoom in"
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
              <div className="mx-2 h-5 w-px bg-white/20" />
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  setDownloadError(null);
                  setDownloadDialogOpen(true);
                }}
                disabled={!url || downloading}
                className="text-white hover:bg-white/10 hover:text-white"
                aria-label="Download report"
              >
                <Download className="h-4 w-4" />
              </Button>
              <div className="mx-2 h-5 w-px bg-white/20" />
              <Button
                size="sm"
                variant="ghost"
                onClick={goPrev}
                disabled={pageNumber <= 1}
                className="text-white hover:bg-white/10 hover:text-white"
                aria-label="Previous page"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="min-w-[60px] text-center text-xs tabular-nums">
                {pageNumber} / {numPages || '–'}
              </span>
              <Button
                size="sm"
                variant="ghost"
                onClick={goNext}
                disabled={!numPages || pageNumber >= numPages}
                className="text-white hover:bg-white/10 hover:text-white"
                aria-label="Next page"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <div className="mx-2 h-5 w-px bg-white/20" />
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onOpenChange(false)}
                className="text-white hover:bg-white/10 hover:text-white"
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
              className="flex h-full items-start justify-center"
              style={{ boxSizing: 'border-box', padding: PAGE_PADDING }}
            >
              {url ? (
                <Document
                  file={url}
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
                  <div className="relative shrink-0 shadow-2xl">
                    <Page
                      key={`${pageNumber}-${renderHeight ?? 'auto'}`}
                      pageNumber={pageNumber}
                      height={renderHeight}
                      renderTextLayer={false}
                      renderAnnotationLayer={false}
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
        gridTemplateColumns: 'repeat(4, 1fr)',
        gridAutoRows: '140px',
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
