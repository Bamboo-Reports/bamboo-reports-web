const ENDPOINT = '/.netlify/functions/report-signed-url';

export async function requestSignedReportUrl(
  reportSlug: string,
  accessToken: string,
): Promise<string> {
  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ reportSlug }),
  });

  if (!response.ok) {
    let message = `Request failed with ${response.status}`;
    try {
      const data = await response.json();
      if (data?.error) message = data.error;
    } catch {
      // ignore
    }
    throw new Error(message);
  }

  const data = (await response.json()) as { url?: string };
  if (!data.url) throw new Error('No signed URL returned');
  return data.url;
}
