/**
 * Class Name Utility
 * Merge et filtre les classes Tailwind
 *
 * Principes: KISS, YAGNI
 *
 * @example
 * cn('bg-white', isDark && 'bg-black', 'p-4')
 * // => 'bg-white p-4' (if !isDark)
 * // => 'bg-black p-4' (if isDark)
 */

type ClassValue = string | false | undefined | null;

/**
 * Combine plusieurs classes conditionnellement
 * Filtre les valeurs falsy (false, null, undefined, '')
 */
export function cn(...classes: ClassValue[]): string {
  return classes
    .filter((cls): cls is string => {
      // Filtre les valeurs falsy
      return typeof cls === 'string' && cls.length > 0;
    })
    .join(' ')
    .trim();
}

/**
 * Variante pour les objets conditionnels (style React)
 *
 * @example
 * cnObject({
 *   'bg-white': !isDark,
 *   'bg-black': isDark,
 *   'p-4': true,
 * })
 * // => 'bg-black p-4' (if isDark)
 */
export function cnObject(classObj: Record<string, boolean | undefined | null>): string {
  return Object.entries(classObj)
    .filter(([_, condition]) => condition)
    .map(([className]) => className)
    .join(' ')
    .trim();
}
