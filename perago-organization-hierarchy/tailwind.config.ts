import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4CAF50', 
          light: '#81C784',
          dark: '#388E3C', 
        },
        secondary: {
          DEFAULT: '#FF9800', 
          light: '#FFB74D', 
          dark: '#F57C00',
        },
        background: {
          DEFAULT: '#F9FAFB', 
          dark: '#212121', 
        },
        surface: {
          DEFAULT: '#FFFFFF', 
          dark: '#F5F5F5', 
        },
        text: {
          primary: '#212121', 
          secondary: '#757575',
          light: '#FFFFFF', 
        },
        border: '#E0E0E0', 
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'], 
      },
      spacing: {
        128: '32rem',
        144: '36rem',
      },
      borderRadius: {
        xl: '1.5rem',
      },
    },
  },
  plugins: [],
} satisfies Config;
