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
import { Search, ChevronLeft, ChevronRight, ArrowUpDown, ArrowUp, ArrowDown, X, Building2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { CompanyDetailView } from './CompanyDetailView';
import { MultiSelect } from './ui/multi-select';
import { DualRangeSlider } from './ui/dual-range-slider';

const LOGO_DEV_PUBLISHABLE_KEY = import.meta.env.VITE_LOGO_DEV_PUBLISHABLE_KEY ?? 'LOGO_DEV_PUBLISHABLE_KEY';

// Helper function to safely parse integers with bounds validation
const parseIntSafe = (value: string, fallback: number, min?: number, max?: number): number => {
  const parsed = parseInt(value, 10);
  if (isNaN(parsed)) return fallback;
  let result = parsed;
  if (min !== undefined) result = Math.max(min, result);
  if (max !== undefined) result = Math.min(max, result);
  return result;
};

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

  // Range filters - using tuples [min, max]
  const [totalCentersRange, setTotalCentersRange] = useState<[number, number]>([0, 100]);
  const [gccCentersRange, setGccCentersRange] = useState<[number, number]>([0, 50]);
  const [yearsInIndiaRange, setYearsInIndiaRange] = useState<[number, number]>([0, 50]);

  // Range bounds (computed from data)
  const [totalCentersBounds, setTotalCentersBounds] = useState<[number, number]>([0, 100]);
  const [gccCentersBounds, setGccCentersBounds] = useState<[number, number]>([0, 50]);
  const [yearsInIndiaBounds, setYearsInIndiaBounds] = useState<[number, number]>([0, 50]);

  // Sorting
  const [sortField, setSortField] = useState<SortField>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  // Detail view
  const [selectedCompany, setSelectedCompany] = useState<GCCCompany | null>(null);
  const [detailViewOpen, setDetailViewOpen] = useState(false);

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

        // Calculate bounds for range filters
        if (allData.length > 0) {
          const maxTotalCenters = Math.max(...allData.map(c => c.total_centers ?? 0));
          const maxGccCenters = Math.max(...allData.map(c => c.total_gcc_centers ?? 0));
          const maxYears = Math.max(...allData.map(c => parseYearsInIndia(c.years_in_india)));

          setTotalCentersBounds([0, maxTotalCenters || 100]);
          setGccCentersBounds([0, maxGccCenters || 50]);
          setYearsInIndiaBounds([0, maxYears || 50]);

          // Initialize ranges to full bounds
          setTotalCentersRange([0, maxTotalCenters || 100]);
          setGccCentersRange([0, maxGccCenters || 50]);
          setYearsInIndiaRange([0, maxYears || 50]);
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

    // Range filters
    filtered = filtered.filter(c => {
      const centers = c.total_centers ?? 0;
      return centers >= totalCentersRange[0] && centers <= totalCentersRange[1];
    });
    filtered = filtered.filter(c => {
      const gccCenters = c.total_gcc_centers ?? 0;
      return gccCenters >= gccCentersRange[0] && gccCenters <= gccCentersRange[1];
    });
    filtered = filtered.filter(c => {
      const years = parseYearsInIndia(c.years_in_india);
      return years >= yearsInIndiaRange[0] && years <= yearsInIndiaRange[1];
    });

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
    totalCentersRange, gccCentersRange, yearsInIndiaRange, sortField, sortDirection]);

  // Cascading filter options - computed from filtered data (excluding current filter)
  const getFilteredForCascade = useCallback((excludeFilter: string) => {
    let filtered = companies;

    if (debouncedSearchQuery) {
      const query = debouncedSearchQuery.toLowerCase();
      filtered = filtered.filter(company =>
        company.account_global_legal_name?.toLowerCase().includes(query)
      );
    }

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

    // Apply range filters for cascade
    filtered = filtered.filter(c => {
      const centers = c.total_centers ?? 0;
      return centers >= totalCentersRange[0] && centers <= totalCentersRange[1];
    });
    filtered = filtered.filter(c => {
      const gccCenters = c.total_gcc_centers ?? 0;
      return gccCenters >= gccCentersRange[0] && gccCenters <= gccCentersRange[1];
    });
    filtered = filtered.filter(c => {
      const years = parseYearsInIndia(c.years_in_india);
      return years >= yearsInIndiaRange[0] && years <= yearsInIndiaRange[1];
    });

    return filtered;
  }, [companies, debouncedSearchQuery, revenueFilters, countryFilters, categoryFilters, primaryCityFilters, totalCentersRange, gccCentersRange, yearsInIndiaRange]);

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

  // Get filtered data for range bounds (excluding range filters)
  const getFilteredForRangeBounds = useMemo(() => {
    let filtered = companies;

    if (debouncedSearchQuery) {
      const query = debouncedSearchQuery.toLowerCase();
      filtered = filtered.filter(company =>
        company.account_global_legal_name?.toLowerCase().includes(query)
      );
    }

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

    return filtered;
  }, [companies, debouncedSearchQuery, revenueFilters, countryFilters, categoryFilters, primaryCityFilters]);

  // Cascading range bounds - each range considers the other two ranges for bidirectional cascading

  // Total Centers bounds: filter by GCC Centers and Years ranges
  const cascadingTotalCentersBounds = useMemo((): [number, number] => {
    const filtered = getFilteredForRangeBounds.filter(c => {
      const gccCenters = c.total_gcc_centers ?? 0;
      const years = parseYearsInIndia(c.years_in_india);
      return gccCenters >= gccCentersRange[0] && gccCenters <= gccCentersRange[1] &&
        years >= yearsInIndiaRange[0] && years <= yearsInIndiaRange[1];
    });

    if (filtered.length === 0) return totalCentersBounds;
    const values = filtered.map(c => c.total_centers ?? 0);
    return [Math.min(...values), Math.max(...values)];
  }, [getFilteredForRangeBounds, totalCentersBounds, gccCentersRange, yearsInIndiaRange]);

  // GCC Centers bounds: filter by Total Centers and Years ranges, cap by Total Centers max
  const cascadingGccCentersBounds = useMemo((): [number, number] => {
    const filtered = getFilteredForRangeBounds.filter(c => {
      const centers = c.total_centers ?? 0;
      const years = parseYearsInIndia(c.years_in_india);
      return centers >= totalCentersRange[0] && centers <= totalCentersRange[1] &&
        years >= yearsInIndiaRange[0] && years <= yearsInIndiaRange[1];
    });

    if (filtered.length === 0) return [0, totalCentersRange[1]];

    const values = filtered.map(c => c.total_gcc_centers ?? 0);
    const baseMin = Math.min(...values);
    const baseMax = Math.max(...values);

    // GCC Centers cannot exceed Total Centers range max
    const cappedMax = Math.min(baseMax, totalCentersRange[1]);
    const cappedMin = Math.min(baseMin, cappedMax);

    return [cappedMin, cappedMax];
  }, [getFilteredForRangeBounds, totalCentersRange, yearsInIndiaRange]);

  // Years in India bounds: filter by Total Centers and GCC Centers ranges
  const cascadingYearsInIndiaBounds = useMemo((): [number, number] => {
    const filtered = getFilteredForRangeBounds.filter(c => {
      const centers = c.total_centers ?? 0;
      const gccCenters = c.total_gcc_centers ?? 0;
      return centers >= totalCentersRange[0] && centers <= totalCentersRange[1] &&
        gccCenters >= gccCentersRange[0] && gccCenters <= gccCentersRange[1];
    });

    if (filtered.length === 0) return yearsInIndiaBounds;
    const values = filtered.map(c => parseYearsInIndia(c.years_in_india));
    return [Math.min(...values), Math.max(...values)];
  }, [getFilteredForRangeBounds, yearsInIndiaBounds, totalCentersRange, gccCentersRange]);

  // Auto-clamp GCC Centers range when cascading bounds change
  useEffect(() => {
    const [minBound, maxBound] = cascadingGccCentersBounds;
    const [currentMin, currentMax] = gccCentersRange;

    // Clamp values to new bounds
    const newMin = Math.max(minBound, Math.min(currentMin, maxBound));
    const newMax = Math.min(maxBound, Math.max(currentMax, minBound));

    if (newMin !== currentMin || newMax !== currentMax) {
      setGccCentersRange([newMin, newMax]);
    }
  }, [cascadingGccCentersBounds]);

  // Auto-clamp Total Centers range when cascading bounds change
  useEffect(() => {
    const [minBound, maxBound] = cascadingTotalCentersBounds;
    const [currentMin, currentMax] = totalCentersRange;

    const newMin = Math.max(minBound, Math.min(currentMin, maxBound));
    const newMax = Math.min(maxBound, Math.max(currentMax, minBound));

    if (newMin !== currentMin || newMax !== currentMax) {
      setTotalCentersRange([newMin, newMax]);
    }
  }, [cascadingTotalCentersBounds]);

  // Auto-clamp Years in India range when cascading bounds change
  useEffect(() => {
    const [minBound, maxBound] = cascadingYearsInIndiaBounds;
    const [currentMin, currentMax] = yearsInIndiaRange;

    const newMin = Math.max(minBound, Math.min(currentMin, maxBound));
    const newMax = Math.min(maxBound, Math.max(currentMax, minBound));

    if (newMin !== currentMin || newMax !== currentMax) {
      setYearsInIndiaRange([newMin, newMax]);
    }
  }, [cascadingYearsInIndiaBounds]);


  // Pagination
  const totalPages = Math.ceil(filteredAndSortedCompanies.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCompanies = filteredAndSortedCompanies.slice(startIndex, endIndex);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, revenueFilters, countryFilters, categoryFilters, primaryCityFilters,
    totalCentersRange, gccCentersRange, yearsInIndiaRange]);

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
      return <ArrowUpDown className="h-4 w-4 ml-1 inline opacity-40" />;
    }
    if (sortDirection === 'asc') {
      return <ArrowUp className="h-4 w-4 ml-1 inline text-primary" />;
    }
    return <ArrowDown className="h-4 w-4 ml-1 inline text-primary" />;
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setRevenueFilters([]);
    setCountryFilters([]);
    setCategoryFilters([]);
    setPrimaryCityFilters([]);
    setTotalCentersRange(totalCentersBounds);
    setGccCentersRange(gccCentersBounds);
    setYearsInIndiaRange(yearsInIndiaBounds);
  };

  const handleCompanyClick = (company: GCCCompany) => {
    setSelectedCompany(company);
    setDetailViewOpen(true);
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
      <div>
        <h2 className="text-2xl font-bold mb-2">L1 List - {companies.length.toLocaleString()}+ GCCs</h2>
        <p className="text-gray-600">Complete view of {companies.length.toLocaleString()} GCC companies</p>
      </div>

      {/* Filters */}
      <div className="bg-white border rounded-lg p-6 space-y-4">
        {/* Search and Clear */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search by Account Global Legal Name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" onClick={handleClearFilters} className="gap-2">
            <X className="h-4 w-4" />
            Clear Filters
          </Button>
        </div>

        {/* Multi-select Dropdown Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-600">Revenue Range</label>
            <MultiSelect
              options={cascadingRevenues}
              selected={revenueFilters}
              onChange={setRevenueFilters}
              placeholder="All"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-600">HQ Country</label>
            <MultiSelect
              options={cascadingCountries}
              selected={countryFilters}
              onChange={setCountryFilters}
              placeholder="All"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-600">Category</label>
            <MultiSelect
              options={cascadingCategories}
              selected={categoryFilters}
              onChange={setCategoryFilters}
              placeholder="All"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-600">Primary City</label>
            <MultiSelect
              options={cascadingCities}
              selected={primaryCityFilters}
              onChange={setPrimaryCityFilters}
              placeholder="All"
            />
          </div>
        </div>

        {/* Range Filters with Sliders */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
          <div className="space-y-3">
            <label className="text-xs font-medium text-gray-600">Total Centers ({totalCentersRange[0]} - {totalCentersRange[1]}) <span className="text-gray-400">/ {cascadingTotalCentersBounds[0]}-{cascadingTotalCentersBounds[1]} available</span></label>
            <DualRangeSlider
              min={cascadingTotalCentersBounds[0]}
              max={cascadingTotalCentersBounds[1]}
              value={totalCentersRange}
              onValueChange={(value) => setTotalCentersRange(value)}
            />
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="Min"
                value={totalCentersRange[0]}
                onChange={(e) => {
                  const val = parseIntSafe(e.target.value, cascadingTotalCentersBounds[0], cascadingTotalCentersBounds[0], totalCentersRange[1]);
                  setTotalCentersRange([val, totalCentersRange[1]]);
                }}
                className="text-sm h-8"
              />
              <Input
                type="number"
                placeholder="Max"
                value={totalCentersRange[1]}
                onChange={(e) => {
                  const val = parseIntSafe(e.target.value, cascadingTotalCentersBounds[1], totalCentersRange[0], cascadingTotalCentersBounds[1]);
                  setTotalCentersRange([totalCentersRange[0], val]);
                }}
                className="text-sm h-8"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-medium text-gray-600">Total GCC Centers ({gccCentersRange[0]} - {gccCentersRange[1]}) <span className="text-gray-400">/ {cascadingGccCentersBounds[0]}-{cascadingGccCentersBounds[1]} available</span></label>
            <DualRangeSlider
              min={cascadingGccCentersBounds[0]}
              max={cascadingGccCentersBounds[1]}
              value={gccCentersRange}
              onValueChange={(value) => setGccCentersRange(value)}
            />
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="Min"
                value={gccCentersRange[0]}
                onChange={(e) => {
                  const val = parseIntSafe(e.target.value, cascadingGccCentersBounds[0], cascadingGccCentersBounds[0], gccCentersRange[1]);
                  setGccCentersRange([val, gccCentersRange[1]]);
                }}
                className="text-sm h-8"
              />
              <Input
                type="number"
                placeholder="Max"
                value={gccCentersRange[1]}
                onChange={(e) => {
                  const val = parseIntSafe(e.target.value, cascadingGccCentersBounds[1], gccCentersRange[0], cascadingGccCentersBounds[1]);
                  setGccCentersRange([gccCentersRange[0], val]);
                }}
                className="text-sm h-8"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-medium text-gray-600">Years in India ({yearsInIndiaRange[0]} - {yearsInIndiaRange[1]}) <span className="text-gray-400">/ {cascadingYearsInIndiaBounds[0]}-{cascadingYearsInIndiaBounds[1]} available</span></label>
            <DualRangeSlider
              min={cascadingYearsInIndiaBounds[0]}
              max={cascadingYearsInIndiaBounds[1]}
              value={yearsInIndiaRange}
              onValueChange={(value) => setYearsInIndiaRange(value)}
            />
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="Min"
                value={yearsInIndiaRange[0]}
                onChange={(e) => {
                  const val = parseIntSafe(e.target.value, cascadingYearsInIndiaBounds[0], cascadingYearsInIndiaBounds[0], yearsInIndiaRange[1]);
                  setYearsInIndiaRange([val, yearsInIndiaRange[1]]);
                }}
                className="text-sm h-8"
              />
              <Input
                type="number"
                placeholder="Max"
                value={yearsInIndiaRange[1]}
                onChange={(e) => {
                  const val = parseIntSafe(e.target.value, cascadingYearsInIndiaBounds[1], yearsInIndiaRange[0], cascadingYearsInIndiaBounds[1]);
                  setYearsInIndiaRange([yearsInIndiaRange[0], val]);
                }}
                className="text-sm h-8"
              />
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="text-sm text-gray-600 pt-2 border-t">
          Showing {filteredAndSortedCompanies.length === 0 ? 0 : startIndex + 1}-{Math.min(endIndex, filteredAndSortedCompanies.length)} of {filteredAndSortedCompanies.length} companies
        </div>
      </div>

      {/* Table */}
      <div className="border border-slate-200/80 rounded-xl shadow-sm relative bg-white overflow-hidden">
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
          <Table className="min-w-[900px] text-sm">
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[250px] cursor-pointer sticky top-0 z-20 bg-slate-50/95 backdrop-blur text-xs font-semibold uppercase tracking-wide text-slate-600 border-b border-slate-200 hover:bg-slate-100" onClick={() => handleSort('account_global_legal_name')}>
                  Account Global Legal Name {getSortIcon('account_global_legal_name')}
                </TableHead>
                <TableHead className="min-w-[150px] cursor-pointer sticky top-0 z-20 bg-slate-50/95 backdrop-blur text-xs font-semibold uppercase tracking-wide text-slate-600 border-b border-slate-200 hover:bg-slate-100" onClick={() => handleSort('revenue_range')}>
                  Revenue Range {getSortIcon('revenue_range')}
                </TableHead>
                <TableHead className="min-w-[150px] cursor-pointer sticky top-0 z-20 bg-slate-50/95 backdrop-blur text-xs font-semibold uppercase tracking-wide text-slate-600 border-b border-slate-200 hover:bg-slate-100" onClick={() => handleSort('hq_country')}>
                  HQ Country {getSortIcon('hq_country')}
                </TableHead>
                <TableHead className="min-w-[120px] cursor-pointer sticky top-0 z-20 bg-slate-50/95 backdrop-blur text-xs font-semibold uppercase tracking-wide text-slate-600 border-b border-slate-200 hover:bg-slate-100" onClick={() => handleSort('category')}>
                  Category {getSortIcon('category')}
                </TableHead>
                <TableHead className="min-w-[120px] text-right cursor-pointer sticky top-0 z-20 bg-slate-50/95 backdrop-blur text-xs font-semibold uppercase tracking-wide text-slate-600 border-b border-slate-200 hover:bg-slate-100" onClick={() => handleSort('total_centers')}>
                  Total Centers {getSortIcon('total_centers')}
                </TableHead>
                <TableHead className="min-w-[140px] text-right cursor-pointer sticky top-0 z-20 bg-slate-50/95 backdrop-blur text-xs font-semibold uppercase tracking-wide text-slate-600 border-b border-slate-200 hover:bg-slate-100" onClick={() => handleSort('total_gcc_centers')}>
                  Total GCC Centers {getSortIcon('total_gcc_centers')}
                </TableHead>
                <TableHead className="min-w-[150px] cursor-pointer sticky top-0 z-20 bg-slate-50/95 backdrop-blur text-xs font-semibold uppercase tracking-wide text-slate-600 border-b border-slate-200 hover:bg-slate-100" onClick={() => handleSort('years_in_india')}>
                  Years in India {getSortIcon('years_in_india')}
                </TableHead>
                <TableHead className="min-w-[150px] cursor-pointer sticky top-0 z-20 bg-slate-50/95 backdrop-blur text-xs font-semibold uppercase tracking-wide text-slate-600 border-b border-slate-200 hover:bg-slate-100" onClick={() => handleSort('primary_city')}>
                  Primary City {getSortIcon('primary_city')}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentCompanies.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-slate-500">
                    No companies found matching your filters
                  </TableCell>
                </TableRow>
              ) : (
                currentCompanies.map((company) => {
                  const logoDomain = getDomainFromWebsite(company.website);

                  return (
                    <TableRow key={company.id} className="border-b last:border-b-0 hover:bg-slate-50/70">
                      <TableCell className="py-3 font-medium text-slate-900">
                        <div className="flex items-center gap-3">
                          <div className="relative h-8 w-8 rounded-full overflow-hidden border border-slate-200 bg-slate-50 flex items-center justify-center text-slate-400">
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
                            className="group inline-flex items-center gap-2 text-left text-slate-900 hover:text-slate-700"
                          >
                            <span className="underline-offset-4 group-hover:underline">
                              {company.account_global_legal_name}
                            </span>
                            <ChevronRight className="h-4 w-4 text-slate-400 opacity-0 translate-x-[-2px] transition duration-200 group-hover:opacity-100 group-hover:translate-x-0" />
                          </button>
                        </div>
                      </TableCell>
                      <TableCell className="py-3 text-slate-700">{company.revenue_range || '-'}</TableCell>
                      <TableCell className="py-3 text-slate-700">{company.hq_country || '-'}</TableCell>
                      <TableCell className="py-3 text-slate-700">{company.category || '-'}</TableCell>
                      <TableCell className="py-3 text-right text-slate-700">
                        {company.total_centers ?? '-'}
                      </TableCell>
                      <TableCell className="py-3 text-right text-slate-700">
                        {company.total_gcc_centers ?? '-'}
                      </TableCell>
                      <TableCell className="py-3 text-slate-700">{company.years_in_india || '-'}</TableCell>
                      <TableCell className="py-3 text-slate-700">{company.primary_city || '-'}</TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
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
              className="border rounded px-2 py-1 text-sm bg-white"
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
        >
          Next
          <ChevronRight className="h-4 w-4 ml-2" />
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
    </div>
  );
}
