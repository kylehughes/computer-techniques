module.exports = {
  purge: {
    enabled: process.env.HUGO_ENVIRONMENT === "production",
    content: [
      "./source/layouts/**/*.html", 
      "./source/content/**/*.md", 
      "./source/content/**/*.html",
    ],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      listStyleType: {
        disc: 'disc',
        decimal: 'decimal',
        roman: 'upper-roman',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
