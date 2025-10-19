import React from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';

export interface CustomInputProps extends Omit<TextInputProps, 'onChange'> {
  label?: string;
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onBlur?: () => void;
  error?: string;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerClassName?: string;
  inputClassName?: string;
  labelClassName?: string;
}

export const CustomInput: React.FC<CustomInputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  onBlur,
  error,
  disabled = false,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  autoComplete = 'off',
  maxLength,
  multiline = false,
  numberOfLines = 1,
  leftIcon,
  rightIcon,
  containerClassName = '',
  inputClassName = '',
  labelClassName = '',
  ...props
}) => {
  return (
    <View className={`w-full mb-4 ${containerClassName}`}>
      {label && (
        <Text className={`text-base font-medium text-text-primary dark:text-background-light pb-2 ${labelClassName}`}>
          {label}
        </Text>
      )}

      <View className="relative">
        {leftIcon && (
          <View className="absolute left-4 top-0 bottom-0 justify-center z-10">
            {leftIcon}
          </View>
        )}

        <TextInput
          className={`w-full ${multiline ? 'min-h-input py-4' : 'h-input'} rounded-xl bg-field-light dark:bg-field-dark text-text-primary dark:text-background-light px-4 text-base ${
            leftIcon ? 'pl-12' : ''
          } ${rightIcon ? 'pr-12' : ''} ${
            error ? 'border-2 border-error' : ''
          } ${disabled ? 'opacity-50' : ''} ${inputClassName}`}
          placeholder={placeholder}
          placeholderTextColor="#9E9047"
          value={value}
          onChangeText={onChangeText}
          onBlur={onBlur}
          editable={!disabled}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoComplete={autoComplete}
          maxLength={maxLength}
          multiline={multiline}
          numberOfLines={multiline ? numberOfLines : 1}
          textAlignVertical={multiline ? 'top' : 'center'}
          {...props}
        />

        {rightIcon && (
          <View className="absolute right-4 top-0 bottom-0 justify-center">
            {rightIcon}
          </View>
        )}
      </View>

      {error && (
        <Text className="text-error text-sm mt-1 px-1">{error}</Text>
      )}
    </View>
  );
};
