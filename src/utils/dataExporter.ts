import * as XLSX from 'xlsx';
import Papa from 'papaparse';

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
    created_at?: string;
    updated_at?: string;
}

interface ExportDisclaimerOptions {
    licenseeEmail?: string;
    scopeLabel?: string;
    recordCount?: number;
    exportSource?: string;
}

/**
 * Format company data for export with human-readable column names
 */
export function formatCompanyDataForExport(companies: GCCCompany[]): any[] {
    return companies.map(company => ({
        'ID': company.id || '',
        'Company Name': company.account_global_legal_name || '',
        'Revenue Range': company.revenue_range || '',
        'HQ Country': company.hq_country || '',
        'HQ Region': company.hq_region || '',
        'Website': company.website || '',
        'Industry': company.industry || '',
        'Category': company.category || '',
        'Total Centers': company.total_centers !== null ? company.total_centers : '',
        'Total GCC Centers': company.total_gcc_centers !== null ? company.total_gcc_centers : '',
        'India Employees Range': company.india_employees_range || '',
        'Established in India': company.established_in_india || '',
        'Years in India': company.years_in_india || '',
        'Primary City': company.primary_city || '',
        'Secondary City': company.secondary_city || '',
        'Services Offered': company.services_offered || '',
        'Created At': company.created_at ? new Date(company.created_at).toLocaleString() : '',
        'Updated At': company.updated_at ? new Date(company.updated_at).toLocaleString() : '',
    }));
}

/**
 * Generate a timestamped filename for the export
 */
export function generateExportFilename(format: 'xlsx' | 'csv', scope: string): string {
    const timestamp = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    return `GCC_Companies_${scope}_${timestamp}.${format}`;
}

/**
 * Export company data to XLSX format
 */
export function exportToXLSX(
    data: GCCCompany[],
    filename: string,
    options?: ExportDisclaimerOptions
): void {
    try {
        // Format the data
        const formattedData = formatCompanyDataForExport(data);
        const exportDate = new Date();
        const recordCount = options?.recordCount ?? data.length;
        const scopeLabel = options?.scopeLabel ?? 'All Filtered';
        const exportSource = options?.exportSource ?? 'Bamboo Reports - L1 List';
        const licenseeEmail = options?.licenseeEmail ?? 'Authorized user';

        // Create a new workbook
        const workbook = XLSX.utils.book_new();

        // Create disclaimer sheet (first tab)
        const disclaimer = [
            {
                Field: 'Notice',
                Value: 'This data export is licensed for your personal use only. Unauthorized sharing, distribution, or commercial use is prohibited.',
            },
            { Field: 'Exported By', Value: licenseeEmail },
            { Field: 'Export Date', Value: exportDate.toLocaleString() },
            { Field: 'Scope', Value: scopeLabel },
            { Field: 'Records', Value: recordCount },
            { Field: 'Source', Value: exportSource },
        ];
        const disclaimerSheet = XLSX.utils.json_to_sheet(disclaimer);
        disclaimerSheet['!cols'] = [{ wch: 20 }, { wch: 110 }];
        XLSX.utils.book_append_sheet(workbook, disclaimerSheet, 'Disclaimer');

        // Create the main data worksheet
        const worksheet = XLSX.utils.json_to_sheet(formattedData);

        // Auto-size columns based on content
        const maxWidth = 50;
        const columnWidths = Object.keys(formattedData[0] || {}).map(key => {
            const maxContentLength = Math.max(
                key.length,
                ...formattedData.map(row => String(row[key] || '').length)
            );
            return { wch: Math.min(maxContentLength + 2, maxWidth) };
        });
        worksheet['!cols'] = columnWidths;

        // Add the worksheet to the workbook
        XLSX.utils.book_append_sheet(workbook, worksheet, 'GCC Companies');

        // Create a metadata sheet
        const metadata = [
            { Field: 'Export Date', Value: exportDate.toLocaleString() },
            { Field: 'Total Records', Value: recordCount },
            { Field: 'Scope', Value: scopeLabel },
            { Field: 'Licensee', Value: licenseeEmail },
            { Field: 'Source', Value: exportSource },
            { Field: 'Format', Value: 'XLSX' },
        ];
        const metadataSheet = XLSX.utils.json_to_sheet(metadata);
        XLSX.utils.book_append_sheet(workbook, metadataSheet, 'Export Info');

        workbook.Workbook = {
            Views: [{ activeTab: 0 }],
        };

        // Generate the file and trigger download
        XLSX.writeFile(workbook, filename);
    } catch (error) {
        console.error('Error exporting to XLSX:', error);
        throw new Error('Failed to export data to XLSX format');
    }
}

/**
 * Export company data to CSV format
 */
export function exportToCSV(data: GCCCompany[], filename: string): void {
    try {
        // Format the data
        const formattedData = formatCompanyDataForExport(data);

        // Convert to CSV using Papa Parse
        const csv = Papa.unparse(formattedData, {
            quotes: true, // Quote all fields
            header: true,
        });

        // Add BOM for Excel compatibility with special characters
        const BOM = '\uFEFF';
        const csvWithBOM = BOM + csv;

        // Create blob and trigger download
        const blob = new Blob([csvWithBOM], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);

        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Clean up the URL object
        URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Error exporting to CSV:', error);
        throw new Error('Failed to export data to CSV format');
    }
}
