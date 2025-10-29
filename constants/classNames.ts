/**
 * Design Tokens - Classes Tailwind Réutilisables
 * Thème extrait : Noir (#000000), Jaune (#FFD100), Blanc (#FFFFFF), Gris (#F2F2F2),
 * Rouge orangé (#E24E2A), Vert (#A4C639)
 *
 * Usage:
 * import { COLORS, LAYOUTS, COMPONENTS, combineClasses } from '@/constants/classNames';
 */

 // ==================== COULEURS ====================

export const COLORS = {
  /**
   * Background (arrière-plan principal)
   */
  background: {
    primary: 'bg-black dark:bg-black',
  },

  /**
   * Surfaces
   */
  surface: {
    primary: 'bg-black dark:bg-black',
    secondary: 'bg-[#F2F2F2] dark:bg-[#111111]',
    card: 'bg-white dark:bg-[#111111]',
  },

  /**
   * Texte (foreground)
   */
  text: {
    primary: 'text-white dark:text-white',
    secondary: 'text-[#F2F2F2] dark:text-[#F2F2F2]',
    muted: 'text-gray-400 dark:text-gray-400',
    inverse: 'text-black dark:text-white',
    onPrimary: 'text-black', // sur jaune
    onSecondary: 'text-black dark:text-white',
  },

  /**
   * Bordures
   */
  border: {
    default: 'border-gray-200 dark:border-gray-700',
  },

  /**
   * Inputs/Fields
   */
  input: {
    background: 'bg-white dark:bg-[#151515]',
    text: 'text-white dark:text-white',
    border: 'border-gray-200 dark:border-gray-700',
  },

  /**
   * Cards
   */
  card: {
    background: 'bg-white dark:bg-[#111111]',
    foreground: 'text-black dark:text-white',
  },

  /**
   * Status colors (sémantiques)
   */
  status: {
    success: 'text-[#A4C639]',
    error: 'text-[#E24E2A]',
    warning: 'text-[#FFD100]',
    info: 'text-gray-400',
  },

  /**
   * Accents
   */
  accent: {
    primary: 'text-[#FFD100]',
    primaryBg: 'bg-[#FFD100]',
    primaryBorder: 'border-[#FFD100]',
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
    primary: `bg-[#FFD100] rounded-full py-4 px-6 text-black`,
    secondary: `${COLORS.surface.secondary} rounded-full py-4 px-6 ${COLORS.text.primary}`,
    outline: `border ${COLORS.border.default} rounded-full py-4 px-6 ${COLORS.text.primary}`,
  },

  /**
   * Inputs
   */
  input: {
    base: `${COLORS.input.background} ${COLORS.input.text} rounded-xl px-4 py-3 border ${COLORS.input.border}`,
    focused: 'border-[#FFD100]',
    error: 'border-[#E24E2A]',
  },

  /**
   * Badges
   */
  badge: {
    primary: 'bg-[#FFD100]/15 text-[#FFD100] rounded-full px-3 py-1 text-sm font-medium',
    success: 'bg-[#A4C639]/15 text-[#A4C639] rounded-full px-3 py-1 text-sm font-medium',
    error: 'bg-[#E24E2A]/15 text-[#E24E2A] rounded-full px-3 py-1 text-sm font-medium',
    warning: 'bg-[#FFD100]/15 text-[#FFD100] rounded-full px-3 py-1 text-sm font-medium',
  },

  /**
   * Cards modernes
   */
  restaurantCard: {
    container: 'bg-white dark:bg-[#111111] rounded-2xl shadow-md overflow-hidden',
    containerPressed: 'bg-white dark:bg-[#111111] rounded-2xl shadow-lg overflow-hidden',
    image: 'w-full h-40 rounded-t-2xl',
    content: 'p-4',
  },

  /**
   * Category Items
   */
  category: {
    badge: 'w-16 h-16 rounded-full bg-[#FFD100] items-center justify-center mb-2 shadow-md',
    badgeSelected: 'w-16 h-16 rounded-full bg-[#FFD100] items-center justify-center mb-2 shadow-xl border-white border-[3px]',
    text: `text-sm font-medium ${COLORS.text.primary} text-center`,
    textSelected: `text-sm font-bold ${COLORS.text.primary} text-center`,
  },

  /**
   * Header
   */
  header: {
    container: 'px-4 pt-4 pb-3 bg-transparent',
    searchBar: 'bg-white dark:bg-[#151515] rounded-xl shadow-sm border border-gray-200 dark:border-gray-700',
    filterButton: 'h-12 w-12 items-center justify-center bg-[#FFD100] rounded-xl shadow-sm',
    filterButtonDefault: 'h-12 w-12 items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-xl',
  },

  /**
   * PromoCard
   */
  promo: {
    container: 'mx-4 rounded-[20px] overflow-hidden shadow-lg',
    gradient: 'bg-gradient-to-br from-[#FFD100] to-[#FFC700]',
    button: 'bg-black text-white font-bold py-3 px-6 rounded-full shadow-md',
  },

  /**
   * FilterDrawer
   */
  filter: {
    overlay: 'bg-black/40',
    drawer: 'bg-white dark:bg-[#111111] rounded-t-[24px]',
    title: 'text-xl font-bold text-center',
    divider: 'h-px bg-gray-100 dark:bg-gray-700 my-4',
    radioSelected: 'border-[#FFD100] bg-yellow-50 dark:bg-yellow-900/20',
    checkboxSelected: 'bg-[#FFD100]',
    buttonReset: 'text-[#FFD100] font-semibold',
    buttonApply: 'bg-[#FFD100] text-black font-bold py-4 rounded-full shadow-md',
  },
} as const;

// ==================== HELPERS ====================

export function combineClasses(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}
