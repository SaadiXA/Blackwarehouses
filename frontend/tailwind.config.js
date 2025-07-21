/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      fontFamily: {
        'arabic': ['Cairo', 'Amiri', 'sans-serif'],
        'cairo': ['Cairo', 'sans-serif'],
        'amiri': ['Amiri', 'serif'],
      },
      colors: {
        // Custom gold colors matching the reference design
        'gold': '#FFD700',
        'gold-dark': '#B8860B',
        'gold-light': '#FFED4E',
        
        // Keep existing color system
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0'
          },
          to: {
            height: 'var(--radix-accordion-content-height)'
          }
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)'
          },
          to: {
            height: '0'
          }
        },
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(30px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        'float': {
          '0%, 100%': {
            transform: 'translateY(0px) rotate(0deg)',
            opacity: '0.7'
          },
          '33%': {
            transform: 'translateY(-20px) rotate(120deg)',
            opacity: '1'
          },
          '66%': {
            transform: 'translateY(10px) rotate(240deg)',
            opacity: '0.8'
          }
        },
        'pulse-gold': {
          '0%, 100%': {
            boxShadow: '0 0 0 0 rgba(255, 215, 0, 0.7)'
          },
          '50%': {
            boxShadow: '0 0 0 10px rgba(255, 215, 0, 0)'
          }
        },
        'shimmer': {
          '0%': {
            backgroundPosition: '200% 0'
          },
          '100%': {
            backgroundPosition: '-200% 0'
          }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in-up': 'fade-in-up 0.6s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'pulse-gold': 'pulse-gold 2s infinite',
        'shimmer': 'shimmer 1.5s infinite linear'
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem'
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1.8' }],
        'sm': ['0.875rem', { lineHeight: '1.8' }],
        'base': ['1rem', { lineHeight: '1.8' }],
        'lg': ['1.125rem', { lineHeight: '1.8' }],
        'xl': ['1.25rem', { lineHeight: '1.8' }],
        '2xl': ['1.5rem', { lineHeight: '1.7' }],
        '3xl': ['1.875rem', { lineHeight: '1.6' }],
        '4xl': ['2.25rem', { lineHeight: '1.5' }],
        '5xl': ['3rem', { lineHeight: '1.4' }],
        '6xl': ['3.75rem', { lineHeight: '1.3' }],
      },
      screens: {
        'xs': '475px',
      },
      boxShadow: {
        'gold': '0 0 20px rgba(255, 215, 0, 0.3)',
        'gold-lg': '0 0 30px rgba(255, 215, 0, 0.4)',
        'inset-gold': 'inset 0 2px 4px 0 rgba(255, 215, 0, 0.1)',
      },
      backdropBlur: {
        'xs': '2px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gold-gradient': 'linear-gradient(45deg, #FFD700, #FFA500)',
        'gold-gradient-reverse': 'linear-gradient(225deg, #FFD700, #FFA500)',
      }
    }
  },
  plugins: [
    require("tailwindcss-animate"),
    // Custom plugin for RTL support
    function({ addUtilities }) {
      const newUtilities = {
        '.rtl': {
          direction: 'rtl',
        },
        '.ltr': {
          direction: 'ltr',
        }
      }
      addUtilities(newUtilities)
    }
  ],
};