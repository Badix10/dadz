import React, { memo, useCallback } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';
import { themeColors } from '@/lib/utils/themeColors';
import type { Category } from '@/types';

interface CategoryItemProps {
  category: Category;
  onPress?: (category: Category) => void;
  isSelected?: boolean;
}

/**
 * CategoryItem component for displaying a single category
 * Memoized to prevent re-renders when sibling categories update
 * Support dark mode avec design tokens
 */
const CategoryItem: React.FC<CategoryItemProps> = memo(({
  category,
  onPress,
  isSelected = false,
}) => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const handlePress = useCallback(() => {
    onPress?.(category);
  }, [onPress, category]);

  // Couleur de l'icône et fond selon dark mode et état sélectionné
  const iconColor = isSelected
    ? themeColors.primaryForeground
    : (isDark ? themeColors.foregroundDark : themeColors.foreground);

  const bgColor = isSelected
    ? 'bg-primary'
    : 'bg-card dark:bg-card-dark';

  const borderClass = isSelected
    ? 'border-2 border-primary'
    : 'border-2 border-border dark:border-border-dark';

  const textClasses = isSelected
    ? 'text-sm font-bold text-foreground dark:text-foreground-dark text-center'
    : 'text-sm font-medium text-muted-foreground dark:text-muted-dark-foreground text-center';

  return (
    <TouchableOpacity
      className="items-center w-20"
      onPress={handlePress}
      accessibilityLabel={`${category.name} category`}
      accessibilityRole="button"
      accessibilityState={{ selected: isSelected }}
    >
      {/* Badge avec fond blanc/noir et border jaune si sélectionné */}
      <View className={`w-16 h-16 rounded-full ${bgColor} ${borderClass} items-center justify-center mb-2 shadow-md`}>
        <Ionicons
          name={category.icon as any}
          size={28}
          color={iconColor}
          accessibilityLabel={category.name}
        />
      </View>

      {/* Texte avec support dark mode */}
      <Text className={textClasses} numberOfLines={1}>
        {category.name}
      </Text>
    </TouchableOpacity>
  );
});

CategoryItem.displayName = 'CategoryItem';

export default CategoryItem;
