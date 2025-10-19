import type { NavigationTab } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import React, { memo, useCallback } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

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
  const handleTabPress = useCallback((tabName: string) => {
    onTabPress(tabName);
  }, [onTabPress]);

  return (
    <View className="absolute bottom-0 w-full bg-white border-t  border-yellow-400  h-20 flex-row justify-around items-center px-4  rounded-t-2xl">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.name;

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
              color={isActive ? '#FFC700' : '#9CA3AF'}
            />
            <Text
              className={`text-xs ${
                isActive ? 'text-primary font-bold' : 'text-gray-400 font-medium'
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
