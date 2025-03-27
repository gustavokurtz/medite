const config = {
  plugins: {
    "@tailwindcss/postcss": {
      content: [
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
      ],
      theme: {
        extend: {
          colors: {
            background: '#F8FAFC',    // bg-slate-50
            primary: '#A5B4FC',       // lavanda suave (indigo-300)
            secondary: '#E0E7FF',     // azul claro lavanda
            accent: '#C7D2FE',        // azul pastel
            text: '#1E293B',          // azul escuro sóbrio
          },
        },
      },
    },
  },
};

export default config;