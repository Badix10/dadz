import { PageHeader } from '@/components/PageHeader';
import { SettingsItem } from '@/components/SettingsItem';
import { DarkModeToggle } from '@/components/DarkModeToggle';
import { PrimaryButton } from '@/components/ui';
import { useAuth } from '@/hooks/useAuth';
import { useTranslation } from '@/hooks';
import { LanguageSelector } from '@/components/LanguageSelector';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { ActivityIndicator, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from 'nativewind';

/**
 * Profile Screen
 * Displays user profile and settings with dark mode support
 * Utilise useColorScheme natif de NativeWind
 * Principes: DRY, KISS, Clean Code
 */
export default function ProfileScreen() {
  const { isLoading, user, logout } = useAuth(false);
  const { t } = useTranslation();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-white dark:bg-background-dark items-center justify-center">
        <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
        <ActivityIndicator size="large" color="#FFC700" />
      </SafeAreaView>
    );
  }

  if (!user) {
    return (
      <SafeAreaView className="flex-1 bg-white dark:bg-background-dark items-center justify-center px-4">
        <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
        <Ionicons name="person-circle-outline" size={120} color="#9CA3AF" />
        <Text className="text-2xl font-bold text-black dark:text-white mt-6 mb-2">
          {t('profile:notLoggedIn.title')}
        </Text>
        <Text className="text-gray-500 dark:text-text-light text-center mb-6">
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
    <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark">
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        <PageHeader title={t('profile:title')} subtitle={t('profile:subtitle')} />

        {/* User Info Card */}
        <View className="mx-4 mb-6 bg-white dark:bg-surface-dark rounded-2xl p-4 flex-row items-center shadow-soft">
          <View className="w-16 h-16 rounded-full bg-primary items-center justify-center">
            <Ionicons name="person" size={32} color="black" />
          </View>
          <View className="ml-4 flex-1">
            <Text className="text-xl font-bold text-black dark:text-white">
              {user?.user_metadata?.first_name && user?.user_metadata?.last_name
                ? `${user.user_metadata.first_name} ${user.user_metadata.last_name}`
                : t('profile:user')}
            </Text>
            <Text className="text-gray-500 dark:text-text-light">{user?.email || ''}</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#9CA3AF" />
        </View>

        {/* Settings Section */}
        <View className="mx-4 mb-6 bg-white dark:bg-surface-dark rounded-2xl overflow-hidden shadow-soft">
          {/* Dark Mode Toggle */}
          <SettingsItem
            icon="moon-outline"
            title={t('profile:darkMode.title')}
            subtitle={t('profile:darkMode.subtitle')}
            rightElement={<DarkModeToggle />}
            showChevron={false}
          />

          {/* Divider */}
          <View className="h-px bg-gray-100 dark:bg-gray-800 mx-4" />

          {/* Language Selector */}
          <View className="px-4 py-3">
            <View className="flex-row items-center gap-4 mb-3">
              <View className="bg-background-light dark:bg-background-dark rounded-lg items-center justify-center w-10 h-10">
                <Ionicons name="language-outline" size={20} color={isDark ? '#FFFFFF' : '#1A1A1A'} />
              </View>
              <View className="flex-1">
                <Text className="text-base font-normal text-black dark:text-white">
                  {t('profile:language.title')}
                </Text>
                <Text className="text-sm text-gray-500 dark:text-text-light">
                  {t('profile:language.subtitle')}
                </Text>
              </View>
            </View>
            <LanguageSelector />
          </View>
        </View>

        {/* Menu Items */}
        <View className="mx-4 mb-6 bg-white dark:bg-surface-dark rounded-2xl overflow-hidden shadow-soft">
          {menuItems.map((item, index) => (
            <React.Fragment key={index}>
              <SettingsItem
                icon={item.icon as any}
                title={item.title}
                subtitle={item.subtitle}
                onPress={() => {
                  // TODO: Implement navigation
                  console.log(`Navigate to ${item.title}`);
                }}
              />
              {index < menuItems.length - 1 && (
                <View className="h-px bg-gray-100 dark:bg-gray-800 mx-4" />
              )}
            </React.Fragment>
          ))}
        </View>

        {/* Logout Button */}
        <View className="px-4 py-6">
          <TouchableOpacity
            onPress={logout}
            className="bg-red-50 dark:bg-red-900/20 rounded-full py-4 flex-row items-center justify-center shadow-soft"
          >
            <Ionicons name="log-out-outline" size={24} color="#EF4444" />
            <Text className="text-red-500 font-bold ml-2">{t('profile:logout')}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
