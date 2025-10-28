import React, { memo, useCallback } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';
import { COLORS } from '@/constants/classNames';
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

  // Couleur de l'icône: noir en light, blanc en dark pour contraste sur primary
  const iconColor = isDark ? '#FFFFFF' : '#000000';

  // Classes conditionnelles selon l'état sélectionné
  const badgeClasses = isSelected
    ? "w-16 h-16 rounded-full bg-primary items-center justify-center mb-2 shadow-lg border-2 border-primary"
    : "w-16 h-16 rounded-full bg-primary items-center justify-center mb-2 shadow-md";

  const textClasses = isSelected
    ? `text-sm font-bold ${COLORS.text.primary} text-center`
    : `text-sm font-medium ${COLORS.text.primary} text-center`;

  return (
    <TouchableOpacity
      className="items-center w-20"
      onPress={handlePress}
      accessibilityLabel={`${category.name} category`}
      accessibilityRole="button"
      accessibilityState={{ selected: isSelected }}
      style={isSelected ? { transform: [{ scale: 1.05 }] } : undefined}
    >
      {/* Badge avec couleur primary (reste jaune) */}
      <View className={badgeClasses}>
        <Ionicons
          name={category.icon as any}
          size={32}
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
