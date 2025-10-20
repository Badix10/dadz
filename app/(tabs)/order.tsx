import { PageHeader } from '@/components/PageHeader';
import { useTranslation } from '@/hooks';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StatusBar, Text, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

/**
 * Order Screen
 * Displays user's orders and order history
 */
export default function OrderScreen() {
  const { t } = useTranslation();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="light-content" />

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <PageHeader title={t('order:title')} subtitle={t('order:subtitle')} />

        <View className="px-4">
        {/* Placeholder content - to be implemented */}
        <View className="items-center justify-center py-20">
          <Ionicons name="receipt-outline" size={80} color="#D1D5DB" />
          <Text className="text-gray-400 text-lg mt-4">{t('order:empty.title')}</Text>
          <Text className="text-gray-400 text-sm mt-2 text-center">
            {t('order:empty.message')}
          </Text>
        </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
