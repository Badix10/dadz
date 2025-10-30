import React from 'react';
import { Text, TextProps } from 'react-native';
import { cn } from '@/utils/cn';

/**
 * Variants de Typography disponibles
 */
export type TypographyVariant = 'primary' | 'secondary' | 'tertiary';

export interface TypographyProps extends TextProps {
  /**
   * Variant du texte (hiérarchie visuelle)
   * - primary: Texte principal (haute visibilité)
   * - secondary: Texte secondaire (moyenne visibilité)
   * - tertiary: Texte tertiaire (basse visibilité)
   */
  variant?: TypographyVariant;

  /**
   * Classes Tailwind additionnelles
   */
  className?: string;
}

/**
 * Typography Component
 * Wrapper pour le texte avec support dark mode automatique
 *
 * Principes: DRY, Component Composition
 *
 * @example
 * <Typography variant="primary" className="font-bold text-xl">
 *   Title
 * </Typography>
 * <Typography variant="secondary">
 *   Subtitle
 * </Typography>
 */
export const Typography: React.FC<TypographyProps> = ({
  variant = 'primary',
  className,
  children,
  ...props
}) => {
  const variants: Record<TypographyVariant, string> = {
    primary: 'text-foreground dark:text-foreground-dark',
    secondary: 'text-muted-foreground dark:text-muted-dark-foreground',
    tertiary: 'text-muted-foreground dark:text-muted-dark-foreground opacity-70',
  };

  return (
    <Text className={cn(variants[variant], className)} {...props}>
      {children}
    </Text>
  );
};
