import React from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';
import { useColorScheme } from 'nativewind';
import { cn } from '@/utils/cn';
import { COLORS } from '@/constants/classNames';

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

/**
 * CustomInput Component
 * Input avec support dark mode via design tokens
 * Principes: DRY, Clean Code
 */
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
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  // Placeholder color adapté au mode
  const placeholderColor = isDark ? '#A1A1A1' : '#9E9047';

  return (
    <View className={cn('w-full mb-4', containerClassName)}>
      {/* Label */}
      {label && (
        <Text className={cn(COLORS.text.primary, 'text-base font-medium pb-2', labelClassName)}>
          {label}
        </Text>
      )}

      {/* Input Container */}
      <View className="relative">
        {/* Left Icon */}
        {leftIcon && (
          <View className="absolute left-4 top-0 bottom-0 justify-center z-10">
            {leftIcon}
          </View>
        )}

        {/* Input */}
        <TextInput
          className={cn(
            'w-full rounded-xl text-base',
            multiline ? 'min-h-input py-4' : 'h-input',
            COLORS.input.background,
            COLORS.input.text,
            'px-4',
            leftIcon ? 'pl-12' : undefined,
            rightIcon ? 'pr-12' : undefined,
            error ? 'border-2 border-error' : undefined,
            disabled ? 'opacity-50' : undefined,
            inputClassName
          )}
          placeholder={placeholder}
          placeholderTextColor={placeholderColor}
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

        {/* Right Icon */}
        {rightIcon && (
          <View className="absolute right-4 top-0 bottom-0 justify-center">
            {rightIcon}
          </View>
        )}
      </View>

      {/* Error Message */}
      {error && (
        <Text className={cn(COLORS.status.error, 'text-sm mt-1 px-1')}>
          {error}
        </Text>
      )}
    </View>
  );
};
