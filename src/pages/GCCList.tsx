import { useState, useEffect, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Search, Download, X } from "lucide-react";

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

const GCCList = () => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [nameSearch, setNameSearch] = useState("");
  const [facets, setFacets] = useState({});
  const [selectedKeys, setSelectedKeys] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [downloadScope, setDownloadScope] = useState("filtered");

  const rowKey = (r) => {
    return [
      r["Account Global Legal Name"] ?? "",
      r["India Entity Name"] ?? "",
      r["HQ Country"] ?? "",
      r["Center Type"] ?? "",
      r["Primary Nature"] ?? "",
      r["HQ Revenue Range"] ?? "",
      r["HQ Employee Range"] ?? "",
      r["India Head Count Range"] ?? ""
    ].join(" | ");
  };

  const parseCSV = (text) => {
    const rows = [];
    let cur = "", row = [], q = false;
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

  const rowsToObjects = (rows) => {
    if (!rows.length) return [];
    const header = rows[0].map(h => h.trim());
    return rows.slice(1)
      .filter(r => r.some(x => String(x ?? "").trim().length))
      .map(r => {
        const o = {};
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
        const ordered = [];
        preferredOrder.forEach(k => {
          if (cols.includes(k)) ordered.push(k);
        });
        cols.forEach(k => {
          if (!ordered.includes(k)) ordered.push(k);
        });

        setColumns(ordered);
        setData(objs.map(o => {
          const r = {};
          ordered.forEach(k => r[k] = o[k] ?? "");
          return r;
        }));

        const initialFacets = {};
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
        if (String(r[c] ?? "") !== v) return false;
      }
      const q = nameSearch.trim().toLowerCase();
      if (!q) return true;
      return nameSearchCols.some(c => String(r[c] ?? "").toLowerCase().includes(q));
    });
  }, [data, facets, nameSearch]);

  const optionSetForFacet = (targetCol) => {
    const q = nameSearch.trim().toLowerCase();
    const rows = data.filter(r => {
      for (const [c, v] of Object.entries(facets)) {
        if (!v) continue;
        if (c === targetCol) continue;
        if (String(r[c] ?? "") !== v) return false;
      }
      if (q && !nameSearchCols.some(c => String(r[c] ?? "").toLowerCase().includes(q))) return false;
      return true;
    });
    const set = new Set();
    rows.forEach(r => set.add(String(r[targetCol] ?? "")));
    return Array.from(set).filter(v => v.length).sort((a, b) => a.localeCompare(b));
  };

  const totalPages = Math.max(1, Math.ceil(filteredData.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const startIdx = (currentPage - 1) * pageSize;
  const endIdx = Math.min(startIdx + pageSize, filteredData.length);
  const currentPageData = filteredData.slice(startIdx, endIdx);

  const handleClearFilters = () => {
    setNameSearch("");
    const cleared = {};
    Object.keys(facets).forEach(k => cleared[k] = "");
    setFacets(cleared);
    setSelectedKeys(new Set());
    setPage(1);
  };

  const handleToggleRow = (key) => {
    const newSelected = new Set(selectedKeys);
    if (newSelected.has(key)) {
      newSelected.delete(key);
    } else {
      newSelected.add(key);
    }
    setSelectedKeys(newSelected);
  };

  const handleToggleAllPage = () => {
    const newSelected = new Set(selectedKeys);
    const allChecked = currentPageData.every(r => selectedKeys.has(rowKey(r)));
    
    if (allChecked) {
      currentPageData.forEach(r => newSelected.delete(rowKey(r)));
    } else {
      currentPageData.forEach(r => newSelected.add(rowKey(r)));
    }
    setSelectedKeys(newSelected);
  };

  const masterCheckboxState = useMemo(() => {
    if (currentPageData.length === 0) return { checked: false, indeterminate: false };
    const checkedCount = currentPageData.filter(r => selectedKeys.has(rowKey(r))).length;
    if (checkedCount === 0) return { checked: false, indeterminate: false };
    if (checkedCount === currentPageData.length) return { checked: true, indeterminate: false };
    return { checked: false, indeterminate: true };
  }, [currentPageData, selectedKeys]);

  const toCSV = (rows, cols) => {
    const q = v => {
      const s = String(v ?? "");
      return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
    };
    return cols.map(q).join(",") + "\n" + rows.map(r => cols.map(c => q(r[c])).join(",")).join("\n");
  };

  const getScopeRows = (scope) => {
    if (scope === "page") return currentPageData;
    if (scope === "selected") {
      const map = new Map(filteredData.map(r => [rowKey(r), r]));
      const keep = [];
      selectedKeys.forEach(k => {
        if (map.has(k)) keep.push(map.get(k));
      });
      return keep;
    }
    return filteredData;
  };

  const triggerDownload = (scope) => {
    const rows = getScopeRows(scope);
    if (!rows.length) {
      alert("No rows to download for the chosen scope.");
      return;
    }
    const csv = toCSV(rows, columns);
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const ts = new Date().toISOString().replace(/[:.]/g, "-");
    const a = document.createElement("a");
    a.href = url;
    a.download = `gcc-data-${scope}-${ts}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const handleDownloadClick = () => {
    setShowModal(true);
  };

  const handleFormSuccess = () => {
    setShowModal(false);
    triggerDownload(downloadScope);
  };

  useEffect(() => {
    const handleMessage = (event) => {
      try {
        const d = event.data;
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
  }, [downloadScope]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-20 px-4">
        <div className="max-w-[1400px] mx-auto">
          <h1 className="text-5xl font-bold mb-8">GCC List</h1>
          
          {loading ? (
            <div className="text-xl text-muted-foreground">Loading data...</div>
          ) : (
            <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
              {/* Header */}
              <div className="p-4 border-b grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-wrap gap-3 items-center">
                  <div className="relative flex-1 min-w-[200px]">
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
                  <button
                    onClick={handleClearFilters}
                    className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg text-sm font-semibold hover:bg-blue-50"
                  >
                    Clear
                  </button>
                </div>
                
                <div className="flex flex-wrap gap-3 items-center justify-end">
                  <label className="text-sm text-muted-foreground">Scope</label>
                  <select
                    value={downloadScope}
                    onChange={(e) => setDownloadScope(e.target.value)}
                    className="px-3 py-2 border rounded-lg text-sm"
                  >
                    <option value="filtered">All filtered</option>
                    <option value="page">Current page</option>
                    <option value="selected">Selected only</option>
                  </select>
                  <button
                    onClick={handleDownloadClick}
                    className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg text-sm font-semibold hover:bg-blue-50 flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                  <span className="px-3 py-2 border rounded-full text-sm bg-white">
                    Selected: <strong>{selectedKeys.size}</strong>
                  </span>
                </div>
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
                        {options.map(opt => (
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
                      <th className="p-3 text-center border-b sticky left-0 bg-slate-50 z-10">
                        <input
                          type="checkbox"
                          checked={masterCheckboxState.checked}
                          ref={el => {
                            if (el) el.indeterminate = masterCheckboxState.indeterminate;
                          }}
                          onChange={handleToggleAllPage}
                          disabled={currentPageData.length === 0}
                        />
                      </th>
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
                        <td colSpan={columns.length + 1} className="p-8 text-center text-muted-foreground">
                          No results.
                        </td>
                      </tr>
                    ) : (
                      currentPageData.map((row, idx) => {
                        const key = rowKey(row);
                        return (
                          <tr key={idx} className="hover:bg-slate-50">
                            <td className="p-3 text-center border-b sticky left-0 bg-white">
                              <input
                                type="checkbox"
                                checked={selectedKeys.has(key)}
                                onChange={() => handleToggleRow(key)}
                              />
                            </td>
                            {columns.map(col => (
                              <td key={col} className="p-3 border-b">
                                {row[col] ?? ""}
                              </td>
                            ))}
                          </tr>
                        );
                      })
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
      </main>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[80vh] flex flex-col shadow-2xl">
            <div className="p-4 border-b flex justify-between items-center">
              <strong className="text-lg">Quick form to unlock download</strong>
              <button
                onClick={() => setShowModal(false)}
                className="text-xl hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-hidden">
              <iframe
                key={showModal ? 'open' : 'closed'}
                id="JotFormIFrame-253003277590454"
                title="BR LD - Abhishek"
                src="https://form.jotform.com/253003277590454"
                className="w-full h-full border-0"
                allow="geolocation; microphone; camera; fullscreen; payment"
              />
            </div>
            <div className="p-3 border-t text-center">
              <span className="text-sm text-muted-foreground">
                After you submit the download starts automatically
              </span>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default GCCList;
