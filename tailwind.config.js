module.exports = {
  purge: {
    enabled: true,
    content: [
      "./src/app/features/**/*.{html,js}",
      "./src/app/shared/**/*.{html,js}",
    ],
  },
  darkMode: false,
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
}
