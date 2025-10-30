import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PrimaryButton } from '@/components/ui';
import { useTranslation } from '@/hooks';
import { useColorScheme } from 'nativewind';
import { themeColors } from '@/lib/utils/themeColors';

interface AddressEmptyStateProps {
  onAddAddress: () => void;
}

/**
 * Composant d'état vide pour la liste des adresses
 * Affiché quand l'utilisateur n'a aucune adresse enregistrée
 */
export const AddressEmptyState: React.FC<AddressEmptyStateProps> = ({
  onAddAddress,
}) => {
  const { t } = useTranslation();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const iconColor = isDark ? themeColors.mutedDarkForeground : themeColors.mutedForeground;

  return (
    <View className="flex-1 items-center justify-center px-8 py-12">
      {/* Icône */}
      <View className="w-24 h-24 rounded-full bg-muted dark:bg-muted-dark items-center justify-center mb-6">
        <Ionicons
          name="location-outline"
          size={48}
          color={iconColor}
        />
      </View>

      {/* Titre */}
      <Text className="text-2xl font-bold text-foreground dark:text-foreground-dark mb-3 text-center">
        {t('addresses:emptyState.title')}
      </Text>

      {/* Message */}
      <Text className="text-base text-muted-foreground dark:text-muted-dark-foreground text-center mb-8">
        {t('addresses:emptyState.message')}
      </Text>

      {/* Bouton d'action */}
      <PrimaryButton
        title={t('addresses:emptyState.action')}
        onPress={onAddAddress}
        icon="add"
        variant="primary"
        size="medium"
      />
    </View>
  );
};
