-- Migration: Add addresses table and update profiles table
-- Date: 2025-10-22
-- Description:
--   - Remove website column from profiles table
--   - Replace full_name with first_name and last_name in profiles table
--   - Add date_of_birth and created_at to profiles table
--   - Create addresses table with 1-3 addresses per profile limit
--   - Add RLS policies for addresses table
--   - Note: Phone number is stored in auth.users.phone, not in profiles



-- Create addresses table
CREATE TABLE IF NOT EXISTS addresses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  address_type TEXT NOT NULL CHECK (address_type IN ('home', 'work', 'other')),
  street TEXT NOT NULL,
  city TEXT NOT NULL,
  postal_code TEXT NOT NULL,
  country TEXT NOT NULL DEFAULT 'France',
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index on profile_id for better query performance
CREATE INDEX IF NOT EXISTS idx_addresses_profile_id ON addresses(profile_id);

-- Add constraint to limit addresses per profile to 3
CREATE OR REPLACE FUNCTION check_address_limit()
RETURNS TRIGGER AS $$
BEGIN
  IF (SELECT COUNT(*) FROM addresses WHERE profile_id = NEW.profile_id) >= 3 THEN
    RAISE EXCEPTION 'A profile cannot have more than 3 addresses';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER enforce_address_limit
  BEFORE INSERT ON addresses
  FOR EACH ROW
  EXECUTE FUNCTION check_address_limit();

-- Enable RLS on addresses table
ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;

-- RLS policies for addresses
CREATE POLICY "Users can view their own addresses"
  ON addresses FOR SELECT
  USING (profile_id IN (SELECT id FROM profiles WHERE id = auth.uid()));

CREATE POLICY "Users can insert their own addresses"
  ON addresses FOR INSERT
  WITH CHECK (profile_id IN (SELECT id FROM profiles WHERE id = auth.uid()));

CREATE POLICY "Users can update their own addresses"
  ON addresses FOR UPDATE
  USING (profile_id IN (SELECT id FROM profiles WHERE id = auth.uid()));

CREATE POLICY "Users can delete their own addresses"
  ON addresses FOR DELETE
  USING (profile_id IN (SELECT id FROM profiles WHERE id = auth.uid()));
