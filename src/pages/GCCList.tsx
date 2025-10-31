import { useState, useEffect, useMemo, useCallback } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Search, X, TrendingUp, Building2, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CSV_URL = "https://files.catbox.moe/lp9nh3.csv";

const preferredOrder = [
  "Account Global Legal Name",
  "India Entity Name",
  "Center Type",
  "HQ Country",
  "Primary Nature",
  "HQ Revenue Range",
  "HQ Employee Range",
  "India Head Count Range"
];

const facetCols = [
  "Center Type",
  "HQ Country",
  "Primary Nature",
  "HQ Revenue Range",
  "HQ Employee Range",
  "India Head Count Range"
];

const nameSearchCols = [
  "Account Global Legal Name",
  "India Entity Name"
];

// CSV utility
const toCSV = (rows: any[], cols: string[]) => {
  const q = (v: any) => {
    const s = String(v ?? "");
    return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  return cols.map(q).join(",") + "\n" + rows.map((r: any) => cols.map((c: string) => q(r[c])).join(",")).join("\n");
};

const GCCList = () => {
  const [data, setData] = useState<any[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [nameSearch, setNameSearch] = useState("");
  const [facets, setFacets] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const parseCSV = (text: string) => {
    const rows: string[][] = [];
    let cur = "", row: string[] = [], q = false;
    for (let i = 0; i < text.length; i++) {
      const c = text[i], n = text[i + 1];
      if (c === '"') {
        if (q && n === '"') { cur += '"'; i++; }
        else q = !q;
      } else if (c === ',' && !q) {
        row.push(cur);
        cur = "";
      } else if ((c === '\n' || c === '\r') && !q) {
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
    return rows.slice(1)
      .filter(r => r.some(x => String(x ?? "").trim().length))
      .map(r => {
        const o: any = {};
        header.forEach((h, i) => o[h] = r[i] ?? "");
        return o;
      });
  };

  useEffect(() => {
    const loadCSV = async () => {
      try {
        setLoading(true);
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
        preferredOrder.forEach(k => { if (cols.includes(k)) ordered.push(k); });
        cols.forEach(k => { if (!ordered.includes(k)) ordered.push(k); });

        setColumns(ordered);
        setData(objs.map(o => {
          const r: any = {};
          ordered.forEach(k => r[k] = o[k] ?? "");
          return r;
        }));

        const initialFacets: any = {};
        facetCols.forEach(c => initialFacets[c] = "");
        setFacets(initialFacets);
      } catch (err) {
        console.error('Load failed:', err);
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
      return nameSearchCols.some(c => String((r as any)[c] ?? "").toLowerCase().includes(q));
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
    return Array.from(set).filter((v: any) => v.length).sort((a: any, b: any) => a.localeCompare(b));
  };

  const totalPages = Math.max(1, Math.ceil(filteredData.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const startIdx = (currentPage - 1) * pageSize;
  const endIdx = Math.min(startIdx + pageSize, filteredData.length);
  const currentPageData = filteredData.slice(startIdx, endIdx);

  const handleClearFilters = () => {
    setNameSearch("");
    const cleared: any = {};
    Object.keys(facets).forEach(k => cleared[k] = "");
    setFacets(cleared);
    setPage(1);
  };

  // Full dataset download on successful form submission
  const triggerDownload = useCallback(() => {
    const rows = data;
    if (!rows.length) {
      alert("No rows to download.");
      return;
    }
    const csv = toCSV(rows, columns);
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
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
        const d: any = event.data;
        const origin = String(event.origin || "");
        const fromJot = /jotform/i.test(origin) || /jotform/i.test(String(d?.origin)) || /jotform/i.test(String(d?.url));
        
        if (typeof d === "string") {
          const s = d.toLowerCase();
          if (s.includes("submission-completed") || s.includes("thankyou") || s.includes("submission")) {
            return handleFormSuccess();
          }
        }
        
        if (fromJot && typeof d === "object" && d) {
          const ev = String(d.event || d.type || d.message || "").toLowerCase();
          if (ev.includes("submission-completed") || ev.includes("thankyou") || 
              ev.includes("form-submit-successful") || ev.includes("submission") || 
              d?.action === "submission-completed") {
            return handleFormSuccess();
          }
        }
        
        if (typeof d === "object" && d && d.type === "JOTFORM_OK") {
          return handleFormSuccess();
        }
      } catch (e) {
        console.error(e);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [handleFormSuccess]);

  const scrollToTable = () => {
    document.getElementById("gcc-table")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-20 px-4">
        <div className="max-w-[1400px] mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12 md:mb-16">
            <h1 className="mb-6">
              Discover India's Global Capability Centers (GCCs) - The Engine of Global Innovation
            </h1>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              India has evolved into the world's most dynamic hub for Global Capability Centers (GCCs), strategic offshore units established by multinational corporations to drive innovation, digital transformation, and enterprise efficiency. Once viewed primarily as cost-optimization vehicles, today's GCCs are strategic value creators delivering advanced technology, analytics, product engineering, and end to end business capabilities for their global organizations.
            </p>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto mt-4">
              Explore the world's largest database of GCCs in India, uncover insights on their scale, focus areas, technologies, and expansion trends.
            </p>
          </div>

          {/* Top CTAs */}
          <div className="flex flex-wrap gap-4 justify-center items-center mb-2">
            <Button 
              size="lg"
              onClick={() => setShowModal(true)}
              className="bg-primary hover:bg-primary/90"
            >
              Download Sample
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/pricing">Get Full Access</Link>
            </Button>
          </div>

          {/* OR line + TAM helper */}
          <div className="text-center mb-12">
            <div className="text-sm text-muted-foreground mb-2">OR</div>
            <button
              onClick={scrollToTable}
              className="text-primary font-medium underline underline-offset-4 decoration-primary/30 hover:decoration-primary"
            >
              Play around with filters and find your TAM
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-2xl p-8 border shadow-sm text-center">
              <Building2 className="w-12 h-12 text-primary mx-auto mb-4" />
              <div className="text-5xl font-bold text-primary mb-2">2400+</div>
              <div className="text-muted-foreground">MNCs with Centers In India</div>
            </div>
            <div className="bg-white rounded-2xl p-8 border shadow-sm text-center">
              <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4" />
              <div className="text-5xl font-bold text-primary mb-2">5700+</div>
              <div className="text-muted-foreground">Centers with in-depth insights</div>
            </div>
            <div className="bg-white rounded-2xl p-8 border shadow-sm text-center">
              <Rocket className="w-12 h-12 text-primary mx-auto mb-4" />
              <div className="text-5xl font-bold text-primary mb-2">110+</div>
              <div className="text-muted-foreground">Upcoming centers in India</div>
            </div>
          </div>

          {/* Table Section */}
          <div id="gcc-table">
            {loading ? (
              <div className="text-xl text-muted-foreground">Loading data...</div>
            ) : (
              <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
                {/* Table controls header */}
                <div className="p-4 border-b grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 items-center">
                  {/* Search - stretched */}
                  <div className="flex items-center gap-3">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type="text"
                        placeholder="Search Account or India Entity"
                        value={nameSearch}
                        onChange={(e) => {
                          setNameSearch(e.target.value);
                          setPage(1);
                        }}
                        className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm"
                      />
                    </div>
                    {/* Clear pushed to edge on larger screens, stacks on mobile */}
                    <button
                      onClick={handleClearFilters}
                      className="ml-auto md:ml-0 px-4 py-2 border border-blue-600 text-blue-600 rounded-lg text-sm font-semibold hover:bg-blue-50"
                    >
                      Clear
                    </button>
                  </div>

                  {/* Right side controls removed, no download button here */}
                  <div className="hidden md:block" />
                </div>

                {/* Filters */}
                <div className="p-4 border-b flex flex-wrap gap-4">
                  {facetCols.map(col => {
                    if (!columns.includes(col)) return null;
                    const options = optionSetForFacet(col);
                    return (
                      <div key={col} className="flex gap-2 items-center">
                        <label className="text-xs text-muted-foreground whitespace-nowrap">
                          {col}
                        </label>
                        <select
                          value={facets[col] || ""}
                          onChange={(e) => {
                            setFacets({ ...facets, [col]: e.target.value });
                            setPage(1);
                          }}
                          className="px-3 py-1.5 border rounded-lg text-sm"
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

                {/* Table */}
                <div className="overflow-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-50 sticky top-0">
                      <tr>
                        {columns.map(col => (
                          <th key={col} className="p-3 text-left border-b font-medium">
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {currentPageData.length === 0 ? (
                        <tr>
                          <td colSpan={columns.length} className="p-8 text-center text-muted-foreground">
                            No results.
                          </td>
                        </tr>
                      ) : (
                        currentPageData.map((row: any, idx: number) => (
                          <tr key={idx} className="hover:bg-slate-50">
                            {columns.map((col: string) => (
                              <td key={col} className="p-3 border-b">
                                {row[col] ?? ""}
                              </td>
                            ))}
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="p-4 border-t flex flex-wrap gap-4 justify-between items-center">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setPage(1)}
                      disabled={currentPage === 1}
                      className="px-3 py-1.5 border rounded-lg text-sm disabled:opacity-50"
                    >
                      First
                    </button>
                    <button
                      onClick={() => setPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-1.5 border rounded-lg text-sm disabled:opacity-50"
                    >
                      Prev
                    </button>
                    <span className="px-3 py-1.5 text-sm">
                      Page {currentPage} of {totalPages} • {filteredData.length === 0 ? 0 : startIdx + 1}-{endIdx} of {filteredData.length}
                    </span>
                    <button
                      onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="px-3 py-1.5 border rounded-lg text-sm disabled:opacity-50"
                    >
                      Next
                    </button>
                    <button
                      onClick={() => setPage(totalPages)}
                      disabled={currentPage === totalPages}
                      className="px-3 py-1.5 border rounded-lg text-sm disabled:opacity-50"
                    >
                      Last
                    </button>
                  </div>
                  
                  <div className="flex gap-2 items-center">
                    <span className="text-sm">Rows</span>
                    <select
                      value={pageSize}
                      onChange={(e) => {
                        setPageSize(parseInt(e.target.value));
                        setPage(1);
                      }}
                      className="px-3 py-1.5 border rounded-lg text-sm"
                    >
                      <option value="5">5</option>
                      <option value="10">10</option>
                      <option value="25">25</option>
                      <option value="50">50</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Why GCCs Section */}
          <div className="mt-32 mb-16">
            <h2 className="text-center mb-16">
              Why Do Companies Set Up GCCs in India?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-8 border shadow-sm">
                <h3 className="text-2xl font-semibold mb-4 text-primary">
                  Access to World Class Talent
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  India offers one of the largest and most diverse pools of engineering, finance, and digital professionals in the world, allowing companies to scale faster and innovate continuously.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 border shadow-sm">
                <h3 className="text-2xl font-semibold mb-4 text-primary">
                  Cost Efficiency with Value Creation
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Originally started as cost saving units, modern GCCs now deliver strategic value, driving transformation, innovation, and new revenue streams for their parent organizations.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 border shadow-sm">
                <h3 className="text-2xl font-semibold mb-4 text-primary">
                  Innovation and Technology Leadership
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  India's GCCs are often the innovation labs for global enterprises, experimenting with AI, automation, data analytics, cloud, cybersecurity, and Industry 4.0 technologies.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 border shadow-sm">
                <h3 className="text-2xl font-semibold mb-4 text-primary">
                  Global Operating Model
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  By setting up in India, companies achieve 24x7 operations, proximity to emerging markets, and resilience through distributed teams.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modal */}
      {showModal && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowModal(false);
          }}
          style={{ opacity: showModal ? 1 : 0 }}
        >
          <div 
            className="bg-white rounded-3xl shadow-2xl w-[95vw] lg:w-[420px] max-h-[95vh] lg:max-h-[90vh] relative overflow-hidden transition-transform duration-300"
            style={{ transform: showModal ? 'scale(1) translateY(0)' : 'scale(0.8) translateY(50px)' }}
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-5 bg-[#f39122] hover:bg-[#f39122]/90 text-white w-9 h-9 rounded-full flex items-center justify-center z-10 transition-all hover:rotate-90"
            >
              <X size={20} />
            </button>

            <div className="bg-gradient-to-br from-[#F2994A] to-[#F2C94C] text-white p-6 text-center">
              <h2 className="text-2xl font-bold mb-2">Download GCC Data</h2>
              <p className="text-sm opacity-90">Fill out the form below to download your data</p>
            </div>

            <div className="h-[600px] lg:h-[539px] overflow-hidden relative">
              <iframe
                key={showModal ? 'open' : 'closed'}
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
