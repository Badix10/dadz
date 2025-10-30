import type { NavigationTab } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import React, { memo, useCallback } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { themeColors } from '@/lib/utils/themeColors';
import { useColorScheme } from 'nativewind';

interface BottomNavigationProps {
  activeTab: string;
  tabs: NavigationTab[];
  onTabPress: (tabName: string) => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = memo(({
  activeTab,
  tabs,
  onTabPress,
}) => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const handleTabPress = useCallback((tabName: string) => {
    onTabPress(tabName);
  }, [onTabPress]);

  return (
    <View className="absolute bottom-0 w-full bg-card dark:bg-card-dark border-t border-primary h-20 flex-row justify-around items-center px-4 rounded-t-2xl shadow-lg">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.name;
        const inactiveColor = isDark ? themeColors.mutedDarkForeground : themeColors.mutedForeground;

        return (
          <TouchableOpacity
            key={tab.name}
            onPress={() => handleTabPress(tab.name)}
            className="flex items-center gap-1"
            accessibilityLabel={`${tab.name} tab`}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
          >
            <Ionicons
              name={(isActive ? tab.icon : tab.iconOutline) as any}
              size={24}
              color={isActive ? themeColors.primary : inactiveColor}
            />
            <Text
              className={`text-xs ${
                isActive ? 'text-primary font-bold' : 'text-muted-foreground dark:text-muted-dark-foreground font-medium'
              }`}
            >
              {tab.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
});

BottomNavigation.displayName = 'BottomNavigation';

export default BottomNavigation;
