import { useState, useEffect, useMemo, useCallback } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Search, X, TrendingUp, Building2, Rocket, Loader2, ChevronRight, Lock, ChevronLeft, RefreshCcw, Filter, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useSEO } from "@/hooks/useSEO";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const LOGO_DEV_PUBLISHABLE_KEY = import.meta.env.VITE_LOGO_DEV_PUBLISHABLE_KEY ?? 'LOGO_DEV_PUBLISHABLE_KEY';

const getDomainFromWebsite = (website?: string | null): string | null => {
  if (!website) return null;

  try {
    const normalized = website.startsWith('http') ? website : `https://${website}`;
    const hostname = new URL(normalized).hostname;
    return hostname.replace(/^www\./, '');
  } catch {
    return null;
  }
};

const CSV_URL = "/data/gcclist.csv";
const CACHE_KEY = "gcc_data_cache";
const CACHE_VERSION = "v3";
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

const preferredOrder = [
  "Account Global Legal Name",
  "Center Type",
  "City",
  "HQ Country",
  "HQ Primary Nature",
  "HQ Revenue Range",
  "HQ Employee Range",
  "India Head Count Range"
];

const facetCols = [
  "HQ Country",
  "HQ Primary Nature",
  "HQ Revenue Range",
  "HQ Employee Range",
  "India Head Count Range"
];

const nameSearchCols = ["Account Global Legal Name", "City"];

// Type definitions for GCC List
interface CSVRow {
  [key: string]: string;
}

interface FacetMap {
  [key: string]: string;
}

interface JotFormMessageEvent {
  origin?: string;
  url?: string;
  event?: string;
  type?: string;
  message?: string;
  action?: string;
}

