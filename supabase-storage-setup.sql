-- =====================================================
-- SUPABASE STORAGE SETUP FOR PLAN DOCUMENTS
-- =====================================================
-- Run this SQL in your Supabase SQL Editor
-- Dashboard → SQL Editor → New Query → Paste & Run

-- Step 1: Create storage bucket (if not created via dashboard)
-- NOTE: You can also create this via the Supabase dashboard UI
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'plan-documents',
  'plan-documents',
  false, -- private bucket
  52428800, -- 50 MB in bytes
  ARRAY['application/pdf']
)
ON CONFLICT (id) DO NOTHING;

-- Step 2: RLS Policy - Allow users to SELECT (download) documents for plans they purchased
CREATE POLICY "Users can download documents from purchased plans"
ON storage.objects
FOR SELECT
USING (
  bucket_id = 'plan-documents'
  AND (
    -- Check if user has purchased the plan that owns this document
    -- Extract plan name from path: explorer/doc.pdf -> explorer
    EXISTS (
      SELECT 1
      FROM purchases
      WHERE purchases.user_id = auth.uid()
      AND purchases.status = 'completed'
      AND LOWER(purchases.plan_name) = SPLIT_PART(name, '/', 1)
    )
  )
);

-- Step 3: RLS Policy - Allow admins to upload/manage documents
-- NOTE: You'll need to create an admin role or use service role for uploads
CREATE POLICY "Service role can manage all documents"
ON storage.objects
FOR ALL
USING (bucket_id = 'plan-documents')
WITH CHECK (bucket_id = 'plan-documents');

-- =====================================================
-- DOCUMENT METADATA TABLE
-- =====================================================
-- This table stores metadata about each document
-- Links documents to plans and provides display information

CREATE TABLE IF NOT EXISTS plan_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  plan_name TEXT NOT NULL, -- 'Explorer', 'Navigator', etc.
  document_type TEXT NOT NULL, -- 'pdf' or 'table'
  title TEXT NOT NULL, -- Display title
  description TEXT, -- Optional description
  file_path TEXT, -- Path in storage bucket (null for table type)
  storage_bucket TEXT, -- 'plan-documents' (null for table type)
  display_order INTEGER DEFAULT 0, -- Order to display in UI
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add RLS to plan_documents table
ALTER TABLE plan_documents ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can view document metadata (but not download without purchase)
CREATE POLICY "Anyone can view document metadata"
ON plan_documents
FOR SELECT
USING (is_active = true);

-- Policy: Only admins can manage documents (use service role)
CREATE POLICY "Service role can manage plan documents"
ON plan_documents
FOR ALL
USING (true)
WITH CHECK (true);

-- =====================================================
-- INSERT EXPLORER DOCUMENTS
-- =====================================================
-- Add metadata for Explorer documents

INSERT INTO plan_documents (plan_name, document_type, title, description, file_path, storage_bucket, display_order) VALUES
  ('Explorer', 'pdf', 'Standard Trends Report', 'Comprehensive GCC market insights', 'explorer/standard-trends-report.pdf', 'plan-documents', 1),
  ('Explorer', 'table', 'L1 List - 2,500+ GCCs', 'Limited view of GCC database', NULL, NULL, 2),
  ('Explorer', 'pdf', 'Annual Snapshot 2024-25', 'Free update in December', 'explorer/annual-snapshot-2024-25.pdf', 'plan-documents', 3),
  ('Explorer', 'pdf', 'Historic View (3 Years)', 'GCC movement trends in India', 'explorer/historic-view-3-years.pdf', 'plan-documents', 4),
  ('Explorer', 'pdf', 'Quarterly View', 'Latest quarter insights', 'explorer/quarterly-view.pdf', 'plan-documents', 5);

-- =====================================================
-- HELPER FUNCTION: Check if user has access to document
-- =====================================================
CREATE OR REPLACE FUNCTION user_has_document_access(user_id UUID, doc_plan_name TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM purchases
    WHERE purchases.user_id = user_has_document_access.user_id
    AND purchases.status = 'completed'
    AND purchases.plan_name = doc_plan_name
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- CREATE INDEX FOR PERFORMANCE
-- =====================================================
CREATE INDEX IF NOT EXISTS idx_plan_documents_plan_name ON plan_documents(plan_name);
CREATE INDEX IF NOT EXISTS idx_plan_documents_active ON plan_documents(is_active);
CREATE INDEX IF NOT EXISTS idx_purchases_user_status ON purchases(user_id, status);
