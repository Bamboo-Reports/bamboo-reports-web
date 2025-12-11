import React, { useState, useEffect, useMemo } from 'react';
import { supabase } from '../lib/supabase';
import { Input } from './ui/input';
import { Button } from './ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
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

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [revenueFilter, setRevenueFilter] = useState('');
  const [countryFilter, setCountryFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [primaryCityFilter, setPrimaryCityFilter] = useState('');

  // Range filters
  const [totalCentersMin, setTotalCentersMin] = useState('');
  const [totalCentersMax, setTotalCentersMax] = useState('');
  const [gccCentersMin, setGccCentersMin] = useState('');
  const [gccCentersMax, setGccCentersMax] = useState('');
  const [yearsInIndiaMin, setYearsInIndiaMin] = useState('');
  const [yearsInIndiaMax, setYearsInIndiaMax] = useState('');

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

        const { data, error: fetchError } = await supabase
          .from('gcc_companies')
          .select('*')
          .order('account_global_legal_name', { ascending: true });

        if (fetchError) {
          throw fetchError;
        }

        setCompanies(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load GCC companies');
      } finally {
        setIsLoading(false);
      }
    }

    fetchCompanies();
  }, []);

  // Get unique values for dropdown filters
  const uniqueRevenues = useMemo(() => {
    const values = new Set(companies.map(c => c.revenue_range).filter(Boolean));
    return Array.from(values).sort();
  }, [companies]);

  const uniqueCountries = useMemo(() => {
    const values = new Set(companies.map(c => c.hq_country).filter(Boolean));
    return Array.from(values).sort();
  }, [companies]);

  const uniqueCategories = useMemo(() => {
    const values = new Set(companies.map(c => c.category).filter(Boolean));
    return Array.from(values).sort();
  }, [companies]);

  const uniqueCities = useMemo(() => {
    const values = new Set(companies.map(c => c.primary_city).filter(Boolean));
    return Array.from(values).sort();
  }, [companies]);

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

    // Dropdown filters
    if (revenueFilter) {
      filtered = filtered.filter(c => c.revenue_range === revenueFilter);
    }
    if (countryFilter) {
      filtered = filtered.filter(c => c.hq_country === countryFilter);
    }
    if (categoryFilter) {
      filtered = filtered.filter(c => c.category === categoryFilter);
    }
    if (primaryCityFilter) {
      filtered = filtered.filter(c => c.primary_city === primaryCityFilter);
    }

    // Range filters
    if (totalCentersMin) {
      filtered = filtered.filter(c => (c.total_centers ?? 0) >= parseInt(totalCentersMin));
    }
    if (totalCentersMax) {
      filtered = filtered.filter(c => (c.total_centers ?? 0) <= parseInt(totalCentersMax));
    }
    if (gccCentersMin) {
      filtered = filtered.filter(c => (c.total_gcc_centers ?? 0) >= parseInt(gccCentersMin));
    }
    if (gccCentersMax) {
      filtered = filtered.filter(c => (c.total_gcc_centers ?? 0) <= parseInt(gccCentersMax));
    }
    if (yearsInIndiaMin) {
      filtered = filtered.filter(c => {
        const years = parseInt(c.years_in_india || '0');
        return years >= parseInt(yearsInIndiaMin);
      });
    }
    if (yearsInIndiaMax) {
      filtered = filtered.filter(c => {
        const years = parseInt(c.years_in_india || '0');
        return years <= parseInt(yearsInIndiaMax);
      });
    }

    // Apply sorting
    if (sortField && sortDirection) {
      filtered = [...filtered].sort((a, b) => {
        const aVal = a[sortField];
        const bVal = b[sortField];

        // Handle null/undefined values
        if (aVal === null || aVal === undefined) return 1;
        if (bVal === null || bVal === undefined) return -1;

        // Compare values
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
  }, [companies, searchQuery, revenueFilter, countryFilter, categoryFilter, primaryCityFilter,
    totalCentersMin, totalCentersMax, gccCentersMin, gccCentersMax, yearsInIndiaMin, yearsInIndiaMax,
    sortField, sortDirection]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedCompanies.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentCompanies = filteredAndSortedCompanies.slice(startIndex, endIndex);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, revenueFilter, countryFilter, categoryFilter, primaryCityFilter,
    totalCentersMin, totalCentersMax, gccCentersMin, gccCentersMax, yearsInIndiaMin, yearsInIndiaMax]);

  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(1, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(totalPages, prev + 1));
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      // Cycle through: asc -> desc -> null
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
    setRevenueFilter('');
    setCountryFilter('');
    setCategoryFilter('');
    setPrimaryCityFilter('');
    setTotalCentersMin('');
    setTotalCentersMax('');
    setGccCentersMin('');
    setGccCentersMax('');
    setYearsInIndiaMin('');
    setYearsInIndiaMax('');
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
      onSelectStart={handleSelectStart}
      onCopy={handleCopy}
      style={{
        userSelect: 'none',
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none'
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

        {/* Dropdown Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-600">Revenue Range</label>
            <Select value={revenueFilter} onValueChange={setRevenueFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {uniqueRevenues.map(rev => (
                  <SelectItem key={rev} value={rev as string}>{rev}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-600">HQ Country</label>
            <Select value={countryFilter} onValueChange={setCountryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {uniqueCountries.map(country => (
                  <SelectItem key={country} value={country as string}>{country}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-600">Category</label>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {uniqueCategories.map(cat => (
                  <SelectItem key={cat} value={cat as string}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-600">Primary City</label>
            <Select value={primaryCityFilter} onValueChange={setPrimaryCityFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {uniqueCities.map(city => (
                  <SelectItem key={city} value={city as string}>{city}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Range Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-600">Total Centers (Range)</label>
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="Min"
                value={totalCentersMin}
                onChange={(e) => setTotalCentersMin(e.target.value)}
                className="text-sm"
              />
              <Input
                type="number"
                placeholder="Max"
                value={totalCentersMax}
                onChange={(e) => setTotalCentersMax(e.target.value)}
                className="text-sm"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-600">Total GCC Centers (Range)</label>
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="Min"
                value={gccCentersMin}
                onChange={(e) => setGccCentersMin(e.target.value)}
                className="text-sm"
              />
              <Input
                type="number"
                placeholder="Max"
                value={gccCentersMax}
                onChange={(e) => setGccCentersMax(e.target.value)}
                className="text-sm"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-600">Years in India (Range)</label>
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="Min"
                value={yearsInIndiaMin}
                onChange={(e) => setYearsInIndiaMin(e.target.value)}
                className="text-sm"
              />
              <Input
                type="number"
                placeholder="Max"
                value={yearsInIndiaMax}
                onChange={(e) => setYearsInIndiaMax(e.target.value)}
                className="text-sm"
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
