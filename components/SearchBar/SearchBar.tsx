import { Ionicons } from '@expo/vector-icons';
import React, { memo, useCallback, useState } from 'react';
import { TextInput, TouchableOpacity, View, Text } from 'react-native';
import { useColorScheme } from 'nativewind';
import { themeColors } from '@/lib/utils/themeColors';

interface SearchBarProps {
  onSearch?: (text: string) => void;
  onFilterPress?: () => void;
  onPress?: () => void; // Appelé quand on tap sur la SearchBar (pour navigation)
  placeholder?: string;
  editable?: boolean; // Si false, la SearchBar devient un bouton
  showFilterButton?: boolean; // Afficher ou non le bouton filter
}

/**
 * SearchBar component with search input and filter button
 * Memoized to prevent unnecessary re-renders
 */
const SearchBar: React.FC<SearchBarProps> = memo(({
  onSearch,
  onFilterPress,
  onPress,
  placeholder = 'Search here...',
  editable = true,
  showFilterButton = true,
}) => {
  const [searchText, setSearchText] = useState('');
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  // Colors adaptés au theme
  const inputBg = 'bg-input dark:bg-input-dark';
  const textColor = 'text-foreground dark:text-foreground-dark';
  const iconColor = isDark ? themeColors.mutedDarkForeground : themeColors.mutedForeground;
  const placeholderColor = isDark ? themeColors.mutedDark : themeColors.muted;

  const handleTextChange = useCallback((text: string) => {
    setSearchText(text);
    onSearch?.(text);
  }, [onSearch]);

  const handleFilterPress = useCallback(() => {
    onFilterPress?.();
  }, [onFilterPress]);

  const handlePress = useCallback(() => {
    onPress?.();
  }, [onPress]);

  return (
    <View className="flex-row items-center gap-3">
      {editable ? (
        // Mode normal: Input éditable
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
      ) : (
        // Mode bouton: Navigate vers la page de recherche
        <TouchableOpacity
          className={`flex-1 flex-row items-center ${inputBg} rounded-xl h-12 px-4`}
          onPress={handlePress}
          accessibilityLabel={placeholder}
          accessibilityRole="button"
        >
          <Ionicons name="search" size={20} color={iconColor} />
          <Text className={`flex-1 ml-3 text-base`} style={{ color: placeholderColor }}>
            {placeholder}
          </Text>
        </TouchableOpacity>
      )}

      {showFilterButton && (
        <TouchableOpacity
          className="h-12 w-12 items-center justify-center bg-primary rounded-xl"
          onPress={handleFilterPress}
          accessibilityLabel="Filter options"
          accessibilityRole="button"
        >
          <Ionicons name="options-outline" size={24} color={themeColors.primaryForeground} />
        </TouchableOpacity>
      )}
    </View>
  );
});

SearchBar.displayName = 'SearchBar';

export default SearchBar;
