import { useState, useEffect } from 'react';
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
import { Search, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

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
  total_excl_gcc_centers: number | null;
  aggregate_india_employees_range: string | null;
  location: string | null;
  years_established_in_india: string | null;
  years_in_india: string | null;
  primary_city: string | null;
  secondary_city: string | null;
  services_offered: string | null;
}

const ITEMS_PER_PAGE = 25;

export function GCCCompaniesTable() {
  const { user } = useAuth();
  const [companies, setCompanies] = useState<GCCCompany[]>([]);
  const [filteredCompanies, setFilteredCompanies] = useState<GCCCompany[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Search only (filters removed as per user request)
  const [searchQuery, setSearchQuery] = useState('');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

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
        setFilteredCompanies(data || []);
      } catch (err) {
        // Error is handled via setError and displayed in UI
        setError(err instanceof Error ? err.message : 'Failed to load GCC companies');
      } finally {
        setIsLoading(false);
      }
    }

    fetchCompanies();
  }, []);

  // Apply search
  useEffect(() => {
    let filtered = companies;

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(company =>
        company.account_global_legal_name?.toLowerCase().includes(query) ||
        company.primary_city?.toLowerCase().includes(query) ||
        company.secondary_city?.toLowerCase().includes(query) ||
        company.industry?.toLowerCase().includes(query) ||
        company.hq_country?.toLowerCase().includes(query) ||
        company.location?.toLowerCase().includes(query)
      );
    }

    setFilteredCompanies(filtered);
    setCurrentPage(1); // Reset to first page when search changes
  }, [searchQuery, companies]);

  // Pagination
  const totalPages = Math.ceil(filteredCompanies.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentCompanies = filteredCompanies.slice(startIndex, endIndex);

  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(1, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(totalPages, prev + 1));
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

      {/* Search Only */}
      <div className="bg-white border rounded-lg p-4 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search by company name, city, industry, country..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="text-sm text-gray-600">
          Showing {startIndex + 1}-{Math.min(endIndex, filteredCompanies.length)} of {filteredCompanies.length} companies
        </div>
      </div>

      {/* Table - Horizontally Scrollable with Watermark */}
      <div className="border rounded-lg overflow-hidden relative">
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
                <TableHead className="min-w-[250px]">Company Name</TableHead>
                <TableHead className="min-w-[120px]">Revenue Range</TableHead>
                <TableHead className="min-w-[150px]">HQ Country</TableHead>
                <TableHead className="min-w-[150px]">HQ Region</TableHead>
                <TableHead className="min-w-[150px]">Industry</TableHead>
                <TableHead className="min-w-[100px]">Category</TableHead>
                <TableHead className="min-w-[120px] text-right">Total Centers</TableHead>
                <TableHead className="min-w-[120px] text-right">GCC Centers</TableHead>
                <TableHead className="min-w-[140px] text-right">Excl GCC Centers</TableHead>
                <TableHead className="min-w-[180px] text-right">India Employees</TableHead>
                <TableHead className="min-w-[150px]">Primary City</TableHead>
                <TableHead className="min-w-[200px]">Secondary Cities</TableHead>
                <TableHead className="min-w-[200px]">Location</TableHead>
                <TableHead className="min-w-[120px]">Est. Year</TableHead>
                <TableHead className="min-w-[120px]">Years in India</TableHead>
                <TableHead className="min-w-[300px]">Services Offered</TableHead>
                <TableHead className="min-w-[100px]">Website</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentCompanies.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={17} className="text-center py-8 text-gray-500">
                    No companies found matching your search
                  </TableCell>
                </TableRow>
              ) : (
                currentCompanies.map((company) => (
                  <TableRow key={company.id}>
                    <TableCell className="font-medium">
                      {company.account_global_legal_name}
                    </TableCell>
                    <TableCell>{company.revenue_range || '-'}</TableCell>
                    <TableCell>{company.hq_country || '-'}</TableCell>
                    <TableCell>{company.hq_region || '-'}</TableCell>
                    <TableCell>{company.industry || '-'}</TableCell>
                    <TableCell>{company.category || '-'}</TableCell>
                    <TableCell className="text-right">
                      {company.total_centers || '-'}
                    </TableCell>
                    <TableCell className="text-right">
                      {company.total_gcc_centers || '-'}
                    </TableCell>
                    <TableCell className="text-right">
                      {company.total_excl_gcc_centers || '-'}
                    </TableCell>
                    <TableCell className="text-right">
                      {company.aggregate_india_employees_range || '-'}
                    </TableCell>
                    <TableCell>{company.primary_city || '-'}</TableCell>
                    <TableCell>
                      <div className="whitespace-pre-line text-sm">
                        {company.secondary_city || '-'}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="whitespace-pre-line text-sm">
                        {company.location || '-'}
                      </div>
                    </TableCell>
                    <TableCell>{company.years_established_in_india || '-'}</TableCell>
                    <TableCell>{company.years_in_india || '-'}</TableCell>
                    <TableCell>
                      <div className="whitespace-pre-line text-sm max-w-[300px]">
                        {company.services_offered || '-'}
                      </div>
                    </TableCell>
                    <TableCell>
                      {company.website ? (
                        <a
                          href={company.website.startsWith('http') ? company.website : `https://${company.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-blue-600 hover:text-blue-800"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      ) : (
                        '-'
                      )}
                    </TableCell>
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
    </div>
  );
}
