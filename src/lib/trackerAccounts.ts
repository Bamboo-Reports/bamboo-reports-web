export interface StaticTrackerAccount {
  /** null for private accounts — they contribute to counts but are never named. */
  name: string | null;
  /** Private accounts only: truncated hash of the simplified name, so search
   * can say "tracked, sign up to unlock" without shipping the private list. */
  h?: string;
  /** Present only when the company's detail page is published; the table
   * links to /gcc/companies/<slug>/. */
  slug?: string;
  industry: string | null;
  cities: Array<{
    name: string;
    centerCount: number;
  }>;
  /** Every center row of the account counts: GCC-ness is decided at the
   * account level (account_type in the export), not per center. */
  centerCount: number;
  /** Strict count (active, GCC-type centers only), matching the company's
   * public page; present only when it differs from centerCount. Shown when
   * the company is explicitly selected. */
  gccCenterCount?: number;
  prospectCount: number;
  visibility: "public" | "private";
}

import { TRACKER_ACCOUNT_CHUNKS } from "./trackerAccountChunks";

// Legal-suffix tokens dropped when hashing names for gated-company search.
// Must stay in sync with LEGAL_SUFFIXES in scripts/tracker/generate-static-accounts.py.
const LEGAL_SUFFIXES = new Set([
  "inc", "incorporated", "corp", "corporation", "co", "company", "ltd",
  "limited", "llc", "llp", "lp", "plc", "gmbh", "ag", "sa", "nv", "bv", "pvt",
]);

export function simplifyCompanyName(name: string): string {
  const words = name
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  while (words.length > 1 && LEGAL_SUFFIXES.has(words[words.length - 1])) {
    words.pop();
  }
  return words.join(" ");
}

/** Truncated SHA-256 of the simplified name; matches the generator's `h` field. */
export async function hashCompanyName(name: string): Promise<string | null> {
  if (!globalThis.crypto?.subtle) return null;
  const bytes = new TextEncoder().encode(simplifyCompanyName(name));
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
    .slice(0, 16);
}

export async function fetchStaticTrackerAccounts(
  signal?: AbortSignal
): Promise<StaticTrackerAccount[]> {
  const chunks = await Promise.all(
    TRACKER_ACCOUNT_CHUNKS.map(async (url) => {
      const response = await fetch(url, { signal });
      if (!response.ok) {
        throw new Error(`Static account list request failed (${response.status})`);
      }
      return (await response.json()) as StaticTrackerAccount[];
    })
  );

  return chunks.flat();
}
