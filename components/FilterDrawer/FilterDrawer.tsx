import { useTranslation } from '@/hooks';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Checkbox, RadioButton } from '../ui';
import type { FilterConfig, SelectedFilters } from './types';
import { useColorScheme } from 'nativewind';
import { COLORS } from '@/constants/classNames';

interface FilterDrawerProps {
  visible: boolean;
  onClose: () => void;
  filters: FilterConfig[];
  selectedFilters: SelectedFilters;
  onApply: (filters: SelectedFilters) => void;
}

/**
 * FilterDrawer - Reusable bottom sheet filter component
 * Follows KISS, YAGNI, DRY principles
 */
export const FilterDrawer: React.FC<FilterDrawerProps> = ({
  visible,
  onClose,
  filters,
  selectedFilters,
  onApply,
}) => {
  const { t } = useTranslation();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [tempFilters, setTempFilters] = useState<SelectedFilters>(selectedFilters);

  // Colors adaptés au dark mode
  const iconColor = isDark ? '#FFFFFF' : '#1A1A1A';

  // Handle checkbox toggle
  const handleCheckboxToggle = (filterId: string, optionValue: string) => {
    const currentValues = (tempFilters[filterId] as string[]) || [];
    const newValues = currentValues.includes(optionValue)
      ? currentValues.filter((v) => v !== optionValue)
      : [...currentValues, optionValue];

    setTempFilters({ ...tempFilters, [filterId]: newValues });
  };

  // Handle radio selection
  const handleRadioSelect = (filterId: string, optionValue: string) => {
    setTempFilters({ ...tempFilters, [filterId]: optionValue });
  };

  // Reset all filters
  const handleReset = () => {
    setTempFilters({});
  };

  // Apply filters
  const handleApply = () => {
    onApply(tempFilters);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end bg-black/60">
        <TouchableOpacity
          className="flex-1"
          activeOpacity={1}
          onPress={onClose}
        />

        <View className="bg-[#1A1A1A] h-[85vh] rounded-t-[32px]">
          {/* Header */}
          <View className="flex-row items-center justify-between p-5 pb-4">
            <View className="flex-1" />
            <Text className="text-xl font-bold text-white text-center flex-1">Filter your search</Text>
            <View className="flex-1 items-end">
              <TouchableOpacity onPress={onClose} className="w-10 h-10 items-center justify-center">
                <Ionicons name="close" size={28} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>
          <View className="h-px bg-gray-700" />

          {/* Filters List */}
          <ScrollView className="flex-1 px-5 py-4" showsVerticalScrollIndicator={false}>
            {filters.map((filter) => (
              <View key={filter.id} className="mb-6">
                <Text className="text-base font-bold text-white mb-3">
                  {filter.title}
                </Text>

                {filter.type === 'checkbox' ? (
                  // Checkbox as chips
                  <View className="flex-row flex-wrap gap-2">
                    {filter.options.map((option) => {
                      const isSelected = ((tempFilters[filter.id] as string[]) || []).includes(option.value);
                      return (
                        <TouchableOpacity
                          key={option.id}
                          onPress={() => handleCheckboxToggle(filter.id, option.value)}
                          className={`px-4 py-2.5 rounded-full ${
                            isSelected ? 'bg-primary' : 'bg-[#2A2A2A]'
                          }`}
                        >
                          <Text className={`text-sm font-semibold ${isSelected ? 'text-black' : 'text-white'}`}>
                            {option.label}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                ) : (
                  // Radio as chips
                  <View className="flex-row flex-wrap gap-2">
                    {filter.options.map((option) => {
                      const isSelected = tempFilters[filter.id] === option.value;
                      return (
                        <TouchableOpacity
                          key={option.id}
                          onPress={() => handleRadioSelect(filter.id, option.value)}
                          className={`px-4 py-2.5 rounded-full ${
                            isSelected ? 'bg-primary' : 'bg-[#2A2A2A]'
                          }`}
                        >
                          <Text className={`text-sm font-semibold ${isSelected ? 'text-black' : 'text-white'}`}>
                            {option.label}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                )}
              </View>
            ))}
          </ScrollView>

          {/* Footer Actions */}
          <View className="h-px bg-gray-700" />
          <View className="flex-row gap-3 p-5">
            <TouchableOpacity
              onPress={handleReset}
              className="flex-1 h-14 items-center justify-center bg-red-500/20 border border-red-500 rounded-full"
            >
              <Text className="text-base font-bold text-red-500">{t('home:filters.reset')}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleApply}
              className="flex-1 h-14 items-center justify-center bg-primary rounded-full"
            >
              <Text className="text-base font-bold text-black">{t('home:filters.apply')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
