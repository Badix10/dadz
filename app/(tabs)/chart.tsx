import React from 'react';
import { SafeAreaView, ScrollView, StatusBar, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

/**
 * Chart Screen
 * Displays statistics and analytics
 */
export default function ChartScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />

      <View className="px-4 pt-4 pb-6">
        <Text className="text-3xl font-bold text-black mb-2">Statistics</Text>
        <Text className="text-gray-500">Your ordering insights</Text>
      </View>

      <ScrollView className="flex-1 px-4">
        {/* Placeholder content - to be implemented */}
        <View className="items-center justify-center py-20">
          <Ionicons name="bar-chart-outline" size={80} color="#D1D5DB" />
          <Text className="text-gray-400 text-lg mt-4">No data yet</Text>
          <Text className="text-gray-400 text-sm mt-2 text-center">
            Start ordering to see your statistics
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
