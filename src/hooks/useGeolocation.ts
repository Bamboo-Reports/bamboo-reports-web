import { useState, useEffect } from "react";

interface GeolocationData {
    countryCode: string | null;
    loading: boolean;
    error: string | null;
}

/**
 * Custom hook to detect user's country based on IP address
 * Uses ipapi.co API for geolocation detection
 * Returns country code (e.g., "IN" for India, "US" for United States)
 * Gracefully fallbacks to null if detection fails
 */
export const useGeolocation = (): GeolocationData => {
    const [data, setData] = useState<GeolocationData>({
        countryCode: null,
        loading: true,
        error: null,
    });

    useEffect(() => {
        // Check if we have cached data in sessionStorage
        const cachedCountryCode = sessionStorage.getItem("userCountryCode");

        if (cachedCountryCode) {
            setData({
                countryCode: cachedCountryCode,
                loading: false,
                error: null,
            });
            return;
        }

        // Fetch geolocation data
        const fetchGeolocation = async () => {
            try {
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

                const response = await fetch("https://ipapi.co/json/", {
                    signal: controller.signal,
                });

                clearTimeout(timeoutId);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();
                const countryCode = result.country_code || null;

                // Cache the result in sessionStorage
                if (countryCode) {
                    sessionStorage.setItem("userCountryCode", countryCode);
                }

                setData({
                    countryCode,
                    loading: false,
                    error: null,
                });
            } catch (error) {
                console.warn("Geolocation detection failed:", error);
                setData({
                    countryCode: null,
                    loading: false,
                    error: error instanceof Error ? error.message : "Unknown error",
                });
            }
        };

        fetchGeolocation();
    }, []);

    return data;
};
