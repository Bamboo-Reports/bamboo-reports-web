export interface StaticTrackerAccount {
  name: string;
  industry: string | null;
  cities: Array<{
    name: string;
    centerCount: number;
  }>;
  centerCount: number;
  prospectCount: number;
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
