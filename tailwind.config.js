/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Primary backgrounds
        navy: {
          DEFAULT: '#0A0E27',
          50: '#1A1F3A',
          100: '#252D4A',
          200: '#2D3654',
          300: '#3D4766',
        },
        // Crisis severity scale
        taiwan: {
          red: '#DC2626',
          critical: '#EF4444',
          caution: '#F59E0B',
          resilience: '#10B981',
          strategic: '#3B82F6',
          ai: '#8B5CF6',
        },
        // Risk gradient
        risk: {
          low: '#10B981',
          'low-light': '#34D399',
          medium: '#F59E0B',
          'medium-light': '#FBBF24',
          high: '#F97316',
          'high-light': '#EF4444',
          critical: '#DC2626',
          'critical-dark': '#991B1B',
        },
        // Text colors
        text: {
          primary: '#F8FAFC',
          secondary: '#CBD5E1',
          muted: '#94A3B8',
          emphasis: '#FCD34D',
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        heading: ['Montserrat', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['Roboto Mono', 'monospace'],
      },
      fontSize: {
        'hero': ['4.5rem', { lineHeight: '1', fontWeight: '800' }],
        'kpi': ['3.5rem', { lineHeight: '1', fontWeight: '700' }],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "taiwan-pulse": {
          "0%, 100%": { boxShadow: "0 0 10px rgba(220, 38, 38, 0.4)" },
          "50%": { boxShadow: "0 0 30px rgba(220, 38, 38, 0.8)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.8)", opacity: "1" },
          "100%": { transform: "scale(2)", opacity: "0" },
        },
        "slide-up": {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "count-up": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "glow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "taiwan-pulse": "taiwan-pulse 2s ease-in-out infinite",
        "pulse-ring": "pulse-ring 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "slide-up": "slide-up 0.4s ease-out",
        "count-up": "count-up 0.6s ease-out",
        "glow": "glow 2s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
      },
      boxShadow: {
        'taiwan': '0 0 20px rgba(220, 38, 38, 0.6)',
        'card': '0px 12px 32px rgba(220, 38, 38, 0.15)',
        'elevated': '0px 12px 32px rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
