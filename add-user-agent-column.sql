-- Migration to add user_agent column to existing download_logs table
-- Run this if you already created the download_logs table without the user_agent field

ALTER TABLE download_logs 
ADD COLUMN IF NOT EXISTS user_agent TEXT;
