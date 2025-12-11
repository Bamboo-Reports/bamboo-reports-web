# GCC Companies Data Import Guide

## Step 1: Create Database Table ✅

1. Go to **Supabase Dashboard** → **SQL Editor**
2. Click **"New query"**
3. Copy contents of `gcc-companies-schema.sql`
4. Paste and click **"Run"**
5. You should see: ✅ Success

This creates:
- `gcc_companies` table with all required columns
- RLS policies (only Explorer purchasers can view)
- Search indexes for performance
- Full-text search function

---

## Step 2: Import Your Excel Data

You have **3 options** to import your Excel data. Choose the one that works best for you:

---

## 🎯 OPTION 1: CSV Import (Recommended - Easiest)

### Step A: Convert Excel to CSV

1. **Open your Excel file**
2. **File** → **Save As**
3. **Format:** Choose "CSV UTF-8 (Comma delimited) (.csv)"
4. **Save as:** `gcc-companies.csv`

### Step B: Prepare CSV with Correct Column Names

Your CSV headers must match the database column names exactly. Open the CSV and ensure the first row has:

```csv
account_global_legal_name,revenue_range,hq_country,hq_region,website,industry,category,total_centers,total_gcc_centers,india_employees_range,established_in_india,years_in_india,primary_city,secondary_city,services_offered
```

**Mapping your Excel columns:**

| Excel Column | CSV Column Name |
|--------------|-----------------|
| Account Global Legal Name | account_global_legal_name |
| Revenue Range | revenue_range |
| HQ Country | hq_country |
| HQ Region | hq_region |
| Website | website |
| Industry | industry |
| Category | category |
| Total Centers | total_centers |
| Total GCC Centers | total_gcc_centers |
| India Employees Range | india_employees_range |
| Established In India | established_in_india |
| Years in India | years_in_india |
| Primary City | primary_city |
| Secondary City | secondary_city |
| Services Offered | services_offered |

### Step C: Import via Supabase Dashboard

1. **Go to:** Supabase Dashboard → **Table Editor**
2. **Find:** `gcc_companies` table
3. **Click:** "Insert" → "Import data from CSV"
4. **Upload:** Your `gcc-companies.csv` file
5. **Map columns** (should auto-match if headers are correct)
6. **Click:** "Import"
7. **Wait** for import to complete

**Verify:**
```sql
SELECT COUNT(*) FROM gcc_companies;
-- Should return: ~2,500
```

---

## 🎯 OPTION 2: Convert to JSON & Use Script (More Control)

### Step A: Convert Excel to JSON

**Option 2a: Online Converter**
1. Go to: https://www.convertcsv.com/excel-to-json.htm
2. Upload your Excel file
3. Click "Convert Excel to JSON"
4. Download as `gcc-companies.json`

**Option 2b: Excel → CSV → JSON**
1. Save Excel as CSV (see Option 1)
2. Use this website: https://csvjson.com/csv2json
3. Paste CSV content
4. Download JSON

**Option 2c: Manual Export**
If your Excel is already JSON format, save it as:
`/home/user/bamboo-reports-web/gcc-companies.json`

### Step B: Use the Import Script

I'll create a Node.js script that:
- Reads your JSON file
- Transforms column names to match database
- Bulk inserts into Supabase

See **OPTION 3** below for the script.

---

## 🎯 OPTION 3: Automated Script (Best for Large Datasets)

I'll create a Node.js import script for you. This is best if you have:
- Large dataset (2,500+ records)
- Need to transform/clean data
- Want repeatable imports

### Benefits:
✅ Handles column name mapping automatically
✅ Validates data before import
✅ Shows progress during import
✅ Can re-run if needed
✅ Handles errors gracefully

---

## 📋 My Recommendation

**For you:** Use **OPTION 1 (CSV Import)** because:
- Fastest method
- No coding required
- Built-in to Supabase
- Perfect for one-time import

**Steps:**
1. ✅ Run `gcc-companies-schema.sql` (creates table)
2. ✅ Save Excel as CSV with correct column names
3. ✅ Import via Supabase Table Editor
4. ✅ Verify data is imported

---

## 🔧 Need Help with Column Mapping?

If your Excel column names don't match exactly, I can:
1. Create a script to auto-map them
2. Or create a CSV template you can copy-paste your data into

**Just let me know:**
- Do your Excel column names match the structure you shared?
- Or do they need mapping/transformation?

---

## 🚨 Common Issues & Solutions

### Issue: "Column not found" error during import
**Solution:** Ensure CSV headers match database column names exactly (lowercase, underscores)

### Issue: Multi-line data (Location, Services) not importing correctly
**Solution:** Ensure newlines are preserved as `\n` in CSV. Some Excel exports may convert them.

### Issue: Import timeout with large dataset
**Solution:** Use OPTION 3 (script) to import in batches

### Issue: Data imported but shows as empty in app
**Solution:** Check RLS policies - ensure your user has a Explorer purchase record

---

## ✅ Verification Checklist

After import, run these SQL queries to verify:

```sql
-- 1. Check total records
SELECT COUNT(*) FROM gcc_companies;
-- Expected: ~2,500

-- 2. Check sample data
SELECT * FROM gcc_companies LIMIT 5;

-- 3. Check for nulls in important columns
SELECT COUNT(*) FROM gcc_companies WHERE account_global_legal_name IS NULL;
-- Expected: 0

-- 4. Check RLS is enabled
SELECT * FROM pg_policies WHERE tablename = 'gcc_companies';
-- Expected: 2 policies

-- 5. Test search function
SELECT * FROM search_gcc_companies('ai');
-- Should return companies with "ai" in name
```

---

## 🎯 Ready to Import?

**Tell me which option you want to use:**
1. **CSV Import** (I'll guide you through column mapping)
2. **JSON + Script** (I'll create the import script)
3. **Need help converting Excel** (I can create a template)

Once data is imported, I'll build the UI to display it! 🚀
