-- Migration: Fix addresses RLS recursion and update comments
-- Date: 2025-10-22
-- Description:
--   - Fix RLS policies on addresses table to avoid recursion
--   - Clarify that 0-3 addresses are allowed (not 1-3)

-- Drop existing problematic policies on addresses
DROP POLICY IF EXISTS "Users can view their own addresses" ON addresses;
DROP POLICY IF EXISTS "Users can insert their own addresses" ON addresses;
DROP POLICY IF EXISTS "Users can update their own addresses" ON addresses;
DROP POLICY IF EXISTS "Users can delete their own addresses" ON addresses;

-- Create new policies without recursion (direct comparison instead of SELECT)
CREATE POLICY "Users can view own addresses"
  ON addresses FOR SELECT
  USING (profile_id = auth.uid());

CREATE POLICY "Admins can view all addresses"
  ON addresses FOR SELECT
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Users can insert own addresses"
  ON addresses FOR INSERT
  WITH CHECK (profile_id = auth.uid());

CREATE POLICY "Users can update own addresses"
  ON addresses FOR UPDATE
  USING (profile_id = auth.uid())
  WITH CHECK (profile_id = auth.uid());

CREATE POLICY "Admins can update any address"
  ON addresses FOR UPDATE
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Users can delete own addresses"
  ON addresses FOR DELETE
  USING (profile_id = auth.uid());

CREATE POLICY "Admins can delete any address"
  ON addresses FOR DELETE
  USING (public.is_admin(auth.uid()));

-- Add comment to clarify 0-3 addresses are allowed
COMMENT ON TABLE addresses IS 'User delivery addresses. Each profile can have 0 to 3 addresses.';
COMMENT ON FUNCTION check_address_limit() IS 'Trigger function that enforces maximum of 3 addresses per profile.';
