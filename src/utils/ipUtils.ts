/**
 * Get user's IP address and location information
 * Uses ipapi.co free API (1,000 requests/day limit)
 */
export async function getIPInfo(): Promise<{
    ip: string;
    city?: string;
    region?: string;
    country?: string;
} | null> {
    try {
        const response = await fetch('https://ipapi.co/json/');
        if (!response.ok) {
            throw new Error('Failed to fetch IP info');
        }

        const data = await response.json();

        return {
            ip: data.ip,
            city: data.city,
            region: data.region,
            country: data.country_name,
        };
    } catch (error) {
        console.error('Failed to get IP info:', error);
        return null;
    }
}

/**
 * Format location string from IP info
 */
export function formatLocation(city?: string, region?: string, country?: string): string {
    const parts = [];

    if (city) parts.push(city);
    if (region && region !== city) parts.push(region);
    if (country) parts.push(country);

    return parts.join(', ') || 'Unknown Location';
}
