# Pricing Tier Rename Guide

This guide provides step-by-step instructions for renaming pricing tiers throughout the entire application, including frontend, backend, database, storage, and documentation.

## Overview

When renaming pricing tiers, you need to update:
1. **Frontend code** - UI components displaying plan names
2. **Backend SQL schemas** - Database tables and RLS policies
3. **Supabase Storage** - Folder structures for plan documents
4. **Documentation** - All guides and setup files
5. **Database data** - Migrate existing purchases and documents

---

## Prerequisites

Before starting:
- [ ] Have access to Supabase Dashboard (for database and storage)
- [ ] Have access to the codebase repository
- [ ] Have access to deployment platform (Netlify/Vercel)
- [ ] **Create a backup** of your database
- [ ] Test in staging environment first (if available)

---

## Step 1: Frontend Changes

### Files to Update:

#### 1.1 `src/pages/Pricing.tsx`

Update the `plans` array with new tier names:

```typescript
const plans = [
  {
    name: "NEW_PLAN_NAME_1", // Change this
    price: { USD: "1,299", INR: "1,09,999" },
    features: [
      {
        title: "Everything from NEW_PLAN_NAME_1", // Update cross-references
        description: "...",
      },
      // ... other features
    ],
  },
  {
    name: "NEW_PLAN_NAME_2", // Change this
    features: [
      {
        title: "Everything from NEW_PLAN_NAME_1 + NEW_PLAN_NAME_2", // Update
        description: "...",
      },
    ],
  },
];
```

**What to update:**
- [ ] Plan `name` properties
- [ ] Feature descriptions that reference other plan names
- [ ] Any hardcoded plan name strings

#### 1.2 `src/hooks/usePurchaseAccess.ts`

Update JSDoc comments:

```typescript
/**
 * Hook to check if the current user has purchased a specific plan
 * @param planName - Name of the plan to check (e.g., "NEW_PLAN_NAME")
 * @returns Object with purchase status and data
 */
```

**What to update:**
- [ ] JSDoc example plan names in comments

---

## Step 2: Backend SQL Schema Updates

### Files to Update:

#### 2.1 `supabase-storage-setup.sql`

**Update plan_documents table comment:**
```sql
CREATE TABLE IF NOT EXISTS plan_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  plan_name TEXT NOT NULL, -- 'NEW_PLAN_NAME_1', 'NEW_PLAN_NAME_2', etc.
  -- ... rest of schema
);
```

**Update document INSERT statements:**
```sql
INSERT INTO plan_documents (plan_name, document_type, title, description, file_path, storage_bucket, display_order) VALUES
  ('NEW_PLAN_NAME_1', 'pdf', 'Document Title', 'Description', 'new-folder-name/doc.pdf', 'plan-documents', 1),
  -- ... more documents
```

**Update RLS policy comments:**
```sql
-- Extract plan name from path: new-folder-name/doc.pdf -> new-folder-name
```

**What to update:**
- [ ] Table comments with plan name examples
- [ ] INSERT statements with new plan names
- [ ] File paths from `old-folder/` to `new-folder/`
- [ ] RLS policy example comments

#### 2.2 `gcc-companies-schema.sql`

**Update RLS policy:**
```sql
-- Policy: Only users who purchased NEW_PLAN_NAME_1 can view GCC companies
CREATE POLICY "NEW_PLAN_NAME_1 purchasers can view GCC companies"
ON gcc_companies
FOR SELECT
USING (
  EXISTS (
    SELECT 1
    FROM purchases
    WHERE purchases.user_id = auth.uid()
    AND purchases.status = 'completed'
    AND purchases.plan_name = 'NEW_PLAN_NAME_1'
  )
);
```

**What to update:**
- [ ] Policy name
- [ ] Comment describing the policy
- [ ] `plan_name` value in the USING clause

#### 2.3 `.env.example`

**Update comments:**
```env
## Set to 'true' to enable Razorpay payment integration for NEW_PLAN_NAME_1 and NEW_PLAN_NAME_2
VITE_SUBSCRIPTION_ENABLED=false
```

**What to update:**
- [ ] Comments referencing plan names

---

## Step 3: Documentation Updates

### Files to Update:

