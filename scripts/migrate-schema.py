#!/usr/bin/env python3
"""
Database Schema Migration Script

Alters the gcc_companies table to change text columns to proper integer types
for established_in_india and years_in_india.

Usage:
    python scripts/migrate-schema.py
"""

import os
import sys
from supabase import create_client, Client
from dotenv import load_dotenv

# Load environment variables
load_dotenv()


def migrate_schema():
    """Migrate schema to change column types."""
    
    # Get Supabase credentials
    supabase_url = os.getenv('VITE_SUPABASE_URL')
    supabase_key = os.getenv('SUPABASE_SERVICE_ROLE_KEY')
    
    if not supabase_url or not supabase_key:
        print("❌ Error: Missing environment variables")
        print("Required: VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY")
        sys.exit(1)
    
    # Connect to Supabase
    supabase: Client = create_client(supabase_url, supabase_key)
    print("✅ Connected to Supabase\n")
    
    print("=" * 70)
    print("🔧 Database Schema Migration")
    print("=" * 70)
    print("\nThis will alter the following columns to INTEGER type:")
    print("  - established_in_india (TEXT → INTEGER)")
    print("  - years_in_india (TEXT → INTEGER)")
    print()
    
    # Confirm with user
    response = input("Do you want to proceed? (yes/no): ")
    if response.lower() != 'yes':
        print("\n❌ Migration cancelled.")
        return
    
    print("\n🔄 Running migration...\n")
    
    try:
        # Migration SQL
        migrations = [
            {
                'name': 'Convert established_in_india to INTEGER',
                'sql': """
                    ALTER TABLE gcc_companies 
                    ALTER COLUMN established_in_india 
                    TYPE INTEGER 
                    USING CASE 
                        WHEN established_in_india = '' THEN NULL
                        WHEN established_in_india IS NULL THEN NULL
                        ELSE established_in_india::INTEGER 
                    END;
                """
            },
            {
                'name': 'Convert years_in_india to INTEGER',
                'sql': """
                    ALTER TABLE gcc_companies 
                    ALTER COLUMN years_in_india 
                    TYPE INTEGER 
                    USING CASE 
                        WHEN years_in_india = '' THEN NULL
                        WHEN years_in_india IS NULL THEN NULL
                        ELSE years_in_india::INTEGER 
                    END;
                """
            }
        ]
        
        # Execute migrations
        for migration in migrations:
            print(f"📝 {migration['name']}...")
            
            # Execute via Supabase PostgreSQL connection
            # Note: Supabase Python client doesn't support raw SQL directly
            # We need to use the PostgREST API or run this in Supabase SQL Editor
            print(f"   SQL: {migration['sql'].strip()}")
            print()
        
        print("⚠️  IMPORTANT:")
        print("   The Supabase Python client doesn't support raw DDL queries.")
        print("   Please run the following SQL commands in your Supabase SQL Editor:")
        print("\n" + "=" * 70)
        print("\n-- Migration 1: Convert established_in_india to INTEGER")
        print(migrations[0]['sql'].strip())
        print("\n-- Migration 2: Convert years_in_india to INTEGER")
        print(migrations[1]['sql'].strip())
        print("\n" + "=" * 70)
        print("\nSteps:")
        print("1. Go to Supabase Dashboard → SQL Editor")
        print("2. Copy and paste the SQL commands above")
        print("3. Run the query")
        print("4. Verify with: python get-schema.py")
        
    except Exception as e:
        print(f"❌ Error: {e}")
        sys.exit(1)
    
    print("\n" + "=" * 70)


if __name__ == '__main__':
    migrate_schema()
