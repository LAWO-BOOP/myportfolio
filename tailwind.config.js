tailwind.config = {
  theme: {
    extend: {
      colors: {
        sky:    { 50: '#eaf3ff', 100: '#d3e6ff', 200: '#a8ccff' },
        signal: { 400: '#4a7ff2', 500: '#2f6fed', 600: '#1e4fc2' },
        ink:    { 900: '#0d1830', 500: '#5b6b8c' }
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px 0 rgba(47, 111, 237, 0.35)' },
          '50%':      { boxShadow: '0 0 40px 10px rgba(47, 111, 237, 0.5)' },
        },
        blink: {
          '50%': { opacity: 0 },
        },
        type: {
          from: { width: '0' },
          to:   { width: '11ch' },
        },
        caret: {
          '50%': { borderColor: 'transparent' },
        },
        'slide-down': {
          '0%':   { opacity: 0, transform: 'translateY(-10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        float:        'float 4s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        blink:        'blink 1.1s steps(1) infinite',
        typewriter:   'type 1.8s steps(end) forwards, caret 0.75s step-end infinite',
        'slide-down': 'slide-down 0.25s ease forwards',
      },
    },
  },
}




