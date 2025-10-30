import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from '@/hooks';
import type { Address } from '@/lib/services/addressService';
import {
  formatAddressMultiLine,
  getAddressTypeBadgeColor,
  getAddressTypeIcon,
} from '@/lib/utils/addressHelpers';
import { themeColors } from '@/lib/utils/themeColors';

interface AddressCardProps {
  address: Address;
  onEdit: (address: Address) => void;
  onDelete: (address: Address) => void;
  onSetDefault: (address: Address) => void;
}

/**
 * Composant carte d'adresse
 * Affiche une adresse avec ses actions (modifier, supprimer, définir par défaut)
 */
export const AddressCard: React.FC<AddressCardProps> = ({
  address,
  onEdit,
  onDelete,
  onSetDefault,
}) => {
  const { t } = useTranslation();

  const addressLines = formatAddressMultiLine(address);
  const badgeColor = getAddressTypeBadgeColor(address.address_type as any);
  const typeIcon = getAddressTypeIcon(address.address_type as any);

  /**
   * Gérer la suppression avec confirmation
   */
  const handleDelete = () => {
    Alert.alert(
      t('addresses:deleteConfirm.title'),
      t('addresses:deleteConfirm.message'),
      [
        {
          text: t('addresses:deleteConfirm.cancel'),
          style: 'cancel',
        },
        {
          text: t('addresses:deleteConfirm.confirm'),
          style: 'destructive',
          onPress: () => onDelete(address),
        },
      ]
    );
  };

  return (
    <View className="bg-card dark:bg-card-dark rounded-2xl p-4 mb-3 shadow-soft">
      {/* Header: Type + Badge par défaut */}
      <View className="flex-row items-center justify-between mb-3">
        {/* Type d'adresse */}
        <View className={`flex-row items-center px-3 py-1.5 rounded-full ${badgeColor}`}>
          <Ionicons name={typeIcon as any} size={16} className="mr-1.5" />
          <Text className="text-sm font-medium">
            {t(`addresses:addressTypes.${address.address_type}`)}
          </Text>
        </View>

        {/* Badge "Par défaut" */}
        {address.is_default && (
          <View className="flex-row items-center bg-primary/20 px-3 py-1.5 rounded-full">
            <Ionicons name="star" size={14} color={themeColors.primary} />
            <Text className="text-xs font-semibold text-primary ml-1">
              {t('addresses:labels.default')}
            </Text>
          </View>
        )}
      </View>

      {/* Adresse */}
      <View className="mb-4">
        {addressLines.map((line, index) => (
          <Text
            key={index}
            className="text-base text-foreground dark:text-foreground-dark mb-1"
          >
            {line}
          </Text>
        ))}
      </View>

      {/* Actions */}
      <View className="flex-row items-center justify-between border-t border-border dark:border-border-dark pt-3">
        {/* Bouton Modifier */}
        <TouchableOpacity
          onPress={() => onEdit(address)}
          className="flex-row items-center py-2 px-3"
        >
          <Ionicons
            name="pencil-outline"
            size={18}
            color={themeColors.mutedForeground}
          />
          <Text className="text-sm text-muted-foreground dark:text-muted-dark-foreground ml-2">
            {t('addresses:actions.edit')}
          </Text>
        </TouchableOpacity>

        {/* Bouton Supprimer */}
        <TouchableOpacity
          onPress={handleDelete}
          className="flex-row items-center py-2 px-3"
        >
          <Ionicons
            name="trash-outline"
            size={18}
            color={themeColors.destructive}
          />
          <Text className="text-sm text-destructive ml-2">
            {t('addresses:actions.delete')}
          </Text>
        </TouchableOpacity>

        {/* Bouton Définir par défaut (si pas déjà par défaut) */}
        {!address.is_default && (
          <TouchableOpacity
            onPress={() => onSetDefault(address)}
            className="flex-row items-center py-2 px-3"
          >
            <Ionicons
              name="star-outline"
              size={18}
              color={themeColors.primary}
            />
            <Text className="text-sm text-primary ml-2">
              {t('addresses:actions.setAsDefault')}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
