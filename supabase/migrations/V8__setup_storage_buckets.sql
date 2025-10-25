-- ============================================================================
-- Migration V8: Configuration Supabase Storage pour Images
-- Description: Buckets et policies pour restaurants et plats
-- Date: 2025-10-25
-- ============================================================================

-- ============================================================================
-- 1. CRÉER LES BUCKETS
-- ============================================================================

-- Bucket pour les images des restaurants (logos et covers)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'restaurants',
    'restaurants',
    true, -- Public = accessible sans authentification
    5242880, -- 5MB max par fichier
    ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- Bucket pour les images des plats
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'dishes',
    'dishes',
    true,
    5242880, -- 5MB max
    ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- 2. RLS POLICIES - LECTURE PUBLIQUE
-- ============================================================================

-- Tout le monde peut voir les images des restaurants
CREATE POLICY "Public can view restaurant images"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'restaurants');

-- Tout le monde peut voir les images des plats
CREATE POLICY "Public can view dish images"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'dishes');

-- ============================================================================
-- 3. RLS POLICIES - UPLOAD (Dashboard Restaurateur uniquement)
-- ============================================================================

-- NOTE: Ces policies seront utilisées par le Dashboard Restaurateur
-- Pour l'instant, on autorise les utilisateurs authentifiés
-- TODO: Restreindre aux restaurateurs avec role='restaurateur' quand le dashboard sera prêt

-- Utilisateurs authentifiés peuvent uploader dans restaurants
CREATE POLICY "Authenticated users can upload restaurant images"
    ON storage.objects FOR INSERT
    WITH CHECK (
        bucket_id = 'restaurants'
        AND auth.role() = 'authenticated'
    );

-- Utilisateurs authentifiés peuvent uploader dans dishes
CREATE POLICY "Authenticated users can upload dish images"
    ON storage.objects FOR INSERT
    WITH CHECK (
        bucket_id = 'dishes'
        AND auth.role() = 'authenticated'
    );

-- ============================================================================
-- 4. RLS POLICIES - UPDATE (Dashboard Restaurateur uniquement)
-- ============================================================================

-- Utilisateurs authentifiés peuvent mettre à jour leurs images
CREATE POLICY "Authenticated users can update restaurant images"
    ON storage.objects FOR UPDATE
    USING (
        bucket_id = 'restaurants'
        AND auth.role() = 'authenticated'
    )
    WITH CHECK (
        bucket_id = 'restaurants'
        AND auth.role() = 'authenticated'
    );

CREATE POLICY "Authenticated users can update dish images"
    ON storage.objects FOR UPDATE
    USING (
        bucket_id = 'dishes'
        AND auth.role() = 'authenticated'
    )
    WITH CHECK (
        bucket_id = 'dishes'
        AND auth.role() = 'authenticated'
    );

-- ============================================================================
-- 5. RLS POLICIES - DELETE (Dashboard Restaurateur uniquement)
-- ============================================================================

-- Utilisateurs authentifiés peuvent supprimer leurs images
CREATE POLICY "Authenticated users can delete restaurant images"
    ON storage.objects FOR DELETE
    USING (
        bucket_id = 'restaurants'
        AND auth.role() = 'authenticated'
    );

CREATE POLICY "Authenticated users can delete dish images"
    ON storage.objects FOR DELETE
    USING (
        bucket_id = 'dishes'
        AND auth.role() = 'authenticated'
    );

-- ============================================================================
-- 6. FONCTIONS HELPER POUR GÉNÉRER LES URLs
-- ============================================================================

-- Fonction pour obtenir l'URL publique d'une image restaurant
CREATE OR REPLACE FUNCTION get_restaurant_image_url(file_path TEXT)
RETURNS TEXT AS $$
BEGIN
    RETURN (
        SELECT
            CASE
                WHEN file_path IS NULL OR file_path = '' THEN NULL
                ELSE 'https://' || current_setting('app.settings.supabase_url') || '/storage/v1/object/public/restaurants/' || file_path
            END
    );
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Fonction pour obtenir l'URL publique d'une image plat
CREATE OR REPLACE FUNCTION get_dish_image_url(file_path TEXT)
RETURNS TEXT AS $$
BEGIN
    RETURN (
        SELECT
            CASE
                WHEN file_path IS NULL OR file_path = '' THEN NULL
                ELSE 'https://' || current_setting('app.settings.supabase_url') || '/storage/v1/object/public/dishes/' || file_path
            END
    );
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- ============================================================================
-- COMMENTAIRES
-- ============================================================================

COMMENT ON POLICY "Public can view restaurant images" ON storage.objects IS
'Lecture publique des images restaurants pour affichage dans l''app mobile';

COMMENT ON POLICY "Public can view dish images" ON storage.objects IS
'Lecture publique des images plats pour affichage dans l''app mobile';

COMMENT ON POLICY "Authenticated users can upload restaurant images" ON storage.objects IS
'Upload réservé aux restaurateurs (via Dashboard). TODO: Restreindre au role restaurateur';

COMMENT ON POLICY "Authenticated users can upload dish images" ON storage.objects IS
'Upload réservé aux restaurateurs (via Dashboard). TODO: Restreindre au role restaurateur';

-- ============================================================================
-- FIN DE LA MIGRATION V8
-- ============================================================================
