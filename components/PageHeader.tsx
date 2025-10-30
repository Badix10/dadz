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
      <View className="bg-card dark:bg-card-dark rounded-full px-6 py-3 items-center shadow-sm">
        <Text className="text-xl font-bold text-foreground dark:text-foreground-dark mb-1">
          {title}
        </Text>
        {subtitle && (
          <Text className="text-xs text-muted-foreground dark:text-muted-dark-foreground">{subtitle}</Text>
        )}
      </View>
    </View>
  );
};
