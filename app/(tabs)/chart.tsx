import { PageHeader } from '@/components/PageHeader';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StatusBar, Text, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

/**
 * Chart Screen
 * Displays statistics and analytics
 */
export default function ChartScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="light-content" />

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <PageHeader title="Statistics" subtitle="Your ordering insights" />

        <View className="px-4">
        {/* Placeholder content - to be implemented */}
        <View className="items-center justify-center py-20">
          <Ionicons name="bar-chart-outline" size={80} color="#D1D5DB" />
          <Text className="text-gray-400 text-lg mt-4">No data yet</Text>
          <Text className="text-gray-400 text-sm mt-2 text-center">
            Start ordering to see your statistics
          </Text>
        </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
