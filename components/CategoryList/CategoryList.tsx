import React, { memo, useCallback } from 'react';
import { ScrollView } from 'react-native';
import type { Category } from '@/types';
import CategoryItem from './CategoryItem';

interface CategoryListProps {
  categories: Category[];
  onCategoryPress?: (category: Category) => void;
}

/**
 * CategoryList component displaying a horizontal scrollable list of categories
 * Uses FlatList-like optimization patterns with memoization
 */
const CategoryList: React.FC<CategoryListProps> = memo(({
  categories,
  onCategoryPress,
}) => {
  const handleCategoryPress = useCallback((category: Category) => {
    onCategoryPress?.(category);
  }, [onCategoryPress]);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="px-4 py-4"
      contentContainerStyle={{ gap: 16 }}
      accessibilityLabel="Categories list"
    >
      {categories.map((category) => (
        <CategoryItem
          key={category.id}
          category={category}
          onPress={handleCategoryPress}
        />
      ))}
    </ScrollView>
  );
});

CategoryList.displayName = 'CategoryList';

export default CategoryList;
