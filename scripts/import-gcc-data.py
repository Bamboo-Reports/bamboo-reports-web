#!/usr/bin/env python3
"""
GCC Companies Data Import Script (Python)

This script imports GCC companies data from Excel or JSON into Supabase.

Usage:
    python scripts/import-gcc-data.py --file gcc-companies.xlsx
    python scripts/import-gcc-data.py --file gcc-companies.json
    python scripts/import-gcc-data.py --file gcc-companies.csv

Options:
    --file FILE         Path to your data file (Excel, JSON, or CSV)
    --clear             Clear existing data before import
    --batch-size N      Number of records per batch (default: 100)
    --dry-run           Preview data without importing

Requirements:
    pip install -r scripts/requirements.txt
"""

import argparse
import json
import os
import sys
from pathlib import Path
from typing import List, Dict, Any, Optional

import pandas as pd
from supabase import create_client, Client
from dotenv import load_dotenv
from tqdm import tqdm

# Load environment variables
load_dotenv()

# Column mapping: Excel columns → Database columns
COLUMN_MAPPING = {
    'Account Global Legal Name': 'account_global_legal_name',
    'Revenue Range': 'revenue_range',
    'HQ Country': 'hq_country',
    'HQ Region': 'hq_region',
    'Website': 'website',
    'Industry': 'industry',
    'Category': 'category',
    'Total Centers': 'total_centers',
    'Totoal GCC Centers': 'total_gcc_centers',  # Note: Typo in original
    'Total Excl GCC Centers': 'total_excl_gcc_centers',
    'Aggregate India Employees Range': 'aggregate_india_employees_range',
    'Location': 'location',
    'Years Established in India ': 'years_established_in_india',
    'Years in India': 'years_in_india',
    'Primary City': 'primary_city',
    'Secondary City': 'secondary_city',
    'Services Offered': 'services_offered'
}

# Numeric columns that should be converted to integers
NUMERIC_COLUMNS = ['total_centers', 'total_gcc_centers', 'total_excl_gcc_centers']


class GCCDataImporter:
    """Handles importing GCC companies data into Supabase."""

    def __init__(self):
        """Initialize Supabase client."""
        self.supabase_url = os.getenv('VITE_SUPABASE_URL')
        self.supabase_key = os.getenv('SUPABASE_SERVICE_ROLE_KEY')

        if not self.supabase_url or not self.supabase_key:
            print("❌ Error: Missing environment variables")
            print("Required: VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY")
            print("\nMake sure these are in your .env file:")
            print("  VITE_SUPABASE_URL=your_supabase_url")
            print("  SUPABASE_SERVICE_ROLE_KEY=your_service_role_key")
            sys.exit(1)

        self.supabase: Client = create_client(self.supabase_url, self.supabase_key)
        print("✅ Connected to Supabase\n")

    def load_data(self, file_path: str) -> pd.DataFrame:
        """
        Load data from Excel, JSON, or CSV file.

        Args:
            file_path: Path to the data file

        Returns:
            DataFrame with the loaded data
        """
        file_path = Path(file_path)

        if not file_path.exists():
            print(f"❌ Error: File not found: {file_path}")
            sys.exit(1)

        print(f"📂 Loading data from: {file_path.name}")

        # Determine file type and load accordingly
        if file_path.suffix in ['.xlsx', '.xls']:
            df = pd.read_excel(file_path)
            print(f"✅ Loaded Excel file: {len(df)} records\n")
        elif file_path.suffix == '.json':
            df = pd.read_json(file_path)
            print(f"✅ Loaded JSON file: {len(df)} records\n")
        elif file_path.suffix == '.csv':
            df = pd.read_csv(file_path)
            print(f"✅ Loaded CSV file: {len(df)} records\n")
        else:
            print(f"❌ Error: Unsupported file type: {file_path.suffix}")
            print("Supported: .xlsx, .xls, .json, .csv")
            sys.exit(1)

        return df

    def transform_dataframe(self, df: pd.DataFrame) -> List[Dict[str, Any]]:
        """
        Transform DataFrame to match database schema.

        Args:
            df: Input DataFrame with Excel column names

        Returns:
            List of dictionaries ready for database insertion
        """
        print("🔄 Transforming data...")

        # Rename columns according to mapping
        df_renamed = df.rename(columns=COLUMN_MAPPING)

        # Convert numeric columns
        for col in NUMERIC_COLUMNS:
            if col in df_renamed.columns:
                df_renamed[col] = pd.to_numeric(df_renamed[col], errors='coerce')
                df_renamed[col] = df_renamed[col].fillna(0).astype(int)

        # Replace NaN with None for proper SQL NULL handling
        df_renamed = df_renamed.where(pd.notna(df_renamed), None)

        # Convert to list of dictionaries
        records = df_renamed.to_dict('records')

        # Only keep columns that exist in our mapping
        db_columns = set(COLUMN_MAPPING.values())
        cleaned_records = []

        for record in records:
            cleaned_record = {
                k: v for k, v in record.items()
                if k in db_columns
            }
            cleaned_records.append(cleaned_record)

        print(f"✅ Transformed {len(cleaned_records)} records\n")
        return cleaned_records

    def clear_existing_data(self) -> bool:
        """Clear all existing data from gcc_companies table."""
        try:
            print("🗑️  Clearing existing data...")

            # Delete all records (service role bypasses RLS)
            response = self.supabase.table('gcc_companies').delete().neq('id', '00000000-0000-0000-0000-000000000000').execute()

            print("✅ Existing data cleared\n")
            return True
        except Exception as e:
            print(f"❌ Error clearing data: {e}")
            return False

    def import_data(
        self,
        records: List[Dict[str, Any]],
        batch_size: int = 100
    ) -> tuple[int, int]:
        """
        Import records into Supabase in batches.

        Args:
            records: List of record dictionaries
            batch_size: Number of records per batch

        Returns:
            Tuple of (successful_count, error_count)
        """
        total_records = len(records)
        imported_count = 0
        error_count = 0

        print(f"📊 Starting import of {total_records} records")
        print(f"📦 Batch size: {batch_size}\n")

        # Create batches
        batches = [
            records[i:i + batch_size]
            for i in range(0, len(records), batch_size)
        ]

        # Import with progress bar
        for i, batch in enumerate(tqdm(batches, desc="Importing", unit="batch")):
            try:
                response = self.supabase.table('gcc_companies').insert(batch).execute()

                # Check if insert was successful
                if response.data:
                    imported_count += len(batch)
                else:
                    error_count += len(batch)
                    print(f"\n❌ Error in batch {i+1}: No data returned")

            except Exception as e:
                error_count += len(batch)
                print(f"\n❌ Error in batch {i+1}: {e}")

        print()  # New line after progress bar
        return imported_count, error_count

    def verify_import(self) -> None:
        """Verify the import was successful."""
        print("\n🔍 Verifying import...\n")

        try:
            # Count total records
            response = self.supabase.table('gcc_companies').select('id', count='exact').execute()
            count = response.count

            print(f"✅ Total records in database: {count}")

            # Get sample records
            sample_response = self.supabase.table('gcc_companies').select(
                'account_global_legal_name, industry, primary_city'
            ).limit(3).execute()

            if sample_response.data:
                print("\n📋 Sample records:")
                for i, record in enumerate(sample_response.data, 1):
                    name = record.get('account_global_legal_name', 'N/A')
                    industry = record.get('industry', 'N/A')
                    city = record.get('primary_city', 'N/A')
                    print(f"   {i}. {name} - {industry} - {city}")

        except Exception as e:
            print(f"❌ Error during verification: {e}")

    def preview_data(self, records: List[Dict[str, Any]], num_rows: int = 5) -> None:
        """Preview the data that would be imported."""
        print("\n👀 Data Preview (first {} rows):\n".format(min(num_rows, len(records))))

        df_preview = pd.DataFrame(records[:num_rows])

        # Display key columns
        display_cols = [
            'account_global_legal_name',
            'industry',
            'primary_city',
            'total_gcc_centers'
        ]

        existing_cols = [col for col in display_cols if col in df_preview.columns]

        if existing_cols:
            print(df_preview[existing_cols].to_string(index=False))
        else:
            print(df_preview.head().to_string(index=False))

        print(f"\n📊 Total records ready for import: {len(records)}\n")