Use find and replace (case-sensitive) for each plan name:

#### 3.1 Main Implementation Guide

**Rename file:**
```bash
mv OLD_PLAN_IMPLEMENTATION_GUIDE.md NEW_PLAN_IMPLEMENTATION_GUIDE.md
```

**Replace all occurrences:**
- [ ] Old plan name (proper case) → New plan name (proper case)
- [ ] old-folder-name → new-folder-name
- [ ] Cross-references to other plan names

#### 3.2 Other Documentation Files

Update these files using find and replace:

- [ ] `PURCHASES_SETUP_GUIDE.md`
  - Plan names in features lists
  - Example plan names

- [ ] `STORAGE_SETUP_GUIDE.md`
  - Folder structure examples
  - File path examples
  - Plan name references

- [ ] `GCC_DATA_IMPORT_GUIDE.md`
  - RLS policy descriptions

- [ ] `PURCHASES_SCHEMA.md`
  - Plan name examples in field descriptions

**Find and Replace Pattern:**
```
Find: "Old Plan Name"
Replace: "New Plan Name"

Find: "old-folder-name"
Replace: "new-folder-name"
```

---

## Step 4: Create Migration Script

Create `migrate-plan-names.sql` with the following structure:

```sql
-- =====================================================
-- MIGRATION SCRIPT: Rename Plan Names
-- =====================================================
-- Old Names → New Names:
-- "Old Plan 1" → "New Plan 1"
-- "Old Plan 2" → "New Plan 2"

-- Update plan_documents table
UPDATE plan_documents
SET plan_name = 'New Plan 1'
WHERE plan_name = 'Old Plan 1';

UPDATE plan_documents
SET plan_name = 'New Plan 2'
WHERE plan_name = 'Old Plan 2';

-- Update file paths
UPDATE plan_documents
SET file_path = REPLACE(file_path, 'old-folder-1/', 'new-folder-1/')
WHERE file_path LIKE 'old-folder-1/%';

UPDATE plan_documents
SET file_path = REPLACE(file_path, 'old-folder-2/', 'new-folder-2/')
WHERE file_path LIKE 'old-folder-2/%';

-- Update purchases table
UPDATE purchases
SET plan_name = 'New Plan 1'
WHERE plan_name = 'Old Plan 1';

UPDATE purchases
SET plan_name = 'New Plan 2'
WHERE plan_name = 'Old Plan 2';

-- Update RLS Policies
DROP POLICY IF EXISTS "Old Plan 1 purchasers can view GCC companies" ON gcc_companies;

CREATE POLICY "New Plan 1 purchasers can view GCC companies"
ON gcc_companies
FOR SELECT
USING (
  EXISTS (
    SELECT 1
    FROM purchases
    WHERE purchases.user_id = auth.uid()
    AND purchases.status = 'completed'
    AND purchases.plan_name = 'New Plan 1'
  )
);

-- Verify Migration
SELECT plan_name, COUNT(*) as count
FROM plan_documents
GROUP BY plan_name;

SELECT plan_name, COUNT(*) as count
FROM purchases
GROUP BY plan_name;
```

---

## Step 5: Commit Code Changes

```bash
# Check what files changed
git status

# Add all changes
git add -A

# Commit with descriptive message
git commit -m "Rename pricing tiers: Old Plan → New Plan

- Frontend: Updated Pricing.tsx with new tier names
- Backend: Updated SQL schemas and RLS policies
- Storage: Changed folder paths from old-folder/ to new-folder/
- Documentation: Updated all guides and renamed files
- Migration: Created migration script for existing data
"

# Push to your branch
git push -u origin your-feature-branch
```

---

## Step 6: Database Migration

### 6.1 Run Migration SQL

1. Go to **Supabase Dashboard** → **SQL Editor**
2. Click **"New query"**
3. Copy contents of `migrate-plan-names.sql`
4. Paste and click **"Run"**
5. Verify results at the bottom

**Expected Results:**
- ✅ plan_documents updated with new plan names
- ✅ File paths updated with new folder names
- ✅ purchases updated with new plan names
- ✅ RLS policies recreated

### 6.2 Verify Database

