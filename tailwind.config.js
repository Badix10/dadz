/** @type {import('tailwindcss').Config} */
module.exports = {
  // Chemins où Tailwind doit chercher les classes
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./navigation/**/*.{js,jsx,ts,tsx}",
    "./contexts/**/*.{js,jsx,ts,tsx}",
    "./hooks/**/*.{js,jsx,ts,tsx}",
  ],

  // Configuration du mode presets pour NativeWind
  presets: [require("nativewind/preset")],

  // Activation du dark mode
  darkMode: "class",

  theme: {
    extend: {
      // ==================== COULEURS ====================
      colors: {
        // Couleur principale de l'application
        primary: {
          DEFAULT: '#FFC700',
          50: '#FFF9E6',
          100: '#FFF3CC',
          200: '#FFE799',
          300: '#FFDB66',
          400: '#FFCF33',
          500: '#FFC700', // Couleur principale
          600: '#CC9F00',
          700: '#997700',
          800: '#664F00',
          900: '#332800',
        },

        // Couleurs de texte
        text: {
          primary: '#1A1A1A',
          secondary: '#6B7280',
          light: '#9CA3AF',
          dark: '#111827',
        },

        // Couleurs de fond
        background: {
          DEFAULT: '#FFFFFF',
          light: '#FCFBF8',
          dark: '#231F0F',
          secondary: '#F9FAFB',
        },

        // Couleurs pour les champs (inputs)
        field: {
          light: '#F4F2E6',
          dark: '#2D291A',
        },

        // Couleurs pour le sous-texte
        subtext: {
          light: '#9E9047',
          dark: '#9E9047',
        },

        // Couleurs sémantiques
        success: {
          DEFAULT: '#22C55E',
          light: '#86EFAC',
          dark: '#15803D',
        },
        error: {
          DEFAULT: '#EF4444',
          light: '#FCA5A5',
          dark: '#B91C1C',
        },
        warning: {
          DEFAULT: '#F59E0B',
          light: '#FCD34D',
          dark: '#B45309',
        },
        info: {
          DEFAULT: '#3B82F6',
          light: '#93C5FD',
          dark: '#1E40AF',
        },
      },

      // ==================== POLICES ====================
      fontFamily: {
        // Police principale
        display: ['Plus Jakarta Sans', 'sans-serif'],
        sans: ['Plus Jakarta Sans', 'sans-serif'],

        // Variantes (si nécessaire)
        body: ['Plus Jakarta Sans', 'sans-serif'],
        heading: ['Plus Jakarta Sans', 'sans-serif'],
      },

      // ==================== TAILLES DE POLICE ====================
      fontSize: {
        // Tailles personnalisées
        'xs': ['12px', { lineHeight: '16px' }],
        'sm': ['14px', { lineHeight: '20px' }],
        'base': ['16px', { lineHeight: '24px' }],
        'lg': ['18px', { lineHeight: '28px' }],
        'xl': ['20px', { lineHeight: '28px' }],
        '2xl': ['24px', { lineHeight: '32px' }],
        '3xl': ['30px', { lineHeight: '36px' }],
        '4xl': ['36px', { lineHeight: '40px' }],
      },

      // ==================== BORDER RADIUS ====================
      borderRadius: {
        'none': '0',
        'sm': '4px',
        'DEFAULT': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '20px',
        '2xl': '24px',
        '3xl': '32px',
        'full': '9999px',
      },

      // ==================== ESPACEMENTS ====================
      spacing: {
        // Espacements personnalisés (en plus des defaults)
        '18': '72px',
        '22': '88px',
        '88': '352px',
        '92': '368px',
      },

      // ==================== OMBRES ====================
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'DEFAULT': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'primary': '0 10px 15px -3px rgba(255, 199, 0, 0.2)',
        'yellow': '0 10px 15px -3px rgba(254, 240, 138, 0.5)',
        'none': 'none',
      },

      // ==================== HAUTEURS ====================
      height: {
        'header': '80px',
        'navbar': '80px',
        'button': '56px',
        'input': '56px',
      },

      // ==================== LARGEURS MAXIMALES ====================
      maxWidth: {
        'form': '480px',
        'container': '1280px',
        'content': '768px',
      },

      // ==================== Z-INDEX ====================
      zIndex: {
        'navbar': 50,
        'modal': 100,
        'dropdown': 75,
        'overlay': 90,
      },

      // ==================== OPACITÉ ====================
      opacity: {
        '15': '0.15',
        '35': '0.35',
        '65': '0.65',
        '80': '0.80',
      },

      // ==================== ANIMATIONS ====================
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-out': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        'slide-down': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'scale-out': {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(0.9)', opacity: '0' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-in-out',
        'fade-out': 'fade-out 0.3s ease-in-out',
        'slide-up': 'slide-up 0.3s ease-out',
        'slide-down': 'slide-down 0.3s ease-out',
        'scale-in': 'scale-in 0.2s ease-out',
        'scale-out': 'scale-out 0.2s ease-out',
      },
    },
  },
  plugins: [],
}
