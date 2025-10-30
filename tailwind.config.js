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
      // ==================== COULEURS - DESIGN TOKENS ====================
      colors: {
        // Background (arrière-plan principal)
        background: {
          DEFAULT: '#fffaf1',      // Light mode - crème très clair
          dark: '#1e1e1e',         // Dark mode - noir doux
        },

        // Foreground (texte principal)
        foreground: {
          DEFAULT: '#2b2b2b',      // Light mode - gris très foncé
          dark: '#fffaf1',         // Dark mode - crème clair
        },

        // Card (cartes)
        card: {
          DEFAULT: '#fff5d6',      // Light mode - jaune très pâle
          foreground: '#333333',   // Light mode text
          dark: '#2a2a2a',         // Dark mode - gris foncé
          'dark-foreground': '#fffaf1', // Dark mode text
        },

        // Popover
        popover: {
          DEFAULT: '#fff5d6',      // Light mode
          foreground: '#333333',   // Light mode text
          dark: '#2a2a2a',         // Dark mode
          'dark-foreground': '#fffaf1', // Dark mode text
        },

        // Primary (couleur principale - JAUNE)
        primary: {
          DEFAULT: '#f9c500',      // Light mode - jaune vif
          foreground: '#000000',   // Texte noir sur jaune
          dark: '#ffcb05',         // Dark mode - jaune légèrement plus clair
          'dark-foreground': '#000000', // Dark mode text (noir sur jaune)
        },

        // Secondary (couleur secondaire - ORANGE)
        secondary: {
          DEFAULT: '#ff8c42',      // Orange
          foreground: '#ffffff',   // Texte blanc sur orange
        },

        // Muted (couleurs atténuées)
        muted: {
          DEFAULT: '#f2e7c9',      // Light mode - beige pâle
          foreground: '#5a4a1b',   // Light mode text - brun
          dark: '#3a3a3a',         // Dark mode - gris moyen
          'dark-foreground': '#f0e6b3', // Dark mode text - beige clair
        },

        // Accent (VERT pour contraste)
        accent: {
          DEFAULT: '#79b851',      // Vert
          foreground: '#ffffff',   // Texte blanc
        },

        // Destructive (erreur/suppression)
        destructive: {
          DEFAULT: '#e74c3c',      // Light mode - rouge
          foreground: '#ffffff',   // Texte blanc sur rouge
          dark: '#ff6246',         // Dark mode - rouge orangé
          'dark-foreground': '#ffffff', // Dark mode text
        },

        // Border (bordures)
        border: {
          DEFAULT: '#f4d36b',      // Light mode - jaune doré
          dark: '#f9c500',         // Dark mode - jaune vif
        },

        // Input (champs de formulaire)
        input: {
          DEFAULT: '#e8bf3a',      // Light mode - jaune moutarde
          dark: '#ffcb05',         // Dark mode - jaune vif
        },

        // Ring (focus)
        ring: {
          DEFAULT: '#ffcb05',      // Light mode
          dark: '#fdd85d',         // Dark mode
        },

        // Charts
        chart: {
          1: '#f9c500',            // Jaune
          2: '#ff8c42',            // Orange
          3: '#79b851',            // Vert
          4: '#f5a623',            // Orange foncé
          5: '#fdd85d',            // Jaune pâle
        },

        // Sidebar
        sidebar: {
          DEFAULT: '#fff8e0',      // Light mode
          foreground: '#2b2b2b',   // Light mode text
          primary: '#f9c500',
          'primary-foreground': '#000000',
          accent: '#ff8c42',
          'accent-foreground': '#ffffff',
          border: '#e8bf3a',       // Light mode
          ring: '#ffcb05',
          dark: '#252525',         // Dark mode
          'dark-foreground': '#fffaf1', // Dark mode text
          'dark-border': '#f5a623', // Dark mode
          'dark-ring': '#fdd85d',
        },

        // Backward compatibility aliases
        surface: {
          DEFAULT: '#fffaf1',      // = background light
          secondary: '#fff5d6',    // = card light
          dark: '#1e1e1e',         // = background dark
          'dark-secondary': '#2a2a2a', // = card dark
        },

        // Status colors
        success: {
          DEFAULT: '#79b851',      // Vert (accent)
          light: '#86EFAC',
          dark: '#15803D',
        },
        error: {
          DEFAULT: '#e74c3c',
          light: '#ff6246',
          dark: '#b71a1b',
        },
        warning: {
          DEFAULT: '#ff8c42',      // Orange (secondary)
          light: '#f5a623',
          dark: '#d64417',
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
