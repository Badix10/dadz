import { Ionicons } from '@expo/vector-icons';
import React, { memo, useCallback, useState } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';

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

  const handleTextChange = useCallback((text: string) => {
    setSearchText(text);
    onSearch?.(text);
  }, [onSearch]);

  const handleFilterPress = useCallback(() => {
    onFilterPress?.();
  }, [onFilterPress]);

  return (
    <View className="flex-row items-center gap-3 px-4 pb-6">
      <View className="flex-1 flex-row items-center bg-gray-800 rounded-xl h-12 px-4">
        <Ionicons name="search" size={20} color="#9CA3AF" />
        <TextInput
          className="flex-1 ml-3 text-white"
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          value={searchText}
          onChangeText={handleTextChange}
          accessibilityLabel="Search input"
          accessibilityRole="search"
        />
      </View>

      <TouchableOpacity
        className="h-12 w-12 items-center justify-center bg-gray-800 rounded-xl"
        onPress={handleFilterPress}
        accessibilityLabel="Filter options"
        accessibilityRole="button"
      >
        <Ionicons name="options-outline" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
});

SearchBar.displayName = 'SearchBar';

export default SearchBar;
