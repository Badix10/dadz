/**
 * EmptySearchState - État vide quand aucune recherche n'a été lancée
 *
 * Affiché lorsque l'utilisateur arrive sur la page de recherche
 * mais n'a pas encore tapé de texte
 */

import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';
import React, { memo } from 'react';
import { Text, View } from 'react-native';
import { themeColors } from '@/lib/utils/themeColors';
import { useTranslation } from '@/hooks';

interface EmptySearchStateProps {
  className?: string;
}

/**
 * Composant d'état vide pour la recherche
 */
const EmptySearchState: React.FC<EmptySearchStateProps> = memo(({ className = '' }) => {
  const { t } = useTranslation();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const iconColor = isDark ? themeColors.mutedDarkForeground : themeColors.mutedForeground;

  return (
    <View className={`items-center justify-center py-16 px-6 ${className}`}>
      {/* Icon */}
      <View className="mb-6 h-24 w-24 items-center justify-center rounded-full bg-muted dark:bg-muted-dark">
        <Ionicons name="search" size={48} color={iconColor} />
      </View>

      {/* Title */}
      <Text className="text-xl font-bold text-foreground dark:text-foreground-dark mb-2 text-center">
        {t('search:empty.title')}
      </Text>

      {/* Subtitle */}
      <Text className="text-base text-muted-foreground dark:text-muted-dark-foreground text-center">
        {t('search:empty.subtitle')}
      </Text>
    </View>
  );
});

EmptySearchState.displayName = 'EmptySearchState';

export default EmptySearchState;
