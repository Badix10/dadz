import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from '@/hooks';
import { themeColors } from '@/lib/utils/themeColors';

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
      className={`flex-row items-center justify-center bg-info/20 dark:bg-info/30 rounded-xl py-4 px-4 mb-4 ${
        disabled || loading ? 'opacity-50' : ''
      }`}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator size="small" color={themeColors.info} />
      ) : (
        <Ionicons
          name="location"
          size={20}
          color={themeColors.info}
        />
      )}

      <Text className="text-base font-medium text-info dark:text-info ml-2">
        {loading
          ? t('common:loading')
          : t('addresses:form.useLocation')}
      </Text>
    </TouchableOpacity>
  );
};
