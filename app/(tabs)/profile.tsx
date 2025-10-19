import React from 'react';
import { SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

/**
 * Profile Screen
 * Displays user profile and settings
 */
export default function ProfileScreen() {
  const menuItems = [
    { icon: 'person-outline', title: 'Edit Profile', subtitle: 'Update your information' },
    { icon: 'location-outline', title: 'Addresses', subtitle: 'Manage delivery addresses' },
    { icon: 'card-outline', title: 'Payment Methods', subtitle: 'Manage payment options' },
    { icon: 'notifications-outline', title: 'Notifications', subtitle: 'Notification preferences' },
    { icon: 'settings-outline', title: 'Settings', subtitle: 'App settings' },
    { icon: 'help-circle-outline', title: 'Help & Support', subtitle: 'Get help' },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />

      <View className="px-4 pt-4 pb-6">
        <Text className="text-3xl font-bold text-black mb-2">Profile</Text>
        <Text className="text-gray-500">Manage your account</Text>
      </View>

      <ScrollView className="flex-1">
        {/* User Info Card */}
        <View className="mx-4 mb-6 bg-gray-50 rounded-2xl p-4 flex-row items-center">
          <View className="w-16 h-16 rounded-full bg-[#FFC700] items-center justify-center">
            <Ionicons name="person" size={32} color="black" />
          </View>
          <View className="ml-4 flex-1">
            <Text className="text-xl font-bold text-black">John Doe</Text>
            <Text className="text-gray-500">john.doe@example.com</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#9CA3AF" />
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
          <TouchableOpacity className="bg-red-50 rounded-xl py-4 flex-row items-center justify-center">
            <Ionicons name="log-out-outline" size={24} color="#EF4444" />
            <Text className="text-red-500 font-semibold ml-2">Log Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
