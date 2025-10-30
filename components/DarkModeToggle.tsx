import React, { useEffect } from 'react';
import { TouchableOpacity, Animated } from 'react-native';
import { usePersistColorScheme } from '@/contexts/ColorSchemeProvider';
import { themeColors } from '@/lib/utils/themeColors';

/**
 * Toggle switch pour le dark mode
 * Utilise le hook useColorScheme natif de NativeWind
 * Principes: KISS, DRY
 */
export const DarkModeToggle: React.FC = () => {
  const { colorScheme, toggleColorScheme } = usePersistColorScheme();
  const isDark = colorScheme === 'dark';
  const animatedValue = React.useRef(new Animated.Value(isDark ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: isDark ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isDark]);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 22],
  });

  return (
    <TouchableOpacity
      onPress={toggleColorScheme}
      activeOpacity={0.8}
      className="relative w-11 h-6 rounded-full justify-center"
      style={{
        backgroundColor: isDark ? themeColors.primary : themeColors.muted,
      }}
    >
      <Animated.View
        className="absolute w-5 h-5 rounded-full shadow-sm"
        style={{
          backgroundColor: isDark ? themeColors.primaryForeground : themeColors.card,
          transform: [{ translateX }],
        }}
      />
    </TouchableOpacity>
  );
};
