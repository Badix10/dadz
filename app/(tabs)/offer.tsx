import { PageHeader } from '@/components/PageHeader';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StatusBar, Text, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

/**
 * Offer Screen
 * Displays available promotions and special offers
 */
export default function OfferScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="light-content" />

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <PageHeader title="Special Offers" subtitle="Save more with exclusive deals" />

        <View className="px-4">
        {/* Placeholder content - to be implemented */}
        <View className="items-center justify-center py-20">
          <Ionicons name="pricetag-outline" size={80} color="#D1D5DB" />
          <Text className="text-gray-400 text-lg mt-4">No offers available</Text>
          <Text className="text-gray-400 text-sm mt-2 text-center">
            Check back later for exclusive deals
          </Text>
        </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