const toCSV = (rows: CSVRow[], cols: string[]) => {
  const q = (v: string | undefined) => {
    const s = String(v ?? "");
    return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  return (
    cols.map(q).join(",") +
    "\n" +
    rows.map((r: CSVRow) => cols.map((c: string) => q(r[c])).join(",")).join("\n")
  );
};

const GCCList = () => {
  useSEO({
    title: "India GCC Database | Download Global Capability Centers Data",
    description: "India GCC database with 2,400+ Global Capability Centers. Download GCC data in CSV format and filter by HQ country, industry, city, and India headcount.",
    keywords: "India GCC database, India GCC data, India GCC data download, GCC database India, Global Capability Centers database India, GCC list India, GCC data CSV India, India GCC companies list",
    canonicalUrl: "https://www.bambooreports.com/gcc-list",
  });

  const navigate = useNavigate();
  const [data, setData] = useState<CSVRow[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(7);
  const [nameSearch, setNameSearch] = useState("");
  const [facets, setFacets] = useState<FacetMap>({});
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showPricingDialog, setShowPricingDialog] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<CSVRow | null>(null);

  const parseCSV = (text: string) => {
    const rows: string[][] = [];
    let cur = "", row: string[] = [], q = false;
    for (let i = 0; i < text.length; i++) {
      const c = text[i], n = text[i + 1];
      if (c === '"') {
        if (q && n === '"') { cur += '"'; i++; }
        else q = !q;
      } else if (c === "," && !q) {
        row.push(cur);
        cur = "";
      } else if ((c === "\n" || c === "\r") && !q) {
        if (cur.length || row.length) {
          row.push(cur);
          rows.push(row);
        }
        cur = "";
        row = [];
      } else {
        cur += c;
      }
    }
    if (cur.length || row.length) {
      row.push(cur);
      rows.push(row);
    }
    return rows;
  };

  const rowsToObjects = (rows: string[][]) => {
    if (!rows.length) return [];
    const header = rows[0].map(h => h.trim());
    return rows
      .slice(1)
      .filter(r => r.some(x => String(x ?? "").trim().length))
      .map(r => {
        const o: CSVRow = {};
        header.forEach((h, i) => (o[h] = r[i] ?? ""));
        return o;
      });
  };

  useEffect(() => {
    const loadCSV = async () => {
      try {
        setLoading(true);

        // Try to load from cache first
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          try {
            const { version, timestamp, data: cachedData, columns: cachedColumns } = JSON.parse(cached);
            const age = Date.now() - timestamp;

            // Use cached data if version matches and not expired
            if (version === CACHE_VERSION && age < CACHE_DURATION && cachedData?.length > 0) {
              setColumns(cachedColumns);
              setData(cachedData);

              const initialFacets: FacetMap = {};
              facetCols.forEach(c => (initialFacets[c] = ""));
              setFacets(initialFacets);

              setLoading(false);
              return;
            }
          } catch (cacheErr) {
            // Cache parse failed, will fetch fresh data
            localStorage.removeItem(CACHE_KEY);
          }
        }

        // Fetch fresh data
        const res = await fetch(CSV_URL, { mode: "cors" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const text = await res.text();
        const objs = rowsToObjects(parseCSV(text));

        if (!objs.length) {
          setData([]);
          setColumns([]);
          return;
        }

        const cols = Object.keys(objs[0]).filter(Boolean);
        const ordered: string[] = [];
        preferredOrder.forEach(k => {
          if (cols.includes(k)) ordered.push(k);
        });
        cols.forEach(k => {
          if (!ordered.includes(k)) ordered.push(k);
        });

        const processedData = objs.map(o => {
          const r: CSVRow = {};
          ordered.forEach(k => (r[k] = o[k] ?? ""));
          return r;
        });

        setColumns(ordered);
        setData(processedData);

        // Cache the data
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify({
            version: CACHE_VERSION,
            timestamp: Date.now(),
            data: processedData,
            columns: ordered
          }));
        } catch (storageErr) {
          // Failed to cache data (quota exceeded) - not critical, will fetch again next time
        }

        const initialFacets: FacetMap = {};
        facetCols.forEach(c => (initialFacets[c] = ""));
        setFacets(initialFacets);
      } catch (err) {
        // Data load failed - component will show empty state
      } finally {
        setLoading(false);
      }
    };

    loadCSV();
  }, []);

  const filteredData = useMemo(() => {
    return data.filter(r => {
      for (const [c, v] of Object.entries(facets)) {
        if (!v) continue;
        if (String((r as any)[c] ?? "") !== v) return false;
      }
      const q = nameSearch.trim().toLowerCase();
      if (!q) return true;
      return nameSearchCols.some(c =>
        String((r as any)[c] ?? "").toLowerCase().includes(q)
      );
    });
  }, [data, facets, nameSearch]);

  const optionSetForFacet = (targetCol: string) => {
    const q = nameSearch.trim().toLowerCase();
    const rows = data.filter(r => {
      for (const [c, v] of Object.entries(facets)) {
        if (!v) continue;
        if (c === targetCol) continue;
        if (String((r as any)[c] ?? "") !== v) return false;
      }
      if (q && !nameSearchCols.some(c => String((r as any)[c] ?? "").toLowerCase().includes(q))) return false;
      return true;
    });
    const set = new Set<string>();
    rows.forEach(r => set.add(String((r as any)[targetCol] ?? "")));
    return Array.from(set)
      .filter((v: string) => v.length)
      .sort((a: string, b: string) => a.localeCompare(b));
  };

  const totalPages = Math.max(1, Math.ceil(filteredData.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const startIdx = (currentPage - 1) * pageSize;
  const endIdx = Math.min(startIdx + pageSize, filteredData.length);
  const currentPageData = filteredData.slice(startIdx, endIdx);

  const handleClearFilters = () => {
    setNameSearch("");
    const cleared: FacetMap = {};
    Object.keys(facets).forEach(k => (cleared[k] = ""));
    setFacets(cleared);
    setPage(1);
  };

  const handleCompanyClick = (company: CSVRow) => {
    setSelectedCompany(company);
    setShowPricingDialog(true);
  };

  const triggerDownload = useCallback(() => {
    const rows = data;
    if (!rows.length) {
      alert("No rows to download.");
      return;
    }
    const csv = toCSV(rows, columns);
    const url = URL.createObjectURL(
      new Blob([csv], { type: "text/csv;charset=utf-8" })
    );
    const ts = new Date().toISOString().replace(/[:.]/g, "-");
    const a = document.createElement("a");
    a.href = url;
    a.download = `gcc-data-all-${ts}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }, [data, columns]);

  const handleFormSuccess = useCallback(() => {
    setShowModal(false);
    triggerDownload();
  }, [triggerDownload]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      try {
        const d: JotFormMessageEvent | string = event.data;
        const origin = String(event.origin || "");
        const fromJot =
          /jotform/i.test(origin) ||
          (typeof d === 'object' && d && (
            /jotform/i.test(String(d.origin)) ||
            /jotform/i.test(String(d.url))
          ));

        if (typeof d === "string") {
          const s = d.toLowerCase();
          if (
            s.includes("submission-completed") ||
            s.includes("thankyou") ||
            s.includes("submission")
          ) {
            return handleFormSuccess();
          }
        }

        if (fromJot && typeof d === "object" && d) {
          const ev = String(d.event || d.type || d.message || "").toLowerCase();
          if (
            ev.includes("submission-completed") ||
            ev.includes("thankyou") ||
            ev.includes("form-submit-successful") ||
            ev.includes("submission") ||
            d?.action === "submission-completed"
          ) {
            return handleFormSuccess();
          }
        }

        if (typeof d === "object" && d && d.type === "JOTFORM_OK") {
          return handleFormSuccess();
        }
      } catch (e) {
        // Error parsing message - ignore non-JotForm messages
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [handleFormSuccess]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="py-20 px-4">
        <div className="max-w-[1400px] mx-auto">
          {/* Hero */}
          <div className="text-center mb-10 md:mb-12">
            <h1 className="mb-6">
              India GCC Database — 2,400+ Global Capability Centers
            </h1>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              The India GCC database built for market sizing, GTM targeting, and competitive research. Download GCC data in CSV format and filter by HQ country, industry, city, and India headcount.
            </p>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto mt-4">
              Start with a sample download or unlock the full India GCC database for deeper segmentation and analysis.
            </p>
          </div>

          {/* STATS ON TOP */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 md:mb-12">
            <div className="bg-white rounded-2xl p-8 border shadow-sm text-center">
              <Building2 className="w-12 h-12 text-primary mx-auto mb-4" />
              <div className="text-5xl font-bold text-primary mb-2">2400+</div>
              <div className="text-muted-foreground">MNCs with Centers In India</div>
            </div>
            <div className="bg-white rounded-2xl p-8 border shadow-sm text-center">
              <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4" />
              <div className="text-5xl font-bold text-primary mb-2">5800+</div>
              <div className="text-muted-foreground">Centers with in-depth insights</div>
            </div>
            <div className="bg-white rounded-2xl p-8 border shadow-sm text-center">
              <Rocket className="w-12 h-12 text-primary mx-auto mb-4" />
              <div className="text-5xl font-bold text-primary mb-2">109+</div>
              <div className="text-muted-foreground">Upcoming centers in India</div>
            </div>
          </div>

          {/* Top CTAs */}
          <div className="flex flex-wrap gap-4 justify-center items-center mb-2">
            <Button
              size="lg"
              onClick={() => setShowModal(true)}
              className="bg-primary hover:bg-primary/90 rounded-full"
            >
              Download India GCC Database (Sample)
            </Button>
            <Button size="lg" variant="outline" asChild className="rounded-full">
              <Link to="/pricing">Get Full India GCC Database</Link>
            </Button>
          </div>

          {/* OR + plain grey helper line (no anchor) */}
          <div className="text-center mb-12">
            <div className="text-sm text-muted-foreground mb-2">OR</div>
            <p className="text-muted-foreground">
              Filter the India GCC database, then download.
            </p>
          </div>

          {/* Table */}
          <div id="gcc-table" className="space-y-6">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 space-y-4">
                <Loader2 className="w-12 h-12 text-primary animate-spin" />
                <div className="text-xl text-muted-foreground">Loading GCC data...</div>
                <div className="text-sm text-muted-foreground">Please wait while we fetch the latest data</div>
              </div>
            ) : (
              <>
                {/* Filters Card */}
                <div className="rounded-2xl border border-slate-200/80 bg-gradient-to-br from-slate-50 to-white p-6 shadow-sm space-y-4">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div className="inline-flex items-center gap-2 text-sm font-semibold text-slate-800">
                      <Filter className="h-4 w-4 text-slate-500" />
                      Refine companies
                    </div>
                    <div className="text-xs text-slate-500">
                      Showing {filteredData.length.toLocaleString()} of {data.length.toLocaleString()} companies
                    </div>
                  </div>

                  {/* Search and Clear */}
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <div className="relative flex-1">
                      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search by Account or City..."
                        value={nameSearch}
                        onChange={(e) => {
                          setNameSearch(e.target.value);
                          setPage(1);
                        }}
                        className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm shadow-inner shadow-slate-100"
                      />
                    </div>
                    <Button
                      variant="outline"
                      onClick={handleClearFilters}
                      className="gap-2 rounded-xl border-slate-200 bg-white text-slate-700 shadow-sm hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
                    >
                      <RefreshCcw className="h-4 w-4" />
                      Reset filters
                    </Button>
                  </div>

                  {/* Dropdown Filters */}
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
                    {facetCols.map(col => {
                      if (!columns.includes(col)) return null;
                      const options = optionSetForFacet(col);
                      return (
                        <div key={col} className="space-y-1.5">
                          <label className="text-xs font-semibold uppercase tracking-wide text-gray-600">
                            {col}
                          </label>
                          <select
                            value={facets[col] || ""}
                            onChange={(e) => {
                              setFacets({ ...facets, [col]: e.target.value });
                              setPage(1);
                            }}
                            className="w-full h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm shadow-inner shadow-slate-100"
                          >
                            <option value="">All</option>
                            {options.map((opt: string) => (
                              <option key={opt} value={opt}>{opt}</option>
                            ))}
                          </select>
                        </div>
                      );
                    })}
                  </div>

                  {/* Results count */}
                  <div className="text-sm text-gray-600 pt-2 border-t">
                    Showing {filteredData.length === 0 ? 0 : startIdx + 1}-{endIdx} of {filteredData.length} companies
                  </div>
                </div>

                {/* Table Card */}
                <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-md">
                  <div className="overflow-auto max-h-[500px]">
                    <Table className="min-w-[960px] text-sm">
                      <TableHeader>
                        <TableRow className="bg-slate-50/90 backdrop-blur sticky top-0 z-20">
                          {columns.filter(col => col !== "Website").map(col => (
                            <TableHead key={col} className="min-w-[120px] text-xs font-semibold uppercase tracking-wide text-slate-600 border-b border-slate-200 py-4">
                              {col}
                            </TableHead>
                          ))}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {currentPageData.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={columns.filter(col => col !== "Website").length} className="text-center py-8 text-slate-500">
                              No companies found matching your filters
                            </TableCell>
                          </TableRow>
                        ) : (
                          currentPageData.map((row: CSVRow, idx: number) => {
                            const logoDomain = getDomainFromWebsite(row["Website"]);
                            return (
                              <TableRow
                                key={idx}
                                className="group border-b last:border-b-0 odd:bg-slate-50/40 hover:bg-slate-50/90 transition cursor-pointer"
                                onClick={() => handleCompanyClick(row)}
                              >
                                {columns.filter(col => col !== "Website").map((col: string) => (
                                  <TableCell key={col} className="py-3 text-slate-700">
                                    {col === "Account Global Legal Name" ? (
                                      <div className="flex items-center gap-3">
                                        <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full border border-slate-200 bg-slate-50 shadow-inner shadow-slate-100 flex items-center justify-center text-slate-400">
                                          <Building2 className="h-4 w-4" />
                                          {logoDomain && (
                                            <img
                                              src={`https://img.logo.dev/${logoDomain}?token=${LOGO_DEV_PUBLISHABLE_KEY}&format=jpg&size=180`}
                                              alt={`${row[col]} logo`}
                                              loading="lazy"
                                              onError={(e) => {
                                                e.currentTarget.style.display = 'none';
                                              }}
                                              className="absolute inset-0 h-full w-full object-cover p-1"
                                            />
                                          )}
                                        </div>
                                        <span className="inline-flex items-center gap-2 font-medium text-slate-900 transition hover:text-slate-800">
                                          {row[col] ?? ""}
                                          <ChevronRight className="h-4 w-4 text-slate-400 opacity-0 translate-x-[-2px] transition duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
                                        </span>
                                      </div>
                                    ) : (
                                      row[col] || <span className="text-slate-400">-</span>
                                    )}
                                  </TableCell>
                                ))}
                              </TableRow>
                            );
                          })
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between rounded-xl border border-slate-200/80 bg-white px-4 py-3 shadow-sm">
                  <Button
                    variant="outline"
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="gap-2 rounded-lg"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>

                  <div className="flex items-center gap-4">
                    <div className="text-sm text-gray-600">
                      Page {currentPage} of {totalPages || 1}
                    </div>
                    <div className="text-sm text-gray-500">
                      {filteredData.length === 0 ? 0 : startIdx + 1}-{endIdx} of {filteredData.length} companies
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages || totalPages === 0}
                    className="gap-2 rounded-lg"
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </>
            )}
          </div>

          {/* Why GCCs */}
          <div className="mt-32 mb-16">
            <h2 className="text-center mb-16">Why Do Companies Set Up GCCs in India?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-8 border shadow-sm">
                <h3 className="text-2xl font-semibold mb-4 text-primary">Access to World Class Talent</h3>
                <p className="text-muted-foreground leading-relaxed">
                  India offers one of the largest and most diverse pools of engineering, finance, and digital professionals in the world, allowing companies to scale faster and innovate continuously.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-8 border shadow-sm">
                <h3 className="text-2xl font-semibold mb-4 text-primary">Cost Efficiency with Value Creation</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Originally started as cost saving units, modern GCCs now deliver strategic value, driving transformation, innovation, and new revenue streams for their parent organizations.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-8 border shadow-sm">
                <h3 className="text-2xl font-semibold mb-4 text-primary">Innovation and Technology Leadership</h3>
                <p className="text-muted-foreground leading-relaxed">
                  India's GCCs are often the innovation labs for global enterprises, experimenting with AI, automation, data analytics, cloud, cybersecurity, and Industry 4.0 technologies.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-8 border shadow-sm">
                <h3 className="text-2xl font-semibold mb-4 text-primary">Global Operating Model</h3>
                <p className="text-muted-foreground leading-relaxed">
                  By setting up in India, companies achieve 24x7 operations, proximity to emerging markets, and resilience through distributed teams.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Pricing Dialog */}
      <Dialog open={showPricingDialog} onOpenChange={setShowPricingDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-amber-100 to-orange-100">
              <Lock className="h-8 w-8 text-amber-600" />
            </div>
            <DialogTitle className="text-center text-xl">
              Unlock Full Company Details
            </DialogTitle>
            <DialogDescription className="text-center pt-2">
              {selectedCompany && (
                <span className="block font-semibold text-slate-800 mb-3">
                  {selectedCompany["Account Global Legal Name"]}
                </span>
              )}
              <span className="text-slate-600">
                To view more details about this company and access our complete GCC database with advanced insights, please purchase one of our plans.
              </span>
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3 mt-4">
            <Button
              onClick={() => {
                setShowPricingDialog(false);
                navigate("/pricing");
              }}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-3 rounded-xl shadow-lg"
            >
              View Pricing
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowPricingDialog(false)}
              className="w-full rounded-xl"
            >
              Maybe Later
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-modal-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowModal(false);
          }}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl w-[95vw] lg:w-[420px] max-h-[95vh] lg:max-h-[90vh] relative overflow-hidden animate-modal-content"
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-5 bg-[#f39122] hover:bg-[#f39122]/90 text-white w-9 h-9 rounded-full flex items-center justify-center z-10 transition-transform duration-micro ease-smooth hover:scale-105"
            >
              <X size={20} />
            </button>

            <div className="bg-gradient-to-br from-[#F2994A] to-[#F2C94C] text-white p-6 text-center">
              <h2 className="text-2xl font-bold mb-2">Download India GCC Data</h2>
              <p className="text-sm opacity-90">Fill out the form below to download the sample database</p>
            </div>

            <div className="h-[600px] lg:h-[539px] overflow-hidden relative">
              <iframe
                key={showModal ? "open" : "closed"}
                id="JotFormIFrame-253003277590454"
                title="BR LD - Abhishek"
                src="https://form.jotform.com/253003277590454"
                className="w-full h-full border-0"
                allow="geolocation; microphone; camera; fullscreen; payment"
              />
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default GCCList;
