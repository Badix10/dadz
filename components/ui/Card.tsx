import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { CardVariant } from './types';

export interface CardProps {
  children: React.ReactNode;
  onPress?: () => void;
  variant?: CardVariant;
  containerClassName?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  onPress,
  variant = 'default',
  containerClassName = '',
}) => {
  const variants: Record<CardVariant, string> = {
    default: 'bg-white dark:bg-field-dark',
    elevated: 'bg-white dark:bg-field-dark shadow-lg',
    outlined: 'bg-transparent border-2 border-field-light dark:border-field-dark',
  };

  const Component = onPress ? TouchableOpacity : View;

  return (
    <Component
      onPress={onPress}
      className={`rounded-xl p-4 ${variants[variant]} ${containerClassName}`}
      activeOpacity={onPress ? 0.8 : 1}
    >
      {children}
    </Component>
  );
};
