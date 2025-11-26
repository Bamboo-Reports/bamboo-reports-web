-- =====================================================
-- GCC COMPANIES DATABASE SCHEMA
-- =====================================================
-- Run this SQL in your Supabase SQL Editor
-- This table stores the L1 List - 2,500+ GCCs data

CREATE TABLE IF NOT EXISTS gcc_companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Company Information
  account_global_legal_name TEXT NOT NULL,
  revenue_range TEXT,
  hq_country TEXT,
  hq_region TEXT,
  website TEXT,
  industry TEXT,
  category TEXT,

  -- Centers Information
  total_centers INTEGER,
  total_gcc_centers INTEGER,
  total_excl_gcc_centers INTEGER,

  -- India Operations
  aggregate_india_employees_range TEXT,
  location TEXT, -- Multi-line: Bengaluru\nHyderabad
  years_established_in_india TEXT,
  years_in_india TEXT,
  primary_city TEXT,
  secondary_city TEXT, -- Multi-line: Hyderabad\nPune\nChennai

  -- Services
  services_offered TEXT, -- Multi-line: IT\n-Hyderabad\nProcurement

  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================
-- Speed up common queries

CREATE INDEX IF NOT EXISTS idx_gcc_companies_name ON gcc_companies(account_global_legal_name);
CREATE INDEX IF NOT EXISTS idx_gcc_companies_industry ON gcc_companies(industry);
CREATE INDEX IF NOT EXISTS idx_gcc_companies_category ON gcc_companies(category);
CREATE INDEX IF NOT EXISTS idx_gcc_companies_hq_country ON gcc_companies(hq_country);
CREATE INDEX IF NOT EXISTS idx_gcc_companies_primary_city ON gcc_companies(primary_city);

-- Full-text search index for company names
CREATE INDEX IF NOT EXISTS idx_gcc_companies_name_search
  ON gcc_companies USING gin(to_tsvector('english', account_global_legal_name));

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================
-- Only Explorer purchasers can view GCC data

ALTER TABLE gcc_companies ENABLE ROW LEVEL SECURITY;

-- Policy: Only users who purchased Explorer can view GCC companies
CREATE POLICY "Explorer purchasers can view GCC companies"
ON gcc_companies
FOR SELECT
USING (
  EXISTS (
    SELECT 1
    FROM purchases
    WHERE purchases.user_id = auth.uid()
    AND purchases.status = 'completed'
    AND purchases.plan_name = 'Explorer'
  )
);

-- Policy: Service role can manage all data (for imports/updates)
CREATE POLICY "Service role can manage GCC companies"
ON gcc_companies
FOR ALL
USING (true)
WITH CHECK (true);

-- =====================================================
-- HELPER FUNCTION: Search GCC Companies
-- =====================================================
-- Enables fast full-text search

CREATE OR REPLACE FUNCTION search_gcc_companies(search_query TEXT)
RETURNS TABLE (
  id UUID,
  account_global_legal_name TEXT,
  industry TEXT,
  primary_city TEXT,
  hq_country TEXT,
  total_gcc_centers INTEGER,
  rank REAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    gcc.id,
    gcc.account_global_legal_name,
    gcc.industry,
    gcc.primary_city,
    gcc.hq_country,
    gcc.total_gcc_centers,
    ts_rank(
      to_tsvector('english', gcc.account_global_legal_name),
      plainto_tsquery('english', search_query)
    ) as rank
  FROM gcc_companies gcc
  WHERE
    to_tsvector('english', gcc.account_global_legal_name) @@ plainto_tsquery('english', search_query)
    OR gcc.account_global_legal_name ILIKE '%' || search_query || '%'
  ORDER BY rank DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- UPDATED TIMESTAMP TRIGGER
-- =====================================================
-- Automatically update updated_at on row changes

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_gcc_companies_updated_at
  BEFORE UPDATE ON gcc_companies
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- VERIFY SETUP
-- =====================================================
-- Run these queries to verify everything is set up correctly

-- Check table structure
-- SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'gcc_companies';

-- Check indexes
-- SELECT indexname FROM pg_indexes WHERE tablename = 'gcc_companies';

-- Check RLS policies
-- SELECT * FROM pg_policies WHERE tablename = 'gcc_companies';
