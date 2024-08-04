/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      coplette: ['Coplette', 'sans-serif'],
    },
    extend: {
      height: {
        screen: '100dvh',
      },
      gridTemplateColumns: {
        16: 'repeat(16, minmax(0, 1fr))',
        23: 'repeat(23, minmax(0, 1fr))',
      },
      gridTemplateRows: {
        18: 'repeat(18, minmax(0, 1fr))',
      },
      boxShadow: {
        'custom-light': '0 19px 38px rgba(0, 0, 0, 0.1), 0 15px 13px rgba(0, 0, 0, 0.1)', // Further lightened shadow
        'custom-hover': '0 10px 20px rgba(0, 0, 0, 0.1), 0 6px 6px rgba(0, 0, 0, 0.1)',
      },
      scale: {
        '95': '0.95',
      },
      transitionTimingFunction: {
        'custom': 'ease-in-out',
      },
      transitionDuration: {
        '200': '200ms',
      },
    },
  },
  variants: {
    extend: {
      boxShadow: ['hover'],
      scale: ['hover'],
      transitionProperty: ['hover'],
      transitionTimingFunction: ['hover'],
      transitionDuration: ['hover'],
    },
  },
  plugins: [],
};
