import React from 'react';
import { SafeAreaView, ScrollView, StatusBar, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

/**
 * Offer Screen
 * Displays available promotions and special offers
 */
export default function OfferScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />

      <View className="px-4 pt-4 pb-6">
        <Text className="text-3xl font-bold text-black mb-2">Special Offers</Text>
        <Text className="text-gray-500">Save more with exclusive deals</Text>
      </View>

      <ScrollView className="flex-1 px-4">
        {/* Placeholder content - to be implemented */}
        <View className="items-center justify-center py-20">
          <Ionicons name="pricetag-outline" size={80} color="#D1D5DB" />
          <Text className="text-gray-400 text-lg mt-4">No offers available</Text>
          <Text className="text-gray-400 text-sm mt-2 text-center">
            Check back later for exclusive deals
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
