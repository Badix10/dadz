import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { themeColors } from '@/lib/utils/themeColors';

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
          checked ? 'bg-primary' : 'bg-input dark:bg-input-dark border-2 border-border dark:border-border-dark'
        }`}
      >
        {checked && (
          <Ionicons name="checkmark" size={18} color={themeColors.primaryForeground} />
        )}
      </View>

      {label && (
        <Text className={`text-base text-foreground dark:text-foreground-dark flex-1 ${labelClassName}`}>
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
};
