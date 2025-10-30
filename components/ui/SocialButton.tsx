import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { IoniconsName } from './types';
import { useThemeColors } from '@/lib/utils/themeColors';

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
  const { getForegroundColor } = useThemeColors();

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      className={`w-full h-button rounded-xl bg-input dark:bg-input-dark flex-row items-center justify-center border border-border dark:border-border-dark ${
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
            color={getForegroundColor()}
          />
        </View>
      ) : null}

      <Text className="text-base font-bold text-foreground dark:text-foreground-dark">
        {title}
      </Text>
    </TouchableOpacity>
  );
};
