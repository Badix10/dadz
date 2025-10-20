import React from 'react';
import { Text, View } from 'react-native';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  containerClassName?: string;
}

/**
 * PageHeader component - Reusable header with rounded bubble design
 * Used across multiple screens (Profile, Order, Chart, Offer)
 */
export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  containerClassName = '',
}) => {
  return (
    <View className={`px-4 min-w-32 pt-4 pb-4 items-center ${containerClassName}`}>
      <View className="bg-field-light dark:bg-field-dark rounded-full px-6 py-3 items-center">
        <Text className="text-xl font-bold text-text-primary dark:text-background-light mb-1">
          {title}
        </Text>
        {subtitle && (
          <Text className="text-xs text-subtext-light">{subtitle}</Text>
        )}
      </View>
    </View>
  );
};
