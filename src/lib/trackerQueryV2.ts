import type { FacetOption } from "@/lib/tracker";

/** When on, the tracker asks the server for one filter combination at a time
 * and never receives the full dataset. Off keeps the static /data/t2 chunks.
 * Toggle with VITE_TRACKER_SERVER_QUERY=true. */
export const TRACKER_SERVER_QUERY_ENABLED =
  import.meta.env.VITE_TRACKER_SERVER_QUERY === "true";

const ENDPOINT = "/api/tracker/query";

/** Type-ahead needs this many characters before any name comes back. Keep in
 * sync with MIN_SUGGEST_LENGTH in netlify/functions/tracker-query.js — it is
 * the enumeration bound, so the server is the one that enforces it. Applied
 * client-side too, so both data paths behave the same. */
export const TRACKER_MIN_SUGGEST_LENGTH = 4;

/** A directory row as the server permits it — only what the table renders. */
export interface TrackerQueryRow {
  name: string;
  slug?: string;
  industry: string | null;
  cities: { name: string }[];
}

export interface TrackerQueryCounts {
  companies: number;
  centers: number;
  upcoming: number;
  employees: number;
}

export interface TrackerQueryResult {
  counts: TrackerQueryCounts;
  rows: TrackerQueryRow[];
  remainingCount: number;
  facets: { industries: FacetOption[]; cities: FacetOption[] };
  suggestions: FacetOption[];
  privateMatch: boolean;
  nonGccNote: string | null;
}

export interface TrackerQueryParams {
  company: string | null;
  industries: string[];
  cities: string[];
  search: string;
  /** Truncated name hash, so a private account can answer "tracked" by
   * comparison without the server returning its name. */
  searchHash: string | null;
}

export async function fetchTrackerV2Query(
  params: TrackerQueryParams,
  signal?: AbortSignal
): Promise<TrackerQueryResult> {
  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
    signal,
  });
  if (!response.ok) {
    throw new Error(`Tracker query failed (${response.status})`);
  }
  return (await response.json()) as TrackerQueryResult;
}
