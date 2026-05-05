import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
      screens: {
        '2xl': '1280px'
      }
    },
    extend: {
      colors: {
        ink: {
          deep: '#0A1628',
          elevated: '#0F1E33',
          line: '#1B2D45',
          'on-cream': '#1A2236'
        },
        gold: {
          DEFAULT: '#C9A961',
          bright: '#E0BE74',
          muted: '#8A7340'
        },
        cream: {
          DEFAULT: '#F5F0E1',
          muted: '#C9C2AE'
        }
      },
      fontFamily: {
        display: ['var(--font-display)'],
        sans: ['var(--font-sans)'],
        arabic: ['var(--font-arabic)']
      },
      fontSize: {
        '2xs': ['0.75rem', { lineHeight: '1rem' }],
        xs: ['0.875rem', { lineHeight: '1.25rem' }],
        sm: ['1rem', { lineHeight: '1.5rem' }],
        base: ['1.125rem', { lineHeight: '1.75rem' }],
        lg: ['1.375rem', { lineHeight: '1.875rem' }],
        xl: ['1.75rem', { lineHeight: '2.25rem' }],
        '2xl': ['2.25rem', { lineHeight: '2.75rem' }],
        '3xl': ['3rem', { lineHeight: '3.5rem' }],
        '4xl': ['4rem', { lineHeight: '4.5rem' }],
        '5xl': ['5.25rem', { lineHeight: '5.75rem' }]
      },
      letterSpacing: {
        eyebrow: '0.18em'
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #C9A961 0%, #E0BE74 50%, #8A7340 100%)',
        'ink-gradient': 'linear-gradient(180deg, #0A1628 0%, #0F1E33 100%)'
      }
    }
  },
  plugins: []
};

export default config;
