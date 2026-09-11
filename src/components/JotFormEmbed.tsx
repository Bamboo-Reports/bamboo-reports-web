import { useState, useCallback, useEffect, useId, useRef } from "react";
import { useLocation } from "react-router-dom";
import { ensureJotformEmbedHandler, getJotformEmbedSrc } from "@/lib/jotform";

type JotformWindow = Window & {
  jotformEmbedHandler?: (selector: string, source: string) => void;
};

interface JotFormEmbedProps {
  formId: string;
  title: string;
  height?: string;
  heightClassName?: string;
  /** Size the embed to the height this form reports via setHeight messages,
   *  falling back to height/heightClassName until the first report arrives. */
  autoHeight?: boolean;
  className?: string;
  autoReloadAfterSubmit?: boolean;
}

/**
 * Reusable JotForm embed component with a loading skeleton.
 * Shows a form-like placeholder while the iframe loads,
 * then fades it out once the form is ready.
 */
const JotFormEmbed = ({
  formId,
  title,
  height = "539px",
  heightClassName,
  autoHeight = false,
  className = "",
  autoReloadAfterSubmit = false,
}: JotFormEmbedProps) => {
  const { search } = useLocation();
  const [isLoaded, setIsLoaded] = useState(false);
  const [reportedHeight, setReportedHeight] = useState<string | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const fallbackTimerRef = useRef<number | null>(null);
  const hasLoadedRef = useRef(false);
  const resetTimerRef = useRef<number | null>(null);
  const reactId = useId();
  const iframeId = `JotFormIFrame-${formId}-${reactId.replace(/:/g, "")}`;
  const embedSrc = getJotformEmbedSrc(formId, search);

  const clearFallbackTimer = useCallback(() => {
    if (fallbackTimerRef.current === null) return;

    window.clearTimeout(fallbackTimerRef.current);
    fallbackTimerRef.current = null;
  }, []);

  const showForm = useCallback(() => {
    clearFallbackTimer();
    setIsLoaded(true);
  }, [clearFallbackTimer]);

  const resetForm = useCallback(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    clearFallbackTimer();
    if (resetTimerRef.current !== null) window.clearTimeout(resetTimerRef.current);
    resetTimerRef.current = null;
    setIsLoaded(false);
    hasLoadedRef.current = false;
    setReportedHeight(null);
    iframe.src = `${embedSrc}&_ts=${Date.now()}`;
    fallbackTimerRef.current = window.setTimeout(showForm, 4000);
  }, [clearFallbackTimer, embedSrc, showForm]);

  const scheduleReload = useCallback(() => {
    // Repeated messages must not postpone recovery indefinitely.
    if (resetTimerRef.current !== null) return;
    resetTimerRef.current = window.setTimeout(resetForm, 150);
  }, [resetForm]);

  useEffect(() => {
    fallbackTimerRef.current = window.setTimeout(showForm, 4000);

    ensureJotformEmbedHandler().then(() => {
      const jotformWindow = window as JotformWindow;

      if (jotformWindow.jotformEmbedHandler) {
        jotformWindow.jotformEmbedHandler(`iframe[id='${iframeId}']`, "https://form.jotform.com/");
      }
    });

    return () => {
      clearFallbackTimer();
    };
  }, [clearFallbackTimer, iframeId, showForm]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const origin = String(event.origin || "").toLowerCase();
      const data = event.data;

      // Only accept messages from this form, including when multiple embeds exist.
      if (event.source !== iframeRef.current?.contentWindow) return;
      if (!/^https:\/\/(?:[a-z0-9-]+\.)*jotform\.com$/.test(origin)) return;

      const handleSubmission = (signal: string) => {
        // Submission-start/end only describe client validation, not a finished
        // download. Reload only on completion or the navigation fallback below.
        if (/^(submission-completed|thankyou)(:|$)/.test(signal)) {
          scheduleReload();
        }
      };

      if (typeof data === "string") {
        const message = data.toLowerCase();
        if (message.includes(formId.toLowerCase()) || message.includes("setheight")) {
          showForm();
        }

        // Height reports name their form (setHeight:<px>:<formId>); other
        // embeds on the page broadcast to the same window, so only obey ours.
        const reported = new RegExp(`setheight:(\\d+):${formId.toLowerCase()}`).exec(message);
        // A form or validation page that still reports its layout is not blank.
        if (reported && Number(reported[1]) > 0 && resetTimerRef.current !== null) {
          window.clearTimeout(resetTimerRef.current);
          resetTimerRef.current = null;
        }
        if (autoHeight && reported) {
          setReportedHeight(`${reported[1]}px`);
        }

        handleSubmission(message);
        return;
      }

      if (typeof data === "object" && data) {
        const payload = data as {
          type?: string;
          event?: string;
          action?: string;
          message?: string;
        };
        const signal = String(
          payload.event || payload.type || payload.action || payload.message || ""
        ).toLowerCase();

        if (signal.includes(formId.toLowerCase()) || signal.includes("setheight")) {
          showForm();
        }

        handleSubmission(signal);
      }
    };

    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        resetForm();
      }
    };

    window.addEventListener("message", handleMessage);
    window.addEventListener("pageshow", handlePageShow);

    return () => {
      window.removeEventListener("message", handleMessage);
      window.removeEventListener("pageshow", handlePageShow);
      if (resetTimerRef.current !== null) {
        window.clearTimeout(resetTimerRef.current);
        resetTimerRef.current = null;
      }
    };
  }, [autoHeight, formId, resetForm, scheduleReload, showForm]);

  const handleLoad = () => {
    // A download redirect can load an empty document without posting a
    // completion event. Wait for layout messages before deciding to reload;
    // this lets form/validation pages remain visible and the download start.
    if (autoReloadAfterSubmit && hasLoadedRef.current) {
      scheduleReload();
    }
    hasLoadedRef.current = true;
    showForm();
  };

  // A reported height is exact, so it wins over the responsive fallback class.
  const useClassHeight = Boolean(heightClassName) && !reportedHeight;

  return (
    <div
      className={`relative overflow-hidden ${useClassHeight ? heightClassName : ""} ${className}`}
      style={useClassHeight ? undefined : { height: reportedHeight ?? height }}
    >
      {/* Loading skeleton */}
      <div
        className={`absolute inset-0 z-10 bg-background flex flex-col items-center justify-center gap-4 transition-opacity duration-300 ${
          isLoaded ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <div className="w-full max-w-[320px] px-4 space-y-4 animate-pulse">
          {/* Fake header dots */}
          <div className="flex gap-2 justify-center mb-2">
            <div className="w-2.5 h-2.5 rounded-full bg-muted" />
            <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30" />
            <div className="w-2.5 h-2.5 rounded-full bg-muted" />
          </div>
          {/* Fake label + input */}
          <div>
            <div className="h-3 w-20 bg-muted rounded mb-2" />
            <div className="h-10 w-full bg-muted/60 rounded-md border border-border" />
          </div>
          <div>
            <div className="h-3 w-28 bg-muted rounded mb-2" />
            <div className="h-10 w-full bg-muted/60 rounded-md border border-border" />
          </div>
          <div>
            <div className="h-3 w-16 bg-muted rounded mb-2" />
            <div className="h-10 w-full bg-muted/60 rounded-md border border-border" />
          </div>
          {/* Fake button */}
          <div className="h-11 w-full bg-muted rounded-full mt-2" />
        </div>
        <p className="text-xs text-muted-foreground mt-2">Loading form…</p>
      </div>

      {/* Actual JotForm iframe */}
      <iframe
        ref={iframeRef}
        id={iframeId}
        title={title}
        allowTransparency={true}
        allow="geolocation; microphone; camera; fullscreen; payment"
        src={embedSrc}
        frameBorder="0"
        style={{
          minWidth: "100%",
          maxWidth: "100%",
          height: useClassHeight ? "100%" : (reportedHeight ?? height),
          border: "none",
        }}
        scrolling="no"
        onLoad={handleLoad}
        loading="eager"
        // !h-full outranks the inline height JotForm's embed handler writes
        // onto the iframe, so the wrapper stays the single source of truth.
        className="w-full !h-full"
      />
    </div>
  );
};

export default JotFormEmbed;
