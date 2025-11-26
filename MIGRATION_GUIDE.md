# Migration Guide: Updating Plan Names

This guide will help you migrate your existing Supabase database and storage from the old plan names to the new ones.

## Overview

**Old Names → New Names:**
- "Base Layer" → "Explorer"
- "Custom Layer" → "Navigator"
- "Consult Layer" → "Enterprise Intelligence"

## Migration Steps

### Step 1: Update Supabase Database

1. Go to your **Supabase Dashboard** → **SQL Editor**
2. Click **"New query"**
3. Copy the contents of `migrate-plan-names.sql`
4. Paste and click **"Run"**
5. Check the verification results at the bottom

**What this does:**
- ✅ Updates `plan_documents` table with new plan names
- ✅ Updates file paths in `plan_documents` table
- ✅ Updates `purchases` table with new plan names
- ✅ Recreates RLS policy for `gcc_companies` table
- ✅ Verifies all changes

### Step 2: Update Supabase Storage

You need to reorganize the PDF files in your storage bucket:

#### Option A: Move Files (Recommended)

Unfortunately, Supabase doesn't support renaming/moving folders directly in the UI. You'll need to:

1. Go to **Supabase Dashboard** → **Storage** → `plan-documents` bucket
2. **Download** all files from the `base-layer/` folder to your computer
3. Create a new folder called `explorer`
4. **Upload** the downloaded files to the `explorer/` folder
5. **Delete** the old `base-layer/` folder (after confirming uploads)

**Files to move:**
```
base-layer/standard-trends-report.pdf → explorer/standard-trends-report.pdf
base-layer/annual-snapshot-2024-25.pdf → explorer/annual-snapshot-2024-25.pdf
base-layer/historic-view-3-years.pdf → explorer/historic-view-3-years.pdf
base-layer/quarterly-view.pdf → explorer/quarterly-view.pdf
```

#### Option B: Use Supabase CLI (Advanced)

If you have Supabase CLI installed:

```bash
# Download files
supabase storage cp plan-documents/base-layer/standard-trends-report.pdf ./temp/
supabase storage cp plan-documents/base-layer/annual-snapshot-2024-25.pdf ./temp/
supabase storage cp plan-documents/base-layer/historic-view-3-years.pdf ./temp/
supabase storage cp plan-documents/base-layer/quarterly-view.pdf ./temp/

# Create new folder and upload
supabase storage mkdir plan-documents/explorer
supabase storage cp ./temp/standard-trends-report.pdf plan-documents/explorer/
supabase storage cp ./temp/annual-snapshot-2024-25.pdf plan-documents/explorer/
supabase storage cp ./temp/historic-view-3-years.pdf plan-documents/explorer/
supabase storage cp ./temp/quarterly-view.pdf plan-documents/explorer/

# Remove old folder
supabase storage rm plan-documents/base-layer/standard-trends-report.pdf
supabase storage rm plan-documents/base-layer/annual-snapshot-2024-25.pdf
supabase storage rm plan-documents/base-layer/historic-view-3-years.pdf
supabase storage rm plan-documents/base-layer/quarterly-view.pdf
supabase storage rmdir plan-documents/base-layer
```

### Step 3: Test the Migration

After completing the migration:

1. **Test Database Access:**
   ```sql
   -- Should return Explorer data
   SELECT * FROM plan_documents WHERE plan_name = 'Explorer';

   -- Should return 0 results (old name)
   SELECT * FROM plan_documents WHERE plan_name = 'Base Layer';

   -- Check if any purchases were migrated
   SELECT * FROM purchases WHERE plan_name = 'Explorer';
   ```

2. **Test File Access:**
   - Log in to your application
   - Go to `/my-content` (if you have a purchase)
   - Verify PDFs load correctly from the new `explorer/` folder

3. **Test Purchase Flow:**
   - Go to `/pricing`
   - Verify new plan names are displayed:
     - ✅ "Explorer"
     - ✅ "Navigator"
     - ✅ "Enterprise Intelligence"
   - Make a test purchase to ensure new plan names are saved correctly

### Step 4: Verify Everything Works

**Checklist:**
- ✅ Database tables updated with new plan names
- ✅ Storage folders renamed (base-layer → explorer)
- ✅ PDFs accessible from new paths
- ✅ Pricing page shows new names
- ✅ Existing purchases still work with new names
- ✅ New purchases use new plan names
- ✅ GCC data access works for Explorer purchasers

## Rollback Plan

If something goes wrong, you can revert the database changes:

```sql
-- Revert plan_documents
UPDATE plan_documents SET plan_name = 'Base Layer' WHERE plan_name = 'Explorer';
UPDATE plan_documents SET plan_name = 'Custom Layer' WHERE plan_name = 'Navigator';
UPDATE plan_documents SET plan_name = 'Consult Layer' WHERE plan_name = 'Enterprise Intelligence';

-- Revert file paths
UPDATE plan_documents SET file_path = REPLACE(file_path, 'explorer/', 'base-layer/') WHERE file_path LIKE 'explorer/%';

-- Revert purchases
UPDATE purchases SET plan_name = 'Base Layer' WHERE plan_name = 'Explorer';
UPDATE purchases SET plan_name = 'Custom Layer' WHERE plan_name = 'Navigator';
UPDATE purchases SET plan_name = 'Consult Layer' WHERE plan_name = 'Enterprise Intelligence';

-- Revert RLS policy
DROP POLICY IF EXISTS "Explorer purchasers can view GCC companies" ON gcc_companies;
CREATE POLICY "Base Layer purchasers can view GCC companies"
ON gcc_companies FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM purchases
    WHERE purchases.user_id = auth.uid()
    AND purchases.status = 'completed'
    AND purchases.plan_name = 'Base Layer'
  )
);
```

Then revert the storage folder names back to `base-layer/`.

## Common Issues

### Issue: "File not found" errors after migration
**Solution:** Make sure you've moved all PDF files to the new `explorer/` folder in Supabase Storage.

### Issue: Existing purchases can't access content
**Solution:** Verify the purchases table was updated:
```sql
SELECT user_id, plan_name, status FROM purchases WHERE status = 'completed';
```
All old "Base Layer" purchases should now show "Explorer".

### Issue: RLS policy error
**Solution:** The old policy might still exist. Drop it manually:
```sql
DROP POLICY IF EXISTS "Base Layer purchasers can view GCC companies" ON gcc_companies;
```
Then re-run the migration script.

## Support

If you encounter any issues during migration:
1. Check the SQL query results for errors
2. Verify file paths in Supabase Storage
3. Test with a user who has an existing purchase
4. Check browser console for any errors

---

**Important:** Make a backup of your database before running the migration, or test in a staging environment first!
