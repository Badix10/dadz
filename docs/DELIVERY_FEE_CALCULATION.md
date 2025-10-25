# 🚚 Calcul des Frais de Livraison par Distance GPS

## 🎯 Système Utilisé

Au lieu de zones de livraison par code postal, nous utilisons un **calcul automatique par distance GPS**.

---

## 📐 Formule de Calcul

```
Frais de livraison = frais_base + (distance_km × tarif_par_km)
Temps estimé = temps_base + (distance_km × 3 minutes)
```

### Exemple Restaurant
```
Pizza Roma
├── frais_base: 2.00€
├── tarif_par_km: 0.50€
├── max_distance: 10 km
└── temps_base: 20 min

Client à 3 km → 2.00€ + (3 × 0.50€) = 3.50€ (temps ~29 min)
Client à 7 km → 2.00€ + (7 × 0.50€) = 5.50€ (temps ~41 min)
Client à 12 km → Hors zone ❌
```

---

## 🗄️ Champs dans la Table `restaurants`

```sql
delivery_fee_base       DECIMAL(10, 2)  -- Frais de base (ex: 2.00€)
delivery_fee_per_km     DECIMAL(10, 2)  -- Tarif/km (ex: 0.50€)
max_delivery_distance   INTEGER         -- Rayon max (ex: 10 km)
latitude                DECIMAL(10, 8)  -- Coordonnées GPS du restaurant
longitude               DECIMAL(11, 8)
```

---

## 🔧 Fonctions SQL Créées

### 1. `calculate_distance_km(lat1, lon1, lat2, lon2)`
Calcule la distance entre deux points GPS (formule Haversine).

```sql
-- Exemple
SELECT calculate_distance_km(
    48.8566, 2.3522,  -- Paris
    48.8606, 2.3376   -- Arc de Triomphe
);
-- Résultat: ~1.2 km
```

### 2. `calculate_delivery_fee(restaurant_id, client_lat, client_lon)`
Calcule les frais de livraison complets pour un restaurant vers une adresse.

```sql
-- Exemple
SELECT calculate_delivery_fee(
    'abc-123-restaurant-id',
    48.8606,  -- Latitude client
    2.3376    -- Longitude client
);

-- Résultat si dans la zone:
{
  "in_range": true,
  "distance_km": 3.2,
  "delivery_fee": 3.60,
  "estimated_time_min": 29
}

-- Résultat si hors zone:
{
  "in_range": false,
  "distance_km": 12.5,
  "max_distance_km": 10
}
```

---

## 💻 Utilisation dans le Code TypeScript

### Service de Livraison

```typescript
// lib/services/deliveryService.ts
import { supabase } from '@/lib/supabase';

export interface DeliveryInfo {
  in_range: boolean;
  distance_km?: number;
  delivery_fee?: number;
  estimated_time_min?: number;
  max_distance_km?: number;
  error?: string;
}

/**
 * Vérifier si un restaurant livre à une adresse et calculer les frais
 */
export const checkDeliveryAvailability = async (
  restaurantId: string,
  addressLat: number,
  addressLon: number
): Promise<DeliveryInfo> => {
  const { data, error } = await supabase.rpc('calculate_delivery_fee', {
    restaurant_id: restaurantId,
    client_lat: addressLat,
    client_lon: addressLon,
  });

  if (error) {
    console.error('Error calculating delivery fee:', error);
    throw error;
  }

  return data as DeliveryInfo;
};

/**
 * Filtrer les restaurants qui livrent à une adresse
 */
export const getRestaurantsInRange = async (
  addressLat: number,
  addressLon: number
): Promise<string[]> => {
  // Récupérer tous les restaurants actifs
  const { data: restaurants } = await supabase
    .from('restaurants')
    .select('id, latitude, longitude, max_delivery_distance')
    .eq('is_active', true);

  if (!restaurants) return [];

  // Filtrer ceux dans la zone
  const inRangeIds: string[] = [];

  for (const restaurant of restaurants) {
    if (!restaurant.latitude || !restaurant.longitude) continue;

    const { data: distance } = await supabase.rpc('calculate_distance_km', {
      lat1: restaurant.latitude,
      lon1: restaurant.longitude,
      lat2: addressLat,
      lon2: addressLon,
    });

    if (distance && distance <= restaurant.max_delivery_distance) {
      inRangeIds.push(restaurant.id);
    }
  }

  return inRangeIds;
};
```

### Utilisation dans un Composant

