import React, { ReactNode } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';

interface SettingsItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  rightElement?: ReactNode;
  showChevron?: boolean;
}

/**
 * Composant réutilisable pour les items de paramètres
 * Utilise useColorScheme natif de NativeWind
 * Principes: DRY, KISS
 */
export const SettingsItem: React.FC<SettingsItemProps> = ({
  icon,
  title,
  subtitle,
  onPress,
  rightElement,
  showChevron = true,
}) => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const Wrapper = onPress ? TouchableOpacity : View;
  const iconColor = isDark ? '#FFFFFF' : '#1A1A1A';

  return (
    <Wrapper
      onPress={onPress}
      className="flex-row items-center gap-4 px-4 min-h-14 justify-between"
    >
      <View className="flex-row items-center gap-4 flex-1">
        {/* Icône */}
        <View className="bg-background-light dark:bg-background-dark rounded-lg items-center justify-center w-10 h-10">
          <Ionicons name={icon} size={20} color={iconColor} />
        </View>

        {/* Texte */}
        <View className="flex-1">
          <Text className="text-text-primary dark:text-white text-base font-normal">
            {title}
          </Text>
          {subtitle && (
            <Text className="text-text-secondary dark:text-text-light text-sm">
              {subtitle}
            </Text>
          )}
        </View>
      </View>

      {/* Élément de droite */}
      <View className="shrink-0">
        {rightElement || (showChevron && onPress && (
          <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
        ))}
      </View>
    </Wrapper>
  );
};
