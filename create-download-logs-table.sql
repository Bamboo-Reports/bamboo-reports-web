-- Create download_logs table
CREATE TABLE IF NOT EXISTS download_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- User Information
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  user_email TEXT NOT NULL,
  
  -- Document Information
  document_id UUID NOT NULL REFERENCES plan_documents(id),
  document_title TEXT NOT NULL,
  plan_name TEXT NOT NULL,
  
  -- Metadata
  downloaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ip_address INET,
  user_agent TEXT
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_download_logs_user_id ON download_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_download_logs_document_id ON download_logs(document_id);
CREATE INDEX IF NOT EXISTS idx_download_logs_downloaded_at ON download_logs(downloaded_at DESC);

-- Enable Row Level Security
ALTER TABLE download_logs ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view own download logs" ON download_logs;
DROP POLICY IF EXISTS "Allow insert download logs" ON download_logs;

-- Users can only view their own downloads
CREATE POLICY "Users can view own download logs"
  ON download_logs
  FOR SELECT
  USING (auth.uid() = user_id);

-- System can insert logs (authenticated users can log their own downloads)
CREATE POLICY "Allow insert download logs"
  ON download_logs
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);
