import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { Input } from './ui/input';
import { Button } from './ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import {
  Search,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Building2,
  Filter,
  RefreshCcw,
  Sparkles,
  Download,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { CompanyDetailView } from './CompanyDetailView';
import { MultiSelect } from './ui/multi-select';
import { Checkbox } from './ui/checkbox';
import { DownloadTypeSelectionDialog } from './DownloadTypeSelectionDialog';
import { FormatSelectionDialog } from './FormatSelectionDialog';
import { DataExportDisclaimerDialog } from './DataExportDisclaimerDialog';
import { exportToXLSX, exportToCSV, generateExportFilename } from '../utils/dataExporter';
import { getIPInfo } from '../utils/ipUtils';
import { toast } from 'sonner';

const LOGO_DEV_PUBLISHABLE_KEY = import.meta.env.VITE_LOGO_DEV_PUBLISHABLE_KEY ?? 'LOGO_DEV_PUBLISHABLE_KEY';



// Helper to safely parse years_in_india (handles non-numeric strings)
const parseYearsInIndia = (value: string | null): number => {
  if (!value) return 0;
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? 0 : parsed;
};

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

interface GCCCompany {
  id: string;
  account_global_legal_name: string;
  revenue_range: string | null;
  hq_country: string | null;
  hq_region: string | null;
  website: string | null;
  industry: string | null;
  category: string | null;
  total_centers: number | null;
  total_gcc_centers: number | null;
  india_employees_range: string | null;
  established_in_india: string | null;
  years_in_india: string | null;
  primary_city: string | null;
  secondary_city: string | null;
  services_offered: string | null;
}

type SortField = keyof GCCCompany | null;
type SortDirection = 'asc' | 'desc' | null;

