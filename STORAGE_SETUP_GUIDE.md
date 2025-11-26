# PDF Storage Setup Guide

## Quick Start Checklist

### ✅ Step 1: Create Storage Bucket
1. Go to Supabase Dashboard → **Storage**
2. Click **"New bucket"**
3. Settings:
   - **Name:** `plan-documents`
   - **Public:** ❌ NO (keep private)
   - **File size limit:** `50 MB`
   - **Allowed MIME types:** `application/pdf`
4. Click **Create bucket**

### ✅ Step 2: Upload Your PDFs
1. Click on the `plan-documents` bucket
2. Click **"Create folder"** → Name it `explorer`
3. Open the `explorer` folder
4. Click **"Upload file"** and upload these PDFs with **exact names**:

| PDF File | Upload As |
|----------|-----------|
| Your Standard Trends Report PDF | `standard-trends-report.pdf` |
| Your Annual Snapshot PDF | `annual-snapshot-2024-25.pdf` |
| Your Historic View PDF | `historic-view-3-years.pdf` |
| Your Quarterly View PDF | `quarterly-view.pdf` |

**⚠️ IMPORTANT:** Use the exact filenames above! The code will look for these specific names.

### ✅ Step 3: Run SQL Setup
1. Go to Supabase Dashboard → **SQL Editor**
2. Click **"New query"**
3. Copy the contents of `supabase-storage-setup.sql`
4. Paste and click **"Run"**
5. You should see: ✅ Success messages

This will:
- Create the `plan_documents` metadata table
- Set up Row Level Security (RLS) policies
- Insert Explorer document records
- Create access control functions

### ✅ Step 4: Verify Setup
Run this query in SQL Editor to verify:
```sql
-- Check if documents are properly set up
SELECT * FROM plan_documents WHERE plan_name = 'Explorer';

-- Check if storage bucket exists
SELECT * FROM storage.buckets WHERE name = 'plan-documents';

-- Check storage policies
SELECT * FROM storage.policies WHERE bucket_id = 'plan-documents';
```

You should see:
- ✅ 5 document records (4 PDFs + 1 table)
- ✅ 1 bucket named 'plan-documents'
- ✅ 2 storage policies

---

## File Naming Convention Explained

### Current Structure:
```
plan-documents/               ← Storage bucket
└── explorer/              ← Folder (matches plan name in lowercase-hyphenated)
    ├── standard-trends-report.pdf
    ├── annual-snapshot-2024-25.pdf
    ├── historic-view-3-years.pdf
    └── quarterly-view.pdf
```

### Why This Naming Convention?

1. **Folder = Plan Name**
   - `explorer/` → "Explorer" plan
   - `navigator/` → "Navigator" plan (future)
   - Pattern: Lowercase, hyphens instead of spaces

2. **File Names = Descriptive + Kebab Case**
   - Use lowercase
   - Separate words with hyphens (`-`)
   - Include version/year if relevant
   - Example: `annual-snapshot-2024-25.pdf`

3. **Access Control Logic**
   - When user purchases "Explorer"
   - System checks: `purchases.plan_name = 'Explorer'`
   - Grants access to all files in `explorer/` folder
   - User can only download if purchase status = 'completed'

### Future Expansion:
```
plan-documents/
├── explorer/
│   ├── standard-trends-report.pdf
│   ├── annual-snapshot-2024-25.pdf
│   ├── historic-view-3-years.pdf
│   └── quarterly-view.pdf
├── navigator/
│   ├── custom-trends-report.pdf
│   ├── l2-accounts-database.pdf
│   └── prospects-database.pdf
└── consult-layer/
    └── consultation-materials.pdf
```

---

## How Access Control Works

### Security Flow:
1. **User purchases "Explorer"** → Record created in `purchases` table
2. **User tries to download PDF** → System checks:
   ```sql
   Does this user have a completed purchase for "Explorer"?
   ```
3. **If YES** → Download allowed ✅
4. **If NO** → Access denied ❌

### RLS Policy (Row Level Security):
```sql
-- Users can only download documents if they purchased the plan
SELECT * FROM storage.objects
WHERE bucket_id = 'plan-documents'
AND user_has_purchased_plan(auth.uid(), plan_name_from_path);
```

---

## Testing Access Control

### Test 1: Anonymous User (Not Logged In)
```javascript
// Should FAIL - no authentication
const { data, error } = await supabase.storage
  .from('plan-documents')
  .download('explorer/standard-trends-report.pdf');

// Expected: error = "Anonymous access denied"
```

### Test 2: Logged In User (No Purchase)
```javascript
// Should FAIL - no purchase record
const { data, error } = await supabase.storage
  .from('plan-documents')
  .download('explorer/standard-trends-report.pdf');

// Expected: error = "Access denied - no valid purchase"
```

### Test 3: Logged In User (With Explorer Purchase)
```javascript
// Should SUCCESS - has completed purchase
const { data, error } = await supabase.storage
  .from('plan-documents')
  .download('explorer/standard-trends-report.pdf');

// Expected: data = PDF file blob
```

---

## Troubleshooting

### Problem: "Access denied" even after purchase
**Solution:**
1. Check purchase status: `SELECT * FROM purchases WHERE user_id = 'YOUR_USER_ID'`
2. Ensure `status = 'completed'`
3. Ensure `plan_name = 'Explorer'` (exact match, case-sensitive)

### Problem: "File not found"
**Solution:**
1. Verify file path in storage: `SELECT * FROM storage.objects WHERE bucket_id = 'plan-documents'`
2. Check exact filename matches (case-sensitive)
3. Ensure folder structure: `explorer/filename.pdf`

### Problem: RLS policy not working
**Solution:**
1. Run: `SELECT * FROM storage.policies WHERE bucket_id = 'plan-documents'`
2. Ensure 2 policies exist (SELECT and ALL)
3. Re-run the SQL from `supabase-storage-setup.sql`

---

## Next Steps

After completing this setup:
1. ✅ Bucket created
2. ✅ PDFs uploaded
3. ✅ SQL executed
4. ✅ Access control configured

**Ready for:** Building the UI components to display and download these documents!

I'll create:
- Document list component (shows purchased documents)
- Download/view functionality
- Integration with Purchases page
- GCC data table component

Just let me know when you've completed the upload! 🚀