```sql
-- Should show only new plan names
SELECT DISTINCT plan_name FROM plan_documents;

-- Should show only new plan names
SELECT DISTINCT plan_name FROM purchases;

-- Should show new policy names
SELECT policyname FROM pg_policies WHERE tablename = 'gcc_companies';
```

---

## Step 7: Storage Migration

### Option A: Manual (Supabase Dashboard)

For each plan:

1. Go to **Storage** → `plan-documents` bucket
2. **Download** all PDFs from `old-folder/`
3. Click **"New folder"** → Create `new-folder`
4. **Upload** PDFs to `new-folder/`
5. **Verify** all files uploaded correctly
6. **Delete** `old-folder/`

### Option B: Supabase CLI

```bash
# List current files
supabase storage ls plan-documents/old-folder

# Copy files to new location
supabase storage cp plan-documents/old-folder/file1.pdf plan-documents/new-folder/file1.pdf
supabase storage cp plan-documents/old-folder/file2.pdf plan-documents/new-folder/file2.pdf
# ... repeat for all files

# Verify new files exist
supabase storage ls plan-documents/new-folder

# Delete old folder
supabase storage rm -r plan-documents/old-folder
```

### Verify Storage Migration

In SQL Editor:
```sql
SELECT name FROM storage.objects
WHERE bucket_id = 'plan-documents'
ORDER BY name;
```

Should show:
- ✅ `new-folder/file1.pdf`
- ✅ `new-folder/file2.pdf`
- ❌ No `old-folder/` files

---

## Step 8: Testing

### 8.1 Local Testing (Before Deployment)

```bash
# Run development server
npm run dev

# Test in browser
# 1. Go to http://localhost:5173/pricing
# 2. Verify new plan names display
# 3. Check browser console for errors
```

### 8.2 Database Testing

```sql
-- Test 1: Check plan_documents
SELECT * FROM plan_documents WHERE plan_name = 'New Plan Name';
-- Should return documents with new plan name

-- Test 2: Check no old names remain
SELECT * FROM plan_documents WHERE plan_name = 'Old Plan Name';
-- Should return 0 rows

-- Test 3: Check file paths
SELECT file_path FROM plan_documents WHERE file_path LIKE 'old-folder%';
-- Should return 0 rows

-- Test 4: Check storage files
SELECT name FROM storage.objects WHERE bucket_id = 'plan-documents';
-- Should show new-folder/ paths only
```

### 8.3 End-to-End Testing (After Deployment)

**Test Pricing Page:**
- [ ] Navigate to `/pricing`
- [ ] Verify all new plan names display correctly
- [ ] Verify no old plan names appear
- [ ] Check feature descriptions reference correct plan names

**Test Existing Purchases:**
- [ ] Log in with account that has old purchase
- [ ] Go to `/purchases` or `/my-content`
- [ ] Verify purchase shows new plan name
- [ ] Verify content is still accessible
- [ ] Verify PDFs download correctly

**Test New Purchase Flow:**
- [ ] Make a test purchase of new plan
- [ ] Check database: `SELECT * FROM purchases ORDER BY purchased_at DESC LIMIT 1;`
- [ ] Verify plan_name uses new name
- [ ] Verify content access works

**Test GCC Data Access:**
- [ ] Log in with account that purchased first tier
- [ ] Navigate to GCC data table
- [ ] Verify data loads (RLS policy working)

---

## Step 9: Deployment

### Deploy to Production

```bash
# For Netlify
git push origin main  # or your production branch

# Or trigger manual deploy in Netlify dashboard
```

### Post-Deployment Checklist

- [ ] Verify pricing page shows new names
- [ ] Test with real user account (if possible)
- [ ] Check Netlify function logs for errors
- [ ] Verify payment processing works with new plan names
- [ ] Monitor for any user-reported issues

---

## Step 10: Communication & Documentation

### Update Internal Documentation

- [ ] Update any internal wikis or notion pages
- [ ] Notify team members of the changes
- [ ] Update any marketing materials
- [ ] Update pricing comparison charts

### Customer Communication (if needed)

- [ ] Draft email to existing customers (if name change is significant)
- [ ] Update help documentation
- [ ] Update FAQs if plan names are mentioned

---

## Rollback Plan

If something goes wrong:

