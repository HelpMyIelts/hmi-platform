/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background) / <alpha-value>)',
        foreground: 'hsl(var(--foreground) / <alpha-value>)',
        card: {
          DEFAULT: 'hsl(var(--card) / <alpha-value>)',
          foreground: 'hsl(var(--card-foreground) / <alpha-value>)',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover) / <alpha-value>)',
          foreground: 'hsl(var(--popover-foreground) / <alpha-value>)',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary) / <alpha-value>)',
          foreground: 'hsl(var(--primary-foreground) / <alpha-value>)',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary) / <alpha-value>)',
          foreground: 'hsl(var(--secondary-foreground) / <alpha-value>)',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted) / <alpha-value>)',
          foreground: 'hsl(var(--muted-foreground) / <alpha-value>)',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent) / <alpha-value>)',
          foreground: 'hsl(var(--accent-foreground) / <alpha-value>)',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive) / <alpha-value>)',
          foreground: 'hsl(var(--destructive-foreground) / <alpha-value>)',
        },
        border: 'hsl(var(--border) / <alpha-value>)',
        input: 'hsl(var(--input) / <alpha-value>)',
        ring: 'hsl(var(--ring) / <alpha-value>)',
        brand: {
          100: 'hsl(var(--brand-100) / <alpha-value>)',
          200: 'hsl(var(--brand-200) / <alpha-value>)',
          300: 'hsl(var(--brand-300) / <alpha-value>)',
          400: 'hsl(var(--brand-400) / <alpha-value>)',
          500: 'hsl(var(--brand-500) / <alpha-value>)',
          600: 'hsl(var(--brand-600) / <alpha-value>)',
          700: 'hsl(var(--brand-700) / <alpha-value>)',
          800: 'hsl(var(--brand-800) / <alpha-value>)',
          900: 'hsl(var(--brand-900) / <alpha-value>)',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        card: '16px',
        tag: '8px',
      },
      fontFamily: {
        heading: ['BarlowCondensed_600SemiBold'],
        body: ['Barlow_400Regular'],
        'body-medium': ['Barlow_500Medium'],
        'body-bold': ['Barlow_700Bold'],
      },
    },
  },
  plugins: [],
};
