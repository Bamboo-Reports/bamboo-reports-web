export interface TrackerCounts {
  accounts: number;
  centers: number;
  prospects: number;
}

export interface FacetOption {
  value: string;
  count: number;
}

export interface TrackerResponse {
  counts: TrackerCounts;
  facets: {
    account_primary_category: FacetOption[];
    center_city: FacetOption[];
    account_global_legal_name: FacetOption[];
  };
}

export interface TrackerFilters {
  account_primary_category: string[];
  center_city: string[];
  account_global_legal_name: string[];
}

export const EMPTY_FILTERS: TrackerFilters = {
  account_primary_category: [],
  center_city: [],
  account_global_legal_name: [],
};

export async function fetchTracker(
  filters: TrackerFilters,
  accountSearch: string,
  signal?: AbortSignal
): Promise<TrackerResponse> {
  const res = await fetch("/api/tracker", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...filters, account_search: accountSearch }),
    signal,
  });

  if (!res.ok) {
    throw new Error(`Tracker request failed (${res.status})`);
  }

  return (await res.json()) as TrackerResponse;
}
