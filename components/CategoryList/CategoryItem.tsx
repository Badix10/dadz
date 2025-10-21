import React, { memo, useCallback } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';
import { COLORS } from '@/constants/classNames';
import type { Category } from '@/types';

interface CategoryItemProps {
  category: Category;
  onPress?: (category: Category) => void;
}

/**
 * CategoryItem component for displaying a single category
 * Memoized to prevent re-renders when sibling categories update
 * Support dark mode avec design tokens
 */
const CategoryItem: React.FC<CategoryItemProps> = memo(({
  category,
  onPress,
}) => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const handlePress = useCallback(() => {
    onPress?.(category);
  }, [onPress, category]);

  // Couleur de l'icône: noir en light, blanc en dark pour contraste sur primary
  const iconColor = isDark ? '#FFFFFF' : '#000000';

  return (
    <TouchableOpacity
      className="items-center w-20"
      onPress={handlePress}
      accessibilityLabel={`${category.name} category`}
      accessibilityRole="button"
    >
      {/* Badge avec couleur primary (reste jaune) */}
      <View className="w-16 h-16 rounded-full bg-primary items-center justify-center mb-2 shadow-md">
        <Ionicons
          name={category.icon as any}
          size={32}
          color={iconColor}
          accessibilityLabel={category.name}
        />
      </View>

      {/* Texte avec support dark mode */}
      <Text className={`text-sm font-medium ${COLORS.text.primary} text-center`} numberOfLines={1}>
        {category.name}
      </Text>
    </TouchableOpacity>
  );
});

CategoryItem.displayName = 'CategoryItem';

export default CategoryItem;
