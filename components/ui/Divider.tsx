import React from 'react';
import { Text, View } from 'react-native';

export interface DividerProps {
  text?: string;
  textClassName?: string;
  lineClassName?: string;
  containerClassName?: string;
}

export const Divider: React.FC<DividerProps> = ({
  text,
  textClassName = '',
  lineClassName = '',
  containerClassName = '',
}) => {
  return (
    <View className={`flex-row items-center gap-4 py-3 ${containerClassName}`}>
      <View className={`flex-1 h-[1px] bg-border dark:bg-border-dark ${lineClassName}`} />
      {text && (
        <Text className={`text-sm font-medium text-muted-foreground dark:text-muted-dark-foreground ${textClassName}`}>
          {text}
        </Text>
      )}
      <View className={`flex-1 h-[1px] bg-border dark:bg-border-dark ${lineClassName}`} />
    </View>
  );
};
