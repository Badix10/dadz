import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View } from 'react-native';
import { IoniconsName } from './types';
import { themeColors } from '@/lib/utils/themeColors';

export interface LogoProps {
  size?: number;
  icon?: IoniconsName;
  iconSize?: number;
  containerClassName?: string;
}

export const Logo: React.FC<LogoProps> = ({
  size = 96,
  icon = 'restaurant',
  iconSize,
  containerClassName = '',
}) => {
  const calculatedIconSize = iconSize || size / 2;

  return (
    <View className={`items-center justify-center p-4 py-6 ${containerClassName}`}>
      <View
        className="rounded-full items-center justify-center bg-primary"
        style={{
          width: size,
          height: size,
        }}
      >
        <Ionicons
          name={icon}
          size={calculatedIconSize}
          color={themeColors.primaryForeground}
        />
      </View>
    </View>
  );
};
