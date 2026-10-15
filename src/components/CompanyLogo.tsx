"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

// Brandfetch Logo API client ID. Public by design: it ships in every image URL.
// Their terms require hotlinking from the CDN, so logos are never self-hosted.
const BRANDFETCH_CLIENT_ID = "1idyPhRmG3_qYk4mluB";

const domainOf = (website: string | null) => {
  if (!website) return null;
  try {
    return new URL(website).hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
};

const sizes = {
  md: "size-10 rounded-md text-base",
  lg: "size-14 rounded-lg text-xl",
} as const;

/**
 * A company's square icon from Brandfetch, falling back to its initial when
 * Brandfetch has no logo (it answers 404) or the image fails to load.
 */
const CompanyLogo = ({
  name,
  website,
  size = "md",
  className,
}: {
  name: string;
  website: string | null;
  size?: keyof typeof sizes;
  className?: string;
}) => {
  const domain = domainOf(website);
  const [failed, setFailed] = useState(!domain);
  const img = useRef<HTMLImageElement>(null);

  // An image that failed before hydration never fires onError for React.
  useEffect(() => {
    if (img.current?.complete && img.current.naturalWidth === 0) setFailed(true);
  }, []);

  if (failed || !domain) {
    return (
      <span
        aria-hidden
        className={cn("flex shrink-0 items-center justify-center bg-primary-soft font-bold text-primary", sizes[size], className)}
      >
        {name.charAt(0)}
      </span>
    );
  }

  return (
    <img
      ref={img}
      src={`https://cdn.brandfetch.io/${domain}/w/128/h/128/theme/light/fallback/404/type/icon?c=${BRANDFETCH_CLIENT_ID}`}
      alt=""
      width={size === "lg" ? 56 : 40}
      height={size === "lg" ? 56 : 40}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className={cn("shrink-0 border border-line bg-white object-contain", sizes[size], className)}
    />
  );
};

export default CompanyLogo;
