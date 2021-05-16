module.exports = {
  purge: {
    enabled: process.env.HUGO_ENVIRONMENT === "production",
    content: [
      "./computer-techniques/layouts/**/*.html", 
      "./computer-techniques/content/**/*.md", 
      "./computer-techniques/content/**/*.html",
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
