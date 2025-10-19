import { Ionicons } from '@expo/vector-icons';

// ==================== TYPES ====================
export type IoniconsName = keyof typeof Ionicons.glyphMap;

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger';
export type ButtonSize = 'small' | 'medium' | 'large';
export type CardVariant = 'default' | 'elevated' | 'outlined';
export type BadgeVariant = 'primary' | 'success' | 'danger' | 'warning' | 'info';
export type BadgeSize = 'small' | 'medium' | 'large';
export type AlertVariant = 'info' | 'success' | 'warning' | 'danger';
