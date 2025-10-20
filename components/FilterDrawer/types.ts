/**
 * Filter types and interfaces
 * Keep it simple - only checkbox and radio for now (YAGNI)
 */

export type FilterType = 'checkbox' | 'radio';

export interface FilterOption {
  id: string;
  label: string;
  value: string;
}

export interface FilterConfig {
  id: string;
  title: string;
  type: FilterType;
  options: FilterOption[];
}

export type SelectedFilters = Record<string, string | string[]>;
