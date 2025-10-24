import { AddressCard } from '@/components/addresses/AddressCard';
import { AddressEmptyState } from '@/components/addresses/AddressEmptyState';
import { AddressForm } from '@/components/addresses/AddressForm';
import { useTranslation } from '@/hooks';
import { useAddresses } from '@/hooks/useAddresses';
import type { Address } from '@/lib/services/addressService';
import { MAX_ADDRESSES } from '@/lib/utils/addressHelpers';
import type { AddressFormData } from '@/lib/validations/addressSchema';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useColorScheme } from 'nativewind';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Modal,
  RefreshControl,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

/**
 * Screen de gestion des adresses
 * Permet de lister, créer, modifier et supprimer des adresses
 */
export default function AddressesScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const {
    addresses,
    loading,
    error,
    createAddress,
    updateAddress,
    deleteAddress,
    setAsDefault,
    fetchAddresses,
    canAddAddress: canAdd,
    addressCount,
    clearError,
  } = useAddresses();

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  /**
   * Ouvrir la modale en mode création
   */
  const handleOpenCreateModal = () => {
    if (!canAdd) {
      Alert.alert(
        t('addresses:maxReached'),
        t('addresses:maxReachedMessage')
      );
      return;
    }

    setModalMode('create');
    setSelectedAddress(null);
    setModalVisible(true);
  };

  /**
   * Ouvrir la modale en mode édition
   */
  const handleOpenEditModal = (address: Address) => {
    setModalMode('edit');
    setSelectedAddress(address);
    setModalVisible(true);
  };

  /**
   * Fermer la modale
   */
  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedAddress(null);
  };

  /**
   * Créer une nouvelle adresse
   */
  const handleCreateAddress = async (data: AddressFormData) => {
    try {
      await createAddress(data);
      handleCloseModal();
      Alert.alert(
        t('common:success'),
        t('addresses:messages.createSuccess')
      );
    } catch (err) {
      let errorMessage = t('addresses:messages.createError');

      if (err instanceof Error && err.message === 'MAX_ADDRESSES_REACHED') {
        errorMessage = t('addresses:messages.maxAddressesError');
      }

      Alert.alert(t('common:error'), errorMessage);
    }
  };

  /**
   * Mettre à jour une adresse existante
   */
  const handleUpdateAddress = async (data: AddressFormData) => {
    if (!selectedAddress) return;

    try {
      await updateAddress(selectedAddress.id, data);
      handleCloseModal();
      Alert.alert(
        t('common:success'),
        t('addresses:messages.updateSuccess')
      );
    } catch (err) {
      Alert.alert(
        t('common:error'),
        t('addresses:messages.updateError')
      );
    }
  };

  /**
   * Supprimer une adresse
   */
  const handleDeleteAddress = async (address: Address) => {
    try {
      await deleteAddress(address.id);
      Alert.alert(
        t('common:success'),
        t('addresses:messages.deleteSuccess')
      );
    } catch (err) {
      Alert.alert(
        t('common:error'),
        t('addresses:messages.deleteError')
      );
    }
  };

  /**
   * Définir une adresse comme par défaut
   */
  const handleSetAsDefault = async (address: Address) => {
    try {
      await setAsDefault(address.id);
      Alert.alert(
        t('common:success'),
        t('addresses:messages.setDefaultSuccess')
      );
    } catch (err) {
      Alert.alert(
        t('common:error'),
        t('addresses:messages.updateError')
      );
    }
  };

  /**
   * Rafraîchir la liste
   */
  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await fetchAddresses();
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark">
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />


      {/* Header avec bouton retour */}
      <View className="flex-row items-center justify-between px-4 py-2">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full bg-white dark:bg-surface-dark items-center justify-center"
        >
          <Ionicons
            name="arrow-back"
            size={24}
            color={isDark ? '#FFFFFF' : '#000000'}
          />
        </TouchableOpacity>

        <View className="flex-1 ml-4">
          <Text className="text-2xl font-bold text-black dark:text-white">
            {t('addresses:title')}
          </Text>
          <Text className="text-sm text-gray-500 dark:text-text-light">
            {t('addresses:subtitle')}
          </Text>
        </View>
      </View>

      {/* Badge de compteur */}
      <View className="px-4 py-2">
        <View className="flex-row items-center">
          <View className="bg-primary/20 px-3 py-1.5 rounded-full">
            <Text className="text-sm font-semibold text-primary">
              {t('addresses:limitBadge', { count: addressCount })}
            </Text>
          </View>
        </View>
      </View>

      {/* Liste des adresses */}
      {loading && addresses.length === 0 ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#FFC700" />
          <Text className="text-gray-500 dark:text-text-light mt-4">
            {t('common:loading')}
          </Text>
        </View>
      ) : addresses.length === 0 ? (
        <AddressEmptyState onAddAddress={handleOpenCreateModal} />
      ) : (
        <FlatList
          data={addresses}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <AddressCard
              address={item}
              onEdit={handleOpenEditModal}
              onDelete={handleDeleteAddress}
              onSetDefault={handleSetAsDefault}
            />
          )}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 100 }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              tintColor={isDark ? '#FFFFFF' : '#000000'}
            />
          }
        />
      )}

      {/* Bouton flottant "Ajouter" */}
      {addresses.length > 0 && addresses.length < MAX_ADDRESSES && (
        <TouchableOpacity
          onPress={handleOpenCreateModal}
          className="absolute bottom-6 right-6 w-16 h-16 rounded-full bg-primary items-center justify-center shadow-lg"
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            elevation: 8,
          }}
        >
          <Ionicons name="add" size={32} color="#000000" />
        </TouchableOpacity>
      )}

      {/* Modale pour créer/éditer une adresse */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={handleCloseModal}
      >
        <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark">
          <AddressForm
            initialData={selectedAddress || undefined}
            onSubmit={
              modalMode === 'create'
                ? handleCreateAddress
                : handleUpdateAddress
            }
            onCancel={handleCloseModal}
            mode={modalMode}
          />
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}
