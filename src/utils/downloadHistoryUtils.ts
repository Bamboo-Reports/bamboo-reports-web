import { supabase } from '../lib/supabase';

export interface DownloadLog {
    id: string;
    user_id: string;
    user_email: string;
    document_id: string;
    document_title: string;
    plan_name: string;
    downloaded_at: string;
}

export interface DownloadStats {
    totalDownloads: number;
    uniqueDocuments: number;
    mostDownloaded: {
        title: string;
        count: number;
    } | null;
}

/**
 * Fetch download history for current user
 */
export async function fetchDownloadHistory(
    userId: string,
    filters?: {
        searchQuery?: string;
        dateRange?: 'today' | '7days' | '30days' | 'all';
        planName?: string;
    }
): Promise<{ data: DownloadLog[] | null; error: Error | null }> {
    try {
        let query = supabase
            .from('download_logs')
            .select('*')
            .eq('user_id', userId)
            .order('downloaded_at', { ascending: false });

        // Apply search filter
        if (filters?.searchQuery) {
            query = query.ilike('document_title', `%${filters.searchQuery}%`);
        }

        // Apply date range filter
        if (filters?.dateRange && filters.dateRange !== 'all') {
            const now = new Date();
            let startDate: Date;

            switch (filters.dateRange) {
                case 'today':
                    startDate = new Date(now.setHours(0, 0, 0, 0));
                    break;
                case '7days':
                    startDate = new Date(now.setDate(now.getDate() - 7));
                    break;
                case '30days':
                    startDate = new Date(now.setDate(now.getDate() - 30));
                    break;
                default:
                    startDate = new Date(0); // Beginning of time
            }

            query = query.gte('downloaded_at', startDate.toISOString());
        }

        // Apply plan filter
        if (filters?.planName && filters.planName !== 'all') {
            query = query.eq('plan_name', filters.planName);
        }

        const { data, error } = await query;

        if (error) throw error;

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error instanceof Error ? error : new Error('Failed to fetch download history'),
        };
    }
}

/**
 * Calculate download statistics
 */
export function calculateDownloadStats(downloads: DownloadLog[]): DownloadStats {
    if (downloads.length === 0) {
        return {
            totalDownloads: 0,
            uniqueDocuments: 0,
            mostDownloaded: null,
        };
    }

    // Total downloads
    const totalDownloads = downloads.length;

    // Unique documents
    const uniqueDocIds = new Set(downloads.map((d) => d.document_id));
    const uniqueDocuments = uniqueDocIds.size;

    // Most downloaded document
    const downloadCounts = downloads.reduce(
        (acc, download) => {
            const key = download.document_id;
            if (!acc[key]) {
                acc[key] = { title: download.document_title, count: 0 };
            }
            acc[key].count++;
            return acc;
        },
        {} as Record<string, { title: string; count: number }>
    );

    const mostDownloaded = Object.values(downloadCounts).reduce(
        (max, current) => (current.count > (max?.count || 0) ? current : max),
        null as { title: string; count: number } | null
    );

    return {
        totalDownloads,
        uniqueDocuments,
        mostDownloaded,
    };
}

/**
 * Format timestamp for display
 */
export function formatDownloadDate(timestamp: string): string {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInHours = diffInMs / (1000 * 60 * 60);

    // Less than 24 hours - show relative time
    if (diffInHours < 24) {
        if (diffInHours < 1) {
            const minutes = Math.floor(diffInMs / (1000 * 60));
            return minutes <= 1 ? 'Just now' : `${minutes} minutes ago`;
        }
        const hours = Math.floor(diffInHours);
        return hours === 1 ? '1 hour ago' : `${hours} hours ago`;
    }

    // Less than 7 days - show "X days ago"
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) {
        return diffInDays === 1 ? 'Yesterday' : `${diffInDays} days ago`;
    }

    // Otherwise show full date and time
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}
