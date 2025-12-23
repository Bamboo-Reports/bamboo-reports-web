-- =====================================================
-- MODIFY DOWNLOAD_LOGS TABLE FOR DATA EXPORTS
-- =====================================================
-- This removes the foreign key constraint on document_id
-- and makes it nullable, allowing data exports to be logged
-- without needing a corresponding plan_documents entry.

-- Step 1: Remove the foreign key constraint
ALTER TABLE download_logs 
  DROP CONSTRAINT IF EXISTS download_logs_document_id_fkey;

-- Step 2: Make document_id nullable (for data exports that don't have a document)
ALTER TABLE download_logs 
  ALTER COLUMN document_id DROP NOT NULL;

-- Step 3: Change column type from UUID to TEXT (more flexible for both UUIDs and null)
ALTER TABLE download_logs 
  ALTER COLUMN document_id TYPE TEXT;

-- Verify the changes
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'download_logs' AND column_name = 'document_id';
