import React from 'react';
import { Text, View } from 'react-native';

export interface TextLinkProps {
  text?: string;
  linkText: string;
  onPress?: () => void;
  containerClassName?: string;
  textClassName?: string;
  linkClassName?: string;
}

export const TextLink: React.FC<TextLinkProps> = ({
  text,
  linkText,
  onPress,
  containerClassName = '',
  textClassName = '',
  linkClassName = '',
}) => {
  return (
    <View className={`items-center py-3 ${containerClassName}`}>
      <Text className={`text-sm font-medium text-muted-foreground dark:text-muted-dark-foreground ${textClassName}`}>
        {text}{' '}
        <Text
          onPress={onPress}
          className={`font-bold text-primary underline ${linkClassName}`}
        >
          {linkText}
        </Text>
      </Text>
    </View>
  );
};
