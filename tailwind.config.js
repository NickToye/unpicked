const colors = require('tailwindcss/colors');

module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html  '],
    darkMode: false, // or 'media' or 'class'
    theme: {
        colors: {
            transparent: 'transparent',
            current: 'currentColor',
            black: colors.black,
            white: colors.white,
            gray: colors.coolGray,
            red: colors.red,
            yellow: colors.amber,
            blue: colors.lightBlue,
            green: colors.green,
            cyan: colors.cyan,
        },
        extend: {
            colors: {
                'regal-blue': '#243c5a',
                'bleed-blue': '#3B82F6',
                'cobalt-blue': '#0f354b',
                'cobalt-dark-blue': '#0b273a',
                'cobalt-darkest-blue': '#11232e',
                'cobalt-yellow': '#ffc500',
                'sidebar-new': '#8a1123',
                'main-new': '#004266',
                'button-new': '#d8cabf',
                'special-new': '#3a414f',
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
