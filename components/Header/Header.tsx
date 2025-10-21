import type { LocationData } from '@/types';
import { useTranslation } from '@/hooks';
import { Ionicons } from '@expo/vector-icons';
import React, { memo, useCallback } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useColorScheme } from 'nativewind';
import { COLORS } from '@/constants/classNames';

interface HeaderProps {
  location: LocationData;
  onCartPress?: () => void;
  onNotificationPress?: () => void;
  hasNotification?: boolean;
  children: React.ReactNode;
}

/**
 * Header component displaying location, cart, and notifications
 * Optimized with React.memo to prevent unnecessary re-renders
 * Supports RTL layout dynamically without reload
 */
const Header: React.FC<HeaderProps> = memo(({
  location,
  onCartPress,
  onNotificationPress,
  hasNotification = true,
  children
}) => {
  const { t, isRTL, flexDirection } = useTranslation();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  // Icon et texte colors - toujours light car fond sombre
  const iconColor = '#FFFFFF';
  const textColor = 'text-white';

  const handleCartPress = useCallback(() => {
    onCartPress?.();
  }, [onCartPress]);

  const handleNotificationPress = useCallback(() => {
    onNotificationPress?.();
  }, [onNotificationPress]);

  return (
    <View className="bg-black dark:bg-surface-dark rounded-b-3xl px-4 pt-4 pb-6">
      <View
        className="items-center justify-between mb-4"
        style={{ flexDirection: flexDirection('row') }}
      >
        <View
          className="items-center gap-2"
          style={{ flexDirection: flexDirection('row') }}
        >
          <Ionicons name="location" size={28} color="#FFC700" />
          <View>
            <Text className="text-xs text-gray-300 dark:text-gray-400" style={{ textAlign: isRTL ? 'right' : 'left' }}>
              {t('home:header.location')}
            </Text>
            <Text className={`${textColor} text-base font-bold`} style={{ textAlign: isRTL ? 'right' : 'left' }}>
              {location.city}, {location.country}
            </Text>
          </View>
        </View>

        <View
          className="items-center gap-2"
          style={{ flexDirection: flexDirection('row') }}
        >
          <TouchableOpacity
            className="relative h-10 w-10 items-center justify-center"
            onPress={handleCartPress}
            accessibilityLabel={t('home:header.cart')}
            accessibilityRole="button"
          >
            <Ionicons name="cart-outline" size={24} color={iconColor} />
          </TouchableOpacity>

          <TouchableOpacity
            className="relative h-10 w-10 items-center justify-center"
            onPress={handleNotificationPress}
            accessibilityLabel={t('home:header.notifications')}
            accessibilityRole="button"
          >
            <Ionicons name="notifications-outline" size={24} color={iconColor} />
            {hasNotification && (
              <View
                className="absolute top-1 h-2.5 w-2.5 rounded-full bg-primary"
                style={isRTL ? { left: 4 } : { right: 4 }}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>

      <Text
        className={`text-3xl font-bold ${textColor} mb-4`}
        style={{ textAlign: isRTL ? 'right' : 'left' }}
      >
        {t('home:header.greeting')}
      </Text>

      {children}
    </View>
  );
});

Header.displayName = 'Header';

export default Header;
