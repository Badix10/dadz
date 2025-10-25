import React, { useState } from 'react';
import { View, Text, ScrollView, Switch, Alert } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from '@/hooks';
import { useLocation } from '@/hooks/useLocation';
import { CustomInput, PrimaryButton } from '@/components/ui';
import { LocationButton } from './LocationButton';
import { addressSchema, type AddressFormData } from '@/lib/validations/addressSchema';
import type { Address } from '@/lib/services/addressService';
import { geocodingService } from '@/lib/services/geocodingService';
import { Picker } from '@react-native-picker/picker';

interface AddressFormProps {
  initialData?: Address;
  onSubmit: (data: AddressFormData) => Promise<void>;
  onCancel: () => void;
  mode?: 'create' | 'edit';
}

/**
 * Formulaire de création/édition d'adresse
 * Supporte la saisie manuelle et la géolocalisation
 */
export const AddressForm: React.FC<AddressFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  mode = 'create',
}) => {
  const { t } = useTranslation();
  const { getCurrentAddress, loading: locationLoading, error: locationError } = useLocation();
  const [submitting, setSubmitting] = useState(false);

  // Form avec validation Zod
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    setValue,
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    mode: 'onChange',
    defaultValues: initialData
      ? {
          street: initialData.street,
          city: initialData.city,
          postal_code: initialData.postal_code,
          country: initialData.country,
          address_type: initialData.address_type as 'home' | 'work' | 'other',
          is_default: initialData.is_default || false,
        }
      : {
          street: '',
          city: '',
          postal_code: '',
          country: 'France',
          address_type: 'home',
          is_default: false,
        },
  });

  /**
   * Utiliser la géolocalisation pour pré-remplir le formulaire
   */
  const handleUseLocation = async () => {
    try {
      const address = await getCurrentAddress();

      if (address) {
        // Pré-remplir les champs avec les données de géolocalisation
        setValue('street', address.street, { shouldValidate: true, shouldDirty: true });
        setValue('city', address.city, { shouldValidate: true, shouldDirty: true });
        setValue('postal_code', address.postal_code, { shouldValidate: true, shouldDirty: true });
        setValue('country', address.country, { shouldValidate: true, shouldDirty: true });
      }
    } catch (error) {
      // Gérer les erreurs de géolocalisation
      let errorMessage = t('addresses:messages.locationError');

      if (locationError === 'PERMISSION_DENIED') {
        errorMessage = t('addresses:messages.locationPermissionDenied');
      }

      Alert.alert(t('common:error'), errorMessage);
    }
  };

  /**
   * Soumission du formulaire
   * Géocode automatiquement l'adresse avant de la sauvegarder
   */
  const onFormSubmit = async (data: AddressFormData) => {
    setSubmitting(true);
    try {
      // Géocoder l'adresse pour obtenir les coordonnées GPS
      const coordinates = await geocodingService.geocodeAddress(
        data.street,
        data.city,
        data.postal_code,
        data.country
      );

      // Préparer les données avec coordonnées
      const addressDataWithCoords = {
        ...data,
        latitude: coordinates?.latitude ?? null,
        longitude: coordinates?.longitude ?? null,
      };

      // Si le géocodage échoue, afficher un avertissement mais continuer
      if (!coordinates) {
        console.warn('Geocoding failed for address:', data);
        Alert.alert(
          t('addresses:messages.geocodingWarning'),
          t('addresses:messages.geocodingWarningMessage'),
          [
            {
              text: t('common:cancel'),
              style: 'cancel',
              onPress: () => setSubmitting(false),
            },
            {
              text: t('common:continue'),
              onPress: async () => {
                try {
                  await onSubmit(addressDataWithCoords as any);
                } catch (error) {
                  console.error('Form submission error:', error);
                } finally {
                  setSubmitting(false);
                }
              },
            },
          ]
        );
        return;
      }

      // Soumettre les données avec coordonnées
      await onSubmit(addressDataWithCoords as any);
    } catch (error) {
      // L'erreur est gérée par le composant parent
      console.error('Form submission error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ScrollView
      className="flex-1"
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <View className="px-4 py-4">
        {/* Titre */}
        <Text className="text-2xl font-bold text-black dark:text-white mb-6">
          {mode === 'create'
            ? t('addresses:form.title.create')
            : t('addresses:form.title.edit')}
        </Text>

        {/* Bouton Géolocalisation (mode création uniquement) */}
        {mode === 'create' && (
          <LocationButton
            onPress={handleUseLocation}
            loading={locationLoading}
          />
        )}

        {/* Champ Rue */}
        <Controller
          control={control}
          name="street"
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomInput
              label={t('addresses:form.fields.street.label')}
              placeholder={t('addresses:form.fields.street.placeholder')}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.street ? t(errors.street.message as string) : undefined}
              autoCapitalize="words"
            />
          )}
        />

        {/* Champ Ville */}
        <Controller
          control={control}
          name="city"
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomInput
              label={t('addresses:form.fields.city.label')}
              placeholder={t('addresses:form.fields.city.placeholder')}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.city ? t(errors.city.message as string) : undefined}
              autoCapitalize="words"
            />
          )}
        />

        {/* Champ Code postal */}
        <Controller
          control={control}
          name="postal_code"
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomInput
              label={t('addresses:form.fields.postalCode.label')}
              placeholder={t('addresses:form.fields.postalCode.placeholder')}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.postal_code ? t(errors.postal_code.message as string) : undefined}
              keyboardType="number-pad"
            />
          )}
        />

        {/* Champ Pays */}
        <Controller
          control={control}
          name="country"
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomInput
              label={t('addresses:form.fields.country.label')}
              placeholder={t('addresses:form.fields.country.placeholder')}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.country ? t(errors.country.message as string) : undefined}
              autoCapitalize="words"
            />
          )}
        />

        {/* Champ Type d'adresse */}
        <View className="mb-4">
          <Text className="text-sm font-medium text-black dark:text-white mb-2">
            {t('addresses:form.fields.addressType.label')}
          </Text>
          <Controller
            control={control}
            name="address_type"
            render={({ field: { onChange, value } }) => (
              <View className="bg-background-light dark:bg-background-dark rounded-xl border border-gray-200 dark:border-gray-700">
                <Picker
                  selectedValue={value}
                  onValueChange={onChange}
                  style={{ color: '#000' }}
                >
                  <Picker.Item
                    label={t('addresses:addressTypes.home')}
                    value="home"
                  />
                  <Picker.Item
                    label={t('addresses:addressTypes.work')}
                    value="work"
                  />
                  <Picker.Item
                    label={t('addresses:addressTypes.other')}
                    value="other"
                  />
                </Picker>
              </View>
            )}
          />
          {errors.address_type && (
            <Text className="text-red-500 text-sm mt-1">
              {t(errors.address_type.message as string)}
            </Text>
          )}
        </View>

        {/* Toggle Adresse par défaut */}
        <View className="mb-6">
          <View className="flex-row items-center justify-between bg-background-light dark:bg-background-dark rounded-xl p-4">
            <View className="flex-1 mr-4">
              <Text className="text-base font-medium text-black dark:text-white mb-1">
                {t('addresses:form.fields.isDefault.label')}
              </Text>
              <Text className="text-sm text-gray-500 dark:text-text-light">
                {t('addresses:form.fields.isDefault.helper')}
              </Text>
            </View>
            <Controller
              control={control}
              name="is_default"
              render={({ field: { onChange, value } }) => (
                <Switch
                  value={value}
                  onValueChange={onChange}
                  trackColor={{ false: '#D1D5DB', true: '#FFC700' }}
                  thumbColor={value ? '#000000' : '#F3F4F6'}
                />
              )}
            />
          </View>
        </View>

        {/* Boutons d'action */}
        <View className="flex-row gap-3 mb-4">
          <View className="flex-1">
            <PrimaryButton
              title={t('addresses:form.actions.cancel')}
              onPress={onCancel}
              variant="secondary"
              disabled={submitting}
            />
          </View>
          <View className="flex-1">
            <PrimaryButton
              title={submitting
                ? t('addresses:form.actions.saving')
                : t('addresses:form.actions.save')}
              onPress={handleSubmit(onFormSubmit)}
              variant="primary"
              loading={submitting}
              disabled={!isDirty || !isValid || submitting}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