export function GCCCompaniesTable() {
  const { user } = useAuth();
  const [companies, setCompanies] = useState<GCCCompany[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Filters - Multi-select (arrays)
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [revenueFilters, setRevenueFilters] = useState<string[]>([]);
  const [countryFilters, setCountryFilters] = useState<string[]>([]);
  const [categoryFilters, setCategoryFilters] = useState<string[]>([]);
  const [primaryCityFilters, setPrimaryCityFilters] = useState<string[]>([]);



  // Sorting
  const [sortField, setSortField] = useState<SortField>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  // Detail view
  const [selectedCompany, setSelectedCompany] = useState<GCCCompany | null>(null);
  const [detailViewOpen, setDetailViewOpen] = useState(false);

  // Selection and Export state
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [showDownloadTypeDialog, setShowDownloadTypeDialog] = useState(false);
  const [showFormatDialog, setShowFormatDialog] = useState(false);
  const [showDisclaimerDialog, setShowDisclaimerDialog] = useState(false);
  const [downloadType, setDownloadType] = useState<'all' | 'selected'>('all');
  const [exportFormat, setExportFormat] = useState<'xlsx' | 'csv'>('xlsx');
  const [isExporting, setIsExporting] = useState(false);

  // Prevent right-click (context menu)
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    return false;
  };

  // Prevent text selection
  const handleSelectStart = (e: React.SyntheticEvent) => {
    e.preventDefault();
    return false;
  };

  // Prevent copy
  const handleCopy = (e: React.ClipboardEvent) => {
    e.preventDefault();
    return false;
  };

  // Fetch companies from Supabase
  useEffect(() => {
    async function fetchCompanies() {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch all records using pagination to bypass Supabase max_rows limit
        const pageSize = 1000;
        let allData: GCCCompany[] = [];
        let page = 0;
        let hasMore = true;

        while (hasMore) {
          const from = page * pageSize;
          const to = from + pageSize - 1;

          const { data, error: fetchError } = await supabase
            .from('gcc_companies')
            .select('*')
            .order('account_global_legal_name', { ascending: true })
            .range(from, to);

          if (fetchError) {
            throw fetchError;
          }

          if (data && data.length > 0) {
            allData = [...allData, ...data];
            page++;
            hasMore = data.length === pageSize;
          } else {
            hasMore = false;
          }
        }

        setCompanies(allData);

        // Initialize filters to "All Selected" state
        if (allData.length > 0) {
          const allRevenues = Array.from(new Set(allData.map(c => c.revenue_range).filter(Boolean) as string[])).sort();
          const allCountries = Array.from(new Set(allData.map(c => c.hq_country).filter(Boolean) as string[])).sort();
          const allCategories = Array.from(new Set(allData.map(c => c.category).filter(Boolean) as string[])).sort();
          const allCities = Array.from(new Set(allData.map(c => c.primary_city).filter(Boolean) as string[])).sort();

          setRevenueFilters(allRevenues);
          setCountryFilters(allCountries);
          setCategoryFilters(allCategories);
          setPrimaryCityFilters(allCities);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load GCC companies');
      } finally {
        setIsLoading(false);
      }
    }

    fetchCompanies();
  }, []);

  // Debounce search query to prevent excessive filtering on every keystroke
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Apply filters and sorting
  const filteredAndSortedCompanies = useMemo(() => {
    let filtered = companies;

    // Search filter (using debounced query)
    if (debouncedSearchQuery) {
      const query = debouncedSearchQuery.toLowerCase();
      filtered = filtered.filter(company =>
        company.account_global_legal_name?.toLowerCase().includes(query)
      );
    }

    // Multi-select dropdown filters
    if (revenueFilters.length > 0) {
      filtered = filtered.filter(c => c.revenue_range && revenueFilters.includes(c.revenue_range));
    }
    if (countryFilters.length > 0) {
      filtered = filtered.filter(c => c.hq_country && countryFilters.includes(c.hq_country));
    }
    if (categoryFilters.length > 0) {
      filtered = filtered.filter(c => c.category && categoryFilters.includes(c.category));
    }
    if (primaryCityFilters.length > 0) {
      filtered = filtered.filter(c => c.primary_city && primaryCityFilters.includes(c.primary_city));
    }



    // Apply sorting
    if (sortField && sortDirection) {
      filtered = [...filtered].sort((a, b) => {
        // Special handling for years_in_india - sort numerically
        if (sortField === 'years_in_india') {
          const aVal = parseYearsInIndia(a.years_in_india);
          const bVal = parseYearsInIndia(b.years_in_india);
          const comparison = aVal - bVal;
          return sortDirection === 'asc' ? comparison : -comparison;
        }

        const aVal = a[sortField];
        const bVal = b[sortField];

        if (aVal === null || aVal === undefined) return 1;
        if (bVal === null || bVal === undefined) return -1;

        let comparison = 0;
        if (typeof aVal === 'number' && typeof bVal === 'number') {
          comparison = aVal - bVal;
        } else {
          comparison = String(aVal).localeCompare(String(bVal));
        }

        return sortDirection === 'asc' ? comparison : -comparison;
      });
    }

    return filtered;
  }, [companies, debouncedSearchQuery, revenueFilters, countryFilters, categoryFilters, primaryCityFilters,
    sortField, sortDirection]);

  // Cascading filter options - computed from filtered data (excluding current filter)
  const getFilteredForCascade = useCallback((excludeFilter: string) => {
    let filtered = companies;

    if (excludeFilter !== 'revenue' && revenueFilters.length > 0) {
      filtered = filtered.filter(c => c.revenue_range && revenueFilters.includes(c.revenue_range));
    }
    if (excludeFilter !== 'country' && countryFilters.length > 0) {
      filtered = filtered.filter(c => c.hq_country && countryFilters.includes(c.hq_country));
    }
    if (excludeFilter !== 'category' && categoryFilters.length > 0) {
      filtered = filtered.filter(c => c.category && categoryFilters.includes(c.category));
    }
    if (excludeFilter !== 'city' && primaryCityFilters.length > 0) {
      filtered = filtered.filter(c => c.primary_city && primaryCityFilters.includes(c.primary_city));
    }

    return filtered;
  }, [companies, revenueFilters, countryFilters, categoryFilters, primaryCityFilters]);

  const cascadingRevenues = useMemo(() => {
    const filtered = getFilteredForCascade('revenue');
    const values = new Set(filtered.map(c => c.revenue_range).filter(Boolean) as string[]);
    return Array.from(values).sort();
  }, [getFilteredForCascade]);

  const cascadingCountries = useMemo(() => {
    const filtered = getFilteredForCascade('country');
    const values = new Set(filtered.map(c => c.hq_country).filter(Boolean) as string[]);
    return Array.from(values).sort();
  }, [getFilteredForCascade]);

  const cascadingCategories = useMemo(() => {
    const filtered = getFilteredForCascade('category');
    const values = new Set(filtered.map(c => c.category).filter(Boolean) as string[]);
    return Array.from(values).sort();
  }, [getFilteredForCascade]);

  const cascadingCities = useMemo(() => {
    const filtered = getFilteredForCascade('city');
    const values = new Set(filtered.map(c => c.primary_city).filter(Boolean) as string[]);
    return Array.from(values).sort();
  }, [getFilteredForCascade]);

  // Sync selected filters with cascading options - remove selected values that are no longer available
  useEffect(() => {
    const validRevenues = revenueFilters.filter(r => cascadingRevenues.includes(r));
    if (validRevenues.length !== revenueFilters.length) {
      setRevenueFilters(validRevenues);
    }
  }, [cascadingRevenues]);

  useEffect(() => {
    const validCountries = countryFilters.filter(c => cascadingCountries.includes(c));
    if (validCountries.length !== countryFilters.length) {
      setCountryFilters(validCountries);
    }
  }, [cascadingCountries]);

  useEffect(() => {
    const validCategories = categoryFilters.filter(c => cascadingCategories.includes(c));
    if (validCategories.length !== categoryFilters.length) {
      setCategoryFilters(validCategories);
    }
  }, [cascadingCategories]);

  useEffect(() => {
    const validCities = primaryCityFilters.filter(c => cascadingCities.includes(c));
    if (validCities.length !== primaryCityFilters.length) {
      setPrimaryCityFilters(validCities);
    }
  }, [cascadingCities]);



  // Pagination
  const totalPages = Math.ceil(filteredAndSortedCompanies.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCompanies = filteredAndSortedCompanies.slice(startIndex, endIndex);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, revenueFilters, countryFilters, categoryFilters, primaryCityFilters]);

  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(1, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(totalPages, prev + 1));
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else if (sortDirection === 'desc') {
        setSortField(null);
        setSortDirection(null);
      }
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="h-4 w-4 opacity-40" />;
    }
    if (sortDirection === 'asc') {
      return <ArrowUp className="h-4 w-4 text-primary" />;
    }
    return <ArrowDown className="h-4 w-4 text-primary" />;
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    // Reset filters to "All Selected" (all available options)
    const allRevenues = Array.from(new Set(companies.map(c => c.revenue_range).filter(Boolean) as string[])).sort();
    const allCountries = Array.from(new Set(companies.map(c => c.hq_country).filter(Boolean) as string[])).sort();
    const allCategories = Array.from(new Set(companies.map(c => c.category).filter(Boolean) as string[])).sort();
    const allCities = Array.from(new Set(companies.map(c => c.primary_city).filter(Boolean) as string[])).sort();

    setRevenueFilters(allRevenues);
    setCountryFilters(allCountries);
    setCategoryFilters(allCategories);
    setPrimaryCityFilters(allCities);
  };

  const handleCompanyClick = (company: GCCCompany) => {
    setSelectedCompany(company);
    setDetailViewOpen(true);
  };

  // Checkbox selection handlers
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allIds = new Set(currentCompanies.map(c => c.id));
      setSelectedRows(allIds);
    } else {
      setSelectedRows(new Set());
    }
  };

  const handleRowSelect = (companyId: string, checked: boolean) => {
    const newSelection = new Set(selectedRows);
    if (checked) {
      newSelection.add(companyId);
    } else {
      newSelection.delete(companyId);
    }
    setSelectedRows(newSelection);
  };

  // Download flow handlers
  const handleDownloadClick = () => {
    setShowDownloadTypeDialog(true);
  };

  const handleSelectDownloadAll = () => {
    setDownloadType('all');
    setShowDownloadTypeDialog(false);
    setShowFormatDialog(true);
  };

  const handleSelectDownloadSelected = () => {
    if (selectedRows.size === 0) {
      toast.error('Please select at least one company to export');
      return;
    }
    setDownloadType('selected');
    setShowDownloadTypeDialog(false);
    setShowFormatDialog(true);
  };

  const handleSelectXLSX = () => {
    setExportFormat('xlsx');
    setShowFormatDialog(false);
    setShowDisclaimerDialog(true);
  };

  const handleSelectCSV = () => {
    setExportFormat('csv');
    setShowFormatDialog(false);
    setShowDisclaimerDialog(true);
  };

  const handleBackToDownloadType = () => {
    setShowFormatDialog(false);
    setShowDownloadTypeDialog(true);
  };

  const handleBackToFormat = () => {
    setShowDisclaimerDialog(false);
    setShowFormatDialog(true);
  };

  // Actual export handler
  const handleConfirmedExport = async () => {
    if (!user?.email) {
      toast.error('User email not found');
      return;
    }

    try {
      setIsExporting(true);
      toast.info('Preparing your export...');

      // Determine which data to export
      const dataToExport = downloadType === 'all'
        ? filteredAndSortedCompanies
        : filteredAndSortedCompanies.filter(c => selectedRows.has(c.id));

      if (dataToExport.length === 0) {
        toast.error('No data to export');
        return;
      }

      // Generate filename
      const scopeName = downloadType === 'all' ? 'All_Filtered' : 'Selected';
      const scopeLabel = downloadType === 'all' ? 'All Filtered Companies' : 'Selected Companies';
      const filename = generateExportFilename(exportFormat, scopeName);

      // Export based on format
      if (exportFormat === 'xlsx') {
        exportToXLSX(dataToExport, filename, {
          licenseeEmail: user.email,
          scopeLabel,
          recordCount: dataToExport.length,
          exportSource: 'Bamboo Reports - GCC Explorer',
        });
      } else {
        exportToCSV(dataToExport, filename);
      }

      // Log the export
      try {
        const ipInfo = await getIPInfo();

        await supabase.from('download_logs').insert({
          user_id: user.id,
          user_email: user.email,
          document_id: null, // Data exports don't have a plan_document
          document_title: `GCC Companies Export - ${downloadType === 'all' ? 'All Filtered' : 'Selected'} (${exportFormat.toUpperCase()}) - ${dataToExport.length} records`,
          plan_name: 'Explorer',
          user_agent: navigator.userAgent,
          ip_address: ipInfo?.ip || null,
        });
      } catch (logError) {
        console.error('Failed to log export:', logError);
      }

      toast.success(`Successfully exported ${dataToExport.length} ${dataToExport.length === 1 ? 'company' : 'companies'}!`);
      setShowDisclaimerDialog(false);

      // Clear selection after export if it was a selected export
      if (downloadType === 'selected') {
        setSelectedRows(new Set());
      }
    } catch (error) {
      console.error('Export error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to export data');
    } finally {
      setIsExporting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading GCC companies...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-800">Error: {error}</p>
      </div>
    );
  }

  return (
    <div
      className="space-y-6 select-none"
      onContextMenu={handleContextMenu}
      onSelect={handleSelectStart as unknown as React.ReactEventHandler}
      onCopy={handleCopy}
      style={{
        userSelect: 'none',
        WebkitUserSelect: 'none',
      }}
    >
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600 shadow-sm">
          <Sparkles className="h-3.5 w-3.5 text-amber-500" />
          Curated dataset
        </div>
        <h2 className="text-3xl font-bold text-slate-900">L1 List - {companies.length.toLocaleString()}+ GCCs</h2>
      </div>

      {/* Filters */}
      <div className="rounded-2xl border border-slate-200/80 bg-gradient-to-br from-slate-50 to-white p-6 shadow-sm space-y-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="inline-flex items-center gap-2 text-sm font-semibold text-slate-800">
            <Filter className="h-4 w-4 text-slate-500" />
            Refine companies
          </div>
          <div className="text-xs text-slate-500">
            Showing {filteredAndSortedCompanies.length.toLocaleString()} of {companies.length.toLocaleString()} companies
          </div>
        </div>

        {/* Search and Clear */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by Account Global Legal Name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-11 rounded-xl border-slate-200 bg-white pl-10 text-sm shadow-inner shadow-slate-100"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleClearFilters}
              className="gap-2 rounded-xl border-slate-200 bg-white text-slate-700 shadow-sm hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
            >
              <RefreshCcw className="h-4 w-4" />
              Reset filters
            </Button>
            <Button
              variant="default"
              onClick={handleDownloadClick}
              className="gap-2 rounded-xl shadow-sm relative"
            >
              <Download className="h-4 w-4" />
              Download Data
              {selectedRows.size > 0 && (
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-white">
                  {selectedRows.size}
                </span>
              )}
            </Button>
          </div>
        </div>

        {/* Multi-select Dropdown Filters */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wide text-gray-600">Revenue Range</label>
            <MultiSelect
              options={cascadingRevenues}
              selected={revenueFilters}
              onChange={setRevenueFilters}
              placeholder="All"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wide text-gray-600">HQ Country</label>
            <MultiSelect
              options={cascadingCountries}
              selected={countryFilters}
              onChange={setCountryFilters}
              placeholder="All"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wide text-gray-600">Category</label>
            <MultiSelect
              options={cascadingCategories}
              selected={categoryFilters}
              onChange={setCategoryFilters}
              placeholder="All"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wide text-gray-600">Primary City</label>
            <MultiSelect
              options={cascadingCities}
              selected={primaryCityFilters}
              onChange={setPrimaryCityFilters}
              placeholder="All"
            />
          </div>
        </div>

        {/* Results count */}
        <div className="text-sm text-gray-600 pt-2 border-t">
          Showing {filteredAndSortedCompanies.length === 0 ? 0 : startIndex + 1}-{Math.min(endIndex, filteredAndSortedCompanies.length)} of {filteredAndSortedCompanies.length} companies
        </div>
      </div>

      {/* Table */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-md">
        {/* Watermark Overlay */}
        {user?.email && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-10">
            <div
              className="text-gray-200/20 text-4xl font-semibold transform -rotate-45 select-none"
              style={{
                textShadow: '0 0 20px rgba(255,255,255,0.8)',
                letterSpacing: '0.1em'
              }}
            >
              {user.email}
            </div>
          </div>
        )}

        <div className="overflow-auto max-h-[500px]">
          <Table className="min-w-[960px] text-sm">
            <TableHeader>
              <TableRow className="bg-slate-50/90 backdrop-blur sticky top-0 z-20">
                <TableHead className="w-[50px] text-xs font-semibold uppercase tracking-wide text-slate-600 border-b border-slate-200">
                  <div className="flex items-center justify-center">
                    <Checkbox
                      checked={currentCompanies.length > 0 && currentCompanies.every(c => selectedRows.has(c.id))}
                      onCheckedChange={(checked) => handleSelectAll(checked === true)}
                      aria-label="Select all companies on this page"
                    />
                  </div>
                </TableHead>
                <TableHead className="min-w-[250px] cursor-pointer text-xs font-semibold uppercase tracking-wide text-slate-600 border-b border-slate-200 transition hover:bg-slate-100" onClick={() => handleSort('account_global_legal_name')}>
                  <div className="flex items-center gap-1">
                    Account Global Legal Name {getSortIcon('account_global_legal_name')}
                  </div>
                </TableHead>
                <TableHead className="min-w-[150px] cursor-pointer text-xs font-semibold uppercase tracking-wide text-slate-600 border-b border-slate-200 transition hover:bg-slate-100" onClick={() => handleSort('revenue_range')}>
                  <div className="flex items-center gap-1">
                    Revenue Range {getSortIcon('revenue_range')}
                  </div>
                </TableHead>
                <TableHead className="min-w-[150px] cursor-pointer text-xs font-semibold uppercase tracking-wide text-slate-600 border-b border-slate-200 transition hover:bg-slate-100" onClick={() => handleSort('hq_country')}>
                  <div className="flex items-center gap-1">
                    HQ Country {getSortIcon('hq_country')}
                  </div>
                </TableHead>
                <TableHead className="min-w-[120px] cursor-pointer text-xs font-semibold uppercase tracking-wide text-slate-600 border-b border-slate-200 transition hover:bg-slate-100" onClick={() => handleSort('category')}>
                  <div className="flex items-center gap-1">
                    Category {getSortIcon('category')}
                  </div>
                </TableHead>
                <TableHead className="min-w-[120px] text-right cursor-pointer text-xs font-semibold uppercase tracking-wide text-slate-600 border-b border-slate-200 transition hover:bg-slate-100" onClick={() => handleSort('total_centers')}>
                  <div className="flex items-center justify-end gap-1 whitespace-nowrap">
                    Total Centers {getSortIcon('total_centers')}
                  </div>
                </TableHead>
                <TableHead className="min-w-[140px] text-right cursor-pointer text-xs font-semibold uppercase tracking-wide text-slate-600 border-b border-slate-200 transition hover:bg-slate-100" onClick={() => handleSort('total_gcc_centers')}>
                  <div className="flex items-center justify-end gap-1 whitespace-nowrap">
                    Total GCC Centers {getSortIcon('total_gcc_centers')}
                  </div>
                </TableHead>
                <TableHead className="min-w-[150px] text-right cursor-pointer text-xs font-semibold uppercase tracking-wide text-slate-600 border-b border-slate-200 transition hover:bg-slate-100" onClick={() => handleSort('years_in_india')}>
                  <div className="flex items-center justify-end gap-1">
                    Years in India {getSortIcon('years_in_india')}
                  </div>
                </TableHead>
                <TableHead className="min-w-[150px] cursor-pointer text-xs font-semibold uppercase tracking-wide text-slate-600 border-b border-slate-200 transition hover:bg-slate-100" onClick={() => handleSort('primary_city')}>
                  <div className="flex items-center gap-1">
                    Primary City {getSortIcon('primary_city')}
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentCompanies.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8 text-slate-500">
                    No companies found matching your filters
                  </TableCell>
                </TableRow>
              ) : (
                currentCompanies.map((company) => {
                  const logoDomain = getDomainFromWebsite(company.website);

                  return (
                    <TableRow
                      key={company.id}
                      className={`group border-b last:border-b-0 odd:bg-slate-50/40 hover:bg-slate-50/90 transition ${selectedRows.has(company.id) ? 'bg-blue-50/30' : ''
                        }`}
                    >
                      <TableCell className="py-3">
                        <div className="flex items-center justify-center">
                          <Checkbox
                            checked={selectedRows.has(company.id)}
                            onCheckedChange={(checked) => handleRowSelect(company.id, checked === true)}
                            aria-label={`Select ${company.account_global_legal_name}`}
                          />
                        </div>
                      </TableCell>
                      <TableCell className="py-3 font-medium text-slate-900">
                        <div className="flex items-center gap-3">
                          <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full border border-slate-200 bg-slate-50 shadow-inner shadow-slate-100 flex items-center justify-center text-slate-400">
                            <Building2 className="h-4 w-4" />
                            {logoDomain && (
                              <img
                                src={`https://img.logo.dev/${logoDomain}?token=${LOGO_DEV_PUBLISHABLE_KEY}&format=jpg&size=180`}
                                alt={`${company.account_global_legal_name} logo`}
                                loading="lazy"
                                onError={(e) => {
                                  e.currentTarget.style.display = 'none';
                                }}
                                className="absolute inset-0 h-full w-full object-cover p-1"
                              />
                            )}
                          </div>
                          <button
                            onClick={() => handleCompanyClick(company)}
                            className="inline-flex items-center gap-2 rounded-lg px-1 text-left text-slate-900 transition hover:text-slate-800 hover:underline decoration-slate-300 decoration-2"
                          >
                            <span>{company.account_global_legal_name}</span>
                            <ChevronRight className="h-4 w-4 text-slate-400 opacity-0 translate-x-[-2px] transition duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
                          </button>
                        </div>
                      </TableCell>
                      <TableCell className="py-3 text-slate-700">
                        {company.revenue_range ? (
                          <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-100">
                            {company.revenue_range}
                          </span>
                        ) : (
                          <span className="text-slate-400">-</span>
                        )}
                      </TableCell>
                      <TableCell className="py-3 text-slate-700">
                        {company.hq_country ? (
                          <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-200">
                            {company.hq_country}
                          </span>
                        ) : (
                          <span className="text-slate-400">-</span>
                        )}
                      </TableCell>
                      <TableCell className="py-3 text-slate-700">
                        {company.category ? (
                          <span className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 ring-1 ring-indigo-100">
                            {company.category}
                          </span>
                        ) : (
                          <span className="text-slate-400">-</span>
                        )}
                      </TableCell>
                      <TableCell className="py-3 text-right text-slate-700">
                        {company.total_centers ?? '-'}
                      </TableCell>
                      <TableCell className="py-3 text-right text-slate-700">
                        {company.total_gcc_centers ?? '-'}
                      </TableCell>
                      <TableCell className="py-3 text-right text-slate-700">{company.years_in_india || '-'}</TableCell>
                      <TableCell className="py-3 text-slate-700">
                        {company.primary_city ? (
                          <span className="inline-flex items-center rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700 ring-1 ring-sky-100">
                            {company.primary_city}
                          </span>
                        ) : (
                          <span className="text-slate-400">-</span>
                        )}
                      </TableCell>
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
          onClick={handlePreviousPage}
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
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600">Rows per page:</label>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                const value = Math.min(20, Math.max(1, parseInt(e.target.value) || 10));
                setItemsPerPage(value);
                setCurrentPage(1);
              }}
              className="rounded border border-slate-200 bg-white px-2 py-1 text-sm shadow-inner shadow-slate-100"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={20}>20</option>
            </select>
          </div>
        </div>

        <Button
          variant="outline"
          onClick={handleNextPage}
          disabled={currentPage === totalPages || totalPages === 0}
          className="gap-2 rounded-lg"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Protection Notice */}
      {user?.email && (
        <div className="bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-lg px-6 py-3 text-center">
          <p className="text-gray-500 text-xs font-medium">
            <span className="inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50"></span>
              Licensed to <span className="text-gray-700">{user.email}</span>
              <span className="text-gray-400 mx-2">•</span>
              Confidential & Protected
            </span>
          </p>
        </div>
      )}

      {/* Detail View Modal */}
      <CompanyDetailView
        company={selectedCompany}
        open={detailViewOpen}
        onOpenChange={setDetailViewOpen}
      />

      {/* Export Dialogs */}
      <DownloadTypeSelectionDialog
        open={showDownloadTypeDialog}
        onOpenChange={setShowDownloadTypeDialog}
        onSelectAll={handleSelectDownloadAll}
        onSelectSelected={handleSelectDownloadSelected}
        totalCount={filteredAndSortedCompanies.length}
        selectedCount={selectedRows.size}
      />

      <FormatSelectionDialog
        open={showFormatDialog}
        onOpenChange={setShowFormatDialog}
        onSelectXLSX={handleSelectXLSX}
        onSelectCSV={handleSelectCSV}
        onBack={handleBackToDownloadType}
        exportCount={downloadType === 'all' ? filteredAndSortedCompanies.length : selectedRows.size}
        exportScopeLabel={downloadType === 'all' ? 'filtered companies' : 'selected companies'}
      />

      <DataExportDisclaimerDialog
        open={showDisclaimerDialog}
        onOpenChange={setShowDisclaimerDialog}
        onConfirm={handleConfirmedExport}
        onBack={handleBackToFormat}
        exportCount={downloadType === 'all' ? filteredAndSortedCompanies.length : selectedRows.size}
        exportFormat={exportFormat}
        isExporting={isExporting}
      />
    </div>
  );
}
