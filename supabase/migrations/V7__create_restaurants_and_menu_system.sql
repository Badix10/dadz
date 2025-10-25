-- ============================================================================
-- Migration V7: Système Restaurants & Menu
-- Description: Tables pour restaurants, plats, catégories, avis, favoris
-- Date: 2025-10-25
-- ============================================================================

-- ============================================================================
-- 1. CATÉGORIES DE RESTAURANTS
-- ============================================================================

CREATE TABLE IF NOT EXISTS restaurant_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    icon_url TEXT,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE restaurant_categories IS 'Catégories de restaurants (Pizza, Burger, Sushi, etc.)';
COMMENT ON COLUMN restaurant_categories.slug IS 'URL-friendly identifier pour la catégorie';
COMMENT ON COLUMN restaurant_categories.display_order IS 'Ordre d''affichage (plus petit = affiché en premier)';

-- ============================================================================
-- 2. RESTAURANTS
-- ============================================================================

CREATE TABLE IF NOT EXISTS restaurants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    logo_url TEXT,
    cover_image_url TEXT,
    category_id UUID REFERENCES restaurant_categories(id) ON DELETE SET NULL,

    -- Adresse et localisation
    address TEXT NOT NULL,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    phone TEXT,
    email TEXT,

    -- Métriques
    rating DECIMAL(3, 2) DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
    total_reviews INTEGER DEFAULT 0 CHECK (total_reviews >= 0),

    -- Livraison
    delivery_time_min INTEGER NOT NULL CHECK (delivery_time_min > 0),
    delivery_time_max INTEGER NOT NULL CHECK (delivery_time_max >= delivery_time_min),
    delivery_fee_base DECIMAL(10, 2) NOT NULL DEFAULT 2.00 CHECK (delivery_fee_base >= 0),
    delivery_fee_per_km DECIMAL(10, 2) NOT NULL DEFAULT 0.50 CHECK (delivery_fee_per_km >= 0),
    max_delivery_distance INTEGER NOT NULL DEFAULT 10 CHECK (max_delivery_distance > 0),
    minimum_order DECIMAL(10, 2) DEFAULT 0 CHECK (minimum_order >= 0),

    -- Prix et statut
    price_range TEXT NOT NULL DEFAULT 'medium' CHECK (price_range IN ('low', 'medium', 'high')),
    is_active BOOLEAN NOT NULL DEFAULT true,
    is_open BOOLEAN NOT NULL DEFAULT true,

    -- Timestamps
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE restaurants IS 'Restaurants partenaires disponibles sur la plateforme';
COMMENT ON COLUMN restaurants.slug IS 'URL-friendly identifier pour le restaurant';
COMMENT ON COLUMN restaurants.rating IS 'Note moyenne calculée automatiquement (0-5)';
COMMENT ON COLUMN restaurants.is_active IS 'Restaurant actif ou suspendu par admin';
COMMENT ON COLUMN restaurants.is_open IS 'Statut ouvert/fermé calculé selon horaires';
COMMENT ON COLUMN restaurants.price_range IS 'Gamme de prix: low=€, medium=€€, high=€€€';
COMMENT ON COLUMN restaurants.delivery_fee_base IS 'Frais de livraison de base (en €)';
COMMENT ON COLUMN restaurants.delivery_fee_per_km IS 'Tarif par kilomètre (en €/km)';
COMMENT ON COLUMN restaurants.max_delivery_distance IS 'Distance maximale de livraison (en km)';

-- ============================================================================
-- 3. HORAIRES D'OUVERTURE
-- ============================================================================

CREATE TABLE IF NOT EXISTS restaurant_hours (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    restaurant_id UUID NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
    day_of_week INTEGER NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6),
    open_time TIME NOT NULL,
    close_time TIME NOT NULL,
    is_closed BOOLEAN NOT NULL DEFAULT false,

    UNIQUE(restaurant_id, day_of_week)
);

COMMENT ON TABLE restaurant_hours IS 'Horaires d''ouverture par jour de la semaine';
COMMENT ON COLUMN restaurant_hours.day_of_week IS '0=Dimanche, 1=Lundi, 2=Mardi, ..., 6=Samedi';
COMMENT ON COLUMN restaurant_hours.is_closed IS 'Si true, le restaurant est fermé ce jour';

-- ============================================================================
-- 4. CATÉGORIES DE PLATS
-- ============================================================================

CREATE TABLE IF NOT EXISTS dish_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    restaurant_id UUID NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    UNIQUE(restaurant_id, name)
);

COMMENT ON TABLE dish_categories IS 'Catégories de plats par restaurant (Entrées, Plats, Desserts, etc.)';
COMMENT ON COLUMN dish_categories.display_order IS 'Ordre d''affichage dans le menu';

