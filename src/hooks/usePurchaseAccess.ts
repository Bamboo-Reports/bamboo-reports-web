import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

interface Purchase {
  id: string;
  plan_name: string;
  status: string;
  purchased_at: string;
}

interface UsePurchaseAccessResult {
  hasPurchased: boolean;
  isLoading: boolean;
  error: string | null;
  purchases: Purchase[];
}

/**
 * Hook to check if the current user has purchased a specific plan
 * @param planName - Name of the plan to check (e.g., "Explorer")
 * @returns Object with purchase status and data
 */
export function usePurchaseAccess(planName: string): UsePurchaseAccessResult {
  const { user } = useAuth();
  const [hasPurchased, setHasPurchased] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [purchases, setPurchases] = useState<Purchase[]>([]);

  useEffect(() => {
    async function checkPurchase() {
      if (!user) {
        setHasPurchased(false);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        const { data, error: fetchError } = await supabase
          .from('purchases')
          .select('id, plan_name, status, purchased_at')
          .eq('user_id', user.id)
          .eq('plan_name', planName)
          .eq('status', 'completed');

        if (fetchError) {
          throw fetchError;
        }

        setPurchases(data || []);
        setHasPurchased(data && data.length > 0);
      } catch (err) {
        console.error('Error checking purchase access:', err);
        setError(err instanceof Error ? err.message : 'Failed to check purchase access');
        setHasPurchased(false);
      } finally {
        setIsLoading(false);
      }
    }

    checkPurchase();
    // CRITICAL FIX: Depend on user?.id instead of user object
    // This prevents re-fetching when Supabase creates new user object references
  }, [user?.id, planName]);

  return { hasPurchased, isLoading, error, purchases };
}

/**
 * Hook to get all purchases for the current user
 * @returns Object with all user purchases
 */
export function useUserPurchases() {
  const { user } = useAuth();
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPurchases() {
      if (!user) {
        setPurchases([]);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        const { data, error: fetchError } = await supabase
          .from('purchases')
          .select('*')
          .eq('user_id', user.id)
          .eq('status', 'completed')
          .order('purchased_at', { ascending: false });

        if (fetchError) {
          throw fetchError;
        }

        setPurchases(data || []);
      } catch (err) {
        console.error('Error fetching purchases:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch purchases');
      } finally {
        setIsLoading(false);
      }
    }

    fetchPurchases();
    // CRITICAL FIX: Depend on user?.id instead of user object
    // This prevents re-fetching when Supabase creates new user object references
    // during session validation (e.g., when switching tabs)
  }, [user?.id]);

  return { purchases, isLoading, error };
}
