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
  const resetButtonBg = isDark ? 'bg-surface-dark-secondary' : 'bg-gray-200';

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
      <View className="flex-1 justify-end bg-black/50">
        <TouchableOpacity
          className="flex-1"
          activeOpacity={1}
          onPress={onClose}
        />

        <View className={`${COLORS.surface.primary} h-[85vh] rounded-t-3xl`}>
          {/* Header */}
          <View className={`flex-row items-center justify-between p-4 border-b ${COLORS.border.default}`}>
            <Text className={`text-xl font-bold ${COLORS.text.primary}`}>{t('home:filters.title')}</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color={iconColor} />
            </TouchableOpacity>
          </View>

          {/* Filters List */}
          <ScrollView className="flex-1 px-4 py-2" showsVerticalScrollIndicator={false}>
            {filters.map((filter) => (
              <View key={filter.id} className={`py-4 border-b ${COLORS.border.default}`}>
                <Text className={`text-base font-bold ${COLORS.text.primary} mb-3`}>
                  {filter.title}
                </Text>

                {filter.type === 'checkbox' ? (
                  // Checkbox options
                  <View>
                    {filter.options.map((option) => (
                      <Checkbox
                        key={option.id}
                        label={option.label}
                        checked={((tempFilters[filter.id] as string[]) || []).includes(option.value)}
                        onPress={() => handleCheckboxToggle(filter.id, option.value)}
                        containerClassName="mb-2"
                      />
                    ))}
                  </View>
                ) : (
                  // Radio options
                  <View>
                    {filter.options.map((option) => (
                      <RadioButton
                        key={option.id}
                        label={option.label}
                        selected={tempFilters[filter.id] === option.value}
                        onPress={() => handleRadioSelect(filter.id, option.value)}
                        containerClassName="mb-2"
                      />
                    ))}
                  </View>
                )}
              </View>
            ))}
          </ScrollView>

          {/* Footer Actions */}
          <View className={`flex-row gap-3 p-4 border-t ${COLORS.border.default}`}>
            <TouchableOpacity
              onPress={handleReset}
              className={`flex-1 h-12 items-center justify-center ${resetButtonBg} rounded-xl`}
            >
              <Text className={`text-base font-semibold ${COLORS.text.primary}`}>{t('home:filters.reset')}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleApply}
              className="flex-1 h-12 items-center justify-center bg-primary rounded-xl"
            >
              <Text className="text-base font-semibold text-black">{t('home:filters.apply')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
