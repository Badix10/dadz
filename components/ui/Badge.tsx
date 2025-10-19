import React from 'react';
import { Text, View } from 'react-native';
import { BadgeSize, BadgeVariant } from './types';

export interface BadgeProps {
  text: string;
  variant?: BadgeVariant;
  size?: BadgeSize;
  containerClassName?: string;
  textClassName?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  text,
  variant = 'primary',
  size = 'medium',
  containerClassName = '',
  textClassName = '',
}) => {
  const variants: Record<BadgeVariant, string> = {
    primary: 'bg-primary',
    success: 'bg-success',
    danger: 'bg-error',
    warning: 'bg-warning',
    info: 'bg-info',
  };

  const sizes: Record<BadgeSize, string> = {
    small: 'px-2 py-0.5',
    medium: 'px-3 py-1',
    large: 'px-4 py-1.5',
  };

  const textSizes: Record<BadgeSize, string> = {
    small: 'text-xs',
    medium: 'text-sm',
    large: 'text-base',
  };

  return (
    <View className={`rounded-full items-center justify-center ${variants[variant]} ${sizes[size]} ${containerClassName}`}>
      <Text className={`font-semibold text-white ${textSizes[size]} ${textClassName}`}>
        {text}
      </Text>
    </View>
  );
};