-- ============================================================================
-- 5. PLATS
-- ============================================================================

CREATE TABLE IF NOT EXISTS dishes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    restaurant_id UUID NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
    category_id UUID REFERENCES dish_categories(id) ON DELETE SET NULL,

    -- Informations de base
    name TEXT NOT NULL,
    slug TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),

    -- Disponibilité et popularité
    is_available BOOLEAN NOT NULL DEFAULT true,
    is_popular BOOLEAN NOT NULL DEFAULT false,

    -- Informations nutritionnelles
    allergens TEXT[] DEFAULT '{}',
    preparation_time INTEGER CHECK (preparation_time > 0),
    calories INTEGER CHECK (calories >= 0),

    -- Ordre d'affichage
    display_order INTEGER NOT NULL DEFAULT 0,

    -- Timestamps
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    UNIQUE(restaurant_id, slug)
);

COMMENT ON TABLE dishes IS 'Plats proposés par les restaurants';
COMMENT ON COLUMN dishes.allergens IS 'Liste des allergènes (gluten, lactose, etc.)';
COMMENT ON COLUMN dishes.preparation_time IS 'Temps de préparation en minutes';
COMMENT ON COLUMN dishes.is_popular IS 'Plat populaire/recommandé par le restaurant';

-- ============================================================================
-- 6. OPTIONS DE PLATS
-- ============================================================================

CREATE TABLE IF NOT EXISTS dish_options (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    dish_id UUID NOT NULL REFERENCES dishes(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('radio', 'checkbox')),
    is_required BOOLEAN NOT NULL DEFAULT false,
    display_order INTEGER NOT NULL DEFAULT 0,

    UNIQUE(dish_id, name)
);

COMMENT ON TABLE dish_options IS 'Options de personnalisation des plats (taille, niveau épice, etc.)';
COMMENT ON COLUMN dish_options.type IS 'radio=choix unique, checkbox=choix multiple';
COMMENT ON COLUMN dish_options.is_required IS 'Si true, le client doit choisir une valeur';

-- ============================================================================
-- 7. VALEURS D'OPTIONS
-- ============================================================================

CREATE TABLE IF NOT EXISTS dish_option_values (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    option_id UUID NOT NULL REFERENCES dish_options(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    price_modifier DECIMAL(10, 2) NOT NULL DEFAULT 0,
    is_default BOOLEAN NOT NULL DEFAULT false,
    display_order INTEGER NOT NULL DEFAULT 0
);

COMMENT ON TABLE dish_option_values IS 'Valeurs possibles pour chaque option (Petite, Moyenne, Grande, etc.)';
COMMENT ON COLUMN dish_option_values.price_modifier IS 'Modification du prix (+2€ pour Grande, -1€ pour Petite, etc.)';

-- ============================================================================
-- 8. FAVORIS RESTAURANTS
-- ============================================================================

CREATE TABLE IF NOT EXISTS favorite_restaurants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    restaurant_id UUID NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    UNIQUE(profile_id, restaurant_id)
);

COMMENT ON TABLE favorite_restaurants IS 'Restaurants favoris des utilisateurs';

-- ============================================================================
-- 9. AVIS RESTAURANTS
-- ============================================================================

CREATE TABLE IF NOT EXISTS restaurant_reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    restaurant_id UUID NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
    profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE restaurant_reviews IS 'Avis et notes des clients sur les restaurants';
COMMENT ON COLUMN restaurant_reviews.rating IS 'Note de 1 à 5 étoiles';

-- ============================================================================
-- INDEX POUR PERFORMANCES
-- ============================================================================

-- Restaurants
CREATE INDEX idx_restaurants_category ON restaurants(category_id) WHERE is_active = true;
CREATE INDEX idx_restaurants_rating ON restaurants(rating DESC) WHERE is_active = true;
CREATE INDEX idx_restaurants_active ON restaurants(is_active) WHERE is_active = true;
CREATE INDEX idx_restaurants_slug ON restaurants(slug);
CREATE INDEX idx_restaurants_location ON restaurants(latitude, longitude);

-- Plats
CREATE INDEX idx_dishes_restaurant ON dishes(restaurant_id) WHERE is_available = true;
CREATE INDEX idx_dishes_category ON dishes(category_id) WHERE is_available = true;
CREATE INDEX idx_dishes_popular ON dishes(is_popular) WHERE is_popular = true AND is_available = true;
CREATE INDEX idx_dishes_slug ON dishes(restaurant_id, slug);

-- Favoris
CREATE INDEX idx_favorites_profile ON favorite_restaurants(profile_id);
CREATE INDEX idx_favorites_restaurant ON favorite_restaurants(restaurant_id);

