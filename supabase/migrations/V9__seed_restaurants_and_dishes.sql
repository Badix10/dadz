-- ============================================================================
-- Migration V9: Seed Data - Restaurants et Plats de Test
-- Description: Données de test pour développement
-- Date: 2025-10-25
-- ============================================================================

-- ============================================================================
-- 1. CATÉGORIES DE RESTAURANTS (5 max)
-- ============================================================================

INSERT INTO restaurant_categories (id, name, slug, icon_url, display_order)
VALUES
    (gen_random_uuid(), 'Pizza', 'pizza', 'https://via.placeholder.com/48x48?text=🍕', 1),
    (gen_random_uuid(), 'Burger', 'burger', 'https://via.placeholder.com/48x48?text=🍔', 2),
    (gen_random_uuid(), 'Sushi', 'sushi', 'https://via.placeholder.com/48x48?text=🍣', 3),
    (gen_random_uuid(), 'Tacos', 'tacos', 'https://via.placeholder.com/48x48?text=🌮', 4),
    (gen_random_uuid(), 'Pâtes', 'pates', 'https://via.placeholder.com/48x48?text=🍝', 5);

-- ============================================================================
-- 2. RESTAURANTS (4 max)
-- ============================================================================

-- Pizza Roma (Paris 11ème)
INSERT INTO restaurants (
    id, name, slug, description, category_id,
    phone, email, address,
    latitude, longitude,
    logo_url, cover_image_url,
    delivery_fee_base, delivery_fee_per_km, max_delivery_distance,
    minimum_order, delivery_time_min, delivery_time_max,
    price_range, rating, total_reviews, is_active, is_open
)
VALUES (
    gen_random_uuid(),
    'Pizza Roma',
    'pizza-roma-paris-11',
    'Pizzeria italienne authentique. Pâte fraîche préparée tous les jours, ingrédients importés d''Italie.',
    (SELECT id FROM restaurant_categories WHERE name = 'Pizza' LIMIT 1),
    '+33140211234',
    'contact@pizzaroma.fr',
    '45 Rue Oberkampf, 75011 Paris, France',
    48.8644, 2.3792,
    'https://via.placeholder.com/200x200?text=Pizza+Roma',
    'https://via.placeholder.com/1200x400?text=Pizza+Roma+Cover',
    2.50, 0.50, 10,
    15.00, 25, 35,
    'medium', 4.5, 245, true, true
);

-- Burger King Street (Paris 10ème)
INSERT INTO restaurants (
    id, name, slug, description, category_id,
    phone, email, address,
    latitude, longitude,
    logo_url, cover_image_url,
    delivery_fee_base, delivery_fee_per_km, max_delivery_distance,
    minimum_order, delivery_time_min, delivery_time_max,
    price_range, rating, total_reviews, is_active, is_open
)
VALUES (
    gen_random_uuid(),
    'Burger King Street',
    'burger-king-street-paris-10',
    'Les meilleurs burgers artisanaux de Paris. Viande française, pain maison.',
    (SELECT id FROM restaurant_categories WHERE name = 'Burger' LIMIT 1),
    '+33145678910',
    'hello@burgerkingst.com',
    '12 Rue du Faubourg Saint-Denis, 75010 Paris, France',
    48.8711, 2.3549,
    'https://via.placeholder.com/200x200?text=Burger+Street',
    'https://via.placeholder.com/1200x400?text=Burger+Street+Cover',
    2.00, 0.40, 8,
    12.00, 20, 30,
    'medium', 4.7, 512, true, true
);

-- Sushi Tokyo (Paris 8ème)
INSERT INTO restaurants (
    id, name, slug, description, category_id,
    phone, email, address,
    latitude, longitude,
    logo_url, cover_image_url,
    delivery_fee_base, delivery_fee_per_km, max_delivery_distance,
    minimum_order, delivery_time_min, delivery_time_max,
    price_range, rating, total_reviews, is_active, is_open
)
VALUES (
    gen_random_uuid(),
    'Sushi Tokyo',
    'sushi-tokyo-paris-8',
    'Restaurant japonais traditionnel. Sushi, sashimi et spécialités du chef.',
    (SELECT id FROM restaurant_categories WHERE name = 'Sushi' LIMIT 1),
    '+33142345678',
    'info@sushitokyo.fr',
    '28 Avenue des Champs-Élysées, 75008 Paris, France',
    48.8698, 2.3076,
    'https://via.placeholder.com/200x200?text=Sushi+Tokyo',
    'https://via.placeholder.com/1200x400?text=Sushi+Tokyo+Cover',
    3.00, 0.60, 12,
    20.00, 30, 45,
    'high', 4.8, 892, true, true
);

