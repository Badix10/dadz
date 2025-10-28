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
import { COLORS } from '@/constants/classNames';
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
  const bgColor = isDark ? 'bg-surface-dark' : 'bg-white';
  const inputBg = isDark ? 'bg-gray-700' : 'bg-gray-100';
  const textColor = isDark ? 'text-white' : 'text-foreground';
  const iconColor = isDark ? '#9CA3AF' : '#6B7280';
  const placeholderColor = isDark ? '#9CA3AF' : '#9CA3AF';

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
          <Ionicons name="arrow-back" size={24} color={isDark ? 'white' : '#1A1A1A'} />
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
          className={`relative h-12 w-12 items-center justify-center ${inputBg} rounded-xl`}
          onPress={onFilterPress}
          accessibilityLabel={t('home:filters.title')}
          accessibilityRole="button"
        >
          <Ionicons name="options-outline" size={24} color={isDark ? 'white' : '#1A1A1A'} />
          {filterCount > 0 && (
            <View className="absolute -top-1 -right-1 h-5 w-5 items-center justify-center rounded-full bg-primary">
              <Text className="text-xs font-bold text-black">{filterCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
});

SearchHeader.displayName = 'SearchHeader';

export default SearchHeader;
