import { useTranslation } from '@/hooks';
import type { Address } from '@/lib/services/addressService';
import { Ionicons } from '@expo/vector-icons';
import React, { memo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface LocationSelectorProps {
  address: Address | null;
  onPress: () => void;
}

/**
 * LocationSelector - Affiche l'adresse de livraison et permet de la changer
 * Principe: KISS - Composant simple et focalisé
 */
const LocationSelector: React.FC<LocationSelectorProps> = memo(({ address, onPress }) => {
  const { t, isRTL } = useTranslation();

  // Format de l'adresse à afficher
  const displayText = address
    ? `${address.address_type} - ${address.street}`
    : t('home:header.addAddress');

  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center gap-2"
      accessibilityLabel={t('home:header.changeAddress')}
      accessibilityRole="button"
      accessibilityHint={t('home:header.changeAddressHint')}
    >
      <Ionicons name="location" size={28} color="#FFC700" />
      <View className="flex-1">
        <Text
          className="text-xs text-gray-300 dark:text-gray-400"
          style={{ textAlign: isRTL ? 'right' : 'left' }}
        >
          {t('home:header.deliveryTo')}
        </Text>
        <View className="flex-row items-center gap-1">
          <Text
            className="text-white text-xs font-bold flex-1"
            style={{ textAlign: isRTL ? 'right' : 'left' }}
            numberOfLines={1}
          >
            {displayText}
          </Text>
          <Ionicons
            name="chevron-down"
            size={16}
            color="#FFFFFF"
          />
        </View>
      </View>
    </TouchableOpacity>
  );
});

LocationSelector.displayName = 'LocationSelector';

export default LocationSelector;
