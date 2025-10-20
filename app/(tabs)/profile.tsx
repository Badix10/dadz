import { PageHeader } from '@/components/PageHeader';
import { PrimaryButton } from '@/components/ui';
import { useAuth } from '@/hooks/useAuth';
import { useTranslation } from '@/hooks';
import { LanguageSelector } from '@/components/LanguageSelector';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { ActivityIndicator, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

/**
 * Profile Screen
 * Displays user profile and settings
 */
export default function ProfileScreen() {
  const { isLoading, user, logout } = useAuth(false);
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-white items-center justify-center">
        <StatusBar barStyle="light-content" />
        <ActivityIndicator size="large" color="#FFC700" />
      </SafeAreaView>
    );
  }

  if (!user) {
    return (
      <SafeAreaView className="flex-1 bg-white items-center justify-center px-4">
        <StatusBar barStyle="light-content" />
        <Ionicons name="person-circle-outline" size={120} color="#9CA3AF" />
        <Text className="text-2xl font-bold text-black mt-6 mb-2">
          {t('profile:notLoggedIn.title')}
        </Text>
        <Text className="text-gray-500 text-center mb-6">
          {t('profile:notLoggedIn.message')}
        </Text>
        <PrimaryButton
          title={t('profile:notLoggedIn.loginButton')}
          onPress={() => router.push('/sign')}
        />
      </SafeAreaView>
    );
  }

  const menuItems = [
    { icon: 'person-outline', title: t('profile:menu.editProfile.title'), subtitle: t('profile:menu.editProfile.subtitle') },
    { icon: 'location-outline', title: t('profile:menu.addresses.title'), subtitle: t('profile:menu.addresses.subtitle') },
    { icon: 'card-outline', title: t('profile:menu.paymentMethods.title'), subtitle: t('profile:menu.paymentMethods.subtitle') },
    { icon: 'notifications-outline', title: t('profile:menu.notifications.title'), subtitle: t('profile:menu.notifications.subtitle') },
    { icon: 'settings-outline', title: t('profile:menu.settings.title'), subtitle: t('profile:menu.settings.subtitle') },
    { icon: 'help-circle-outline', title: t('profile:menu.help.title'), subtitle: t('profile:menu.help.subtitle') },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="light-content" />

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        <PageHeader title={t('profile:title')} subtitle={t('profile:subtitle')} />

        {/* User Info Card */}
        <View className="mx-4 mb-6 bg-gray-50 rounded-2xl p-4 flex-row items-center">
          <View className="w-16 h-16 rounded-full bg-primary items-center justify-center">
            <Ionicons name="person" size={32} color="black" />
          </View>
          <View className="ml-4 flex-1">
            <Text className="text-xl font-bold text-black">
              {user?.user_metadata?.first_name && user?.user_metadata?.last_name
                ? `${user.user_metadata.first_name} ${user.user_metadata.last_name}`
                : t('profile:user')}
            </Text>
            <Text className="text-gray-500">{user?.email || ''}</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#9CA3AF" />
        </View>

        {/* Language Selector */}
        <View className="px-4 mb-6">
          <View className="mb-3">
            <Text className="text-lg font-bold text-black">{t('profile:language.title')}</Text>
            <Text className="text-sm text-gray-500">{t('profile:language.subtitle')}</Text>
          </View>
          <LanguageSelector />
        </View>

        {/* Menu Items */}
        <View className="px-4">
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              className="flex-row items-center py-4 border-b border-gray-100"
            >
              <View className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center">
                <Ionicons name={item.icon as any} size={20} color="#000" />
              </View>
              <View className="ml-3 flex-1">
                <Text className="text-base font-semibold text-black">{item.title}</Text>
                <Text className="text-sm text-gray-500">{item.subtitle}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout Button */}
        <View className="px-4 py-6">
          <TouchableOpacity
            onPress={logout}
            className="bg-red-50 rounded-xl py-4 flex-row items-center justify-center"
          >
            <Ionicons name="log-out-outline" size={24} color="#EF4444" />
            <Text className="text-red-500 font-semibold ml-2">{t('profile:logout')}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
