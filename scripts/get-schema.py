#!/usr/bin/env python3
"""
Get Database Schema Script

Retrieves and displays the detailed schema of the gcc_companies table from Supabase,
including data types, constraints, and other metadata.

Usage:
    python scripts/get-schema.py
"""

import os
import sys
from supabase import create_client, Client
from dotenv import load_dotenv

# Load environment variables
load_dotenv()


def get_table_schema():
    """Retrieve and display the detailed schema of gcc_companies table."""
    
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
    
    print("=" * 100)
    print("📊 GCC Companies Table Schema")
    print("=" * 100)
    print()
    
    # Query information_schema for column details
    schema_query = """
    SELECT 
        column_name,
        data_type,
        character_maximum_length,
        is_nullable,
        column_default,
        ordinal_position
    FROM information_schema.columns
    WHERE table_schema = 'public' 
        AND table_name = 'gcc_companies'
    ORDER BY ordinal_position;
    """
    
    try:
        # Execute raw SQL query via Supabase RPC or direct query
        result = supabase.rpc('exec_sql', {'query': schema_query}).execute()
        columns = result.data
    except:
        # Fallback: Get schema info from a sample record
        print("📋 Table: gcc_companies\n")
        response = supabase.table('gcc_companies').select('*').limit(1).execute()
        
        if response.data and len(response.data) > 0:
            sample_record = response.data[0]
            
            print(f"{'Column Name':<35} {'Data Type':<20} {'Nullable':<10} {'Sample Value'}")
            print("-" * 100)
            
            for i, (column_name, value) in enumerate(sample_record.items(), 1):
                # Infer type from value
                if value is None:
                    data_type = "unknown"
                    nullable = "YES"
                elif isinstance(value, str):
                    data_type = "text"
                    nullable = "YES" if value is None else "?"
                elif isinstance(value, int):
                    data_type = "integer"
                    nullable = "YES" if value is None else "?"
                elif isinstance(value, float):
                    data_type = "numeric"
                    nullable = "YES" if value is None else "?"
                else:
                    data_type = type(value).__name__
                    nullable = "?"
                
                # Truncate long values for display
                value_str = str(value) if value is not None else "NULL"
                if len(value_str) > 25:
                    value_str = value_str[:22] + "..."
                
                print(f"{column_name:<35} {data_type:<20} {nullable:<10} {value_str}")
            
            print()
            
            # Get total count
            count_response = supabase.table('gcc_companies').select('id', count='exact').execute()
            print(f"📈 Total Records: {count_response.count}")
            print(f"📊 Total Columns: {len(sample_record)}")
        else:
            print("⚠️  No records found in the table")
    
    print("\n" + "=" * 100)


if __name__ == '__main__':
    try:
        get_table_schema()
    except Exception as e:
        print(f"\n❌ Error: {e}")
        sys.exit(1)
