/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.eta'],
  theme: {
    extend: {
      colors: {
        // Values live as CSS custom properties in src/input.css (dark +
        // light themes); RGB triplets keep Tailwind alpha modifiers working.
        bg: 'rgb(var(--c-bg) / <alpha-value>)',
        surface: 'rgb(var(--c-surface) / <alpha-value>)',
        line: 'rgb(var(--c-line) / <alpha-value>)',
        ink: 'rgb(var(--c-ink) / <alpha-value>)',
        muted: 'rgb(var(--c-muted) / <alpha-value>)',
        accent: {
          DEFAULT: 'rgb(var(--c-accent) / <alpha-value>)',
          strong: 'rgb(var(--c-accent-strong) / <alpha-value>)',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 20px rgb(var(--c-accent) / 0.15)',
      },
      maxWidth: {
        site: '72rem',
      },
    },
  },
  plugins: [],
};