-- Avis
CREATE INDEX idx_reviews_restaurant ON restaurant_reviews(restaurant_id);
CREATE INDEX idx_reviews_profile ON restaurant_reviews(profile_id);
CREATE INDEX idx_reviews_rating ON restaurant_reviews(rating);
CREATE INDEX idx_reviews_created ON restaurant_reviews(created_at DESC);

-- Options et valeurs
CREATE INDEX idx_dish_options_dish ON dish_options(dish_id);
CREATE INDEX idx_dish_option_values_option ON dish_option_values(option_id);

-- ============================================================================
-- FONCTIONS DE CALCUL DE DISTANCE ET FRAIS DE LIVRAISON
-- ============================================================================

/**
 * Calculer la distance entre deux points GPS (formule Haversine)
 * Retourne la distance en kilomètres
 */
CREATE OR REPLACE FUNCTION calculate_distance_km(
    lat1 DECIMAL,
    lon1 DECIMAL,
    lat2 DECIMAL,
    lon2 DECIMAL
)
RETURNS DECIMAL AS $$
DECLARE
    earth_radius CONSTANT DECIMAL := 6371; -- Rayon de la Terre en km
    dlat DECIMAL;
    dlon DECIMAL;
    a DECIMAL;
    c DECIMAL;
BEGIN
    -- Formule de Haversine
    dlat := radians(lat2 - lat1);
    dlon := radians(lon2 - lon1);

    a := sin(dlat / 2) * sin(dlat / 2) +
         cos(radians(lat1)) * cos(radians(lat2)) *
         sin(dlon / 2) * sin(dlon / 2);

    c := 2 * atan2(sqrt(a), sqrt(1 - a));

    RETURN earth_radius * c;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

COMMENT ON FUNCTION calculate_distance_km IS 'Calcule la distance en km entre deux coordonnées GPS (formule Haversine)';

/**
 * Calculer les frais de livraison pour un restaurant vers une adresse client
 * Retourne un JSON avec : in_range, distance_km, delivery_fee, estimated_time_min
 */
CREATE OR REPLACE FUNCTION calculate_delivery_fee(
    restaurant_id UUID,
    client_lat DECIMAL,
    client_lon DECIMAL
)
RETURNS JSONB AS $$
DECLARE
    rest_record RECORD;
    distance DECIMAL;
    fee DECIMAL;
    estimated_time INTEGER;
BEGIN
    -- Récupérer les informations du restaurant
    SELECT
        latitude,
        longitude,
        max_delivery_distance,
        delivery_fee_base,
        delivery_fee_per_km,
        delivery_time_min
    INTO rest_record
    FROM restaurants
    WHERE id = restaurant_id
    AND is_active = true;

    -- Vérifier que le restaurant existe
    IF NOT FOUND THEN
        RETURN jsonb_build_object(
            'error', 'RESTAURANT_NOT_FOUND'
        );
    END IF;

    -- Vérifier que les coordonnées du restaurant sont définies
    IF rest_record.latitude IS NULL OR rest_record.longitude IS NULL THEN
        RETURN jsonb_build_object(
            'error', 'RESTAURANT_LOCATION_NOT_SET'
        );
    END IF;

    -- Calculer la distance
    distance := calculate_distance_km(
        rest_record.latitude,
        rest_record.longitude,
        client_lat,
        client_lon
    );

    -- Arrondir à 2 décimales
    distance := ROUND(distance::NUMERIC, 2);

    -- Vérifier si dans la zone de livraison
    IF distance > rest_record.max_delivery_distance THEN
        RETURN jsonb_build_object(
            'in_range', false,
            'distance_km', distance,
            'max_distance_km', rest_record.max_delivery_distance
        );
    END IF;

    -- Calculer les frais de livraison
    fee := rest_record.delivery_fee_base + (distance * rest_record.delivery_fee_per_km);
    fee := ROUND(fee::NUMERIC, 2);

    -- Estimer le temps de livraison (base + 3 min par km)
    estimated_time := rest_record.delivery_time_min + (distance * 3)::INTEGER;

    RETURN jsonb_build_object(
        'in_range', true,
        'distance_km', distance,
        'delivery_fee', fee,
        'estimated_time_min', estimated_time
    );
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION calculate_delivery_fee IS 'Calcule les frais de livraison et vérifie si le restaurant livre à cette adresse';

-- ============================================================================
-- TRIGGERS UPDATED_AT
-- ============================================================================

-- Restaurants
CREATE OR REPLACE FUNCTION update_restaurant_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_restaurant_updated_at
    BEFORE UPDATE ON restaurants
    FOR EACH ROW
    EXECUTE FUNCTION update_restaurant_updated_at();

-- Plats
CREATE OR REPLACE FUNCTION update_dish_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_dish_updated_at
    BEFORE UPDATE ON dishes
    FOR EACH ROW
    EXECUTE FUNCTION update_dish_updated_at();

