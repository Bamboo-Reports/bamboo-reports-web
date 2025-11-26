-- =====================================================
-- MIGRATION SCRIPT: Rename Plan Names
-- =====================================================
-- Run this SQL in your Supabase SQL Editor to migrate existing data
-- from old plan names to new plan names
--
-- Old Names → New Names:
-- "Base Layer" → "Explorer"
-- "Custom Layer" → "Navigator"
-- "Consult Layer" → "Enterprise Intelligence"

-- =====================================================
-- Step 1: Update plan_documents table
-- =====================================================

-- Update plan names
UPDATE plan_documents
SET plan_name = 'Explorer'
WHERE plan_name = 'Base Layer';

UPDATE plan_documents
SET plan_name = 'Navigator'
WHERE plan_name = 'Custom Layer';

UPDATE plan_documents
SET plan_name = 'Enterprise Intelligence'
WHERE plan_name = 'Consult Layer';

-- Update file paths in plan_documents
UPDATE plan_documents
SET file_path = REPLACE(file_path, 'base-layer/', 'explorer/')
WHERE file_path LIKE 'base-layer/%';

UPDATE plan_documents
SET file_path = REPLACE(file_path, 'custom-layer/', 'navigator/')
WHERE file_path LIKE 'custom-layer/%';

UPDATE plan_documents
SET file_path = REPLACE(file_path, 'consult-layer/', 'enterprise-intelligence/')
WHERE file_path LIKE 'consult-layer/%';

-- =====================================================
-- Step 2: Update purchases table
-- =====================================================

UPDATE purchases
SET plan_name = 'Explorer'
WHERE plan_name = 'Base Layer';

UPDATE purchases
SET plan_name = 'Navigator'
WHERE plan_name = 'Custom Layer';

UPDATE purchases
SET plan_name = 'Enterprise Intelligence'
WHERE plan_name = 'Consult Layer';

-- =====================================================
-- Step 3: Update RLS Policies
-- =====================================================

-- Drop old policy
DROP POLICY IF EXISTS "Base Layer purchasers can view GCC companies" ON gcc_companies;

-- Create new policy with Explorer
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

-- =====================================================
-- Step 4: Verify Migration
-- =====================================================

-- Check plan_documents
SELECT plan_name, COUNT(*) as count
FROM plan_documents
GROUP BY plan_name
ORDER BY plan_name;

-- Check purchases
SELECT plan_name, COUNT(*) as count
FROM purchases
GROUP BY plan_name
ORDER BY plan_name;

-- Check RLS policies
SELECT policyname, tablename
FROM pg_policies
WHERE tablename IN ('gcc_companies', 'plan_documents');

-- =====================================================
-- Expected Results:
-- =====================================================
-- plan_documents should show:
--   - "Explorer" (5 documents)
--   - "Navigator" (if any)
--   - "Enterprise Intelligence" (if any)
--
-- purchases should show:
--   - "Explorer" (count of old Base Layer purchases)
--   - "Navigator" (count of old Custom Layer purchases)
--   - "Enterprise Intelligence" (count of old Consult Layer purchases)
--
-- pg_policies should show:
--   - "Explorer purchasers can view GCC companies" on gcc_companies
-- =====================================================
