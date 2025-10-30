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
import { useTranslation } from '@/hooks';
import { themeColors } from '@/lib/utils/themeColors';

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

  const iconColor = isDark ? themeColors.mutedDarkForeground : themeColors.mutedForeground;

  return (
    <View className={`items-center justify-center py-16 px-6 ${className}`}>
      {/* Icon */}
      <View className="mb-6 h-24 w-24 items-center justify-center rounded-full bg-muted dark:bg-muted-dark">
        <Ionicons name="search-outline" size={48} color={iconColor} />
      </View>

      {/* Title */}
      <Text className="text-xl font-bold text-foreground dark:text-foreground-dark mb-2 text-center">
        {t('search:noResults.title', { query })}
      </Text>

      {/* Suggestions */}
      <View className="mt-4 w-full max-w-sm">
        <Text className="text-base font-semibold text-foreground dark:text-foreground-dark mb-3">
          {t('search:noResults.suggestions.title')}
        </Text>

        <View className="space-y-2">
          <View className="flex-row items-start mb-2">
            <Text className="text-muted-foreground dark:text-muted-dark-foreground mr-2">•</Text>
            <Text className="flex-1 text-muted-foreground dark:text-muted-dark-foreground">
              {t('search:noResults.suggestions.tryAnother')}
            </Text>
          </View>

          <View className="flex-row items-start mb-2">
            <Text className="text-muted-foreground dark:text-muted-dark-foreground mr-2">•</Text>
            <Text className="flex-1 text-muted-foreground dark:text-muted-dark-foreground">
              {t('search:noResults.suggestions.checkSpelling')}
            </Text>
          </View>

          <View className="flex-row items-start mb-2">
            <Text className="text-muted-foreground dark:text-muted-dark-foreground mr-2">•</Text>
            <Text className="flex-1 text-muted-foreground dark:text-muted-dark-foreground">
              {t('search:noResults.suggestions.expandArea')}
            </Text>
          </View>
        </View>
      </View>

      {/* Reset Filters Button (si des filtres sont actifs) */}
      {hasFilters && onResetFilters && (
        <TouchableOpacity
          onPress={onResetFilters}
          className="mt-6 px-6 py-3 bg-primary dark:bg-primary-dark rounded-xl"
          accessibilityLabel={t('search:noResults.resetFilters')}
          accessibilityRole="button"
        >
          <Text className="text-base font-semibold text-primary-foreground">
            {t('search:noResults.resetFilters')}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
});

NoResultsState.displayName = 'NoResultsState';

export default NoResultsState;
