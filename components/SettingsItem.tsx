import React, { ReactNode } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';
import { themeColors } from '@/lib/utils/themeColors';

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
  const iconColor = isDark ? themeColors.foregroundDark : themeColors.foreground;
  const chevronColor = isDark ? themeColors.mutedDarkForeground : themeColors.mutedForeground;

  return (
    <Wrapper
      onPress={onPress}
      className="flex-row items-center gap-4 px-4 min-h-14 justify-between"
    >
      <View className="flex-row items-center gap-4 flex-1">
        {/* Icône */}
        <View className="bg-muted dark:bg-muted-dark rounded-lg items-center justify-center w-10 h-10">
          <Ionicons name={icon} size={20} color={iconColor} />
        </View>

        {/* Texte */}
        <View className="flex-1">
          <Text className="text-foreground dark:text-foreground-dark text-base font-normal">
            {title}
          </Text>
          {subtitle && (
            <Text className="text-muted-foreground dark:text-muted-dark-foreground text-sm">
              {subtitle}
            </Text>
          )}
        </View>
      </View>

      {/* Élément de droite */}
      <View className="shrink-0">
        {rightElement || (showChevron && onPress && (
          <Ionicons name="chevron-forward" size={20} color={chevronColor} />
        ))}
      </View>
    </Wrapper>
  );
};
