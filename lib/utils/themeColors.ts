/**
 * Theme Colors - Non-className Color Values
 *
 * This file provides hex color values for React Native components
 * that don't support className prop (ActivityIndicator, StatusBar, etc.)
 *
 * These values are synchronized with tailwind.config.js tokens.
 *
 * Usage:
 * ```tsx
 * import { themeColors } from '@/lib/utils/themeColors';
 *
 * <ActivityIndicator color={themeColors.primary} />
 * <RefreshControl tintColor={themeColors.primary} colors={[themeColors.primary]} />
 * ```
 */

import { useColorScheme } from 'nativewind';

// ==================== COLOR CONSTANTS ====================

/**
 * Raw color values from tailwind.config.js
 * Use these for components that require hex strings
 */
export const themeColors = {
  // Primary (yellow)
  primary: '#f9c500',
  primaryDark: '#ffcb05',
  primaryForeground: '#000000',

  // Backgrounds
  background: '#fffaf1',
  backgroundDark: '#1e1e1e',

  // Foreground (text)
  foreground: '#2b2b2b',
  foregroundDark: '#fffaf1',

  // Card
  card: '#fff5d6',
  cardDark: '#2a2a2a',

  // Surface (backward compat)
  surface: '#fffaf1',
  surfaceDark: '#1e1e1e',
  surfaceSecondary: '#fff5d6',
  surfaceSecondaryDark: '#2a2a2a',

  // Secondary (orange)
  secondary: '#ff8c42',
  secondaryForeground: '#ffffff',

  // Destructive (red)
  destructive: '#e74c3c',
  destructiveDark: '#ff6246',
  destructiveForeground: '#ffffff',

  // Success (green)
  success: '#79b851',
  successLight: '#86EFAC',
  successDark: '#15803D',
  successForeground: '#ffffff',

  // Warning (orange)
  warning: '#ff8c42',
  warningLight: '#f5a623',
  warningDark: '#d64417',

  // Info (blue)
  info: '#3B82F6',
  infoLight: '#93C5FD',
  infoDark: '#1E40AF',

  // Error
  error: '#e74c3c',
  errorLight: '#ff6246',
  errorDark: '#b71a1b',

  // Muted
  muted: '#f2e7c9',
  mutedDark: '#3a3a3a',
  mutedForeground: '#5a4a1b',
  mutedDarkForeground: '#f0e6b3',

  // Border
  border: '#f4d36b',
  borderDark: '#f9c500',

  // Input
  input: '#e8bf3a',
  inputDark: '#ffcb05',

  // Accent
  accent: '#79b851',
  accentForeground: '#ffffff',
} as const;

// ==================== HOOKS ====================

/**
 * Hook to get theme-aware colors
 * Returns appropriate color based on current color scheme
 *
 * @example
 * ```tsx
 * const { getPrimaryColor, getBackgroundColor } = useThemeColors();
 *
 * <ActivityIndicator color={getPrimaryColor()} />
 * <StatusBar backgroundColor={getBackgroundColor()} />
 * ```
 */
export function useThemeColors() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  return {
    // Primary
    getPrimaryColor: () => (isDark ? themeColors.primaryDark : themeColors.primary),
    getPrimaryForeground: () => themeColors.primaryForeground,

    // Background
    getBackgroundColor: () => (isDark ? themeColors.backgroundDark : themeColors.background),

    // Foreground (text)
    getForegroundColor: () => (isDark ? themeColors.foregroundDark : themeColors.foreground),

    // Card
    getCardColor: () => (isDark ? themeColors.cardDark : themeColors.card),

    // Surface
    getSurfaceColor: () => (isDark ? themeColors.surfaceDark : themeColors.surface),
    getSurfaceSecondaryColor: () => (isDark ? themeColors.surfaceSecondaryDark : themeColors.surfaceSecondary),

    // Destructive
    getDestructiveColor: () => (isDark ? themeColors.destructiveDark : themeColors.destructive),

    // Muted
    getMutedColor: () => (isDark ? themeColors.mutedDark : themeColors.muted),

    // Border
    getBorderColor: () => (isDark ? themeColors.borderDark : themeColors.border),

    // Input
    getInputColor: () => (isDark ? themeColors.inputDark : themeColors.input),

    // Helpers
    isDark,
    colorScheme,
  };
}

// ==================== CONVENIENCE GETTERS ====================

/**
 * Get color value based on color scheme (no hook required)
 * Use this when you need colors outside of a React component
 *
 * @param isDark - Whether dark mode is active
 */
export function getThemeColorValue(colorName: keyof typeof colorGetters, isDark: boolean): string {
  return colorGetters[colorName](isDark);
}

const colorGetters = {
  primary: (isDark: boolean) => (isDark ? themeColors.primaryDark : themeColors.primary),
  background: (isDark: boolean) => (isDark ? themeColors.backgroundDark : themeColors.background),
  foreground: (isDark: boolean) => (isDark ? themeColors.foregroundDark : themeColors.foreground),
  card: (isDark: boolean) => (isDark ? themeColors.cardDark : themeColors.card),
  surface: (isDark: boolean) => (isDark ? themeColors.surfaceDark : themeColors.surface),
  destructive: (isDark: boolean) => (isDark ? themeColors.destructiveDark : themeColors.destructive),
  muted: (isDark: boolean) => (isDark ? themeColors.mutedDark : themeColors.muted),
  border: (isDark: boolean) => (isDark ? themeColors.borderDark : themeColors.border),
  input: (isDark: boolean) => (isDark ? themeColors.inputDark : themeColors.input),
} as const;
