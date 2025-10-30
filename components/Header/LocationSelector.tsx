import { useTranslation } from '@/hooks';
import type { Address } from '@/lib/services/addressService';
import { Ionicons } from '@expo/vector-icons';
import React, { memo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useColorScheme } from 'nativewind';
import { themeColors } from '@/lib/utils/themeColors';

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
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  // Format de l'adresse à afficher
  const displayText = address
    ? `${address.address_type} - ${address.street}`
    : t('home:header.addAddress');

  // Colors - This component is used in the header which has a dark background (surface)
  // So text should be visible on dark background (use foreground-dark colors in light mode too)
  const iconColor = themeColors.primary;
  const subtitleColor = isDark ? themeColors.mutedDarkForeground : themeColors.mutedForeground;
  const titleColor = isDark ? themeColors.foregroundDark : themeColors.foregroundDark; // Always light for header
  const chevronColor = isDark ? themeColors.foregroundDark : themeColors.foregroundDark; // Always light for header

  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center gap-2"
      accessibilityLabel={t('home:header.changeAddress')}
      accessibilityRole="button"
      accessibilityHint={t('home:header.changeAddressHint')}
    >
      <Ionicons name="location" size={28} color={iconColor} />
      <View className="flex-1">
        <Text
          className="text-xs text-muted-foreground dark:text-muted-dark-foreground"
          style={{ textAlign: isRTL ? 'right' : 'left' }}
        >
          {t('home:header.deliveryTo')}
        </Text>
        <View className="flex-row items-center gap-1">
          <Text
            className="text-foreground-dark text-xs font-bold flex-1"
            style={{ textAlign: isRTL ? 'right' : 'left' }}
            numberOfLines={1}
          >
            {displayText}
          </Text>
          <Ionicons
            name="chevron-down"
            size={16}
            color={chevronColor}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
});

LocationSelector.displayName = 'LocationSelector';

export default LocationSelector;
