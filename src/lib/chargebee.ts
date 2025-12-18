/**
 * Chargebee.js client-side integration
 * Uses the official Chargebee.js library for checkout
 */

declare global {
    interface Window {
        Chargebee: {
            init: (config: { site: string; domain?: string }) => ChargebeeInstance;
            getInstance: () => ChargebeeInstance | null;
        };
    }
}

interface ChargebeeInstance {
    openCheckout: (options: CheckoutOptions) => void;
    closeAll: () => void;
}

interface CheckoutOptions {
    hostedPage: () => Promise<{ id: string; type: string; url: string; state: string; embed: boolean }>;
    success?: (hostedPageId: string) => void;
    close?: () => void;
    error?: (error: Error) => void;
    step?: (step: string) => void;
}

// Load Chargebee.js script
export const loadChargebeeScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
        if (window.Chargebee) {
            resolve(true);
            return;
        }

        const existingScript = document.querySelector('script[src*="chargebee.js"]');
        if (existingScript) {
            existingScript.addEventListener('load', () => resolve(true));
            return;
        }

        const script = document.createElement('script');
        script.src = 'https://js.chargebee.com/v2/chargebee.js';
        script.async = true;
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.head.appendChild(script);
    });
};

// Initialize Chargebee
let cbInstance: ChargebeeInstance | null = null;

export const initChargebee = async (): Promise<ChargebeeInstance> => {
    const loaded = await loadChargebeeScript();

    if (!loaded) {
        throw new Error('Failed to load Chargebee.js');
    }

    const site = import.meta.env.VITE_CHARGEBEE_SITE;

    if (!site) {
        throw new Error('VITE_CHARGEBEE_SITE is not configured');
    }

    // Check if already initialized
    if (cbInstance) {
        return cbInstance;
    }

    cbInstance = window.Chargebee.init({
        site,
    });

    return cbInstance;
};

export interface CheckoutParams {
    planPriceId: string;
    customerEmail?: string;
    customerName?: string;
    userId?: string;
}

// Open checkout modal
export const openChargebeeCheckout = async (
    params: CheckoutParams,
    callbacks: {
        onSuccess?: (hostedPageId: string) => void;
        onClose?: () => void;
        onError?: (error: Error) => void;
    } = {}
): Promise<void> => {
    const instance = await initChargebee();

    instance.openCheckout({
        hostedPage: async () => {
            // Call our backend to get the hosted page
            const response = await fetch('/.netlify/functions/chargebee-checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    planPriceId: params.planPriceId,
                    customerEmail: params.customerEmail,
                    customerName: params.customerName,
                    userId: params.userId,
                }),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Failed to create checkout session');
            }

            const data = await response.json();

            // Return the hosted page object for Chargebee.js
            return {
                id: data.hostedPageId,
                type: 'checkout_new',
                url: data.hostedPageUrl,
                state: 'created',
                embed: true,
            };
        },
        success: (hostedPageId: string) => {
            console.log('Checkout successful:', hostedPageId);
            callbacks.onSuccess?.(hostedPageId);
        },
        close: () => {
            console.log('Checkout closed');
            callbacks.onClose?.();
        },
        error: (error: Error) => {
            console.error('Checkout error:', error);
            callbacks.onError?.(error);
        },
    });
};