-- Tacos Loco (Paris 13ème)
INSERT INTO restaurants (
    id, name, slug, description, category_id,
    phone, email, address,
    latitude, longitude,
    logo_url, cover_image_url,
    delivery_fee_base, delivery_fee_per_km, max_delivery_distance,
    minimum_order, delivery_time_min, delivery_time_max,
    price_range, rating, total_reviews, is_active, is_open
)
VALUES (
    gen_random_uuid(),
    'Tacos Loco',
    'tacos-loco-paris-13',
    'Tacos français authentiques. Viandes grillées, sauces maison.',
    (SELECT id FROM restaurant_categories WHERE name = 'Tacos' LIMIT 1),
    '+33143567890',
    'contact@tacosloco.fr',
    '56 Avenue d''Italie, 75013 Paris, France',
    48.8277, 2.3573,
    'https://via.placeholder.com/200x200?text=Tacos+Loco',
    'https://via.placeholder.com/1200x400?text=Tacos+Loco+Cover',
    1.50, 0.35, 7,
    10.00, 15, 25,
    'low', 4.3, 156, true, true
);

-- ============================================================================
-- 3. HORAIRES D'OUVERTURE
-- ============================================================================

-- Pizza Roma - Tous les jours 11h-23h
INSERT INTO restaurant_hours (restaurant_id, day_of_week, open_time, close_time, is_closed)
SELECT
    id,
    day,
    '11:00:00',
    '23:00:00',
    false
FROM restaurants
CROSS JOIN (SELECT generate_series(0, 6) AS day) AS days
WHERE name = 'Pizza Roma';

-- Burger King Street - Lundi-Dimanche 10h-minuit
INSERT INTO restaurant_hours (restaurant_id, day_of_week, open_time, close_time, is_closed)
SELECT
    id,
    day,
    '10:00:00',
    '00:00:00',
    false
FROM restaurants
CROSS JOIN (SELECT generate_series(0, 6) AS day) AS days
WHERE name = 'Burger King Street';

-- Sushi Tokyo - Mardi-Dimanche 12h-22h (fermé lundi)
INSERT INTO restaurant_hours (restaurant_id, day_of_week, open_time, close_time, is_closed)
SELECT
    id,
    day,
    CASE WHEN day = 1 THEN NULL ELSE '12:00:00' END,
    CASE WHEN day = 1 THEN NULL ELSE '22:00:00' END,
    CASE WHEN day = 1 THEN true ELSE false END
FROM restaurants
CROSS JOIN (SELECT generate_series(0, 6) AS day) AS days
WHERE name = 'Sushi Tokyo';

-- Tacos Loco - Tous les jours 11h30-23h30
INSERT INTO restaurant_hours (restaurant_id, day_of_week, open_time, close_time, is_closed)
SELECT
    id,
    day,
    '11:30:00',
    '23:30:00',
    false
FROM restaurants
CROSS JOIN (SELECT generate_series(0, 6) AS day) AS days
WHERE name = 'Tacos Loco';

-- ============================================================================
-- 4. CATÉGORIES DE PLATS (par restaurant)
-- ============================================================================

-- Pour chaque restaurant, créer les catégories de plats
INSERT INTO dish_categories (restaurant_id, name, display_order)
SELECT r.id, 'Entrées', 1 FROM restaurants r
UNION ALL
SELECT r.id, 'Plats', 2 FROM restaurants r
UNION ALL
SELECT r.id, 'Desserts', 3 FROM restaurants r
UNION ALL
SELECT r.id, 'Boissons', 4 FROM restaurants r;

-- ============================================================================
-- 5. PLATS - PIZZA ROMA (2 plats max)
-- ============================================================================

INSERT INTO dishes (restaurant_id, category_id, name, slug, description, price, image_url, is_available, preparation_time, display_order)
SELECT
    r.id,
    (SELECT id FROM dish_categories WHERE name = 'Plats' AND restaurant_id = r.id LIMIT 1),
    'Pizza Margherita',
    'pizza-margherita',
    'Tomate, mozzarella, basilic frais, huile d''olive',
    12.90,
    'https://via.placeholder.com/400x300?text=Margherita',
    true,
    20,
    1
FROM restaurants r WHERE r.name = 'Pizza Roma';

INSERT INTO dishes (restaurant_id, category_id, name, slug, description, price, image_url, is_available, preparation_time, display_order)
SELECT
    r.id,
    (SELECT id FROM dish_categories WHERE name = 'Plats' AND restaurant_id = r.id LIMIT 1),
    'Pizza Regina',
    'pizza-regina',
    'Tomate, mozzarella, jambon, champignons',
    14.90,
    'https://via.placeholder.com/400x300?text=Regina',
    true,
    20,
    2
FROM restaurants r WHERE r.name = 'Pizza Roma';

-- ============================================================================
-- 6. PLATS - BURGER KING STREET (2 plats max)
-- ============================================================================

INSERT INTO dishes (restaurant_id, category_id, name, slug, description, price, image_url, is_available, preparation_time, display_order)
SELECT
    r.id,
    (SELECT id FROM dish_categories WHERE name = 'Plats' AND restaurant_id = r.id LIMIT 1),
    'Burger Classic',
    'burger-classic',
    'Steak haché 180g, cheddar, salade, tomate, oignon, sauce maison',
    13.90,
    'https://via.placeholder.com/400x300?text=Burger+Classic',
    true,
    15,
    1
