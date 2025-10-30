import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export interface RadioButtonProps {
  selected: boolean;
  onPress?: () => void;
  label?: string;
  disabled?: boolean;
  containerClassName?: string;
  labelClassName?: string;
}

export const RadioButton: React.FC<RadioButtonProps> = ({
  selected,
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
        className={`w-6 h-6 rounded-full items-center justify-center mr-3 border-2 ${
          selected ? 'border-primary' : 'border-border dark:border-border-dark'
        }`}
      >
        {selected && (
          <View className="w-3 h-3 rounded-full bg-primary" />
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
