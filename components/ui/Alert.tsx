import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { AlertVariant, IoniconsName } from './types';

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
  const variants: Record<AlertVariant, { bg: string; border: string; text: string; icon: IoniconsName }> = {
    info: { bg: 'bg-info-light', border: 'border-info', text: 'text-info-dark', icon: 'information-circle' },
    success: { bg: 'bg-success-light', border: 'border-success', text: 'text-success-dark', icon: 'checkmark-circle' },
    warning: { bg: 'bg-warning-light', border: 'border-warning', text: 'text-warning-dark', icon: 'warning' },
    danger: { bg: 'bg-error-light', border: 'border-error', text: 'text-error-dark', icon: 'alert-circle' },
  };

  const config = variants[variant];

  return (
    <View className={`rounded-xl p-4 border-2 ${config.bg} ${config.border} ${containerClassName}`}>
      <View className="flex-row items-start">
        <Ionicons name={config.icon} size={24} color={config.text.replace('text-', '')} />

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
            <Ionicons name="close" size={20} color={config.text.replace('text-', '')} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
