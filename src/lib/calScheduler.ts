const CAL_NAMESPACE = "meeting-with-santosh";
const CAL_LINK =
  "santosh-abraham-researchnxt-bambooreports/meeting-with-santosh";
const CAL_ORIGIN = "https://app.cal.com";
const CAL_SCRIPT_SRC = `${CAL_ORIGIN}/embed/embed.js`;

type CalApi = ((...args: unknown[]) => void) & {
  loaded?: boolean;
  ns: Record<string, CalApi>;
  q: unknown[][];
  config?: { forwardQueryParams?: boolean };
};

declare global {
  interface Window {
    Cal?: CalApi;
  }
}

const queueCall = (api: CalApi, args: unknown[]) => {
  api.q.push(args);
};

const getCalApi = () => {
  if (window.Cal) return window.Cal;

  const cal = ((...args: unknown[]) => {
    if (!cal.loaded) {
      const script = document.createElement("script");
      script.src = CAL_SCRIPT_SRC;
      script.async = true;
      document.head.appendChild(script);
      cal.loaded = true;
    }

    if (args[0] === "init") {
      const namespace = args[1];
      const namespaceApi = ((...namespaceArgs: unknown[]) => {
        queueCall(namespaceApi, namespaceArgs);
      }) as CalApi;
      namespaceApi.q = [];
      namespaceApi.ns = {};

      if (typeof namespace === "string") {
        cal.ns[namespace] = cal.ns[namespace] || namespaceApi;
        queueCall(cal.ns[namespace], args);
        queueCall(cal, ["initNamespace", namespace]);
      } else {
        queueCall(cal, args);
      }
      return;
    }

    queueCall(cal, args);
  }) as CalApi;

  cal.ns = {};
  cal.q = [];
  window.Cal = cal;
  return cal;
};

let initialized = false;

const getCalNamespace = () => {
  const cal = getCalApi();

  if (!initialized) {
    cal("init", CAL_NAMESPACE, { origin: CAL_ORIGIN });
    cal.config = cal.config || {};
    cal.config.forwardQueryParams = true;
    cal.ns[CAL_NAMESPACE]("ui", {
      hideEventTypeDetails: false,
      layout: "month_view",
    });
    initialized = true;
  }

  return cal.ns[CAL_NAMESPACE];
};

export const openCalScheduler = () => {
  const cal = getCalNamespace();
  cal("modal", {
    calLink: CAL_LINK,
    config: { layout: "month_view", useSlotsViewOnSmallScreen: "true" },
  });
};
