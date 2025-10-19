import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { IoniconsName } from './types';

export interface SocialButtonProps {
  title: string;
  onPress?: () => void;
  icon?: string;
  iconType?: 'image' | 'ionicon';
  iconName?: IoniconsName;
  disabled?: boolean;
  containerClassName?: string;
}

export const SocialButton: React.FC<SocialButtonProps> = ({
  title,
  onPress,
  icon,
  iconType = 'image',
  iconName,
  disabled = false,
  containerClassName = '',
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      className={`w-full h-button rounded-xl bg-field-light dark:bg-field-dark flex-row items-center justify-center border border-gray-200 dark:border-gray-700 ${
        disabled ? 'opacity-50' : ''
      } ${containerClassName}`}
      activeOpacity={0.8}
    >
      {iconType === 'image' && icon ? (
        <Image
          source={{ uri: icon }}
          className="w-6 h-6 mr-3"
          resizeMode="contain"
        />
      ) : iconType === 'ionicon' && iconName ? (
        <View className="mr-3">
          <Ionicons
            name={iconName}
            size={24}
            color="#9CA3AF"
          />
        </View>
      ) : null}

      <Text className="text-base font-bold text-text-primary dark:text-background-light">
        {title}
      </Text>
    </TouchableOpacity>
  );
};
