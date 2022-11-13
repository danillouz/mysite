/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,md,mdx,ts,tsx}"],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            img: {
              "border-radius": "0.75rem", // rounded-xl
            },
            pre: {
              "border-radius": "0.75rem", // rounded-xl
              border: "1px solid",
              "border-color": "var(--tw-prose-quote-borders)",
            },
            "code::before": {
              content: "none",
            },
            "code::after": {
              content: "none",
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
}
