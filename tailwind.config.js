module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // map existing cyan usages to the new primary scale
        cyan: {
          50: '#F3F6FF',
          100: '#E8EEFF',
          200: '#C8D7FF',
          300: '#9FB7FF',
          400: '#2F46D6',
          500: '#3D5AFE',
          600: '#3149E0',
        },
        primary: {
          DEFAULT: '#3D5AFE',
          hover: '#2F46D6',
        },
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        'text-muted': 'var(--color-text-muted)',
        'page-bg': 'var(--color-page-bg)',
        'card-bg': 'var(--color-card-bg)',
        'card-border': 'var(--color-card-border)',
        'sidebar-bg': 'var(--color-sidebar-bg)',
        surface: 'var(--color-surface)',
        'surface-strong': 'var(--color-surface-strong)',
        'surface-muted': 'var(--color-surface-muted)',
        'input-bg': 'var(--color-input-bg)',
        'input-border': 'var(--color-input-border)',
        border: 'var(--color-border)',
        status: {
          success: {
            bg: 'var(--color-status-success-bg)',
            text: 'var(--color-status-success-text)',
          },
          pending: {
            bg: 'var(--color-status-pending-bg)',
            text: 'var(--color-status-pending-text)',
          },
          danger: {
            bg: 'var(--color-status-danger-bg)',
            text: 'var(--color-status-danger-text)',
          },
        },
        kpi: {
          lavender: '#F3E8FF',
          mint: '#ECFDF5',
          peach: '#FFF7ED',
          pink: '#FFF1F2',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      boxShadow: {
        'card-sm': '0 6px 18px rgba(15, 17, 21, 0.06)',
      },
      borderRadius: {
        '2xl': '1rem',
        xl: '0.75rem',
      },
      fontSize: {
        'h1-lg': ['40px', { lineHeight: '1.05', fontWeight: '700' }],
        'kpi': ['32px', { lineHeight: '1', fontWeight: '700' }],
      },
    },
  },
  plugins: [],
};
