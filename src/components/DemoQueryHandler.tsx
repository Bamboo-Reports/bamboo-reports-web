"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { openCalScheduler } from "@/lib/calScheduler";

/** Opens the Cal scheduler for ?demo=true links, then drops the flag. */
const DemoQueryHandler = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const demoPopupOpened = useRef(false);

  useEffect(() => {
    if (searchParams.get("demo") !== "true" || demoPopupOpened.current) {
      return;
    }
    demoPopupOpened.current = true;
    openCalScheduler();

    // Drop only the demo flag so UTM params stay intact for analytics and
    // a refresh/back doesn't reopen the popup.
    const nextParams = new URLSearchParams(searchParams.toString());
    nextParams.delete("demo");
    const query = nextParams.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }, [searchParams, router, pathname]);

  return null;
};

export default DemoQueryHandler;
