-- Migration: Add user roles system
-- Date: 2025-10-22
-- Description:
--   - Create role enum type
--   - Add role column to profiles table
--   - Add RLS policies based on roles
--   - Set default role to CLIENT


-- Remove unused column from profiles table
ALTER TABLE profiles
DROP COLUMN IF EXISTS website;

-- Replace full_name with first_name and last_name
ALTER TABLE profiles
DROP COLUMN IF EXISTS full_name,
ADD COLUMN IF NOT EXISTS first_name TEXT,
ADD COLUMN IF NOT EXISTS last_name TEXT;

-- Add new columns to profiles table
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT NOW();

-- Create enum type for user roles
CREATE TYPE user_role AS ENUM ('ADMIN', 'CLIENT', 'RESTO', 'DELIVERER');

-- Add role column to profiles table
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS role user_role NOT NULL DEFAULT 'CLIENT';

-- Create index on role for better query performance
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);

-- Update existing RLS policies to include role-based access
-- Admin can view all profiles
CREATE POLICY "Admins can view all profiles"
  ON profiles FOR SELECT
  USING (
    auth.uid() IN (SELECT id FROM profiles WHERE role = 'ADMIN')
  );

-- Users can view their own profile
CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

-- Users can update their own profile (except role)
CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (
    auth.uid() = id
    AND role = (SELECT role FROM profiles WHERE id = auth.uid())
  );

-- Only admins can change user roles
CREATE POLICY "Only admins can change roles"
  ON profiles FOR UPDATE
  USING (
    auth.uid() IN (SELECT id FROM profiles WHERE role = 'ADMIN')
  );

-- Function to get current user role
CREATE OR REPLACE FUNCTION get_user_role(user_id UUID)
RETURNS user_role AS $$
BEGIN
  RETURN (SELECT role FROM profiles WHERE id = user_id);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
