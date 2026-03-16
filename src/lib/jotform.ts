const JOTFORM_SCRIPT_SRC =
  "https://cdn.jotfor.ms/s/umd/latest/for-form-embed-handler.js";

let jotformScriptPromise: Promise<void> | null = null;

const ensureLink = (rel: string, href: string, crossOrigin = false) => {
  const selector = `link[rel='${rel}'][href='${href}']`;
  if (document.head.querySelector(selector)) {
    return;
  }

  const link = document.createElement("link");
  link.rel = rel;
  link.href = href;
  if (crossOrigin) {
    link.crossOrigin = "anonymous";
  }
  document.head.appendChild(link);
};

export const warmupJotform = () => {
  ensureLink("preconnect", "https://cdn.jotfor.ms", true);
  ensureLink("preconnect", "https://form.jotform.com", true);
  ensureLink("dns-prefetch", "//cdn.jotfor.ms");
  ensureLink("dns-prefetch", "//form.jotform.com");
};

export const ensureJotformEmbedHandler = () => {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return Promise.resolve();
  }

  warmupJotform();

  if ((window as any).jotformEmbedHandler) {
    return Promise.resolve();
  }

  if (jotformScriptPromise) {
    return jotformScriptPromise;
  }

  jotformScriptPromise = new Promise<void>((resolve) => {
    let script = document.querySelector<HTMLScriptElement>(
      "script[data-jotform-embed='true']"
    );

    if (!script) {
      script = document.createElement("script");
      script.src = JOTFORM_SCRIPT_SRC;
      script.async = true;
      script.setAttribute("data-jotform-embed", "true");
      document.body.appendChild(script);
    }

    const handleReady = () => resolve();

    if ((window as any).jotformEmbedHandler) {
      handleReady();
      return;
    }

    script.addEventListener("load", handleReady, { once: true });
    script.addEventListener("error", handleReady, { once: true });
  });

  return jotformScriptPromise;
};
