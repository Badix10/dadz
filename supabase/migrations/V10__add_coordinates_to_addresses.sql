-- Migration V10: Add latitude and longitude to addresses table
-- This allows restaurants to be filtered by distance from user's address

-- Add latitude and longitude columns to addresses table
ALTER TABLE addresses
ADD COLUMN IF NOT EXISTS latitude DECIMAL(10, 8),
ADD COLUMN IF NOT EXISTS longitude DECIMAL(11, 8);

-- Add index for better performance on location-based queries
CREATE INDEX IF NOT EXISTS idx_addresses_location ON addresses(latitude, longitude);

-- Add comment explaining the fields
COMMENT ON COLUMN addresses.latitude IS 'Latitude coordinate of the address (-90 to 90)';
COMMENT ON COLUMN addresses.longitude IS 'Longitude coordinate of the address (-180 to 180)';
