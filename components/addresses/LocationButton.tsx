import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from '@/hooks';

interface LocationButtonProps {
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
}

/**
 * Bouton pour utiliser la géolocalisation
 * Affiche une icône GPS et un loading state
 */
export const LocationButton: React.FC<LocationButtonProps> = ({
  onPress,
  loading = false,
  disabled = false,
}) => {
  const { t } = useTranslation();

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      className={`flex-row items-center justify-center bg-blue-50 dark:bg-blue-900/20 rounded-xl py-4 px-4 mb-4 ${
        disabled || loading ? 'opacity-50' : ''
      }`}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator size="small" color="#3B82F6" />
      ) : (
        <Ionicons
          name="location"
          size={20}
          color="#3B82F6"
        />
      )}

      <Text className="text-base font-medium text-blue-600 dark:text-blue-400 ml-2">
        {loading
          ? t('common:loading')
          : t('addresses:form.useLocation')}
      </Text>
    </TouchableOpacity>
  );
};
