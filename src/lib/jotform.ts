const JOTFORM_SCRIPT_SRC =
  "https://cdn.jotfor.ms/s/umd/latest/for-form-embed-handler.js";

export type JotformWindow = Window & {
  jotformEmbedHandler?: (selector: string, source: string) => void;
};

let jotformScriptPromise: Promise<void> | null = null;

// Prefill fields forwarded from the page URL into the embedded Jotform,
// beyond the utm_* params, so campaign links (e.g. Zoho mail merge) can
// prefill the visitor's name/company/email in the form.
const FORWARDED_PREFILL_PARAMS = ["firstName", "lastName", "companyName", "email"];

export const getJotformEmbedSrc = (formId: string, search: string) => {
  // jsForm keeps Jotform’s handler from cloning the React-owned iframe.
  const params = new URLSearchParams({ isIframeEmbed: "1", jsForm: "true" });

  // Embedded forms have their own URL and do not inherit the page's UTMs
  // or prefill params.
  new URLSearchParams(search).forEach((value, key) => {
    if (key.startsWith("utm_") || FORWARDED_PREFILL_PARAMS.includes(key)) {
      params.set(key, value);
    }
  });

  return `https://form.jotform.com/${formId}?${params.toString()}`;
};

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

  if ((window as JotformWindow).jotformEmbedHandler) {
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

    if ((window as JotformWindow).jotformEmbedHandler) {
      handleReady();
      return;
    }

    script.addEventListener("load", handleReady, { once: true });
    script.addEventListener("error", handleReady, { once: true });
  });

  return jotformScriptPromise;
};
