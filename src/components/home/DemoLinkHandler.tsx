"use client";

import { useEffect, useRef } from "react";
import { openCalScheduler } from "@/lib/calScheduler";

/** Opens the Cal scheduler when the page is visited with ?demo=true. */
const DemoLinkHandler = () => {
  const demoPopupOpened = useRef(false);

  useEffect(() => {
    // Read the URL directly: useSearchParams() would opt the page out of
    // static prerendering.
    const url = new URL(window.location.href);
    if (url.searchParams.get("demo") !== "true" || demoPopupOpened.current) {
      return;
    }
    demoPopupOpened.current = true;
    openCalScheduler();

    // Drop only the demo flag so UTM params stay intact for analytics and
    // a refresh/back doesn't reopen the popup.
    url.searchParams.delete("demo");
    window.history.replaceState(window.history.state, "", url);
  }, []);

  return null;
};

export default DemoLinkHandler;
