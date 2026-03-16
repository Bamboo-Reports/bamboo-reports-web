import { useState, useEffect, useRef } from "react";
import { ensureJotformEmbedHandler } from "@/lib/jotform";

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

  useEffect(() => {
    ensureJotformEmbedHandler().then(() => {
      if ((window as any).jotformEmbedHandler) {
        (window as any).jotformEmbedHandler(
          `iframe[id='JotFormIFrame-${formId}']`,
          "https://form.jotform.com/"
        );
      }
    });
  }, [formId]);

  const handleLoad = () => {
    // Small delay so the form has a moment to render its content
    setTimeout(() => setIsLoaded(true), 150);
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
        id={`JotFormIFrame-${formId}`}
        title={title}
        allowTransparency={true}
        allow="geolocation; microphone; camera; fullscreen; payment"
        src={`https://form.jotform.com/${formId}`}
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
