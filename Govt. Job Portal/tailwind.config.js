/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#edf5ff',
          100: '#dae8ff',
          200: '#bbd3ff',
          300: '#8bb4ff',
          400: '#558aff',
          500: '#3366ff',
          600: '#0D47A1', // primary blue
          700: '#0238a1',
          800: '#052e80',
          900: '#0a2c68',
          950: '#061a44',
        },
        secondary: {
          50: '#fff8eb',
          100: '#ffecc6',
          200: '#ffda8c',
          300: '#ffc14d',
          400: '#ffa41f',
          500: '#FF9933', // saffron
          600: '#e67b00',
          700: '#cc5f02',
          800: '#a34908',
          900: '#863d0c',
          950: '#4b1e02',
        },
        accent: {
          50: '#e7f9ed',
          100: '#d0f3da',
          200: '#a0e6b6',
          300: '#6fd491',
          400: '#3fbd6a',
          500: '#138808', // green
          600: '#196835',
          700: '#17532b',
          800: '#164126',
          900: '#133621',
          950: '#0a1f12',
        },
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '100%',
            h1: {
              fontWeight: '700',
              marginTop: '2rem',
              marginBottom: '1rem',
            },
            h2: {
              fontWeight: '600',
              marginTop: '1.5rem',
              marginBottom: '0.75rem',
            },
            h3: {
              fontWeight: '600',
              marginTop: '1.25rem',
              marginBottom: '0.75rem',
            },
            p: {
              marginTop: '1rem',
              marginBottom: '1rem',
            },
            li: {
              marginTop: '0.25rem',
              marginBottom: '0.25rem',
            },
            a: {
              color: '#0D47A1',
              '&:hover': {
                color: '#052e80',
              },
            },
          },
        },
      },
    },
  },
  plugins: [
    function({ addComponents }) {
      addComponents({
        '.prose': {
          '& h1': {
            fontSize: '2rem',
            fontWeight: '700',
            lineHeight: '1.2',
            marginTop: '2rem',
            marginBottom: '1rem',
          },
          '& h2': {
            fontSize: '1.5rem',
            fontWeight: '600',
            lineHeight: '1.3',
            marginTop: '1.5rem',
            marginBottom: '0.75rem',
          },
          '& h3': {
            fontSize: '1.25rem',
            fontWeight: '600',
            lineHeight: '1.4',
            marginTop: '1.25rem',
            marginBottom: '0.75rem',
          },
          '& h4': {
            fontSize: '1.125rem',
            fontWeight: '600',
            lineHeight: '1.4',
            marginTop: '1.25rem',
            marginBottom: '0.5rem',
          },
          '& p': {
            marginTop: '1rem',
            marginBottom: '1rem',
            lineHeight: '1.6',
          },
          '& ul': {
            listStyleType: 'disc',
            paddingLeft: '1.5rem',
            marginTop: '1rem',
            marginBottom: '1rem',
          },
          '& ol': {
            listStyleType: 'decimal',
            paddingLeft: '1.5rem',
            marginTop: '1rem',
            marginBottom: '1rem',
          },
          '& li': {
            marginBottom: '0.5rem',
          },
          '& a': {
            color: '#0D47A1',
            textDecoration: 'underline',
            '&:hover': {
              color: '#052e80',
            },
          },
          '& blockquote': {
            borderLeftWidth: '4px',
            borderLeftColor: '#e5e7eb',
            paddingLeft: '1rem',
            fontStyle: 'italic',
            marginTop: '1.25rem',
            marginBottom: '1.25rem',
          },
          '& table': {
            width: '100%',
            tableLayout: 'auto',
            textAlign: 'left',
            marginTop: '2rem',
            marginBottom: '2rem',
          },
          '& thead': {
            borderBottomWidth: '2px',
            borderBottomColor: '#e5e7eb',
          },
          '& th': {
            padding: '0.75rem',
            verticalAlign: 'bottom',
          },
          '& tbody tr': {
            borderBottomWidth: '1px',
            borderBottomColor: '#e5e7eb',
          },
          '& td': {
            padding: '0.75rem',
            verticalAlign: 'top',
          },
          '& code': {
            backgroundColor: '#f3f4f6',
            borderRadius: '0.25rem',
            padding: '0.125rem 0.25rem',
            fontSize: '0.875rem',
          },
          '& pre': {
            backgroundColor: '#1f2937',
            color: '#f9fafb',
            borderRadius: '0.375rem',
            padding: '1rem',
            overflowX: 'auto',
            marginTop: '1.25rem',
            marginBottom: '1.25rem',
          },
          '& pre code': {
            backgroundColor: 'transparent',
            borderRadius: '0',
            padding: '0',
            fontSize: '0.875rem',
            color: 'inherit',
          },
        },
      });
    },
  ],
};