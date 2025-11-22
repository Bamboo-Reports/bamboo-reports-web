# Import Scripts

## GCC Companies Data Import

Choose your preferred language: **Python** (recommended) or JavaScript

---

## 🐍 PYTHON SCRIPT (Recommended)

### Prerequisites

1. **Run the database schema first:**
   ```bash
   # In Supabase SQL Editor, run:
   gcc-companies-schema.sql
   ```

2. **Install Python dependencies:**
   ```bash
   pip install -r scripts/requirements.txt
   ```

3. **Environment variables:**
   Ensure `.env` has:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

### Usage

The Python script can read **Excel (.xlsx), JSON, or CSV** files directly!

**Import from Excel (easiest):**
```bash
python scripts/import-gcc-data.py --file your-file.xlsx
```

**Import from JSON:**
```bash
python scripts/import-gcc-data.py --file gcc-companies.json
```

**Import from CSV:**
```bash
python scripts/import-gcc-data.py --file gcc-companies.csv
```

**Clear existing data and import fresh:**
```bash
python scripts/import-gcc-data.py --file your-file.xlsx --clear
```

**Preview data without importing (dry run):**
```bash
python scripts/import-gcc-data.py --file your-file.xlsx --dry-run
```

**Custom batch size:**
```bash
python scripts/import-gcc-data.py --file your-file.xlsx --batch-size 50
```

### Features

✅ **Reads Excel directly** - No need to convert to CSV/JSON!
✅ **Auto-mapping** - Automatically maps your Excel columns to database columns
✅ **Progress bar** - Visual progress indicator during import
✅ **Dry run** - Preview data before importing
✅ **Batch processing** - Imports in configurable batches
✅ **Error handling** - Clear error messages
✅ **Verification** - Automatically verifies import success

### Expected Output

```
==================================================
🚀 GCC Companies Data Import
==================================================

✅ Connected to Supabase

📂 Loading data from: gcc-companies.xlsx
✅ Loaded Excel file: 2500 records

🔄 Transforming data...
✅ Transformed 2500 records

📊 Starting import of 2500 records
📦 Batch size: 100

Importing: 100%|████████████████████| 25/25 [00:15<00:00,  1.63batch/s]

==================================================
📊 Import Complete

✅ Successfully imported: 2500 / 2500
==================================================

🔍 Verifying import...

✅ Total records in database: 2500

📋 Sample records:
   1. [24]7.ai, Inc. - StarK Industry - Bengaluru
   2. AbsolutData Holdings, Inc. - StarK Industry - Bengaluru
   3. ...

✅ All done! Your GCC data is now in Supabase.
```

### Python Troubleshooting

**Error: ModuleNotFoundError: No module named 'supabase'**
```bash
pip install -r scripts/requirements.txt
```

**Error: Missing environment variables**
- Ensure `.env` has `SUPABASE_SERVICE_ROLE_KEY`
- Get it from: Supabase Dashboard → Settings → API → service_role key

**Error: File not found**
- Check the file path is correct
- Use relative path from project root: `python scripts/import-gcc-data.py --file ./data/file.xlsx`

**Import fails with RLS error**
- The script uses service role key which bypasses RLS
- Ensure you're using SUPABASE_SERVICE_ROLE_KEY, not ANON_KEY

---

## 📦 JAVASCRIPT SCRIPT (Alternative)

### Prerequisites

1. **Run the database schema first:**
   ```bash
   # In Supabase SQL Editor, run:
   gcc-companies-schema.sql
   ```

2. **Prepare your data file:**
   - Place `gcc-companies.json` in the project root
   - Format: Array of objects with your Excel column names

3. **Environment variables:**
   Ensure `.env` has:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

### Usage

**Basic import:**
```bash
node scripts/import-gcc-data.js
```

**Clear existing data and import fresh:**
```bash
CLEAR_EXISTING=true node scripts/import-gcc-data.js
```

### What it does

1. ✅ Reads `gcc-companies.json`
2. ✅ Transforms column names (Excel → Database)
3. ✅ Validates data
4. ✅ Imports in batches (100 records at a time)
5. ✅ Shows progress
6. ✅ Verifies import completed successfully

### Expected output

```
🚀 GCC Companies Data Import

================================

✅ JSON file loaded: 2500 records found

📊 Starting import of 2500 records...
📦 Batch size: 100

⏳ Processing batch 1/25 (100 records)...
✅ Batch 1 completed (100 records)

⏳ Processing batch 2/25 (100 records)...
✅ Batch 2 completed (100 records)

...

================================
📊 Import Complete

✅ Successfully imported: 2500 / 2500
================================

🔍 Verifying import...

✅ Total records in database: 2500

📋 Sample records:
   1. [24]7.ai, Inc. - StarK Industry - Bengaluru
   2. AbsolutData Holdings, Inc. - StarK Industry - Bengaluru
   3. ...

✅ All done! Your GCC data is now in Supabase.
```

### Troubleshooting

**Error: Missing environment variables**
- Ensure `.env` has `SUPABASE_SERVICE_ROLE_KEY`
- Get it from: Supabase Dashboard → Settings → API → service_role key

**Error: JSON file not found**
- Place your JSON file at project root as `gcc-companies.json`

**Error: Column not found**
- Check column names in your JSON match the COLUMN_MAPPING in the script

**Import fails with RLS error**
- The script uses service role key which bypasses RLS
- Ensure you're using SUPABASE_SERVICE_ROLE_KEY, not ANON_KEY
