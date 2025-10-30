import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { AlertVariant, IoniconsName } from './types';
import { themeColors } from '@/lib/utils/themeColors';

export interface AlertProps {
  title?: string;
  message?: string;
  variant?: AlertVariant;
  onClose?: () => void;
  containerClassName?: string;
}

export const Alert: React.FC<AlertProps> = ({
  title,
  message,
  variant = 'info',
  onClose,
  containerClassName = '',
}) => {
  const variants: Record<AlertVariant, { bg: string; text: string; iconColor: string; icon: IoniconsName }> = {
    info: {
      bg: 'bg-muted dark:bg-muted-dark',
      text: 'text-foreground dark:text-foreground-dark',
      iconColor: themeColors.foreground,
      icon: 'information-circle'
    },
    success: {
      bg: 'bg-success/10 dark:bg-success/20',
      text: 'text-success dark:text-success',
      iconColor: themeColors.success,
      icon: 'checkmark-circle'
    },
    warning: {
      bg: 'bg-warning/10 dark:bg-warning/20',
      text: 'text-warning dark:text-warning',
      iconColor: themeColors.warning,
      icon: 'warning'
    },
    danger: {
      bg: 'bg-destructive/10 dark:bg-destructive/20',
      text: 'text-destructive dark:text-destructive',
      iconColor: themeColors.destructive,
      icon: 'alert-circle'
    },
  };

  const config = variants[variant];

  return (
    <View className={`rounded-xl p-4 ${config.bg} ${containerClassName}`}>
      <View className="flex-row items-start">
        <Ionicons name={config.icon} size={24} color={config.iconColor} />

        <View className="flex-1 ml-3">
          {title && (
            <Text className={`font-bold text-base ${config.text} mb-1`}>
              {title}
            </Text>
          )}
          {message && (
            <Text className={`text-sm ${config.text}`}>
              {message}
            </Text>
          )}
        </View>

        {onClose && (
          <TouchableOpacity onPress={onClose} className="ml-2">
            <Ionicons name="close" size={20} color={config.iconColor} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
