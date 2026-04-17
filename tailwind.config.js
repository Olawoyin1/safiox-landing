/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                safiox: {
                    red: '#dc2626',
                    dark: '#0f172a',
                    card: '#1e293b',
                    border: '#334155',
                    muted: '#94a3b8'
                }
            },
            fontFamily: {
                sans: ['Outfit', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
