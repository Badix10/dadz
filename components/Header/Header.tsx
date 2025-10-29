import { useTranslation } from '@/hooks';
import type { Address } from '@/lib/services/addressService';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';
import React, { memo, useCallback } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import LocationSelector from './LocationSelector';

interface HeaderProps {
  address: Address | null;
  onLocationPress: () => void;
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
  address,
  onLocationPress,
  onCartPress,
  onNotificationPress,
  hasNotification = true,
  children
}) => {
  const { t, isRTL, flexDirection } = useTranslation();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  // Icon et texte colors - toujours light car fond noir
  const iconColor = '#FFFFFF';
  const textColor = 'text-white';

  const handleCartPress = useCallback(() => {
    onCartPress?.();
  }, [onCartPress]);

  const handleNotificationPress = useCallback(() => {
    onNotificationPress?.();
  }, [onNotificationPress]);

  const handleLocationPress = useCallback(() => {
    onLocationPress();
  }, [onLocationPress]);

  return (
    <View className="bg-[#1A1A1A] px-5 pt-6 pb-8 rounded-b-[32px]">
      <View
        className="items-center justify-between mb-5"
        style={{ flexDirection: flexDirection('row') }}
      >

        <View className='flex-1'>
            <LocationSelector address={address} onPress={handleLocationPress} />
        </View>

        <TouchableOpacity
          className="relative h-12 w-12 items-center justify-center ml-3"
          onPress={handleNotificationPress}
          accessibilityLabel={t('home:header.notifications')}
          accessibilityRole="button"
        >
          <Ionicons name="notifications-outline" size={26} color={iconColor} />
          {hasNotification && (
            <View
              className="absolute top-2 h-2.5 w-2.5 rounded-full bg-primary"
              style={isRTL ? { left: 7 } : { right: 7 }}
            />
          )}
        </TouchableOpacity>
      </View>

      <Text
        className={`text-[34px] font-extrabold ${textColor} mb-6 leading-tight`}
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
