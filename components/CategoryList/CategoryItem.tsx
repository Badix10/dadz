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

  // Couleur de l'icône et fond selon dark mode et état sélectionné
  const iconColor = isDark
    ? (isSelected ? '#000000' : '#FFFFFF')
    : (isSelected ? '#FFFFFF' : '#000000');

  const bgColor = isDark
    ? (isSelected ? 'bg-white' : 'bg-[#2A2A2A]')
    : (isSelected ? 'bg-black' : 'bg-white');

  const borderClass = isSelected
    ? 'border-2 border-primary'
    : 'border-2 border-transparent';

  const textClasses = isSelected
    ? `text-sm font-bold ${COLORS.text.primary} text-center`
    : `text-sm font-medium ${COLORS.text.secondary} text-center`;

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
