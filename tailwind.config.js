/** @type {import('tailwindcss').Config} */

module.exports = {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        screens: {
            // Add extra 'xs' breakpoint to Tailwind defaults
            'xs': '440px',
            'sm': '576px',
            'md': '960px',
            'lg': '1440px',
        }
    },
    plugins: []
};
