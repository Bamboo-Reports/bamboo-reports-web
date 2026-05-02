import { useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Loader2,
  Lock,
  Share2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SecurePdfViewer from "@/components/SecurePdfViewer";
import { useAuth } from "@/contexts/AuthContext";
import { useSEO } from "@/hooks/useSEO";
import { requestSignedReportUrl } from "@/lib/reportAccess";
import { cn } from "@/lib/utils";

const REPORT_SLUG = "gcc-snapshot-q4";
const REPORT_PATH = "/reports/gcc-snapshot-q4";
const COVER_URL =
  "https://6xcp0wpjej.ufs.sh/f/9zK5qxoTPnKvJxynEBxTSsyCtN4UrElocuAhdMjDkZBHnO0R";

const socialIcons = {
  LinkedIn: (
    <svg viewBox="0 0 24 24" aria-hidden className="h-8 w-8 fill-current">
      <path d="M20.45 20.45h-3.56v-5.58c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.61 0 4.27 2.37 4.27 5.46v6.28zM5.32 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.1 20.45H3.54V9H7.1v11.45z" />
    </svg>
  ),
  WhatsApp: (
    <svg viewBox="0 0 24 24" aria-hidden className="h-8 w-8 fill-current">
      <path d="M12.04 2.5A9.43 9.43 0 0 0 4 16.87L2.95 21.5l4.73-1.13A9.43 9.43 0 1 0 12.04 2.5zm0 1.72a7.7 7.7 0 0 1 6.64 11.6 7.68 7.68 0 0 1-9.94 2.89l-.34-.17-2.81.67.63-2.75-.19-.36a7.7 7.7 0 0 1 6.01-11.88zm-3.26 3.9c-.17 0-.44.06-.67.32-.23.25-.88.86-.88 2.1s.9 2.44 1.03 2.6c.13.17 1.76 2.68 4.26 3.76.6.26 1.06.41 1.42.52.6.19 1.14.16 1.57.1.48-.07 1.47-.6 1.68-1.18.2-.58.2-1.08.14-1.18-.06-.1-.23-.16-.48-.29-.25-.12-1.47-.72-1.7-.8-.23-.09-.4-.13-.57.12-.17.25-.65.8-.8.97-.15.16-.29.18-.54.06-.25-.13-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.38.11-.5.12-.11.25-.29.38-.43.12-.15.17-.25.25-.42.08-.17.04-.31-.02-.43-.06-.13-.56-1.35-.77-1.85-.2-.48-.41-.41-.57-.42h-.48z" />
    </svg>
  ),
  Facebook: (
    <svg viewBox="0 0 24 24" aria-hidden className="h-8 w-8 fill-current">
      <path d="M14.2 8.2V6.7c0-.72.48-.89.82-.89h2.08V2.61L14.24 2.6c-3.18 0-3.9 2.38-3.9 3.9v1.7H7.9v3.3h2.44v8.95h3.86V11.5h2.87l.38-3.3H14.2z" />
    </svg>
  ),
  X: (
    <svg viewBox="0 0 24 24" aria-hidden className="h-7 w-7 fill-current">
      <path d="M13.98 10.16 21.74 1h-1.84l-6.74 7.95L7.78 1H1.58l8.14 12.02L1.58 23h1.84l7.12-8.78L16.22 23h6.2l-8.44-12.84zm-2.52 3.1-.82-1.2L4.08 2.4H6.9l5.3 7.8.83 1.2 6.88 10.14h-2.82l-5.63-8.28z" />
    </svg>
  ),
};

const ReportGCCSnapshotQ4 = () => {
  useSEO({
    title:
      "India GCC Snapshot Q4 FY25-26 - Quarterly GCC Intelligence Report",
    description:
      "Q4 2025-26 snapshot of India's Global Capability Centers with data on 5,800+ centers and 2,400+ MNCs. Analyze GCC investment patterns, talent hotspots, and capability shifts for strategic GTM planning.",
    keywords:
      "India GCC Snapshot, GCC Quarterly Report, GCC Intelligence, Global Capability Centers Q4, GCC Trends India, GCC Market Intelligence, GTM research India, India GCC Research",
  });

  const navigate = useNavigate();
  const { user, session, loading } = useAuth();

  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [requesting, setRequesting] = useState(false);
  const [shareMenuOpen, setShareMenuOpen] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    if (loading) return;

    if (!user || !session?.access_token) {
      navigate(`/signup?redirect=${encodeURIComponent(REPORT_PATH)}`);
      return;
    }

    setError(null);
    setRequesting(true);
    try {
      const url = await requestSignedReportUrl(REPORT_SLUG, session.access_token);
      setPdfUrl(url);
      setViewerOpen(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load the report");
    } finally {
      setRequesting(false);
    }
  };

  const shareUrl =
    typeof window === "undefined" ? REPORT_PATH : `${window.location.origin}${REPORT_PATH}`;
  const shareText = "India GCC Snapshot Q4 FY25-26 from Bamboo Reports";
  const socialShareLinks = [
    {
      label: "LinkedIn",
      icon: socialIcons.LinkedIn,
      className: "bg-[#0a66c2] text-white",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    },
    {
      label: "WhatsApp",
      icon: socialIcons.WhatsApp,
      className: "bg-[#25d366] text-white",
      href: `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`,
    },
    {
      label: "Facebook",
      icon: socialIcons.Facebook,
      className: "bg-[#4267b2] text-white",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    },
    {
      label: "X",
      icon: socialIcons.X,
      className: "bg-black text-white",
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
    },
  ];

  const copyShareLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setShareCopied(true);
      window.setTimeout(() => setShareCopied(false), 1800);
    } catch {
      setError("Could not copy the page link. Please copy the URL from your browser.");
    }
  };

  const ctaLabel = loading
    ? "Loading…"
    : !user
      ? "Read it now"
      : requesting
        ? "Preparing…"
        : "Open the report";

  const CtaIcon = !user ? Lock : BookOpen;

  return (
    <div className="min-h-screen bg-white text-foreground">
      <Header />

      <main>
        <section className="relative isolate overflow-hidden border-b border-slate-200 bg-white">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.045)_1px,transparent_1px),linear-gradient(180deg,rgba(0,0,0,0.045)_1px,transparent_1px)] bg-[size:36px_36px]" />
          <div className="relative mx-auto grid max-w-7xl items-start gap-10 px-5 py-10 lg:grid-cols-[minmax(0,1fr)_400px] lg:px-8 lg:py-16">
            <div className="flex min-h-[620px] flex-col justify-center">
              <div className="max-w-4xl">
                <h1 className="max-w-5xl text-[3rem] font-black leading-[0.96] tracking-tight text-black sm:text-[4.5rem] lg:text-[6.2rem]">
                  India GCC Snapshot
                  <span className="mt-2 block text-[#0087d2]">Q4 FY25-26</span>
                </h1>

                <p className="mt-7 max-w-2xl text-lg leading-8 text-black lg:text-xl">
                  A focused quarterly read on India's Global Capability Centers, built for
                  executive reviews, account planning, city strategy, and GTM prioritization.
                </p>

                <div className="mt-8 border-l-4 border-[#ff8b21] pl-4">
                  <div className="flex items-baseline gap-3">
                    <span className="text-xl font-bold text-slate-500 line-through decoration-[#ff8b21] decoration-2">
                      $500
                    </span>
                    <span className="text-5xl font-black leading-none tracking-tight text-[#0087d2]">
                      Free
                    </span>
                  </div>
                  <div className="mt-2 text-sm font-medium text-slate-600">
                    No credit card required
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <button
                    onClick={handleClick}
                    disabled={loading || requesting}
                    className={cn(
                      "group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-md px-6 text-[15px] font-bold",
                      "bg-[#0087d2] text-white shadow-[0_18px_34px_-24px_rgba(0,135,210,0.95)]",
                      "transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#ff8b21]",
                      "disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0",
                    )}
                  >
                    {requesting ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <CtaIcon className="h-4 w-4" />
                    )}
                    <span>{ctaLabel}</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </button>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setShareMenuOpen((open) => !open)}
                      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-slate-300 bg-white/80 px-5 text-[15px] font-bold text-slate-800 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#0087d2] hover:text-[#0087d2]"
                      aria-expanded={shareMenuOpen}
                      aria-haspopup="dialog"
                    >
                      <Share2 className="h-4 w-4" />
                      <span>Share</span>
                    </button>
                  </div>
                </div>

                {error && (
                  <p className="mt-3 text-sm text-destructive" role="alert">
                    {error}
                  </p>
                )}
              </div>

            </div>

            <aside className="mx-auto w-full max-w-[410px] lg:sticky lg:top-24 lg:mx-0 lg:max-w-none lg:self-start">
              <div className="overflow-hidden rounded-xl shadow-[0_24px_60px_-30px_rgba(15,15,15,0.25)]">
                <img
                  src={COVER_URL}
                  alt="India GCC Snapshot Q4 FY25-26 report cover"
                  className="block h-auto w-full"
                  draggable={false}
                />
              </div>
            </aside>
          </div>
        </section>

      </main>

      <Footer />

      {shareMenuOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-4 backdrop-blur-sm"
          role="presentation"
          onClick={() => setShareMenuOpen(false)}
        >
          <div
            className="w-full max-w-xl border border-white/10 bg-[#202020] p-5 text-white shadow-[0_28px_90px_-38px_rgba(0,0,0,0.9)]"
            role="dialog"
            aria-modal="true"
            aria-label="Share this report"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="border-t border-white/15 pt-5">
              <h2 className="text-xl font-medium tracking-tight">Share</h2>
              <div className="mt-5 grid grid-cols-4 gap-4">
                {socialShareLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex min-w-0 flex-col items-center gap-3 text-sm text-white/90"
                    onClick={() => setShareMenuOpen(false)}
                  >
                    <span
                      className={cn(
                        "flex h-16 w-16 items-center justify-center rounded-full shadow-sm transition-transform group-hover:scale-105",
                        link.className,
                      )}
                    >
                      {link.icon}
                    </span>
                    <span className="max-w-full truncate">{link.label}</span>
                  </a>
                ))}
              </div>

              <div className="mt-8 flex items-center gap-3 rounded-2xl border border-white/15 bg-black/35 p-2">
                <div className="min-w-0 flex-1 truncate px-3 text-sm text-white/90">
                  {shareUrl}
                </div>
                <button
                  type="button"
                  onClick={copyShareLink}
                  className="shrink-0 rounded-full border border-white/20 px-5 py-2 text-sm font-bold text-white transition-colors hover:bg-white hover:text-black"
                >
                  {shareCopied ? "Copied" : "Copy"}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <SecurePdfViewer
        url={pdfUrl}
        userEmail={user?.email ?? ""}
        open={viewerOpen}
        onOpenChange={(open) => {
          setViewerOpen(open);
          if (!open) setPdfUrl(null);
        }}
      />
    </div>
  );
};

export default ReportGCCSnapshotQ4;
