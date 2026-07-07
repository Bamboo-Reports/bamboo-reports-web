export interface StaticTrackerAccount {
  /** null for private accounts — they contribute to counts but are never named. */
  name: string | null;
  industry: string | null;
  cities: Array<{
    name: string;
    centerCount: number;
  }>;
  centerCount: number;
  prospectCount: number;
  visibility: "public" | "private";
}

import { TRACKER_ACCOUNT_CHUNKS } from "./trackerAccountChunks";

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
