/**
 * Design Tokens - Tailwind Theme Helpers
 *
 * This file provides helpers and mappings to Tailwind design tokens.
 * All colors are now centralized in tailwind.config.js.
 *
 * MIGRATION NOTE:
 * The old COLORS object has been removed. Use Tailwind classes directly:
 * - OLD: className={COLORS.text.primary}
 * - NEW: className="text-foreground dark:text-foreground-dark"
 *
 * For non-className use cases (ActivityIndicator, StatusBar, etc.),
 * use the themeColors helper from '@/lib/utils/themeColors'
 */

// ==================== THEME TOKEN MAPPINGS ====================

/**
 * Semantic token mappings to Tailwind classes
 * Use these for common patterns to ensure consistency
 */
export const THEME_TOKENS = {
  // Backgrounds
  background: 'bg-background dark:bg-background-dark',
  surface: 'bg-surface dark:bg-surface-dark',
  card: 'bg-card dark:bg-card-dark',

  // Text
  text: 'text-foreground dark:text-foreground-dark',
  textMuted: 'text-muted-foreground dark:text-muted-dark-foreground',
  textOnPrimary: 'text-primary-foreground dark:text-primary-dark-foreground',

  // Interactive
  primary: 'bg-primary text-primary-foreground',
  secondary: 'bg-secondary text-secondary-foreground',
  destructive: 'bg-destructive text-destructive-foreground',

  // Borders
  border: 'border-border dark:border-border-dark',

  // Input
  input: 'bg-input dark:bg-input-dark',
} as const;

// ==================== LAYOUT PATTERNS ====================

/**
 * Common layout patterns using Tailwind tokens
 */
export const LAYOUTS = {
  // Screens
  screen: 'flex-1 bg-background dark:bg-background-dark',

  // Cards
  card: 'rounded-2xl bg-card dark:bg-card-dark shadow-md',
  cardWithPadding: 'rounded-2xl bg-card dark:bg-card-dark shadow-md p-4',

  // Sections
  section: 'px-4 mb-6',
  sectionTitle: 'text-xl font-bold text-foreground dark:text-foreground-dark mb-3',

  // Dividers
  divider: 'h-px bg-border dark:bg-border-dark',
  dividerWithMargin: 'h-px bg-border dark:bg-border-dark my-4',
} as const;

// ==================== COMPONENT PATTERNS ====================

/**
 * Reusable component class combinations
 * These are convenience helpers - prefer composing Tailwind classes directly when possible
 */
export const COMPONENTS = {
  // Buttons (prefer using PrimaryButton component)
  button: {
    primary: 'bg-primary text-primary-foreground rounded-full py-4 px-6 font-bold',
    secondary: 'bg-secondary text-secondary-foreground rounded-full py-4 px-6 font-bold',
    outline: 'border-2 border-border dark:border-border-dark bg-transparent rounded-full py-4 px-6',
    destructive: 'bg-destructive text-destructive-foreground rounded-full py-4 px-6 font-bold',
  },

  // Inputs (prefer using CustomInput component)
  input: {
    base: 'bg-input dark:bg-input-dark text-foreground dark:text-foreground-dark rounded-xl px-4 py-3 border border-border dark:border-border-dark',
    focused: 'border-primary',
    error: 'border-destructive',
  },

  // Badges
  badge: {
    primary: 'bg-primary/15 text-primary rounded-full px-3 py-1 text-sm font-medium',
    success: 'bg-success/15 text-success rounded-full px-3 py-1 text-sm font-medium',
    error: 'bg-destructive/15 text-destructive rounded-full px-3 py-1 text-sm font-medium',
    warning: 'bg-warning/15 text-warning rounded-full px-3 py-1 text-sm font-medium',
  },
} as const;

// ==================== HELPERS ====================

/**
 * Combines multiple class names, filtering out falsy values
 * Useful for conditional classes
 *
 * @example
 * combineClasses('base-class', isActive && 'active-class', 'another-class')
 */
export function combineClasses(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Type-safe helper to get theme token classes
 *
 * @example
 * const bgClass = getThemeToken('background') // 'bg-background dark:bg-background-dark'
 */
export function getThemeToken(token: keyof typeof THEME_TOKENS): string {
  return THEME_TOKENS[token];
}
