  // Razorpay configuration and utility functions

  export interface RazorpayOptions {
    key: string;
    amount: number;
    currency: string;
    name: string;
    description: string;
    order_id?: string;
    handler: (response: RazorpayResponse) => void;
    prefill?: {
      name?: string;
      email?: string;
      contact?: string;
    };
    theme?: {
      color?: string;
    };
    modal?: {
      ondismiss?: () => void;
      confirm_close?: boolean;
    };
    method?: {
      netbanking?: boolean;
      card?: boolean;
      upi?: boolean;
      wallet?: boolean;
    };
    config?: {
      display?: {
        blocks?: {
          banks?: {
            name?: string;
            instruments?: Array<{
              method: string;
            }>;
          };
        };
        sequence?: string[];
        preferences?: {
          show_default_blocks?: boolean;
        };
      };
    };
  }

  export interface RazorpayResponse {
    razorpay_payment_id: string;
    razorpay_order_id?: string;
    razorpay_signature?: string;
  }

  declare global {
    interface Window {
      Razorpay: any;
    }
  }

  // Load Razorpay script dynamically
  export const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      // Check if script is already loaded
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  // Create order from backend
  export const createRazorpayOrder = async (
    amount: number,
    currency: string,
    planName: string
  ): Promise<{ orderId: string; amount: number; currency: string }> => {
    // Use Netlify Functions in production, localhost in development
    const API_URL = import.meta.env.VITE_API_URL || '/.netlify/functions';
    
    const response = await fetch(`${API_URL}/create-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount, currency, planName }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create order');
    }

    return response.json();
  };

  // Verify payment on backend
  export const verifyRazorpayPayment = async (
    razorpay_order_id: string,
    razorpay_payment_id: string,
    razorpay_signature: string,
    customerEmail?: string,
    customerName?: string,
    planName?: string,
    amount?: number,
    currency?: string
  ): Promise<{ status: string; message: string }> => {
    // Use Netlify Functions in production, localhost in development
    const API_URL = import.meta.env.VITE_API_URL || '/.netlify/functions';
    
    const response = await fetch(`${API_URL}/verify-payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        customerEmail,
        customerName,
        planName,
        amount,
        currency,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Payment verification failed');
    }

    return response.json();
  };

  // Initialize Razorpay payment
  export const initiateRazorpayPayment = async (
    options: RazorpayOptions
  ): Promise<void> => {
    const isLoaded = await loadRazorpayScript();

    if (!isLoaded) {
      throw new Error("Razorpay SDK failed to load. Please check your internet connection.");
    }

    const razorpayInstance = new window.Razorpay(options);
    razorpayInstance.open();
  };

  // Convert price string to paise/smallest currency unit
  export const convertToPaise = (priceString: string): number => {
    // Remove commas and convert to number, then multiply by 100 for paise
    const price = parseFloat(priceString.replace(/,/g, ""));
    return Math.round(price * 100);
  };

  // Get Razorpay key from environment
  export const getRazorpayKey = (): string => {
    const key = import.meta.env.VITE_RAZORPAY_KEY_ID;
    if (!key) {
      throw new Error("Razorpay key is not configured. Please add VITE_RAZORPAY_KEY_ID to your .env file");
    }
    return key;
  };

