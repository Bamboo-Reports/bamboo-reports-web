import { TRACKER_V2_ACCOUNT_CHUNKS } from "./trackerAccountChunksV2";

// Legal-suffix tokens dropped when hashing names for private-company search.
// Must stay in sync with LEGAL_SUFFIXES in scripts/tracker/generate-tracker-v2.py.
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

/** One tracker directory row from the v2 dataset (Aug 2026 overhaul):
 * open numbers page, no sign-in, no prospect data. */
export interface TrackerV2Account {
  /** null for private accounts — they contribute to counts but are never named. */
  name: string | null;
  /** Private accounts only: truncated hash of the simplified name (same
   * scheme as v1), so exact-name search can say "tracked" without the
   * private list ever being in the payload. */
  h?: string;
  /** Present only when the company's detail page is published; the table
   * links to /gcc/companies/<slug>/. */
  slug?: string;
  industry: string | null;
  /** Grouped cities (Mumbai MMR, NCR). A city entry exists when the account
   * has anything countable there: active centres (c), upcoming centres (u),
   * or headcount (e). */
  cities: Array<{
    name: string;
    /** Active centres in this city. */
    c: number;
    /** Upcoming centres in this city; absent when zero. */
    u?: number;
    /** Headcount attributed to this city; absent when zero. */
    e?: number;
  }>;
  /** Active centres (status "Active Center"; non-operational excluded). */
  c: number;
  /** Upcoming centres; absent when zero. Blank-city upcoming centres count
   * here but appear under no city. */
  u?: number;
  /** Headcount: center_employees summed over the account's centres, any
   * status, skipping Manufacturing / Sales & Marketing / BPO / Distribution
   * centres (the verified counting rule). */
  e: number;
  visibility: "public" | "private";
}

export async function fetchTrackerV2Accounts(
  signal?: AbortSignal
): Promise<TrackerV2Account[]> {
  const chunks = await Promise.all(
    TRACKER_V2_ACCOUNT_CHUNKS.map(async (url) => {
      const response = await fetch(url, { signal });
      if (!response.ok) {
        throw new Error(`Tracker dataset request failed (${response.status})`);
      }
      return (await response.json()) as TrackerV2Account[];
    })
  );
  return chunks.flat();
}