-- Avis
CREATE OR REPLACE FUNCTION update_review_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_review_updated_at
    BEFORE UPDATE ON restaurant_reviews
    FOR EACH ROW
    EXECUTE FUNCTION update_review_updated_at();

-- ============================================================================
-- TRIGGER CALCUL RATING RESTAURANT
-- ============================================================================

CREATE OR REPLACE FUNCTION update_restaurant_rating()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE restaurants
    SET
        rating = (
            SELECT COALESCE(AVG(rating)::DECIMAL(3,2), 0)
            FROM restaurant_reviews
            WHERE restaurant_id = COALESCE(NEW.restaurant_id, OLD.restaurant_id)
        ),
        total_reviews = (
            SELECT COUNT(*)
            FROM restaurant_reviews
            WHERE restaurant_id = COALESCE(NEW.restaurant_id, OLD.restaurant_id)
        )
    WHERE id = COALESCE(NEW.restaurant_id, OLD.restaurant_id);

    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_restaurant_rating_on_insert
    AFTER INSERT ON restaurant_reviews
    FOR EACH ROW
    EXECUTE FUNCTION update_restaurant_rating();

CREATE TRIGGER trigger_update_restaurant_rating_on_update
    AFTER UPDATE ON restaurant_reviews
    FOR EACH ROW
    EXECUTE FUNCTION update_restaurant_rating();

CREATE TRIGGER trigger_update_restaurant_rating_on_delete
    AFTER DELETE ON restaurant_reviews
    FOR EACH ROW
    EXECUTE FUNCTION update_restaurant_rating();

-- ============================================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================================

-- Catégories de restaurants : lecture publique
ALTER TABLE restaurant_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view restaurant categories"
    ON restaurant_categories FOR SELECT
    USING (true);

-- Restaurants : lecture publique (uniquement actifs)
ALTER TABLE restaurants ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active restaurants"
    ON restaurants FOR SELECT
    USING (is_active = true);

-- Horaires : lecture publique
ALTER TABLE restaurant_hours ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view restaurant hours"
    ON restaurant_hours FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM restaurants
            WHERE restaurants.id = restaurant_hours.restaurant_id
            AND restaurants.is_active = true
        )
    );

-- Catégories de plats : lecture publique
ALTER TABLE dish_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view dish categories"
    ON dish_categories FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM restaurants
            WHERE restaurants.id = dish_categories.restaurant_id
            AND restaurants.is_active = true
        )
    );

-- Plats : lecture publique (uniquement disponibles)
ALTER TABLE dishes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view available dishes"
    ON dishes FOR SELECT
    USING (
        is_available = true
        AND EXISTS (
            SELECT 1 FROM restaurants
            WHERE restaurants.id = dishes.restaurant_id
            AND restaurants.is_active = true
        )
    );

-- Options et valeurs : lecture publique
ALTER TABLE dish_options ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view dish options"
    ON dish_options FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM dishes
            JOIN restaurants ON restaurants.id = dishes.restaurant_id
            WHERE dishes.id = dish_options.dish_id
            AND dishes.is_available = true
            AND restaurants.is_active = true
        )
    );

ALTER TABLE dish_option_values ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view dish option values"
    ON dish_option_values FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM dish_options
            JOIN dishes ON dishes.id = dish_options.dish_id
            JOIN restaurants ON restaurants.id = dishes.restaurant_id
            WHERE dish_options.id = dish_option_values.option_id
            AND dishes.is_available = true
            AND restaurants.is_active = true
        )
    );

-- Favoris : lecture/écriture par utilisateur authentifié
ALTER TABLE favorite_restaurants ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own favorites"
    ON favorite_restaurants FOR SELECT
    USING (auth.uid() = profile_id);

CREATE POLICY "Users can add favorites"
    ON favorite_restaurants FOR INSERT
    WITH CHECK (auth.uid() = profile_id);

CREATE POLICY "Users can remove favorites"
    ON favorite_restaurants FOR DELETE
    USING (auth.uid() = profile_id);

-- Avis : lecture publique, écriture par utilisateur
ALTER TABLE restaurant_reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view reviews"
    ON restaurant_reviews FOR SELECT
    USING (true);

CREATE POLICY "Authenticated users can create reviews"
    ON restaurant_reviews FOR INSERT
    WITH CHECK (auth.uid() = profile_id);

CREATE POLICY "Users can update own reviews"
    ON restaurant_reviews FOR UPDATE
    USING (auth.uid() = profile_id)
    WITH CHECK (auth.uid() = profile_id);

CREATE POLICY "Users can delete own reviews"
    ON restaurant_reviews FOR DELETE
    USING (auth.uid() = profile_id);

-- ============================================================================
-- FIN DE LA MIGRATION V7
-- ============================================================================
