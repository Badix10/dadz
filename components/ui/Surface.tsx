import React from 'react';
import { View, ViewProps } from 'react-native';
import { cn } from '@/utils/cn';

/**
 * Variants de Surface disponibles
 */
export type SurfaceVariant = 'primary' | 'secondary' | 'card';

export interface SurfaceProps extends ViewProps {
  /**
   * Variant de la surface
   * - primary: Surface principale de l'app
   * - secondary: Surface alternative
   * - card: Carte avec ombre
   */
  variant?: SurfaceVariant;

  /**
   * Classes Tailwind additionnelles
   */
  className?: string;
}

/**
 * Surface Component
 * Wrapper pour les conteneurs avec support dark mode automatique
 *
 * Principes: DRY, Component Composition
 *
 * @example
 * <Surface variant="card" className="p-4">
 *   <Text>Content</Text>
 * </Surface>
 */
export const Surface: React.FC<SurfaceProps> = ({
  variant = 'primary',
  className,
  children,
  ...props
}) => {
  const variants: Record<SurfaceVariant, string> = {
    primary: 'bg-surface dark:bg-surface-dark',
    secondary: 'bg-surface-secondary dark:bg-surface-dark-secondary',
    card: 'bg-white dark:bg-surface-dark rounded-2xl shadow-soft',
  };

  return (
    <View className={cn(variants[variant], className)} {...props}>
      {children}
    </View>
  );
};
