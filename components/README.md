# Components Directory

This directory contains all reusable UI components for the Food Delivery App, organized following clean architecture and React Native best practices.

## Directory Structure

```
components/
├── BottomNavigation/      # Tab navigation component
├── CategoryList/          # Category display components
│   ├── CategoryItem.tsx   # Individual category item
│   └── CategoryList.tsx   # Horizontal scrollable list
├── Header/                # App header with location and actions
├── PromoCard/             # Promotional banner component
├── RestaurantCard/        # Restaurant card with favorite toggle
├── RestaurantGrid/        # Grid layout for restaurants
├── SearchBar/             # Search input with filter
└── index.ts               # Barrel export file
```

## Component Overview

### BottomNavigation
**Purpose**: Provides tab-based navigation at the bottom of the screen.

**Key Features**:
- Active tab highlighting
- Icon state management (filled vs outline)
- Accessibility support
- Memoized to prevent unnecessary re-renders

**Usage**:
```tsx
<BottomNavigation
  activeTab={activeTab}
  tabs={navigationTabs}
  onTabPress={handleTabPress}
/>
```

### Header
**Purpose**: Displays location, cart, and notification icons.

**Key Features**:
- Dynamic location display
- Notification badge indicator
- Action button callbacks
- Optimized with React.memo

**Usage**:
```tsx
<Header
  location={{ city: 'New York', country: 'USA' }}
  onCartPress={handleCartPress}
  onNotificationPress={handleNotificationPress}
  hasNotification={true}
/>
```

### SearchBar
**Purpose**: Search input with filter functionality.

**Key Features**:
- Real-time search callback
- Filter button
- Controlled input state
- Accessibility labels

**Usage**:
```tsx
<SearchBar
  onSearch={handleSearch}
  onFilterPress={handleFilterPress}
  placeholder="Search here..."
/>
```

### PromoCard
**Purpose**: Displays promotional offers and CTAs.

**Key Features**:
- Image support
- Customizable content
- Action button callback
- Responsive layout

**Usage**:
```tsx
<PromoCard
  imageUrl={promoImageUrl}
  title="Free Delivery"
  description="Enjoy exclusive discounts today"
  buttonText="Order Now"
  onPress={handlePromoPress}
/>
```

### CategoryList & CategoryItem
**Purpose**: Horizontal scrollable category selection.

**Key Features**:
- Individual category items memoized
- Image loading optimization
- Touch feedback
- Category selection callback

**Usage**:
```tsx
<CategoryList
  categories={categories}
  onCategoryPress={handleCategoryPress}
/>
```

### RestaurantCard
**Purpose**: Individual restaurant display with favorite toggle.

**Key Features**:
- Custom memoization comparison
- Favorite state management
- Star rating display
- Optimized image loading

**Usage**:
```tsx
<RestaurantCard
  restaurant={restaurant}
  isFavorite={favorites[restaurant.id]}
  onFavoriteToggle={handleFavoriteToggle}
  onPress={handleRestaurantPress}
/>
```

### RestaurantGrid
**Purpose**: Grid layout displaying multiple restaurants.

**Key Features**:
- Responsive grid layout
- Favorite state management
- Section title customization
- Performance optimized

**Usage**:
```tsx
<RestaurantGrid
  restaurants={restaurants}
  favorites={favorites}
  onFavoriteToggle={handleFavoriteToggle}
  onRestaurantPress={handleRestaurantPress}
  title="Fastest Near You"
/>
```

## Performance Optimizations

All components implement the following optimizations:

1. **React.memo**: Prevents unnecessary re-renders when props haven't changed
2. **useCallback**: Memoizes callback functions to maintain referential equality
3. **Custom Comparison**: Components like RestaurantCard use custom comparison functions
4. **Accessibility**: All interactive elements have proper accessibility labels and roles

## Type Safety

All components are fully typed using TypeScript with:
- Strict prop interfaces
- Imported shared types from `/types`
- Optional props clearly marked
- No use of `any` type

## Naming Conventions

- **Components**: PascalCase (e.g., `RestaurantCard`)
- **Files**: PascalCase matching component name
- **Props Interfaces**: `ComponentNameProps`
- **Handlers**: `handle` prefix (e.g., `handlePress`)
- **Display Names**: Set for better debugging

## Best Practices

1. **Single Responsibility**: Each component has one clear purpose
2. **Composition**: Complex components are built from smaller ones
3. **Prop Drilling Prevention**: Callbacks are memoized and passed down efficiently
4. **Error Boundaries**: Ready for error boundary wrapping at app level
5. **Testability**: Components are pure and easily testable

## Future Improvements

- [ ] Add loading states for async operations
- [ ] Implement error states and fallbacks
- [ ] Add skeleton loaders for better UX
- [ ] Create Storybook stories for each component
- [ ] Add unit tests using React Native Testing Library
- [ ] Implement theme support for dark mode
- [ ] Add animation transitions
