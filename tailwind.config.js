/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gov: {
          white: '#FFFFFF',
          orange: '#F58220',
          orangeDark: '#D96816',
          orangeLight: '#FFF3E7',
          cream: '#FFFAF5',
          charcoal: '#243044',
          gray: '#667085',
          border: '#E9E9E9',
          green: '#277A50',
          greenLight: '#EAF5EF',
          // Compatibility aliases
          navy: '#243044',
          navyDark: '#1a2332',
          blue: '#F58220',
          blueRoyal: '#D96816',
          blueLight: '#FFF3E7',
          saffron: '#F58220',
          saffronLight: '#FFF3E7',
          bg: '#FFFAF5',
          text: '#243044',
          textMuted: '#667085',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans Devanagari', 'system-ui', 'sans-serif'],
        devanagari: ['Noto Sans Devanagari', 'sans-serif'],
      },
      screens: {
        xs: '375px',
      },
    },
  },
  plugins: [],
};
