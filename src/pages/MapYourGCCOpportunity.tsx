import { useEffect } from "react";
import Header from "@/components/Header";
import { useSEO } from "@/hooks/useSEO";
import { ensureJotformEmbedHandler } from "@/lib/jotform";

const FORM_ID = "261820348991464";
const IFRAME_ID = `JotFormIFrame-${FORM_ID}`;
const MINIMUM_FORM_HEIGHT = 1800;

type JotformWindow = Window & {
  jotformEmbedHandler?: (selector: string, source: string) => void;
};

const MapYourGCCOpportunity = () => {
  useSEO({
    title: "Map Your India GCC Opportunity | Bamboo Reports",
    description:
      "Map your India GCC opportunity with Bamboo Reports.",
    keywords:
      "India GCC opportunity, GCC market opportunity, Bamboo Reports",
  });

  useEffect(() => {
    let isMounted = true;

    const preserveMinimumHeight = (event: MessageEvent) => {
      if (
        event.origin !== "https://form.jotform.com" ||
        typeof event.data !== "string" ||
        !event.data.startsWith("setHeight:")
      ) {
        return;
      }

      const iframe = document.getElementById(IFRAME_ID) as HTMLIFrameElement | null;
      const reportedHeight = Number.parseInt(event.data.split(":")[1], 10);

      if (iframe && Number.isFinite(reportedHeight)) {
        iframe.style.height = `${Math.max(reportedHeight, MINIMUM_FORM_HEIGHT)}px`;
      }
    };

    ensureJotformEmbedHandler().then(() => {
      if (!isMounted) return;

      const jotformWindow = window as JotformWindow;
      jotformWindow.jotformEmbedHandler?.(
        `iframe[id='${IFRAME_ID}']`,
        "https://form.jotform.com/"
      );
      window.addEventListener("message", preserveMinimumHeight);
    });

    return () => {
      isMounted = false;
      window.removeEventListener("message", preserveMinimumHeight);
    };
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex-grow px-4 py-10 md:py-14">
        <div className="mx-auto w-full max-w-4xl">
          <iframe
            id={IFRAME_ID}
            title="Map your India GCC opportunity"
            onLoad={() => window.scrollTo(0, 0)}
            allowTransparency
            allow="geolocation; microphone; camera; fullscreen; payment"
            src={`https://form.jotform.com/${FORM_ID}`}
            frameBorder="0"
            style={{
              minWidth: "100%",
              maxWidth: "100%",
              height: `${MINIMUM_FORM_HEIGHT}px`,
              border: "none",
            }}
            scrolling="auto"
          />
        </div>
      </main>
    </div>
  );
};

export default MapYourGCCOpportunity;
