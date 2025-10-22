/**
 * Design Tokens - Classes Tailwind Réutilisables
 * Centralise tous les patterns de classes pour éviter la duplication
 *
 * Principes: DRY, Single Source of Truth
 *
 * Usage:
 * import { COLORS, LAYOUTS } from '@/constants/classNames';
 * <View className={LAYOUTS.screen}>
 *   <Text className={COLORS.text.primary}>Hello</Text>
 * </View>
 */

// ==================== COULEURS ====================

export const COLORS = {
  /**
   * Background (arrière-plan principal)
   */
  background: {
    primary: 'bg-background dark:bg-background-dark',
  },

  /**
   * Surfaces (arrière-plans) - Backward compatibility + new aliases
   */
  surface: {
    primary: 'bg-background dark:bg-background-dark',
    secondary: 'bg-card dark:bg-card-dark',
    card: 'bg-card dark:bg-card-dark',
  },

  /**
   * Texte (foreground)
   */
  text: {
    primary: 'text-foreground dark:text-foreground-dark',
    secondary: 'text-muted-foreground dark:text-muted-dark-foreground',
    muted: 'text-muted-foreground dark:text-muted-dark-foreground',
    inverse: 'text-white dark:text-black', // Pour texte sur fond coloré
    onPrimary: 'text-primary-foreground',
    onSecondary: 'text-secondary-foreground dark:text-secondary-dark-foreground',
  },

  /**
   * Bordures
   */
  border: {
    default: 'border-border dark:border-border-dark',
  },

  /**
   * Inputs/Fields
   */
  input: {
    background: 'bg-input dark:bg-input-dark',
    text: 'text-foreground dark:text-foreground-dark',
    border: 'border-border dark:border-border-dark',
  },

  /**
   * Cards
   */
  card: {
    background: 'bg-card dark:bg-card-dark',
    foreground: 'text-card-foreground dark:text-card-dark-foreground',
  },

  /**
   * Status colors (sémantiques)
   */
  status: {
    success: 'text-success',
    error: 'text-error',
    warning: 'text-warning',
    info: 'text-info',
  },
} as const;

// ==================== LAYOUTS ====================

export const LAYOUTS = {
  /**
   * Screens
   */
  screen: `flex-1 ${COLORS.surface.primary}`,

  /**
   * Cards
   */
  card: `rounded-2xl ${COLORS.surface.card} shadow-soft`,
  cardWithPadding: `rounded-2xl ${COLORS.surface.card} shadow-soft p-4`,

  /**
   * Sections
   */
  section: 'px-4 mb-6',
  sectionTitle: `text-xl font-bold ${COLORS.text.primary} mb-3`,

  /**
   * Dividers
   */
  divider: 'h-px bg-gray-100 dark:bg-gray-800',
  dividerWithMargin: 'h-px bg-gray-100 dark:bg-gray-800 my-4',
} as const;

// ==================== COMPOSANTS COMMUNS ====================

export const COMPONENTS = {
  /**
   * Boutons
   */
  button: {
    primary: `bg-primary rounded-full py-4 px-6 ${COLORS.text.primary}`,
    secondary: `${COLORS.surface.secondary} rounded-full py-4 px-6 ${COLORS.text.primary}`,
    outline: `border ${COLORS.border.default} rounded-full py-4 px-6 ${COLORS.text.primary}`,
  },

  /**
   * Inputs
   */
  input: {
    base: `${COLORS.input.background} ${COLORS.input.text} rounded-xl px-4 py-3 border ${COLORS.input.border}`,
    focused: 'border-primary',
    error: 'border-error',
  },

  /**
   * Badges
   */
  badge: {
    primary: 'bg-primary/10 text-primary rounded-full px-3 py-1 text-sm font-medium',
    success: 'bg-success/10 text-success rounded-full px-3 py-1 text-sm font-medium',
    error: 'bg-error/10 text-error rounded-full px-3 py-1 text-sm font-medium',
    warning: 'bg-warning/10 text-warning rounded-full px-3 py-1 text-sm font-medium',
  },
} as const;

// ==================== HELPERS ====================

/**
 * Combine plusieurs classes conditionnellement
 *
 * @example
 * const classes = combineClasses(
 *   COLORS.surface.primary,
 *   isActive && 'opacity-100',
 *   !isActive && 'opacity-50'
 * );
 */
export function combineClasses(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}
