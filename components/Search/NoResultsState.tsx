/**
 * NoResultsState - État affiché quand aucun résultat n'est trouvé
 *
 * Affiché lorsque l'utilisateur a lancé une recherche
 * mais qu'aucun restaurant ne correspond aux critères
 */

import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';
import React, { memo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '@/constants/classNames';
import { useTranslation } from '@/hooks';

interface NoResultsStateProps {
  query: string;
  onResetFilters?: () => void;
  hasFilters?: boolean;
  className?: string;
}

/**
 * Composant d'état "aucun résultat"
 */
const NoResultsState: React.FC<NoResultsStateProps> = memo(({
  query,
  onResetFilters,
  hasFilters = false,
  className = '',
}) => {
  const { t } = useTranslation();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const iconColor = isDark ? '#9CA3AF' : '#D1D5DB';

  return (
    <View className={`items-center justify-center py-16 px-6 ${className}`}>
      {/* Icon */}
      <View className="mb-6 h-24 w-24 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
        <Ionicons name="search-outline" size={48} color={iconColor} />
      </View>

      {/* Title */}
      <Text className={`text-xl font-bold ${COLORS.text.primary} mb-2 text-center`}>
        {t('search:noResults.title', { query })}
      </Text>

      {/* Suggestions */}
      <View className="mt-4 w-full max-w-sm">
        <Text className={`text-base font-semibold ${COLORS.text.primary} mb-3`}>
          {t('search:noResults.suggestions.title')}
        </Text>

        <View className="space-y-2">
          <View className="flex-row items-start mb-2">
            <Text className={`${COLORS.text.secondary} mr-2`}>•</Text>
            <Text className={`flex-1 ${COLORS.text.secondary}`}>
              {t('search:noResults.suggestions.tryAnother')}
            </Text>
          </View>

          <View className="flex-row items-start mb-2">
            <Text className={`${COLORS.text.secondary} mr-2`}>•</Text>
            <Text className={`flex-1 ${COLORS.text.secondary}`}>
              {t('search:noResults.suggestions.checkSpelling')}
            </Text>
          </View>

          <View className="flex-row items-start mb-2">
            <Text className={`${COLORS.text.secondary} mr-2`}>•</Text>
            <Text className={`flex-1 ${COLORS.text.secondary}`}>
              {t('search:noResults.suggestions.expandArea')}
            </Text>
          </View>
        </View>
      </View>

      {/* Reset Filters Button (si des filtres sont actifs) */}
      {hasFilters && onResetFilters && (
        <TouchableOpacity
          onPress={onResetFilters}
          className="mt-6 px-6 py-3 bg-primary rounded-xl"
          accessibilityLabel={t('search:noResults.resetFilters')}
          accessibilityRole="button"
        >
          <Text className="text-base font-semibold text-black">
            {t('search:noResults.resetFilters')}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
});

NoResultsState.displayName = 'NoResultsState';

export default NoResultsState;
