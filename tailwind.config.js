/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'deep-ocean':   '#0a2540',
        'abyss':        '#05162b',
        'tide':         '#0891a6',
        'tide-pressed': '#066474',
        'foam':         '#5eead4',
        'seaglass':     '#c8e7e3',
        'sand':         '#fef8ed',
        'shell':        '#ffe4cc',
        'coral':        '#ff8a65',
        'driftwood':    '#8b7355',
        'horizon':      '#d5e6e3',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};