### 1. Revert Code Changes

```bash
git revert <commit-hash>
git push
```

### 2. Revert Database

```sql
-- Revert plan_documents
UPDATE plan_documents SET plan_name = 'Old Plan 1' WHERE plan_name = 'New Plan 1';
UPDATE plan_documents SET file_path = REPLACE(file_path, 'new-folder/', 'old-folder/') WHERE file_path LIKE 'new-folder/%';

-- Revert purchases
UPDATE purchases SET plan_name = 'Old Plan 1' WHERE plan_name = 'New Plan 1';

-- Revert RLS policies
DROP POLICY IF EXISTS "New Plan 1 purchasers can view GCC companies" ON gcc_companies;
CREATE POLICY "Old Plan 1 purchasers can view GCC companies" ON gcc_companies FOR SELECT USING (...);
```

### 3. Revert Storage

Move files back from `new-folder/` to `old-folder/`

---

## Checklist Summary

Use this checklist to ensure nothing is missed:

### Code Changes
- [ ] Updated `src/pages/Pricing.tsx` with new plan names
- [ ] Updated `src/hooks/usePurchaseAccess.ts` comments
- [ ] Updated `supabase-storage-setup.sql`
- [ ] Updated `gcc-companies-schema.sql`
- [ ] Updated `.env.example`

### Documentation
- [ ] Renamed main implementation guide file
- [ ] Updated all documentation files with new plan names
- [ ] Updated folder path examples
- [ ] Updated RLS policy descriptions

### Migration
- [ ] Created `migrate-plan-names.sql` script
- [ ] Ran migration script in Supabase
- [ ] Verified database updates
- [ ] Moved files in Supabase Storage
- [ ] Verified storage structure

### Testing
- [ ] Tested locally before deployment
- [ ] Verified database changes
- [ ] Tested pricing page displays correctly
- [ ] Tested existing purchases still work
- [ ] Tested new purchase flow
- [ ] Tested content access (PDFs, GCC data)

### Deployment
- [ ] Committed all changes with clear message
- [ ] Pushed to repository
- [ ] Deployed to production
- [ ] Verified production works correctly
- [ ] Monitored for errors

---

## Common Issues & Solutions

### Issue: "File not found" errors after migration
**Cause:** Files weren't moved to new storage folders
**Solution:** Verify files exist in new folders using `SELECT name FROM storage.objects WHERE bucket_id = 'plan-documents'`

### Issue: Existing purchases can't access content
**Cause:** Purchases table wasn't updated
**Solution:** Run `UPDATE purchases SET plan_name = 'New Plan' WHERE plan_name = 'Old Plan'`

### Issue: RLS policy error "already exists"
**Cause:** Old policy wasn't dropped first
**Solution:** Run `DROP POLICY IF EXISTS "old policy name" ON table_name;` before creating new policy

### Issue: Storage RLS denying access
**Cause:** Folder name doesn't match lowercased plan name
**Solution:** Ensure folder is lowercase: "New Plan" → `new-plan/` folder

---

## Tips for Future Renames

1. **Always test in staging first** - Never rename directly in production
2. **Use find-and-replace carefully** - Case-sensitive matters
3. **Backup before migration** - Database and storage
4. **Communicate early** - Inform team before making changes
5. **Document everything** - Keep this guide updated
6. **Test with real data** - Use actual user accounts for testing
7. **Monitor post-deployment** - Watch for errors or user reports

---

## Example: Recent Rename

**What we changed:**
- "Base Layer" → "Explorer"
- "Custom Layer" → "Navigator"
- "Consult Layer" → "Enterprise Intelligence"

**Files modified:**
- 10 code/SQL files
- 5 documentation files
- Database: 15 records updated
- Storage: 4 files moved

**Time taken:** ~2 hours (including testing)

**Issues encountered:** None (followed this guide!)

---

## Questions?

If you encounter issues not covered in this guide:
1. Check git history for previous renames
2. Review the migration script from last time
3. Consult with team lead or senior developer
4. Update this guide with new learnings!

---

**Last Updated:** 2025-11-26
**Version:** 1.0
**Tested On:** bamboo-reports-web (Explorer/Navigator/Enterprise Intelligence rename)
