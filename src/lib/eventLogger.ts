import { supabase } from '@/lib/supabase';

export type EventType =
  | 'signup'
  | 'signin'
  | 'report_view'
  | 'report_download'
  | 'report_request';

interface LogEventInput {
  type: EventType;
  email?: string | null;
  reportSlug?: string | null;
  metadata?: Record<string, unknown>;
}

let cachedIp: string | null = null;
let cachedIpAt = 0;
const IP_CACHE_MS = 10 * 60 * 1000;

const fetchIp = async (): Promise<string | null> => {
  const now = Date.now();
  if (cachedIp && now - cachedIpAt < IP_CACHE_MS) return cachedIp;
  try {
    const res = await fetch('https://api.ipify.org?format=json');
    if (!res.ok) return null;
    const data = (await res.json()) as { ip?: string };
    if (data?.ip) {
      cachedIp = data.ip;
      cachedIpAt = now;
      return data.ip;
    }
  } catch {
    // ignore — IP is best effort
  }
  return null;
};

export const logEvent = async ({ type, email, reportSlug, metadata }: LogEventInput) => {
  try {
    const { data: sessionData } = await supabase.auth.getSession();
    const user = sessionData.session?.user ?? null;

    const ip = await fetchIp();
    const user_agent = typeof navigator !== 'undefined' ? navigator.userAgent : null;
    const referrer = typeof document !== 'undefined' ? document.referrer || null : null;

    await supabase.from('event_logs').insert({
      user_id: user?.id ?? null,
      email: email ?? user?.email ?? null,
      event_type: type,
      report_slug: reportSlug ?? null,
      metadata: metadata ?? {},
      user_agent,
      ip,
      referrer,
    });
  } catch (error) {
    console.warn('logEvent failed', error);
  }
};
