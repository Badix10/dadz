import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '@/constants/classNames';

export interface CheckboxProps {
  checked: boolean;
  onPress?: () => void;
  label?: string;
  disabled?: boolean;
  containerClassName?: string;
  labelClassName?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onPress,
  label,
  disabled = false,
  containerClassName = '',
  labelClassName = '',
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      className={`flex-row items-center py-2 ${disabled ? 'opacity-50' : ''} ${containerClassName}`}
      activeOpacity={0.7}
    >
      <View
        className={`w-6 h-6 rounded items-center justify-center mr-3 ${
          checked ? 'bg-primary' : `${COLORS.input.background} border-2 ${COLORS.border.default}`
        }`}
      >
        {checked && (
          <Ionicons name="checkmark" size={18} color="black" />
        )}
      </View>

      {label && (
        <Text className={`text-base ${COLORS.text.primary} flex-1 ${labelClassName}`}>
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
};