```typescript
// Dans un composant React Native
import { checkDeliveryAvailability } from '@/lib/services/deliveryService';
import { useAddresses } from '@/hooks/useAddresses';

const RestaurantDetailScreen = ({ restaurantId }: Props) => {
  const { currentAddress } = useAddresses();
  const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfo | null>(null);

  useEffect(() => {
    const checkDelivery = async () => {
      if (!currentAddress?.latitude || !currentAddress?.longitude) return;

      const info = await checkDeliveryAvailability(
        restaurantId,
        currentAddress.latitude,
        currentAddress.longitude
      );

      setDeliveryInfo(info);
    };

    checkDelivery();
  }, [restaurantId, currentAddress]);

  if (!deliveryInfo?.in_range) {
    return (
      <View>
        <Text>❌ Ce restaurant ne livre pas à votre adresse</Text>
        <Text>Distance: {deliveryInfo?.distance_km} km</Text>
        <Text>Zone max: {deliveryInfo?.max_distance_km} km</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>✅ Livraison disponible</Text>
      <Text>Distance: {deliveryInfo.distance_km} km</Text>
      <Text>Frais de livraison: {deliveryInfo.delivery_fee}€</Text>
      <Text>Temps estimé: {deliveryInfo.estimated_time_min} min</Text>
    </View>
  );
};
```

---

## 🎨 Affichage dans l'UI

### Liste des Restaurants
```typescript
<RestaurantCard
  restaurant={restaurant}
  distance={3.2}
  deliveryFee={3.60}
  estimatedTime={29}
/>
```

### Page Détail Restaurant
```typescript
<View>
  <Text>📍 {restaurant.name}</Text>
  <Text>🚚 Frais de livraison: {deliveryFee}€</Text>
  <Text>⏱️ Temps estimé: {estimatedTime} min</Text>
  <Text>📏 Distance: {distance} km</Text>
</View>
```

### Page Panier
```typescript
<View>
  <Text>Sous-total: {subtotal}€</Text>
  <Text>Frais de livraison ({distance}km): {deliveryFee}€</Text>
  <Text>Total: {subtotal + deliveryFee}€</Text>
</View>
```

---

## ✅ Avantages de ce Système

- ✅ **Simple** : Pas de gestion de zones complexes
- ✅ **Automatique** : Calcul instantané selon GPS
- ✅ **Juste** : Prix proportionnel à la distance
- ✅ **Flexible** : Chaque restaurant définit ses paramètres
- ✅ **Moderne** : Utilisé par Uber Eats, Deliveroo, etc.

---

## 🔮 Évolutions Futures

- [ ] Prix dynamique selon demande/trafic
- [ ] Zones premium avec supplément
- [ ] Frais de livraison offerts si montant > X€
- [ ] Abonnement livraison illimitée
- [ ] Calcul multi-stops (plusieurs restaurants)

---

## 📊 Requêtes SQL Utiles

### Restaurants livrant à une adresse
```sql
SELECT
    r.id,
    r.name,
    calculate_delivery_fee(r.id, 48.8566, 2.3522) as delivery_info
FROM restaurants r
WHERE r.is_active = true
AND (calculate_delivery_fee(r.id, 48.8566, 2.3522)->>'in_range')::boolean = true;
```

### Statistiques de livraison
```sql
SELECT
    AVG(delivery_fee_base) as avg_base_fee,
    AVG(delivery_fee_per_km) as avg_per_km,
    AVG(max_delivery_distance) as avg_max_distance
FROM restaurants
WHERE is_active = true;
```

---

## ⚠️ Points d'Attention

1. **Coordonnées GPS requises** : Les tables `restaurants` et `addresses` doivent avoir latitude/longitude
2. **Précision GPS** : La formule Haversine donne distance à vol d'oiseau (pas distance routière)
3. **Performance** : Calcul rapide (<10ms) mais éviter d'appeler pour tous les restaurants à la fois
4. **Arrondi** : Distance et frais arrondis à 2 décimales

---

## 🧪 Tests

```typescript
describe('Delivery Fee Calculation', () => {
  it('calcule correctement les frais', async () => {
    const result = await checkDeliveryAvailability(
      restaurantId,
      48.8606,
      2.3376
    );

    expect(result.in_range).toBe(true);
    expect(result.distance_km).toBeCloseTo(3.2, 1);
    expect(result.delivery_fee).toBeCloseTo(3.60, 2);
  });

  it('détecte quand hors zone', async () => {
    const result = await checkDeliveryAvailability(
      restaurantId,
      49.5, // Très loin
      3.0
    );

    expect(result.in_range).toBe(false);
  });
});
```
