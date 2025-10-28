import React, { memo, useCallback } from 'react';
import { ScrollView } from 'react-native';
import type { Category } from '@/types';
import CategoryItem from './CategoryItem';

interface CategoryListProps {
  categories: Category[];
  onCategoryPress?: (category: Category) => void;
  selectedCategoryId?: string | null; // ID de la catégorie sélectionnée
}

/**
 * CategoryList component displaying a horizontal scrollable list of categories
 * Uses FlatList-like optimization patterns with memoization
 */
const CategoryList: React.FC<CategoryListProps> = memo(({
  categories,
  onCategoryPress,
  selectedCategoryId,
}) => {
  const handleCategoryPress = useCallback((category: Category) => {
    onCategoryPress?.(category);
  }, [onCategoryPress]);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="py-4"
      contentContainerStyle={{ gap: 16, paddingHorizontal: 16 }}
      accessibilityLabel="Categories list"
    >
      {categories.map((category) => (
        <CategoryItem
          key={category.id}
          category={category}
          onPress={handleCategoryPress}
          isSelected={selectedCategoryId === category.id}
        />
      ))}
    </ScrollView>
  );
});

CategoryList.displayName = 'CategoryList';

export default CategoryList;
