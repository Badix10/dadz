import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { ButtonSize, ButtonVariant } from './types';
import { themeColors } from '@/lib/utils/themeColors';

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
    secondary: 'bg-secondary',
    outline: 'bg-transparent border-2 border-border dark:border-border-dark',
    danger: 'bg-destructive dark:bg-destructive-dark',
  };

  const textColors: Record<ButtonVariant, string> = {
    primary: 'text-primary-foreground',
    secondary: 'text-secondary-foreground',
    outline: 'text-foreground dark:text-foreground-dark',
    danger: 'text-destructive-foreground',
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
        <ActivityIndicator color={variant === 'primary' ? themeColors.primaryForeground : themeColors.foreground} />
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
