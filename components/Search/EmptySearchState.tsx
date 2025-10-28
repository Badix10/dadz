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
import { COLORS } from '@/constants/classNames';
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

  const iconColor = isDark ? '#9CA3AF' : '#D1D5DB';

  return (
    <View className={`items-center justify-center py-16 px-6 ${className}`}>
      {/* Icon */}
      <View className="mb-6 h-24 w-24 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
        <Ionicons name="search" size={48} color={iconColor} />
      </View>

      {/* Title */}
      <Text className={`text-xl font-bold ${COLORS.text.primary} mb-2 text-center`}>
        {t('search:empty.title')}
      </Text>

      {/* Subtitle */}
      <Text className={`text-base ${COLORS.text.secondary} text-center`}>
        {t('search:empty.subtitle')}
      </Text>
    </View>
  );
});

EmptySearchState.displayName = 'EmptySearchState';

export default EmptySearchState;