FROM restaurants r WHERE r.name = 'Burger King Street';

INSERT INTO dishes (restaurant_id, category_id, name, slug, description, price, image_url, is_available, preparation_time, display_order)
SELECT
    r.id,
    (SELECT id FROM dish_categories WHERE name = 'Plats' AND restaurant_id = r.id LIMIT 1),
    'Burger BBQ Bacon',
    'burger-bbq-bacon',
    'Steak 200g, bacon croustillant, cheddar, oignons frits, sauce BBQ',
    16.50,
    'https://via.placeholder.com/400x300?text=BBQ+Bacon',
    true,
    18,
    2
FROM restaurants r WHERE r.name = 'Burger King Street';

-- ============================================================================
-- 7. PLATS - SUSHI TOKYO (2 plats max)
-- ============================================================================

INSERT INTO dishes (restaurant_id, category_id, name, slug, description, price, image_url, is_available, preparation_time, display_order)
SELECT
    r.id,
    (SELECT id FROM dish_categories WHERE name = 'Plats' AND restaurant_id = r.id LIMIT 1),
    'Sushi Saumon 6pcs',
    'sushi-saumon-6pcs',
    '6 pièces de sushi au saumon frais',
    11.90,
    'https://via.placeholder.com/400x300?text=Sushi+Saumon',
    true,
    15,
    1
FROM restaurants r WHERE r.name = 'Sushi Tokyo';

INSERT INTO dishes (restaurant_id, category_id, name, slug, description, price, image_url, is_available, preparation_time, display_order)
SELECT
    r.id,
    (SELECT id FROM dish_categories WHERE name = 'Plats' AND restaurant_id = r.id LIMIT 1),
    'California Roll 8pcs',
    'california-roll-8pcs',
    '8 pièces: surimi, avocat, concombre, sésame',
    9.90,
    'https://via.placeholder.com/400x300?text=California',
    true,
    12,
    2
FROM restaurants r WHERE r.name = 'Sushi Tokyo';

-- ============================================================================
-- 8. PLATS - TACOS LOCO (2 plats max)
-- ============================================================================

INSERT INTO dishes (restaurant_id, category_id, name, slug, description, price, image_url, is_available, preparation_time, display_order)
SELECT
    r.id,
    (SELECT id FROM dish_categories WHERE name = 'Plats' AND restaurant_id = r.id LIMIT 1),
    'Tacos Poulet',
    'tacos-poulet',
    'Galette, poulet mariné, frites, cheddar, sauces au choix',
    9.90,
    'https://via.placeholder.com/400x300?text=Tacos+Poulet',
    true,
    15,
    1
FROM restaurants r WHERE r.name = 'Tacos Loco';

INSERT INTO dishes (restaurant_id, category_id, name, slug, description, price, image_url, is_available, preparation_time, display_order)
SELECT
    r.id,
    (SELECT id FROM dish_categories WHERE name = 'Plats' AND restaurant_id = r.id LIMIT 1),
    'Tacos Viande Hachée',
    'tacos-viande-hachee',
    'Galette, viande hachée, frites, cheddar, sauces au choix',
    10.50,
    'https://via.placeholder.com/400x300?text=Tacos+Viande',
    true,
    15,
    2
FROM restaurants r WHERE r.name = 'Tacos Loco';

-- ============================================================================
-- 9. AVIS CLIENTS (Exemples)
-- ============================================================================

-- Avis pour Pizza Roma
INSERT INTO restaurant_reviews (restaurant_id, profile_id, order_id, rating, comment)
SELECT
    r.id,
    NULL, -- Pas de profile_id pour les données de test
    NULL,
    5,
    'Excellente pizza, pâte fine et croustillante comme en Italie!'
FROM restaurants r WHERE r.name = 'Pizza Roma';

-- Avis pour Burger King Street
INSERT INTO restaurant_reviews (restaurant_id, profile_id, order_id, rating, comment)
SELECT
    r.id,
    NULL,
    NULL,
    5,
    'Meilleur burger de Paris! Viande de qualité, pain délicieux.'
FROM restaurants r WHERE r.name = 'Burger King Street';

-- Avis pour Sushi Tokyo
INSERT INTO restaurant_reviews (restaurant_id, profile_id, order_id, rating, comment)
SELECT
    r.id,
    NULL,
    NULL,
    5,
    'Poisson ultra frais, meilleur sushi de Paris sans hésiter!'
FROM restaurants r WHERE r.name = 'Sushi Tokyo';

-- Avis pour Tacos Loco
INSERT INTO restaurant_reviews (restaurant_id, profile_id, order_id, rating, comment)
SELECT
    r.id,
    NULL,
    NULL,
    4,
    'Tacos généreux et délicieux. Parfait pour une soirée entre amis!'
FROM restaurants r WHERE r.name = 'Tacos Loco';

-- ============================================================================
-- FIN DE LA MIGRATION V9
-- ============================================================================

-- Les triggers vont automatiquement calculer les ratings moyens
