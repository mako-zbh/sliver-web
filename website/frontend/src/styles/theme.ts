export const theme = {
  colors: {
    bg: {
      primary: '#1a1a1a',
      secondary: '#252525',
    },
    border: '#3a3a3a',
    text: {
      primary: '#e0e0e0',
      secondary: '#a0a0a0',
    },
    accent: '#ff6600',
    success: '#00cc66',
    warning: '#ff3333',
    info: '#3399ff',
  },
  fonts: {
    mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
    sans: ['Inter', 'system-ui', 'sans-serif'],
  },
};

export type Theme = typeof theme;
