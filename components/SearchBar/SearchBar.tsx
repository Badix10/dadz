import { Ionicons } from '@expo/vector-icons';
import React, { memo, useCallback, useState } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
import { useColorScheme } from 'nativewind';
import { COLORS } from '@/constants/classNames';

interface SearchBarProps {
  onSearch?: (text: string) => void;
  onFilterPress?: () => void;
  placeholder?: string;
}

/**
 * SearchBar component with search input and filter button
 * Memoized to prevent unnecessary re-renders
 */
const SearchBar: React.FC<SearchBarProps> = memo(({
  onSearch,
  onFilterPress,
  placeholder = 'Search here...',
}) => {
  const [searchText, setSearchText] = useState('');
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  // Colors adaptés au dark mode - contraste avec header sombre
  const inputBg = isDark ? 'bg-gray-700' : 'bg-gray-100';
  const textColor = isDark ? 'text-white' : 'text-foreground';
  const iconColor = isDark ? '#9CA3AF' : '#6B7280';
  const placeholderColor = isDark ? '#9CA3AF' : '#9CA3AF';

  const handleTextChange = useCallback((text: string) => {
    setSearchText(text);
    onSearch?.(text);
  }, [onSearch]);

  const handleFilterPress = useCallback(() => {
    onFilterPress?.();
  }, [onFilterPress]);

  return (
    <View className="flex-row items-center gap-3 px-4 pb-6">
      <View className={`flex-1 flex-row items-center ${inputBg} rounded-xl h-12 px-4`}>
        <Ionicons name="search" size={20} color={iconColor} />
        <TextInput
          className={`flex-1 ml-3 ${textColor}`}
          placeholder={placeholder}
          placeholderTextColor={placeholderColor}
          value={searchText}
          onChangeText={handleTextChange}
          accessibilityLabel="Search input"
          accessibilityRole="search"
        />
      </View>

      <TouchableOpacity
        className={`h-12 w-12 items-center justify-center ${inputBg} rounded-xl`}
        onPress={handleFilterPress}
        accessibilityLabel="Filter options"
        accessibilityRole="button"
      >
        <Ionicons name="options-outline" size={24} color={isDark ? 'white' : '#1A1A1A'} />
      </TouchableOpacity>
    </View>
  );
});

SearchBar.displayName = 'SearchBar';

export default SearchBar;
