import { PageHeader } from '@/components/PageHeader';
import { useTranslation } from '@/hooks';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StatusBar, Text, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from 'nativewind';
import { themeColors } from '@/lib/utils/themeColors';

/**
 * Offer Screen
 * Displays available promotions and special offers
 */
export default function OfferScreen() {
  const { t } = useTranslation();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <SafeAreaView className="flex-1 bg-background dark:bg-background-dark">
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <PageHeader title={t('offer:title')} subtitle={t('offer:subtitle')} />

        <View className="px-4">
        {/* Placeholder content - to be implemented */}
        <View className="items-center justify-center py-20">
          <Ionicons name="pricetag-outline" size={80} color={isDark ? themeColors.mutedDarkForeground : themeColors.mutedForeground} />
          <Text className="text-muted-foreground dark:text-muted-dark-foreground text-lg mt-4">{t('offer:empty.title')}</Text>
          <Text className="text-muted-foreground dark:text-muted-dark-foreground text-sm mt-2 text-center">
            {t('offer:empty.message')}
          </Text>
        </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
