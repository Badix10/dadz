import type { LocationData } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import React, { memo, useCallback } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

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
 */
const Header: React.FC<HeaderProps> = memo(({
  location,
  onCartPress,
  onNotificationPress,
  hasNotification = true,
  children
}) => {
  const handleCartPress = useCallback(() => {
    onCartPress?.();
  }, [onCartPress]);

  const handleNotificationPress = useCallback(() => {
    onNotificationPress?.();
  }, [onNotificationPress]);

  return (
    <View className="bg-black rounded-b-3xl px-4 pt-4 pb-6">
      <View className="flex-row items-center justify-between mb-4">
        <View className="flex-row items-center gap-2">
          <Ionicons name="location" size={28} color="#FFC700" />
          <View>
            <Text className="text-xs text-gray-400">Location</Text>
            <Text className="text-white text-base font-bold">
              {location.city}, {location.country}
            </Text>
          </View>
        </View>

        <View className="flex-row items-center gap-2">
          <TouchableOpacity
            className="relative h-10 w-10 items-center justify-center"
            onPress={handleCartPress}
            accessibilityLabel="Shopping cart"
            accessibilityRole="button"
          >
            <Ionicons name="cart-outline" size={24} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            className="relative h-10 w-10 items-center justify-center"
            onPress={handleNotificationPress}
            accessibilityLabel="Notifications"
            accessibilityRole="button"
          >
            <Ionicons name="notifications-outline" size={24} color="white" />
            {hasNotification && (
              <View className="absolute top-1 right-1 h-2.5 w-2.5 rounded-full bg-[#FFC700]" />
            )}
          </TouchableOpacity>
        </View>
      </View>

      <Text className="text-3xl font-bold text-white mb-4">
        What are you going to{'\n'}eat today?
      </Text>

      {children}
    </View>
  );
});

Header.displayName = 'Header';

export default Header;
