import React, { memo, useCallback } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { Category } from '@/types';

interface CategoryItemProps {
  category: Category;
  onPress?: (category: Category) => void;
}

/**
 * CategoryItem component for displaying a single category
 * Memoized to prevent re-renders when sibling categories update
 */
const CategoryItem: React.FC<CategoryItemProps> = memo(({
  category,
  onPress,
}) => {
  const handlePress = useCallback(() => {
    onPress?.(category);
  }, [onPress, category]);

  return (
    <TouchableOpacity
      className="items-center w-20"
      onPress={handlePress}
      accessibilityLabel={`${category.name} category`}
      accessibilityRole="button"
    >
      <View className="w-16 h-16 rounded-full bg-primary items-center justify-center mb-2 shadow-md">
        <Ionicons
          name={category.icon as any}
          size={32}
          color="white"
          accessibilityLabel={category.name}
        />
      </View>
      <Text className="text-sm font-medium text-black text-center" numberOfLines={1}>
        {category.name}
      </Text>
    </TouchableOpacity>
  );
});

CategoryItem.displayName = 'CategoryItem';

export default CategoryItem;
