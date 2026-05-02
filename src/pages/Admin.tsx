import { useEffect, useMemo, useState } from 'react';
import { format } from 'date-fns';
import {
  Activity,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Download,
  Eye,
  Loader2,
  LogIn,
  LogOut,
  RefreshCw,
  Search,
  UserPlus,
  Users,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import NotFound from '@/pages/NotFound';

interface UserProfile {
  id: string;
  email: string | null;
  first_name: string | null;
  last_name: string | null;
  full_name: string | null;
  phone: string | null;
  company_name: string | null;
  created_at: string;
}

interface EventLog {
  id: string;
  user_id: string | null;
  email: string | null;
  event_type: string;
  report_slug: string | null;
  metadata: Record<string, unknown>;
  user_agent: string | null;
  ip: string | null;
  referrer: string | null;
  created_at: string;
}

const eventBadgeStyles: Record<string, string> = {
  signup: 'border-primary/20 bg-primary/10 text-primary',
  signin: 'border-secondary bg-secondary text-secondary-foreground',
  report_view: 'border-accent/20 bg-accent/15 text-accent',
  report_download: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  report_request: 'border-border bg-muted text-foreground/70',
};

const Admin = () => {
  const { user, loading: authLoading, role, roleLoading, signOut } = useAuth();
  const authed = !!user && role === 'admin';

  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const [events, setEvents] = useState<EventLog[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [eventFilter, setEventFilter] = useState<string>('all');
  const [userQuery, setUserQuery] = useState('');
  const [eventPage, setEventPage] = useState(1);
  const [eventPageSize, setEventPageSize] = useState(25);
  const [userPage, setUserPage] = useState(1);
  const [userPageSize, setUserPageSize] = useState(25);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  const handleSignOut = async () => {
    await signOut();
  };

  const loadData = async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const [profilesRes, eventsRes] = await Promise.all([
        supabase
          .from('user_profiles')
          .select('*')
          .order('created_at', { ascending: false }),
        supabase
          .from('event_logs')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(500),
      ]);

      if (profilesRes.error) throw profilesRes.error;
      if (eventsRes.error) throw eventsRes.error;

      setProfiles((profilesRes.data ?? []) as UserProfile[]);
      setEvents((eventsRes.data ?? []) as EventLog[]);
    } catch (err) {
      console.warn('Admin load failed:', err);
      const message =
        err && typeof err === 'object'
          ? ((err as { message?: string }).message ?? JSON.stringify(err))
          : String(err);
      setLoadError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authed) void loadData();
  }, [authed]);

  const eventCountsByUser = useMemo(() => {
    const map = new Map<string, { view: number; download: number; signin: number }>();
    events.forEach((e) => {
      const key = e.user_id ?? e.email ?? 'unknown';
      const entry = map.get(key) ?? { view: 0, download: 0, signin: 0 };
      if (e.event_type === 'report_view') entry.view += 1;
      if (e.event_type === 'report_download') entry.download += 1;
      if (e.event_type === 'signin') entry.signin += 1;
      map.set(key, entry);
    });
    return map;
  }, [events]);

  const reportAggregates = useMemo(() => {
    const map = new Map<
      string,
      { views: number; downloads: number; uniqueUsers: Set<string> }
    >();
    events.forEach((e) => {
      if (e.event_type !== 'report_view' && e.event_type !== 'report_download') return;
      const slug = e.report_slug ?? 'unknown';
      const entry = map.get(slug) ?? {
        views: 0,
        downloads: 0,
        uniqueUsers: new Set<string>(),
      };
      if (e.event_type === 'report_view') entry.views += 1;
      if (e.event_type === 'report_download') entry.downloads += 1;
      entry.uniqueUsers.add(e.user_id ?? e.email ?? 'anon');
      map.set(slug, entry);
    });
    return Array.from(map.entries())
      .map(([slug, v]) => ({
        slug,
        views: v.views,
        downloads: v.downloads,
        uniqueUsers: v.uniqueUsers.size,
      }))
      .sort((a, b) => b.views + b.downloads - (a.views + a.downloads));
  }, [events]);

  const totals = useMemo(() => {
    const counts: Record<string, number> = {};
    events.forEach((e) => {
      counts[e.event_type] = (counts[e.event_type] ?? 0) + 1;
    });
    return counts;
  }, [events]);

  const dashboardSignals = useMemo(() => {
    const activeUsers = new Set(
      events
        .map((e) => e.user_id ?? e.email)
        .filter((value): value is string => Boolean(value)),
    ).size;
    const reportViews = totals.report_view ?? 0;
    const reportDownloads = totals.report_download ?? 0;
    const downloadRate =
      reportViews > 0 ? Math.round((reportDownloads / reportViews) * 100) : 0;
    const latestEvent = events[0]?.created_at
      ? format(new Date(events[0].created_at), 'PP p')
      : 'No activity';
    const topReport = reportAggregates[0]?.slug ?? 'No report activity';

    return {
      activeUsers,
      downloadRate,
      latestEvent,
      topReport,
    };
  }, [events, reportAggregates, totals]);

  const eventTypes = useMemo(() => {
    const set = new Set<string>();
    events.forEach((e) => set.add(e.event_type));
    return Array.from(set).sort();
  }, [events]);

  const filteredEvents = useMemo(() => {
    if (eventFilter === 'all') return events;
    return events.filter((e) => e.event_type === eventFilter);
  }, [events, eventFilter]);

  useEffect(() => {
    setEventPage(1);
  }, [eventFilter, eventPageSize, events]);

  const eventTotalPages = Math.max(1, Math.ceil(filteredEvents.length / eventPageSize));
  const eventPageSafe = Math.min(eventPage, eventTotalPages);
  const eventStart = (eventPageSafe - 1) * eventPageSize;
  const eventEnd = Math.min(eventStart + eventPageSize, filteredEvents.length);
  const pagedEvents = filteredEvents.slice(eventStart, eventEnd);

  const filteredProfiles = useMemo(() => {
    const q = userQuery.trim().toLowerCase();
    if (!q) return profiles;
    return profiles.filter((p) =>
      [p.email, p.full_name, p.first_name, p.last_name, p.company_name, p.phone]
        .filter(Boolean)
        .some((v) => v!.toLowerCase().includes(q)),
    );
  }, [profiles, userQuery]);

  useEffect(() => {
    setUserPage(1);
  }, [userQuery, userPageSize, profiles]);

  const userTotalPages = Math.max(1, Math.ceil(filteredProfiles.length / userPageSize));
  const userPageSafe = Math.min(userPage, userTotalPages);
  const userStart = (userPageSafe - 1) * userPageSize;
  const userEnd = Math.min(userStart + userPageSize, filteredProfiles.length);
  const pagedProfiles = filteredProfiles.slice(userStart, userEnd);

  if (authLoading || (user && roleLoading)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-secondary/30">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!user || role !== 'admin') {
    return <NotFound />;
  }

  return (
    <div className="min-h-screen bg-secondary/30">
      <header className="sticky top-0 z-10 border-b bg-background/90 backdrop-blur">
        <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Activity className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <h1 className="text-base font-semibold tracking-tight sm:text-lg">
                Command Center
              </h1>
              <p className="text-xs text-muted-foreground">
                Signups, views, downloads, and user activity.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={loadData} disabled={loading}>
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
              <span className="hidden sm:inline">Refresh</span>
            </Button>
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Sign out</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="space-y-5 px-3 py-5 sm:px-4 lg:px-6">
        {loadError ? (
          <div className="rounded-lg border border-destructive/40 bg-destructive/5 px-4 py-3 text-sm text-destructive">
            {loadError}
          </div>
        ) : null}

        <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <SignalCard
            label="Active users"
            value={dashboardSignals.activeUsers.toLocaleString()}
            meta={`${profiles.length.toLocaleString()} total profiles`}
            icon={<Users className="h-4 w-4" />}
          />
          <SignalCard
            label="Top report"
            value={dashboardSignals.topReport}
            meta="By views and downloads"
            icon={<BarChart3 className="h-4 w-4" />}
          />
          <SignalCard
            label="Download rate"
            value={`${dashboardSignals.downloadRate}%`}
            meta="Downloads per view"
            icon={<Download className="h-4 w-4" />}
          />
          <SignalCard
            label="Last event"
            value={dashboardSignals.latestEvent}
            meta="Most recent activity"
            icon={<Clock3 className="h-4 w-4" />}
          />
        </section>

        <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
          <StatCard
            label="Total users"
            value={profiles.length}
            icon={<Users className="h-4 w-4" />}
            tone="primary"
          />
          <StatCard
            label="Signups"
            value={totals.signup ?? 0}
            icon={<UserPlus className="h-4 w-4" />}
            tone="primary"
          />
          <StatCard
            label="Sign-ins"
            value={totals.signin ?? 0}
            icon={<LogIn className="h-4 w-4" />}
            tone="muted"
          />
          <StatCard
            label="Report views"
            value={totals.report_view ?? 0}
            icon={<Eye className="h-4 w-4" />}
            tone="accent"
          />
          <StatCard
            label="Downloads"
            value={totals.report_download ?? 0}
            icon={<Download className="h-4 w-4" />}
            tone="emerald"
          />
        </section>

        <SectionCard
          title="Reports"
          subtitle="Engagement per report (sorted by total activity)."
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/60 text-left text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-medium">Report</th>
                  <th className="px-4 py-3 font-medium">Views</th>
                  <th className="px-4 py-3 font-medium">Downloads</th>
                  <th className="px-4 py-3 font-medium">Unique users</th>
                </tr>
              </thead>
              <tbody>
                {reportAggregates.length === 0 ? (
                  <EmptyRow colSpan={4} message="No report activity yet." />
                ) : (
                  reportAggregates.map((r) => (
                    <tr
                      key={r.slug}
                      className="border-t transition-colors hover:bg-muted/30"
                    >
                      <td className="px-4 py-3 font-medium">{r.slug}</td>
                      <td className="px-4 py-3 tabular-nums">{r.views}</td>
                      <td className="px-4 py-3 tabular-nums">{r.downloads}</td>
                      <td className="px-4 py-3 tabular-nums">{r.uniqueUsers}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </SectionCard>

        <SectionCard
          title={`Users (${profiles.length})`}
          subtitle="Profiles created via signup, with their lifetime activity."
          actions={
            <div className="relative w-full sm:w-80">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, company..."
                value={userQuery}
                onChange={(e) => setUserQuery(e.target.value)}
                className="h-9 w-full rounded-lg bg-background pl-9"
              />
            </div>
          }
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/60 text-left text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-medium">User</th>
                  <th className="px-4 py-3 font-medium">Company</th>
                  <th className="px-4 py-3 font-medium">Sign-ins</th>
                  <th className="px-4 py-3 font-medium">Views</th>
                  <th className="px-4 py-3 font-medium">Downloads</th>
                  <th className="px-4 py-3 font-medium">Joined</th>
                  <th className="px-4 py-3 font-medium" />
                </tr>
              </thead>
              <tbody>
                {filteredProfiles.length === 0 ? (
                  <EmptyRow
                    colSpan={7}
                    message={userQuery ? 'No matches.' : 'No users yet.'}
                  />
                ) : (
                  pagedProfiles.map((p) => {
                    const counts =
                      eventCountsByUser.get(p.id) ?? { view: 0, download: 0, signin: 0 };
                    const name =
                      p.full_name ||
                      `${p.first_name ?? ''} ${p.last_name ?? ''}`.trim() ||
                      '—';
                    return (
                      <tr
                        key={p.id}
                        className="border-t align-top transition-colors hover:bg-muted/30"
                      >
                        <td className="px-4 py-3">
                          <div className="font-medium text-foreground">{name}</div>
                          <div className="text-xs text-muted-foreground">
                            {p.email || '—'}
                          </div>
                        </td>
                        <td className="px-4 py-3">{p.company_name || '—'}</td>
                        <td className="px-4 py-3 tabular-nums">{counts.signin}</td>
                        <td className="px-4 py-3 tabular-nums">{counts.view}</td>
                        <td className="px-4 py-3 tabular-nums">{counts.download}</td>
                        <td className="px-4 py-3 text-xs text-muted-foreground">
                          {p.created_at
                            ? format(new Date(p.created_at), 'PP p')
                            : '—'}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8"
                            onClick={() => setSelectedUserId(p.id)}
                          >
                            View
                          </Button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
          {filteredProfiles.length > 0 ? (
            <Pagination
              page={userPageSafe}
              totalPages={userTotalPages}
              pageSize={userPageSize}
              totalItems={filteredProfiles.length}
              rangeStart={userStart}
              rangeEnd={userEnd}
              onPageChange={setUserPage}
              onPageSizeChange={setUserPageSize}
            />
          ) : null}
        </SectionCard>

        <SectionCard
          title={`Events (${filteredEvents.length})`}
          subtitle="Most recent first. Capped at the last 500 events."
          actions={
            <div className="flex flex-wrap gap-1">
              <FilterChip
                active={eventFilter === 'all'}
                onClick={() => setEventFilter('all')}
              >
                All
              </FilterChip>
              {eventTypes.map((type) => (
                <FilterChip
                  key={type}
                  active={eventFilter === type}
                  onClick={() => setEventFilter(type)}
                >
                  {type}
                </FilterChip>
              ))}
            </div>
          }
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/60 text-left text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-medium">When</th>
                  <th className="px-4 py-3 font-medium">Event</th>
                  <th className="px-4 py-3 font-medium">User</th>
                  <th className="px-4 py-3 font-medium">Report</th>
                  <th className="px-4 py-3 font-medium">IP</th>
                  <th className="px-4 py-3 font-medium" />
                </tr>
              </thead>
              <tbody>
                {filteredEvents.length === 0 ? (
                  <EmptyRow colSpan={6} message="No events match this filter." />
                ) : (
                  pagedEvents.map((e) => (
                    <tr
                      key={e.id}
                      className="border-t align-top transition-colors hover:bg-muted/30"
                    >
                      <td className="whitespace-nowrap px-4 py-3 text-xs text-muted-foreground">
                        {format(new Date(e.created_at), 'PP p')}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={cn(
                            'inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium',
                            eventBadgeStyles[e.event_type] ??
                              'border-border bg-muted text-foreground/70',
                          )}
                        >
                          {e.event_type}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs">{e.email || '—'}</td>
                      <td className="px-4 py-3 text-xs">{e.report_slug || '—'}</td>
                      <td className="px-4 py-3 text-xs tabular-nums">
                        {e.ip || '—'}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8"
                          onClick={() => setSelectedEventId(e.id)}
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          {filteredEvents.length > 0 ? (
            <Pagination
              page={eventPageSafe}
              totalPages={eventTotalPages}
              pageSize={eventPageSize}
              totalItems={filteredEvents.length}
              rangeStart={eventStart}
              rangeEnd={eventEnd}
              onPageChange={setEventPage}
              onPageSizeChange={setEventPageSize}
            />
          ) : null}
        </SectionCard>
      </main>

      <UserDetailSheet
        userId={selectedUserId}
        profiles={profiles}
        events={events}
        onClose={() => setSelectedUserId(null)}
      />
      <EventDetailSheet
        eventId={selectedEventId}
        events={events}
        onClose={() => setSelectedEventId(null)}
      />
    </div>
  );
};

const UserDetailSheet = ({
  userId,
  profiles,
  events,
  onClose,
}: {
  userId: string | null;
  profiles: UserProfile[];
  events: EventLog[];
  onClose: () => void;
}) => {
  const profile = userId ? profiles.find((p) => p.id === userId) ?? null : null;
  const userEvents = useMemo(
    () =>
      profile
        ? events.filter(
            (e) => e.user_id === profile.id || (profile.email && e.email === profile.email),
          )
        : [],
    [profile, events],
  );

  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    userEvents.forEach((e) => {
      c[e.event_type] = (c[e.event_type] ?? 0) + 1;
    });
    return c;
  }, [userEvents]);

  const lastSeen = userEvents[0]?.created_at;
  const lastIp = userEvents.find((e) => e.ip)?.ip;
  const lastUserAgent = userEvents.find((e) => e.user_agent)?.user_agent;

  return (
    <Sheet open={!!userId} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-full overflow-y-auto sm:max-w-xl">
        {profile ? (
          <>
            <SheetHeader>
              <SheetTitle>
                {profile.full_name ||
                  `${profile.first_name ?? ''} ${profile.last_name ?? ''}`.trim() ||
                  profile.email ||
                  'User'}
              </SheetTitle>
              <SheetDescription>
                {profile.email || '—'}
              </SheetDescription>
            </SheetHeader>

            <div className="mt-6 space-y-6">
              <DetailGrid
                items={[
                  { label: 'First name', value: profile.first_name },
                  { label: 'Last name', value: profile.last_name },
                  { label: 'Company', value: profile.company_name },
                  { label: 'Phone', value: profile.phone },
                  {
                    label: 'Joined',
                    value: profile.created_at
                      ? format(new Date(profile.created_at), 'PPpp')
                      : null,
                  },
                  {
                    label: 'Last seen',
                    value: lastSeen ? format(new Date(lastSeen), 'PPpp') : null,
                  },
                  { label: 'Last IP', value: lastIp },
                  { label: 'User ID', value: profile.id, mono: true },
                ]}
              />

              <div>
                <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Activity totals
                </h3>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {['signup', 'signin', 'report_view', 'report_download'].map((type) => (
                    <div key={type} className="rounded-lg border bg-muted/30 p-3">
                      <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                        {type.replace('_', ' ')}
                      </p>
                      <p className="text-xl font-semibold tabular-nums">
                        {counts[type] ?? 0}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {lastUserAgent ? (
                <div>
                  <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Last user agent
                  </h3>
                  <p className="break-all rounded-lg border bg-muted/30 p-3 font-mono text-xs">
                    {lastUserAgent}
                  </p>
                </div>
              ) : null}

              <div>
                <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Event history ({userEvents.length})
                </h3>
                {userEvents.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No events recorded.</p>
                ) : (
                  <ol className="space-y-2">
                    {userEvents.map((e) => (
                      <li key={e.id} className="rounded-lg border bg-card p-3 text-xs">
                        <div className="flex items-center justify-between">
                          <span
                            className={cn(
                              'inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium',
                              eventBadgeStyles[e.event_type] ??
                                'border-border bg-muted text-foreground/70',
                            )}
                          >
                            {e.event_type}
                          </span>
                          <span className="text-muted-foreground">
                            {format(new Date(e.created_at), 'PP p')}
                          </span>
                        </div>
                        <div className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1 text-muted-foreground">
                          {e.report_slug ? (
                            <span>
                              <strong className="text-foreground">Report:</strong>{' '}
                              {e.report_slug}
                            </span>
                          ) : null}
                          {e.ip ? (
                            <span>
                              <strong className="text-foreground">IP:</strong> {e.ip}
                            </span>
                          ) : null}
                        </div>
                        {Object.keys(e.metadata ?? {}).length ? (
                          <pre className="mt-2 overflow-x-auto rounded bg-muted/50 p-2 font-mono text-[11px]">
                            {JSON.stringify(e.metadata, null, 2)}
                          </pre>
                        ) : null}
                      </li>
                    ))}
                  </ol>
                )}
              </div>
            </div>
          </>
        ) : null}
      </SheetContent>
    </Sheet>
  );
};

const EventDetailSheet = ({
  eventId,
  events,
  onClose,
}: {
  eventId: string | null;
  events: EventLog[];
  onClose: () => void;
}) => {
  const event = eventId ? events.find((e) => e.id === eventId) ?? null : null;
  return (
    <Sheet open={!!eventId} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-full overflow-y-auto sm:max-w-lg">
        {event ? (
          <>
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2">
                <span
                  className={cn(
                    'inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium',
                    eventBadgeStyles[event.event_type] ??
                      'border-border bg-muted text-foreground/70',
                  )}
                >
                  {event.event_type}
                </span>
              </SheetTitle>
              <SheetDescription>
                {format(new Date(event.created_at), 'PPpp')}
              </SheetDescription>
            </SheetHeader>
            <div className="mt-6 space-y-4">
              <DetailGrid
                items={[
                  { label: 'Email', value: event.email },
                  { label: 'Report', value: event.report_slug },
                  { label: 'IP', value: event.ip },
                  { label: 'User ID', value: event.user_id, mono: true },
                  { label: 'Event ID', value: event.id, mono: true },
                ]}
              />
              {event.user_agent ? (
                <div>
                  <h3 className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    User agent
                  </h3>
                  <p className="break-all rounded-lg border bg-muted/30 p-3 font-mono text-xs">
                    {event.user_agent}
                  </p>
                </div>
              ) : null}
              {event.referrer ? (
                <div>
                  <h3 className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Referrer
                  </h3>
                  <p className="break-all rounded-lg border bg-muted/30 p-3 text-xs">
                    {event.referrer}
                  </p>
                </div>
              ) : null}
              <div>
                <h3 className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Metadata
                </h3>
                <pre className="overflow-x-auto rounded-lg border bg-muted/30 p-3 font-mono text-xs">
                  {JSON.stringify(event.metadata ?? {}, null, 2)}
                </pre>
              </div>
            </div>
          </>
        ) : null}
      </SheetContent>
    </Sheet>
  );
};

const DetailGrid = ({
  items,
}: {
  items: { label: string; value?: string | null; mono?: boolean }[];
}) => (
  <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
    {items.map((item) => (
      <div key={item.label} className="rounded-lg border bg-muted/20 p-3">
        <dt className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
          {item.label}
        </dt>
        <dd
          className={cn(
            'mt-1 break-all text-sm text-foreground',
            item.mono && 'font-mono text-xs',
          )}
        >
          {item.value || '—'}
        </dd>
      </div>
    ))}
  </dl>
);

const toneStyles: Record<string, { bg: string; text: string }> = {
  primary: { bg: 'bg-primary/10', text: 'text-primary' },
  accent: { bg: 'bg-accent/15', text: 'text-accent' },
  emerald: {
    bg: 'bg-emerald-100',
    text: 'text-emerald-700',
  },
  muted: { bg: 'bg-muted', text: 'text-foreground/70' },
};

const SignalCard = ({
  label,
  value,
  meta,
  icon,
}: {
  label: string;
  value: string;
  meta: string;
  icon: React.ReactNode;
}) => (
  <div className="group rounded-xl border bg-card p-4 shadow-sm transition-shadow hover:shadow-md">
    <div className="flex items-center justify-between gap-3">
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
        {icon}
      </div>
    </div>
    <p className="mt-4 truncate text-xl font-semibold tracking-tight text-foreground">
      {value}
    </p>
    <p className="mt-1 text-xs text-muted-foreground">{meta}</p>
  </div>
);

const StatCard = ({
  label,
  value,
  icon,
  tone = 'primary',
}: {
  label: string;
  value: number;
  icon?: React.ReactNode;
  tone?: keyof typeof toneStyles;
}) => {
  const styles = toneStyles[tone] ?? toneStyles.primary;
  return (
    <div className="rounded-xl border bg-card p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {label}
        </p>
        {icon ? (
          <div
            className={cn(
              'flex h-8 w-8 items-center justify-center rounded-lg',
              styles.bg,
              styles.text,
            )}
          >
            {icon}
          </div>
        ) : null}
      </div>
      <p className="mt-3 text-3xl font-semibold tabular-nums tracking-tight">
        {value.toLocaleString()}
      </p>
    </div>
  );
};

const SectionCard = ({
  title,
  subtitle,
  actions,
  children,
}: {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
}) => (
  <section className="overflow-hidden rounded-xl border bg-card shadow-sm">
    <div className="flex flex-col gap-3 border-b px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <div>
        <h2 className="text-sm font-semibold tracking-tight">{title}</h2>
        {subtitle ? (
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        ) : null}
      </div>
      {actions}
    </div>
    {children}
  </section>
);

const FilterChip = ({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      'rounded-full border px-3 py-1 text-xs font-medium transition-colors',
      active
        ? 'border-primary bg-primary text-primary-foreground'
        : 'border-border bg-background text-muted-foreground hover:bg-muted',
    )}
  >
    {children}
  </button>
);

const Pagination = ({
  page,
  totalPages,
  pageSize,
  totalItems,
  rangeStart,
  rangeEnd,
  onPageChange,
  onPageSizeChange,
}: {
  page: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  rangeStart: number;
  rangeEnd: number;
  onPageChange: (next: number) => void;
  onPageSizeChange: (size: number) => void;
}) => (
  <div className="flex flex-col items-center justify-between gap-3 border-t bg-muted/20 px-4 py-3 text-xs text-muted-foreground sm:flex-row sm:px-6">
    <div className="flex items-center gap-2">
      <span>
        {totalItems === 0
          ? '0 results'
          : `${rangeStart + 1}–${rangeEnd} of ${totalItems}`}
      </span>
      <span className="hidden sm:inline">·</span>
      <label className="hidden items-center gap-1 sm:flex">
        Per page
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="rounded-md border bg-background px-2 py-1 text-xs text-foreground"
        >
          {[10, 25, 50, 100].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </label>
    </div>
    <div className="flex items-center gap-1">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        className="h-8"
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="hidden sm:inline">Prev</span>
      </Button>
      <span className="px-2 tabular-nums">
        Page {page} / {totalPages}
      </span>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        className="h-8"
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  </div>
);

const EmptyRow = ({ colSpan, message }: { colSpan: number; message: string }) => (
  <tr>
    <td className="px-4 py-8 text-center text-sm text-muted-foreground" colSpan={colSpan}>
      {message}
    </td>
  </tr>
);

export default Admin;
