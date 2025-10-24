import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PrimaryButton } from '@/components/ui';
import { useTranslation } from '@/hooks';

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

  return (
    <View className="flex-1 items-center justify-center px-8 py-12">
      {/* Icône */}
      <View className="w-24 h-24 rounded-full bg-gray-100 dark:bg-gray-800 items-center justify-center mb-6">
        <Ionicons
          name="location-outline"
          size={48}
          color="#9CA3AF"
        />
      </View>

      {/* Titre */}
      <Text className="text-2xl font-bold text-black dark:text-white mb-3 text-center">
        {t('addresses:emptyState.title')}
      </Text>

      {/* Message */}
      <Text className="text-base text-gray-500 dark:text-text-light text-center mb-8">
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
