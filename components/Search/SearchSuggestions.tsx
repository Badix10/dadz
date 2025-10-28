/**
 * SearchSuggestions - Affiche l'historique et suggestions de recherche
 *
 * Sections:
 * 1. Historique récent (avec possibilité de supprimer)
 * 2. Parcourir par catégorie (optionnel)
 */

import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';
import React, { memo } from 'react';
import { Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { COLORS } from '@/constants/classNames';
import { useTranslation } from '@/hooks';
import type { SearchHistoryItem, Category } from '@/types';

interface SearchSuggestionsProps {
  history: SearchHistoryItem[];
  categories?: Category[];
  onSuggestionPress: (query: string) => void;
  onCategoryPress?: (categoryId: string) => void;
  onHistoryRemove: (id: string) => void;
  onClearHistory: () => void;
}

/**
 * Composant de suggestions de recherche
 */
const SearchSuggestions: React.FC<SearchSuggestionsProps> = memo(({
  history,
  categories,
  onSuggestionPress,
  onCategoryPress,
  onHistoryRemove,
  onClearHistory,
}) => {
  const { t } = useTranslation();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const iconColor = isDark ? '#9CA3AF' : '#6B7280';
  const hasHistory = history && history.length > 0;

  return (
    <ScrollView className="flex-1 px-4 py-4">
      {/* Historique récent */}
      {hasHistory && (
        <View className="mb-6">
          <View className="flex-row items-center justify-between mb-4">
            <Text className={`text-lg font-bold ${COLORS.text.primary}`}>
              {t('search:suggestions.recent')}
            </Text>
            <TouchableOpacity
              onPress={onClearHistory}
              accessibilityLabel={t('search:suggestions.clearHistory')}
              accessibilityRole="button"
            >
              <Text className="text-sm text-primary font-semibold">
                {t('search:suggestions.clearHistory')}
              </Text>
            </TouchableOpacity>
          </View>

          <View className="space-y-2">
            {history.map((item) => (
              <View
                key={item.id}
                className={`flex-row items-center justify-between py-3 px-4 rounded-xl ${isDark ? 'bg-surface-dark-secondary' : 'bg-gray-50'}`}
              >
                <TouchableOpacity
                  onPress={() => onSuggestionPress(item.query)}
                  className="flex-1 flex-row items-center"
                  accessibilityLabel={`Search for ${item.query}`}
                  accessibilityRole="button"
                >
                  <Ionicons name="time-outline" size={20} color={iconColor} />
                  <View className="flex-1 ml-3">
                    <Text className={`text-base ${COLORS.text.primary}`} numberOfLines={1}>
                      {item.query}
                    </Text>
                    {item.resultCount > 0 && (
                      <Text className={`text-xs ${COLORS.text.secondary} mt-0.5`}>
                        {t('search:results.title', { count: item.resultCount })}
                      </Text>
                    )}
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => onHistoryRemove(item.id)}
                  className="ml-2 p-2"
                  accessibilityLabel={t('common:delete')}
                  accessibilityRole="button"
                >
                  <Ionicons name="close" size={18} color={iconColor} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Message si pas d'historique */}
      {!hasHistory && (
        <View className="py-8 items-center">
          <Ionicons name="time-outline" size={48} color={iconColor} />
          <Text className={`text-base ${COLORS.text.secondary} mt-4 text-center`}>
            {t('search:suggestions.noHistory')}
          </Text>
        </View>
      )}

      {/* Parcourir par catégorie */}
      {categories && categories.length > 0 && onCategoryPress && (
        <View className="mb-6">
          <Text className={`text-lg font-bold ${COLORS.text.primary} mb-4`}>
            {t('search:suggestions.browseCategories')}
          </Text>

          <View className="flex-row flex-wrap gap-2">
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                onPress={() => onCategoryPress(category.id)}
                className={`px-4 py-2 rounded-full ${isDark ? 'bg-surface-dark-secondary' : 'bg-gray-100'}`}
                accessibilityLabel={`Browse ${category.name}`}
                accessibilityRole="button"
              >
                <Text className={`text-sm ${COLORS.text.primary}`}>
                  {category.icon} {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </ScrollView>
  );
});

SearchSuggestions.displayName = 'SearchSuggestions';

export default SearchSuggestions;
