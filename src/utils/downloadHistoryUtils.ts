import { supabase } from '../lib/supabase';

export interface DownloadLog {
    id: string;
    user_id: string;
    user_email: string;
    document_id: string | null;
    document_title: string;
    plan_name: string;
    downloaded_at: string;
    ip_address?: string | null;
    user_agent?: string | null;
}

export interface DownloadStats {
    totalDownloads: number;
    totalReports: number;
    totalExports: number;
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
    const totalDownloads = downloads.length;
    const totalExports = downloads.filter((download) => !download.document_id).length;
    const totalReports = totalDownloads - totalExports;

    return {
        totalDownloads,
        totalReports,
        totalExports,
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

/**
 * Parse user agent string to extract device and browser info
 */
export function parseUserAgent(userAgent: string | null | undefined): {
    device: string;
    browser: string;
    os: string;
} {
    if (!userAgent) {
        return { device: 'Unknown', browser: 'Unknown', os: 'Unknown' };
    }

    // Detect device type
    let device = 'Desktop';
    if (/Mobile|Android|iPhone|iPad|iPod/i.test(userAgent)) {
        if (/iPad|Tablet/i.test(userAgent)) {
            device = 'Tablet';
        } else {
            device = 'Mobile';
        }
    }

    // Detect browser
    let browser = 'Unknown';
    if (userAgent.includes('Firefox')) {
        browser = 'Firefox';
    } else if (userAgent.includes('Edg')) {
        browser = 'Edge';
    } else if (userAgent.includes('Chrome')) {
        browser = 'Chrome';
    } else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
        browser = 'Safari';
    } else if (userAgent.includes('Opera') || userAgent.includes('OPR')) {
        browser = 'Opera';
    }

    // Detect OS
    let os = 'Unknown';
    if (userAgent.includes('Windows')) {
        os = 'Windows';
    } else if (userAgent.includes('Mac OS')) {
        os = 'macOS';
    } else if (userAgent.includes('Linux')) {
        os = 'Linux';
    } else if (userAgent.includes('Android')) {
        os = 'Android';
    } else if (userAgent.includes('iOS') || userAgent.includes('iPhone') || userAgent.includes('iPad')) {
        os = 'iOS';
    }

    return { device, browser, os };
}
