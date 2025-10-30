/**
 * SearchHeader - Header sticky pour la page de recherche
 *
 * Features:
 * - Bouton back
 * - SearchBar avec clear button
 * - Filter button avec badge de compteur
 * - Sticky pendant scroll
 */

import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';
import React, { memo, useCallback, useState } from 'react';
import { TextInput, TouchableOpacity, View, Text } from 'react-native';
import { themeColors } from '@/lib/utils/themeColors';
import { useTranslation } from '@/hooks';

interface SearchHeaderProps {
  initialQuery?: string;
  onQueryChange: (query: string) => void;
  onBack: () => void;
  onFilterPress: () => void;
  filterCount?: number;
  autoFocus?: boolean;
}

/**
 * Header de recherche avec barre de recherche et boutons
 */
const SearchHeader: React.FC<SearchHeaderProps> = memo(({
  initialQuery = '',
  onQueryChange,
  onBack,
  onFilterPress,
  filterCount = 0,
  autoFocus = true,
}) => {
  const { t } = useTranslation();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const [searchText, setSearchText] = useState(initialQuery);

  // Colors adaptés au dark mode
  const bgColor = 'bg-background dark:bg-background-dark';
  const inputBg = 'bg-input dark:bg-input-dark';
  const textColor = 'text-foreground dark:text-foreground-dark';
  const iconColor = isDark ? themeColors.mutedDarkForeground : themeColors.mutedForeground;
  const placeholderColor = isDark ? themeColors.mutedDark : themeColors.muted;
  const filterButtonBg = filterCount > 0 ? 'bg-primary' : 'bg-input dark:bg-input-dark';

  const handleTextChange = useCallback((text: string) => {
    setSearchText(text);
    onQueryChange(text);
  }, [onQueryChange]);

  const handleClear = useCallback(() => {
    setSearchText('');
    onQueryChange('');
  }, [onQueryChange]);

  return (
    <View className={`${bgColor} px-4 pt-4 pb-3`}>
      <View className="flex-row items-center gap-3">
        {/* Back Button */}
        <TouchableOpacity
          onPress={onBack}
          className="h-12 w-12 items-center justify-center rounded-xl"
          accessibilityLabel={t('common:back')}
          accessibilityRole="button"
        >
          <Ionicons name="arrow-back" size={24} color={isDark ? themeColors.foregroundDark : themeColors.foreground} />
        </TouchableOpacity>

        {/* Search Input */}
        <View className={`flex-1 flex-row items-center ${inputBg} rounded-xl h-12 px-4`}>
          <Ionicons name="search" size={20} color={iconColor} />
          <TextInput
            className={`flex-1 ml-3 ${textColor}`}
            placeholder={t('search:header.placeholder')}
            placeholderTextColor={placeholderColor}
            value={searchText}
            onChangeText={handleTextChange}
            autoFocus={autoFocus}
            returnKeyType="search"
            accessibilityLabel={t('search:header.placeholder')}
            accessibilityRole="search"
          />
          {searchText.length > 0 && (
            <TouchableOpacity
              onPress={handleClear}
              className="ml-2"
              accessibilityLabel={t('search:header.clear')}
              accessibilityRole="button"
            >
              <Ionicons name="close-circle" size={20} color={iconColor} />
            </TouchableOpacity>
          )}
        </View>

        {/* Filter Button with Badge */}
        <TouchableOpacity
          className={`relative h-12 w-12 items-center justify-center ${filterButtonBg} rounded-xl shadow-sm`}
          onPress={onFilterPress}
          accessibilityLabel={t('home:filters.title')}
          accessibilityRole="button"
        >
          <Ionicons
            name="options-outline"
            size={24}
            color={filterCount > 0 ? themeColors.primaryForeground : (isDark ? themeColors.foregroundDark : themeColors.foreground)}
          />
          {filterCount > 0 && (
            <View className="absolute -top-1 -right-1 h-5 w-5 items-center justify-center rounded-full bg-destructive">
              <Text className="text-xs font-bold text-destructive-foreground">{filterCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
});

SearchHeader.displayName = 'SearchHeader';

export default SearchHeader;
