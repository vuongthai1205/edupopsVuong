/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './App.{js,jsx,ts,tsx}',
        './components/**/*.{js,jsx,ts,tsx}',
        './<custom directory>/**/*.{js,jsx,ts,tsx}',
    ],
    variants: {
        // ...
        padding: ['last'],
    },
    theme: {
        extend: {
            colors: {
                'main-color': '#D00CF7',
            },
        },
    },
    plugins: [],
};
