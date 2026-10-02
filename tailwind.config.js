/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.eta'],
  theme: {
    extend: {
      colors: {
        bg: '#09090B',
        surface: '#121215',
        line: '#27272A',
        ink: '#FAFAFA',
        muted: '#A1A1AA',
        accent: {
          DEFAULT: '#EF4444',
          strong: '#DC2626',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 20px rgba(239, 68, 68, 0.15)',
      },
      maxWidth: {
        site: '72rem',
      },
    },
  },
  plugins: [],
};
