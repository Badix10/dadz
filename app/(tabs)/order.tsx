import { PageHeader } from '@/components/PageHeader';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StatusBar, Text, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

/**
 * Order Screen
 * Displays user's orders and order history
 */
export default function OrderScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="light-content" />

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <PageHeader title="My Orders" subtitle="View and track your orders" />

        <View className="px-4">
        {/* Placeholder content - to be implemented */}
        <View className="items-center justify-center py-20">
          <Ionicons name="receipt-outline" size={80} color="#D1D5DB" />
          <Text className="text-gray-400 text-lg mt-4">No orders yet</Text>
          <Text className="text-gray-400 text-sm mt-2 text-center">
            Your order history will appear here
          </Text>
        </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
