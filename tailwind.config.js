/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      sm: '640px',
      // => @media (min-width: 640px) { ... }
      md: '768px',
      // => @media (min-width: 768px) { ... }
      lg: '1024px',
      // => @media (min-width: 1024px) { ... }
      xl: '1280px',
      // => @media (min-width: 1280px) { ... }
      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
    },
    extend: {
      fontFamily: {
        'red-hat': ['Red Hat Text', 'sans-serif'],
      },
      fontWeight: {
        normal: 100,
        bold: 700,
      },
      colors: {
        Red: 'hsl(14, 86%, 42%)',
        Green: 'hsl(159, 69%, 38%)',
        'Rose-50': 'hsl(20, 50%, 98%)',
        'Rose-100': 'hsl(13, 31%, 94%)',
        'Rose-300': 'hsl(14, 25%, 72%)',
        'Rose-400': 'hsl(7, 20%, 60%)',
        'Rose-500': 'hsl(12, 20%, 44%)',
        'Rose-900': 'hsl(14, 65%, 9%)',
      },
    },
    plugins: [],
  },
};
