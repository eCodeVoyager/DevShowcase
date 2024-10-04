export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    "postcss-preset-mantine": {},
    "postcss-simple-vars": {
      variables: {
        "mantine-breakpoint-xs": "36em",
        "mantine-breakpoint-sm": "576px",
        "mantine-breakpoint-md": "768px",
        "mantine-breakpoint-lg": "1024px",
        "mantine-breakpoint-xl": "1280px",
      },
    },
  },
};
