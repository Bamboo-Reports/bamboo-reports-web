/**
 * GCC Companies Data Import Script
 *
 * This script imports GCC companies data from a JSON file into Supabase.
 *
 * Usage:
 *   1. Place your JSON file at: gcc-companies.json
 *   2. Ensure SUPABASE_SERVICE_ROLE_KEY is in .env
 *   3. Run: node scripts/import-gcc-data.js
 */

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Supabase client with service role (bypasses RLS)
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Error: Missing environment variables');
  console.error('Required: VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// Column mapping: Excel columns → Database columns
const COLUMN_MAPPING = {
  'Account Global Legal Name': 'account_global_legal_name',
  'Revenue Range': 'revenue_range',
  'HQ Country': 'hq_country',
  'HQ Region': 'hq_region',
  'Website': 'website',
  'Industry': 'industry',
  'Category': 'category',
  'Total Centers': 'total_centers',
  'Totoal GCC Centers': 'total_gcc_centers', // Note: Typo in original
  'Total Excl GCC Centers': 'total_excl_gcc_centers',
  'Aggregate India Employees Range': 'aggregate_india_employees_range',
  'Location': 'location',
  'Years Established in India ': 'years_established_in_india',
  'Years in India': 'years_in_india',
  'Primary City': 'primary_city',
  'Secondary City': 'secondary_city',
  'Services Offered': 'services_offered'
};

/**
 * Transform Excel data to database format
 */
function transformRecord(record) {
  const transformed = {};

  for (const [excelColumn, dbColumn] of Object.entries(COLUMN_MAPPING)) {
    let value = record[excelColumn];

    // Handle numeric columns
    if (['total_centers', 'total_gcc_centers', 'total_excl_gcc_centers'].includes(dbColumn)) {
      value = value ? parseInt(value, 10) : null;
    }

    // Trim whitespace from strings
    if (typeof value === 'string') {
      value = value.trim();
    }

    // Convert empty strings to null
    if (value === '' || value === undefined) {
      value = null;
    }

    transformed[dbColumn] = value;
  }

  return transformed;
}

/**
 * Import data in batches
 */
async function importData(data, batchSize = 100) {
  const totalRecords = data.length;
  let importedCount = 0;
  let errorCount = 0;

  console.log(`\n📊 Starting import of ${totalRecords} records...`);
  console.log(`📦 Batch size: ${batchSize}\n`);

  // Transform all records
  const transformedData = data.map(transformRecord);

  // Import in batches
  for (let i = 0; i < transformedData.length; i += batchSize) {
    const batch = transformedData.slice(i, i + batchSize);
    const batchNumber = Math.floor(i / batchSize) + 1;
    const totalBatches = Math.ceil(transformedData.length / batchSize);

    console.log(`⏳ Processing batch ${batchNumber}/${totalBatches} (${batch.length} records)...`);

    try {
      const { data: inserted, error } = await supabase
        .from('gcc_companies')
        .insert(batch)
        .select('id');

      if (error) {
        console.error(`❌ Error in batch ${batchNumber}:`, error.message);
        errorCount += batch.length;
      } else {
        importedCount += inserted.length;
        console.log(`✅ Batch ${batchNumber} completed (${inserted.length} records)\n`);
      }
    } catch (error) {
      console.error(`❌ Exception in batch ${batchNumber}:`, error.message);
      errorCount += batch.length;
    }
  }

  return { importedCount, errorCount, totalRecords };
}

/**
 * Verify import
 */
async function verifyImport() {
  console.log('\n🔍 Verifying import...\n');

  // Count total records
  const { count, error } = await supabase
    .from('gcc_companies')
    .select('*', { count: 'exact', head: true });

  if (error) {
    console.error('❌ Error counting records:', error.message);
    return;
  }

  console.log(`✅ Total records in database: ${count}`);

  // Get sample records
  const { data: samples } = await supabase
    .from('gcc_companies')
    .select('account_global_legal_name, industry, primary_city')
    .limit(3);

  if (samples && samples.length > 0) {
    console.log('\n📋 Sample records:');
    samples.forEach((record, i) => {
      console.log(`   ${i + 1}. ${record.account_global_legal_name} - ${record.industry} - ${record.primary_city}`);
    });
  }
}

/**
 * Clear existing data (optional)
 */
async function clearExistingData() {
  const { error } = await supabase
    .from('gcc_companies')
    .delete()
    .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all

  if (error) {
    console.error('❌ Error clearing data:', error.message);
    return false;
  }

  console.log('✅ Existing data cleared\n');
  return true;
}

/**
 * Main import process
 */
async function main() {
  console.log('\n🚀 GCC Companies Data Import\n');
  console.log('================================\n');

  // Find JSON file
  const jsonPath = path.join(process.cwd(), 'gcc-companies.json');

  if (!fs.existsSync(jsonPath)) {
    console.error(`❌ Error: JSON file not found at: ${jsonPath}`);
    console.error('\n📝 Please create gcc-companies.json with your data.');
    console.error('   Format: Array of objects with Excel column names');
    process.exit(1);
  }

  // Read JSON file
  let data;
  try {
    const fileContent = fs.readFileSync(jsonPath, 'utf-8');
    data = JSON.parse(fileContent);
    console.log(`✅ JSON file loaded: ${data.length} records found\n`);
  } catch (error) {
    console.error('❌ Error reading JSON file:', error.message);
    process.exit(1);
  }

  // Validate data
  if (!Array.isArray(data) || data.length === 0) {
    console.error('❌ Error: JSON file must contain an array of records');
    process.exit(1);
  }

  // Ask if user wants to clear existing data
  console.log('⚠️  Warning: This will import data into gcc_companies table');
  console.log('   To clear existing data first, set CLEAR_EXISTING=true in script\n');

  const CLEAR_EXISTING = process.env.CLEAR_EXISTING === 'true';

  if (CLEAR_EXISTING) {
    await clearExistingData();
  }

  // Import data
  const { importedCount, errorCount, totalRecords } = await importData(data);

  // Show results
  console.log('\n================================');
  console.log('📊 Import Complete\n');
  console.log(`✅ Successfully imported: ${importedCount} / ${totalRecords}`);
  if (errorCount > 0) {
    console.log(`❌ Failed: ${errorCount}`);
  }
  console.log('================================\n');

  // Verify
  await verifyImport();

  console.log('\n✅ All done! Your GCC data is now in Supabase.\n');
}

// Run the script
main().catch(error => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
