import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useThemeColors } from '@/lib/utils/themeColors';

export interface HeaderProps {
  title?: string;
  onBackPress?: () => void;
  showBackButton?: boolean;
  rightComponent?: React.ReactNode;
  containerClassName?: string;
}

export const Header: React.FC<HeaderProps> = ({
  title = '',
  onBackPress = () => {},
  showBackButton = true,
  rightComponent = null,
  containerClassName = '',
}) => {
  const { getForegroundColor } = useThemeColors();

  return (
    <View className={`flex-row items-center justify-between p-4 pb-2 ${containerClassName}`}>
      {showBackButton ? (
        <TouchableOpacity
          onPress={onBackPress}
          className="w-12 h-12 items-center justify-center"
          activeOpacity={0.7}
        >
          <Ionicons
            name="arrow-back"
            size={24}
            color={getForegroundColor()}
          />
        </TouchableOpacity>
      ) : (
        <View className="w-12 h-12" />
      )}

      <Text className="text-lg font-bold text-foreground dark:text-foreground-dark flex-1 text-center">
        {title}
      </Text>

      {rightComponent || <View className="w-12 h-12" />}
    </View>
  );
};
