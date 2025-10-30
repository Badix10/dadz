import type { Address } from '@/lib/services/addressService';
import { useTranslation } from '@/hooks';
import { useLocation } from '@/hooks/useLocation';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useColorScheme } from 'nativewind';
import React, { memo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { themeColors } from '@/lib/utils/themeColors';

interface AddressBottomSheetProps {
  visible: boolean;
  addresses: Address[];
  selectedAddress: Address | null;
  onClose: () => void;
  onSelectAddress: (address: Address) => void;
  onSetTemporaryAddress: (address: Address) => void;
}

/**
 * AddressBottomSheet - Bottom sheet pour sélectionner une adresse
 * Principe: Clean Code - Composant focalisé sur une seule responsabilité
 */
const AddressBottomSheet: React.FC<AddressBottomSheetProps> = memo(({
  visible,
  addresses,
  selectedAddress,
  onClose,
  onSelectAddress,
  onSetTemporaryAddress,
}) => {
  const { t, isRTL } = useTranslation();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const router = useRouter();
  const { getCurrentAddress: getGPSAddress, loading: gpsLoading } = useLocation();
  const [isLoadingGPS, setIsLoadingGPS] = useState(false);

  const handleManageAddresses = () => {
    onClose();
    router.push('/addresses');
  };

  const handleSelectAddress = (address: Address) => {
    onSelectAddress(address);
    onClose();
  };

  /**
   * Utiliser la géolocalisation GPS pour obtenir l'adresse actuelle
   * Crée une adresse temporaire (non sauvegardée)
   *
   * TODO: Cette fonctionnalité ne fonctionne pas actuellement
   * Problèmes identifiés :
   * - Les permissions GPS ne sont pas correctement gérées sur certains devices
   * - Le reverse geocoding peut échouer selon la position
   * - Nécessite un rebuild natif complet après config dans app.json
   *
   * Actions requises pour fix :
   * 1. Vérifier que expo-location est bien installé : npm list expo-location
   * 2. Rebuild natif : npx expo prebuild --clean && npx expo run:android
   * 3. Tester avec un device physique (pas émulateur)
   * 4. Vérifier les permissions dans les paramètres Android/iOS
   * 5. Implémenter un fallback manuel si GPS échoue
   *
   * Pour l'instant, désactivé ou affiche un message à l'utilisateur
   */
  const handleUseCurrentLocation = async () => {
    setIsLoadingGPS(true);

    try {
      const parsedAddress = await getGPSAddress();

      if (parsedAddress) {
        // Créer une adresse temporaire à partir des données GPS
        const temporaryAddress: Address = {
          id: `temp-${Date.now()}`, // ID temporaire
          profile_id: '', // Pas de profile_id (non sauvegardée)
          street: parsedAddress.street,
          city: parsedAddress.city,
          postal_code: parsedAddress.postal_code,
          country: parsedAddress.country,
          address_type: 'other', // Type par défaut
          is_default: false,
          latitude: parsedAddress.latitude,
          longitude: parsedAddress.longitude,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };

        // Définir comme adresse temporaire
        onSetTemporaryAddress(temporaryAddress);
        onClose();
      } else {
        Alert.alert(
          t('common:error'),
          t('addresses:errors.locationNotFound')
        );
      }
    } catch (error) {
      console.error('Error getting current location:', error);

      // Message d'erreur personnalisé selon le type d'erreur
      let errorMessage = t('addresses:errors.locationError');

      if (error instanceof Error) {
        if (error.message.includes('permission') || error.message.includes('denied')) {
          errorMessage = t('addresses:messages.locationPermissionDenied') + '\n\n' +
                        t('addresses:errors.enableLocationHint');
        } else if (error.message.includes('unavailable') || error.message.includes('disabled')) {
          errorMessage = t('addresses:errors.gpsDisabled');
        }
      }

      Alert.alert(
        t('common:error'),
        errorMessage
      );
    } finally {
      setIsLoadingGPS(false);
    }
  };

  // Icône selon le type d'adresse
  const getAddressIcon = (type: string): string => {
    switch (type.toLowerCase()) {
      case 'home':
      case 'maison':
        return 'home';
      case 'work':
      case 'travail':
        return 'briefcase';
      default:
        return 'location';
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View className="flex-1 justify-end bg-black/50">
        <TouchableOpacity
          className="flex-1"
          activeOpacity={1}
          onPress={onClose}
        />

        <View className="bg-card dark:bg-card-dark rounded-t-3xl max-h-[70%]">
          {/* Header */}
          <View className="flex-row items-center justify-between px-6 py-4 border-b border-border dark:border-border-dark">
            <Text className="text-xl font-bold text-foreground dark:text-foreground-dark">
              {t('home:addressSheet.title')}
            </Text>
            <TouchableOpacity
              onPress={onClose}
              className="w-8 h-8 items-center justify-center"
              accessibilityLabel={t('common:close')}
            >
              <Ionicons
                name="close"
                size={24}
                color={isDark ? themeColors.foregroundDark : themeColors.foreground}
              />
            </TouchableOpacity>
          </View>

          {/* Bouton "Utiliser ma position actuelle" */}
          <TouchableOpacity
            onPress={handleUseCurrentLocation}
            disabled={isLoadingGPS}
            className="flex-row items-center px-6 py-4 border-b border-border dark:border-border-dark"
          >
            <View className="w-10 h-10 rounded-full bg-info/20 dark:bg-info/30 items-center justify-center mr-3">
              {isLoadingGPS ? (
                <ActivityIndicator size="small" color={themeColors.info} />
              ) : (
                <Ionicons name="navigate" size={20} color={themeColors.info} />
              )}
            </View>
            <View className="flex-1">
              <Text className="text-base font-semibold text-foreground dark:text-foreground-dark">
                {t('home:addressSheet.useCurrentLocation')}
              </Text>
              <Text className="text-xs text-muted-foreground dark:text-muted-dark-foreground">
                {t('home:addressSheet.gpsHint')}
              </Text>
            </View>
          </TouchableOpacity>

          {/* Liste des adresses */}
          {addresses.length === 0 ? (
            <View className="items-center justify-center py-12 px-6">
              <Ionicons
                name="location-outline"
                size={64}
                color={isDark ? themeColors.mutedDarkForeground : themeColors.muted}
              />
              <Text className="text-center text-muted-foreground dark:text-muted-dark-foreground mt-4 mb-6">
                {t('home:addressSheet.noAddresses')}
              </Text>
              <TouchableOpacity
                onPress={handleManageAddresses}
                className="bg-primary px-6 py-3 rounded-full"
              >
                <Text className="text-primary-foreground font-semibold">
                  {t('home:addressSheet.addFirstAddress')}
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <FlatList
                data={addresses}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                  const isSelected = selectedAddress?.id === item.id;
                  return (
                    <TouchableOpacity
                      onPress={() => handleSelectAddress(item)}
                      className={`flex-row items-center px-6 py-4 ${
                        isSelected ? 'bg-primary/10' : ''
                      }`}
                    >
                      <View
                        className={`w-10 h-10 rounded-full items-center justify-center mr-3 ${
                          isSelected ? 'bg-primary' : 'bg-muted dark:bg-muted-dark'
                        }`}
                      >
                        <Ionicons
                          name={getAddressIcon(item.address_type) as any}
                          size={20}
                          color={isSelected ? themeColors.primaryForeground : (isDark ? themeColors.foregroundDark : themeColors.mutedForeground)}
                        />
                      </View>
                      <View className="flex-1">
                        <View className="flex-row items-center gap-2">
                          <Text
                            className={`text-base font-semibold ${
                              isSelected
                                ? 'text-primary'
                                : 'text-foreground dark:text-foreground-dark'
                            }`}
                          >
                            {item.address_type}
                          </Text>
                          {item.is_default && (
                            <View className="bg-primary/20 px-2 py-0.5 rounded-full">
                              <Text className="text-xs font-medium text-primary">
                                {t('addresses:default')}
                              </Text>
                            </View>
                          )}
                          {item.id.startsWith('temp-') && (
                            <View className="bg-info/20 dark:bg-info/30 px-2 py-0.5 rounded-full">
                              <Text className="text-xs font-medium text-info dark:text-info">
                                {t('home:addressSheet.temporary')}
                              </Text>
                            </View>
                          )}
                        </View>
                        <Text
                          className="text-sm text-muted-foreground dark:text-muted-dark-foreground"
                          numberOfLines={1}
                        >
                          {item.street}, {item.city}
                        </Text>
                      </View>
                      {isSelected && (
                        <Ionicons name="checkmark-circle" size={24} color={themeColors.primary} />
                      )}
                    </TouchableOpacity>
                  );
                }}
                className="max-h-80"
              />

              {/* Footer - Gérer les adresses */}
              <View className="px-6 py-4 border-t border-border dark:border-border-dark">
                <TouchableOpacity
                  onPress={handleManageAddresses}
                  className="flex-row items-center justify-center py-3"
                >
                  <Ionicons
                    name="settings-outline"
                    size={20}
                    color={isDark ? themeColors.foregroundDark : themeColors.foreground}
                  />
                  <Text className="text-base font-semibold text-foreground dark:text-foreground-dark ml-2">
                    {t('home:addressSheet.manageAddresses')}
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
});

AddressBottomSheet.displayName = 'AddressBottomSheet';

export default AddressBottomSheet;
