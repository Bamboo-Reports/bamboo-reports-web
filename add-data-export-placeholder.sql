-- =====================================================
-- ADD PLACEHOLDER DOCUMENT FOR GCC DATA EXPORTS
-- =====================================================
-- This creates a placeholder entry in plan_documents 
-- to allow logging data exports in download_logs table
-- (which requires a foreign key to plan_documents)

-- Insert placeholder document for GCC companies data exports
INSERT INTO plan_documents (
  id,
  plan_name, 
  document_type, 
  title, 
  description, 
  file_path, 
  storage_bucket, 
  display_order,
  is_active
) VALUES (
  '00000000-0000-0000-0000-000000000001',  -- Fixed UUID for data exports
  'Explorer',
  'table',
  'GCC Companies Data Export',
  'Data export placeholder for download logging',
  NULL,
  NULL,
  999,  -- High display order so it doesn't interfere with normal documents
  false  -- Not active so it won't show in UI
) ON CONFLICT (id) DO NOTHING;

-- Verify the insert
SELECT id, plan_name, document_type, title, is_active 
FROM plan_documents 
WHERE id = '00000000-0000-0000-0000-000000000001';
