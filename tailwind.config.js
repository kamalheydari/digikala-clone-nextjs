module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        vazir: 'Vazir',
      },
      boxShadow: {
        sm: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
        default: '0px 2px 2px 0px rgba(0, 0, 0, 0.25)',
        md: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
        lg: '0px 6px 6px 0px rgba(0, 0, 0, 0.25)',
        xl: ' 0px 8px 8px 0px rgba(0, 0, 0, 0.25)',
        '2xl': '0px 12px 12px 0px rgba(0, 0, 0, 0.25)',
        '3xl': '0px 16px 16px 0px rgba(0, 0, 0, 0.25)',
        '4xl': '0 0 15px 5px rgba(0,0,0,0.22)',
      },
      colors: {
        gray: {},
      },
    },
    container: {
      center: true,
    },
  },
  plugins: [],
}
