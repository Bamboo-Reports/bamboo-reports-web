import { useState, useCallback, useEffect, useId, useRef } from "react";
import { ensureJotformEmbedHandler } from "@/lib/jotform";

type JotformWindow = Window & {
  jotformEmbedHandler?: (selector: string, source: string) => void;
};

interface JotFormEmbedProps {
  formId: string;
  title: string;
  height?: string;
  className?: string;
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
  className = "",
}: JotFormEmbedProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const fallbackTimerRef = useRef<number | null>(null);
  const resetTimerRef = useRef<number | null>(null);
  const reactId = useId();
  const iframeId = `JotFormIFrame-${formId}-${reactId.replace(/:/g, "")}`;
  const embedSrc = `https://form.jotform.com/${formId}?isIframeEmbed=1`;

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
    setIsLoaded(false);
    iframe.src = `${embedSrc}&_ts=${Date.now()}`;
    fallbackTimerRef.current = window.setTimeout(showForm, 4000);
  }, [clearFallbackTimer, embedSrc, showForm]);

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

      if (!origin.includes("jotform")) return;

      if (typeof data === "string") {
        const message = data.toLowerCase();
        if (message.includes(formId.toLowerCase()) || message.includes("setheight")) {
          showForm();
        }

        if (
          message.includes("submission-completed") ||
          message.includes("thankyou") ||
          message.includes("form-submit")
        ) {
          resetTimerRef.current = window.setTimeout(resetForm, 1200);
        }
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

        if (
          signal.includes("submission-completed") ||
          signal.includes("thankyou") ||
          signal.includes("form-submit")
        ) {
          resetTimerRef.current = window.setTimeout(resetForm, 1200);
        }
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
  }, [embedSrc, formId, resetForm, showForm]);

  const handleLoad = () => {
    // Small delay so the form has a moment to render its content
    window.setTimeout(showForm, 150);
  };

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ height }}>
      {/* Loading skeleton */}
      <div
        className={`absolute inset-0 z-10 bg-white flex flex-col items-center justify-center gap-4 transition-opacity duration-300 ${
          isLoaded ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <div className="w-full max-w-[320px] px-4 space-y-4 animate-pulse">
          {/* Fake header dots */}
          <div className="flex gap-2 justify-center mb-2">
            <div className="w-2.5 h-2.5 rounded-full bg-gray-200" />
            <div className="w-2.5 h-2.5 rounded-full bg-gray-300" />
            <div className="w-2.5 h-2.5 rounded-full bg-gray-200" />
          </div>
          {/* Fake label + input */}
          <div>
            <div className="h-3 w-20 bg-gray-200 rounded mb-2" />
            <div className="h-10 w-full bg-gray-100 rounded-lg border border-gray-200" />
          </div>
          <div>
            <div className="h-3 w-28 bg-gray-200 rounded mb-2" />
            <div className="h-10 w-full bg-gray-100 rounded-lg border border-gray-200" />
          </div>
          <div>
            <div className="h-3 w-16 bg-gray-200 rounded mb-2" />
            <div className="h-10 w-full bg-gray-100 rounded-lg border border-gray-200" />
          </div>
          {/* Fake button */}
          <div className="h-11 w-full bg-gray-200 rounded-lg mt-2" />
        </div>
        <p className="text-xs text-gray-400 mt-2">Loading form…</p>
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
          height,
          border: "none",
        }}
        scrolling="no"
        onLoad={handleLoad}
        loading="eager"
        className="w-full h-full"
      />
    </div>
  );
};

export default JotFormEmbed;
