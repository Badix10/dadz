import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { ButtonSize, ButtonVariant } from './types';

export interface PrimaryButtonProps {
  title: string;
  onPress?: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerClassName?: string;
  textClassName?: string;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  title,
  onPress,
  loading = false,
  disabled = false,
  variant = 'primary',
  size = 'medium',
  leftIcon,
  rightIcon,
  containerClassName = '',
  textClassName = '',
}) => {
  const variants: Record<ButtonVariant, string> = {
    primary: 'bg-primary',
    secondary: 'bg-field-light dark:bg-field-dark',
    outline: 'bg-transparent border-2 border-primary',
    danger: 'bg-error',
  };

  const textColors: Record<ButtonVariant, string> = {
    primary: 'text-white',
    secondary: 'text-text-primary dark:text-background-light',
    outline: 'text-primary',
    danger: 'text-white',
  };

  const sizes: Record<ButtonSize, string> = {
    small: 'h-10 px-4',
    medium: 'h-button px-6',
    large: 'h-16 px-8',
  };

  const textSizes: Record<ButtonSize, string> = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg',
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={loading || disabled}
      className={`w-full rounded-xl items-center justify-center flex-row ${
        variants[variant]
      } ${sizes[size]} ${
        loading || disabled ? 'opacity-50' : ''
      } ${containerClassName}`}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? 'white' : '#9CA3AF'} />
      ) : (
        <>
          {leftIcon && <View className="mr-2">{leftIcon}</View>}

          <Text className={`font-bold ${textColors[variant]} ${textSizes[size]} ${textClassName}`}>
            {title}
          </Text>

          {rightIcon && <View className="ml-2">{rightIcon}</View>}
        </>
      )}
    </TouchableOpacity>
  );
};
