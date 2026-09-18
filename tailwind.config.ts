import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            spacing: {
                18: '4.5rem',
            },
            colors: {
                primary: {
                    50: '#EBF5FB',
                    100: '#D6EAF8',
                    200: '#AED6F1',
                    300: '#85C1E9',
                    400: '#5DADE2',
                    500: '#2E86C1',
                    600: '#2874A6',
                    700: '#21618C',
                    800: '#1A5276',
                    900: '#154360',
                },
            },
            fontFamily: {
                sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
            },
            animation: {
                'fade-in': 'fadeIn 0.3s ease-out',
                'fade-in-up': 'fadeInUp 0.4s ease-out',
                'slide-in-right': 'slideInRight 0.3s ease-out',
                'scale-in': 'scaleIn 0.2s ease-out',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                slideInRight: {
                    '0%': { opacity: '0', transform: 'translateX(100%)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                scaleIn: {
                    '0%': { opacity: '0', transform: 'scale(0.9)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
            },
            transitionTimingFunction: {
                'bounce-soft': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                'elastic': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            },
        },
    },
    plugins: [],
};

export default config;