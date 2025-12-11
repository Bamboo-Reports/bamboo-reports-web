import React, { useState, useEffect, useMemo } from 'react';
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
import { Search, ChevronLeft, ChevronRight, ArrowUpDown, ArrowUp, ArrowDown, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { CompanyDetailView } from './CompanyDetailView';
import { MultiSelect } from './ui/multi-select';
import { DualRangeSlider } from './ui/dual-range-slider';

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

const ITEMS_PER_PAGE = 25;

export function GCCCompaniesTable() {
  const { user } = useAuth();
  const [companies, setCompanies] = useState<GCCCompany[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters - Multi-select (arrays)
  const [searchQuery, setSearchQuery] = useState('');
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
          const maxYears = Math.max(...allData.map(c => parseInt(c.years_in_india || '0')));

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

  // Apply filters and sorting
  const filteredAndSortedCompanies = useMemo(() => {
    let filtered = companies;

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
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
      const years = parseInt(c.years_in_india || '0');
      return years >= yearsInIndiaRange[0] && years <= yearsInIndiaRange[1];
    });

    // Apply sorting
    if (sortField && sortDirection) {
      filtered = [...filtered].sort((a, b) => {
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
  }, [companies, searchQuery, revenueFilters, countryFilters, categoryFilters, primaryCityFilters,
    totalCentersRange, gccCentersRange, yearsInIndiaRange, sortField, sortDirection]);

  // Cascading filter options - computed from filtered data (excluding current filter)
  const getFilteredForCascade = (excludeFilter: string) => {
    let filtered = companies;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
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
      const years = parseInt(c.years_in_india || '0');
      return years >= yearsInIndiaRange[0] && years <= yearsInIndiaRange[1];
    });

    return filtered;
  };

  const cascadingRevenues = useMemo(() => {
    const filtered = getFilteredForCascade('revenue');
    const values = new Set(filtered.map(c => c.revenue_range).filter(Boolean) as string[]);
    return Array.from(values).sort();
  }, [companies, searchQuery, countryFilters, categoryFilters, primaryCityFilters, totalCentersRange, gccCentersRange, yearsInIndiaRange]);

  const cascadingCountries = useMemo(() => {
    const filtered = getFilteredForCascade('country');
    const values = new Set(filtered.map(c => c.hq_country).filter(Boolean) as string[]);
    return Array.from(values).sort();
  }, [companies, searchQuery, revenueFilters, categoryFilters, primaryCityFilters, totalCentersRange, gccCentersRange, yearsInIndiaRange]);

  const cascadingCategories = useMemo(() => {
    const filtered = getFilteredForCascade('category');
    const values = new Set(filtered.map(c => c.category).filter(Boolean) as string[]);
    return Array.from(values).sort();
  }, [companies, searchQuery, revenueFilters, countryFilters, primaryCityFilters, totalCentersRange, gccCentersRange, yearsInIndiaRange]);

  const cascadingCities = useMemo(() => {
    const filtered = getFilteredForCascade('city');
    const values = new Set(filtered.map(c => c.primary_city).filter(Boolean) as string[]);
    return Array.from(values).sort();
  }, [companies, searchQuery, revenueFilters, countryFilters, categoryFilters, totalCentersRange, gccCentersRange, yearsInIndiaRange]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedCompanies.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
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
        <h2 className="text-2xl font-bold mb-2">L1 List - 2,500+ GCCs</h2>
        <p className="text-gray-600">Complete view of {companies.length} GCC companies</p>
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
            <label className="text-xs font-medium text-gray-600">Total Centers ({totalCentersRange[0]} - {totalCentersRange[1]})</label>
            <DualRangeSlider
              min={totalCentersBounds[0]}
              max={totalCentersBounds[1]}
              value={totalCentersRange}
              onValueChange={(value) => setTotalCentersRange(value)}
            />
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="Min"
                value={totalCentersRange[0]}
                onChange={(e) => setTotalCentersRange([parseInt(e.target.value) || 0, totalCentersRange[1]])}
                className="text-sm h-8"
              />
              <Input
                type="number"
                placeholder="Max"
                value={totalCentersRange[1]}
                onChange={(e) => setTotalCentersRange([totalCentersRange[0], parseInt(e.target.value) || totalCentersBounds[1]])}
                className="text-sm h-8"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-medium text-gray-600">Total GCC Centers ({gccCentersRange[0]} - {gccCentersRange[1]})</label>
            <DualRangeSlider
              min={gccCentersBounds[0]}
              max={gccCentersBounds[1]}
              value={gccCentersRange}
              onValueChange={(value) => setGccCentersRange(value)}
            />
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="Min"
                value={gccCentersRange[0]}
                onChange={(e) => setGccCentersRange([parseInt(e.target.value) || 0, gccCentersRange[1]])}
                className="text-sm h-8"
              />
              <Input
                type="number"
                placeholder="Max"
                value={gccCentersRange[1]}
                onChange={(e) => setGccCentersRange([gccCentersRange[0], parseInt(e.target.value) || gccCentersBounds[1]])}
                className="text-sm h-8"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-medium text-gray-600">Years in India ({yearsInIndiaRange[0]} - {yearsInIndiaRange[1]})</label>
            <DualRangeSlider
              min={yearsInIndiaBounds[0]}
              max={yearsInIndiaBounds[1]}
              value={yearsInIndiaRange}
              onValueChange={(value) => setYearsInIndiaRange(value)}
            />
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="Min"
                value={yearsInIndiaRange[0]}
                onChange={(e) => setYearsInIndiaRange([parseInt(e.target.value) || 0, yearsInIndiaRange[1]])}
                className="text-sm h-8"
              />
              <Input
                type="number"
                placeholder="Max"
                value={yearsInIndiaRange[1]}
                onChange={(e) => setYearsInIndiaRange([yearsInIndiaRange[0], parseInt(e.target.value) || yearsInIndiaBounds[1]])}
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
      <div className="border rounded-lg overflow-hidden relative bg-white">
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

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[250px] cursor-pointer hover:bg-slate-100" onClick={() => handleSort('account_global_legal_name')}>
                  Account Global Legal Name {getSortIcon('account_global_legal_name')}
                </TableHead>
                <TableHead className="min-w-[150px] cursor-pointer hover:bg-slate-100" onClick={() => handleSort('revenue_range')}>
                  Revenue Range {getSortIcon('revenue_range')}
                </TableHead>
                <TableHead className="min-w-[150px] cursor-pointer hover:bg-slate-100" onClick={() => handleSort('hq_country')}>
                  HQ Country {getSortIcon('hq_country')}
                </TableHead>
                <TableHead className="min-w-[120px] cursor-pointer hover:bg-slate-100" onClick={() => handleSort('category')}>
                  Category {getSortIcon('category')}
                </TableHead>
                <TableHead className="min-w-[120px] text-right cursor-pointer hover:bg-slate-100" onClick={() => handleSort('total_centers')}>
                  Total Centers {getSortIcon('total_centers')}
                </TableHead>
                <TableHead className="min-w-[140px] text-right cursor-pointer hover:bg-slate-100" onClick={() => handleSort('total_gcc_centers')}>
                  Total GCC Centers {getSortIcon('total_gcc_centers')}
                </TableHead>
                <TableHead className="min-w-[150px] cursor-pointer hover:bg-slate-100" onClick={() => handleSort('years_in_india')}>
                  Years in India {getSortIcon('years_in_india')}
                </TableHead>
                <TableHead className="min-w-[150px] cursor-pointer hover:bg-slate-100" onClick={() => handleSort('primary_city')}>
                  Primary City {getSortIcon('primary_city')}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentCompanies.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                    No companies found matching your filters
                  </TableCell>
                </TableRow>
              ) : (
                currentCompanies.map((company) => (
                  <TableRow key={company.id} className="hover:bg-slate-50">
                    <TableCell className="font-medium">
                      <button
                        onClick={() => handleCompanyClick(company)}
                        className="text-blue-600 hover:text-blue-800 hover:underline text-left"
                      >
                        {company.account_global_legal_name}
                      </button>
                    </TableCell>
                    <TableCell>{company.revenue_range || '-'}</TableCell>
                    <TableCell>{company.hq_country || '-'}</TableCell>
                    <TableCell>{company.category || '-'}</TableCell>
                    <TableCell className="text-right">
                      {company.total_centers || '-'}
                    </TableCell>
                    <TableCell className="text-right">
                      {company.total_gcc_centers || '-'}
                    </TableCell>
                    <TableCell>{company.years_in_india || '-'}</TableCell>
                    <TableCell>{company.primary_city || '-'}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          <div className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </div>

          <Button
            variant="outline"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      )}

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