def main():
    """Main entry point for the script."""
    parser = argparse.ArgumentParser(
        description='Import GCC companies data into Supabase',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python scripts/import-gcc-data.py --file data.xlsx
  python scripts/import-gcc-data.py --file data.json --clear
  python scripts/import-gcc-data.py --file data.csv --batch-size 50
  python scripts/import-gcc-data.py --file data.xlsx --dry-run
        """
    )

    parser.add_argument(
        '--file',
        required=True,
        help='Path to data file (Excel, JSON, or CSV)'
    )
    parser.add_argument(
        '--clear',
        action='store_true',
        help='Clear existing data before import'
    )
    parser.add_argument(
        '--batch-size',
        type=int,
        default=100,
        help='Number of records per batch (default: 100)'
    )
    parser.add_argument(
        '--dry-run',
        action='store_true',
        help='Preview data without importing'
    )

    args = parser.parse_args()

    # Print header
    print("\n" + "=" * 50)
    print("🚀 GCC Companies Data Import")
    print("=" * 50 + "\n")

    # Initialize importer
    importer = GCCDataImporter()

    # Load data
    df = importer.load_data(args.file)

    # Transform data
    records = importer.transform_dataframe(df)

    # Dry run - just preview
    if args.dry_run:
        importer.preview_data(records)
        print("✅ Dry run complete. No data was imported.")
        print("   Remove --dry-run flag to perform actual import.\n")
        return

    # Clear existing data if requested
    if args.clear:
        if not importer.clear_existing_data():
            print("❌ Failed to clear existing data. Aborting.")
            sys.exit(1)

    # Import data
    imported_count, error_count = importer.import_data(records, args.batch_size)

    # Show results
    print("=" * 50)
    print("📊 Import Complete\n")
    print(f"✅ Successfully imported: {imported_count} / {len(records)}")
    if error_count > 0:
        print(f"❌ Failed: {error_count}")
    print("=" * 50)

    # Verify import
    importer.verify_import()

    print("\n✅ All done! Your GCC data is now in Supabase.\n")


if __name__ == '__main__':
    main()
