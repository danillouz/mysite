const defaultTheme = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,md,mdx,ts,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
    },
    extend: {
      fontFamily: {
        serif: ["Merriweather", ...defaultTheme.fontFamily.serif],
      },
      backgroundColor: {
        danos: {
          body: "rgb(var(--color-bg-body) / <alpha-value>)",
          "body-inverted": "rgb(var(--color-bg-body-inverted) / <alpha-value>)",
          primary: "rgb(var(--color-bg-primary) / <alpha-value>)",
          "primary-inverted":
            "rgb(var(--color-bg-primary-inverted) / <alpha-value>)",
          secondary: "rgb(var(--color-bg-secondary) / <alpha-value>)",
          "secondary-inverted":
            "rgb(var(--color-bg-secondary-inverted) / <alpha-value>)",
          hover: "rgb(var(--color-bg-hover) / <alpha-value>)",
          "hover-inverted":
            "rgb(var(--color-bg-hover-inverted) / <alpha-value>)",
        },
      },
      textColor: {
        danos: {
          primary: "rgb(var(--color-text-primary) / <alpha-value>)",
          "primary-inverted":
            "rgb(var(--color-text-primary-inverted) / <alpha-value>)",
          secondary: "rgb(var(--color-text-secondary) / <alpha-value>)",
          "secondary-inverted":
            "rgb(var(--color-text-secondary-inverted) / <alpha-value>)",
          tertiary: "rgb(var(--color-text-tertiary) / <alpha-value>)",
          "tertiary-inverted":
            "rgb(var(--color-text-tertiary-inverted) / <alpha-value>)",
          link: "rgb(var(--color-text-link) / <alpha-value>)",
          "link-inverted":
            "rgb(var(--color-text-link-inverted) / <alpha-value>)",
          highlight: "rgb(var(--color-text-highlight) / <alpha-value>)",
          "highlight-inverted":
            "rgb(var(--color-text-highlight-inverted) / <alpha-value>)",
        },
      },
      ringColor: {
        danos: {
          primary: "rgb(var(--color-border-primary) / <alpha-value>)",
          "primary-inverted":
            "rgb(var(--color-border-primary-inverted) / <alpha-value>)",
          secondary: "rgb(var(--color-border-secondary) / <alpha-value>)",
          "secondary-inverted":
            "rgb(var(--color-border-secondary-inverted) / <alpha-value>)",
          focus: "rgb(var(--color-focus-primary) / <alpha-value>)",
          "focus-inverted":
            "rgb(var(--color-focus-primary-inverted) / <alpha-value>)",
        },
      },
      borderColor: {
        danos: {
          primary: "rgb(var(--color-border-primary) / <alpha-value>)",
          "primary-inverted":
            "rgb(var(--color-border-primary-inverted) / <alpha-value>)",
        },
      },
      typography: {
        danos: {
          css: {
            "--tw-prose-body": "rgb(var(--color-text-secondary))",
            "--tw-prose-headings": "rgb(var(--color-text-primary))",
            "--tw-prose-lead": "rgb(var(--color-text-secondary))",
            "--tw-prose-links": "rgb(var(--color-text-link))",
            "--tw-prose-bold": "rgb(var(--color-text-special))",
            "--tw-prose-counters": "rgb(var(--color-text-secondary))",
            "--tw-prose-bullets": "rgb(var(--color-text-tertiary))",
            "--tw-prose-hr": "rgb(var(--color-border-primary))",
            "--tw-prose-quotes": "rgb(var(--color-text-special))",
            "--tw-prose-quote-borders": "rgb(var(--color-border-primary))",
            "--tw-prose-captions": "rgb(var(--color-text-secondary))",
            "--tw-prose-code": "rgb(var(--color-text-special))",
            "--tw-prose-pre-code": "rgb(var(--color-text-special))",
            "--tw-prose-pre-bg": "rgb(var(--color-bg-secondary) / 50%)",
            "--tw-prose-th-borders": "rgb(var(--color-border-primary))",
            "--tw-prose-td-borders": "rgb(var(--color-border-primary))",
            "--tw-prose-invert-body":
              "rgb(var(--color-text-secondary-inverted))",
            "--tw-prose-invert-headings":
              "rgb(var(--color-text-primary-inverted))",
            "--tw-prose-invert-lead":
              "rgb(var(--color-text-secondary-inverted))",
            "--tw-prose-invert-links": "rgb(var(--color-text-link-inverted))",
            "--tw-prose-invert-bold": "rgb(var(--color-text-special-inverted))",
            "--tw-prose-invert-counters":
              "rgb(var(--color-text-secondary-inverted))",
            "--tw-prose-invert-bullets":
              "rgb(var(--color-text-tertiary-inverted))",
            "--tw-prose-invert-hr": "rgb(var(--color-border-primary-inverted))",
            "--tw-prose-invert-quotes":
              "rgb(var(--color-text-special-inverted))",
            "--tw-prose-invert-quote-borders":
              "rgb(var(--color-border-primary-inverted))",
            "--tw-prose-invert-captions":
              "rgb(var(--color-text-secondary-inverted))",
            "--tw-prose-invert-code": "rgb(var(--color-text-special-inverted))",
            "--tw-prose-invert-pre-code":
              "rgb(var(--color-text-special-inverted))",
            "--tw-prose-invert-pre-bg":
              "rgb(var(--color-bg-secondary-inverted) / 50%)",
            "--tw-prose-invert-th-borders":
              "rgb(var(--color-border-primary-inverted))",
            "--tw-prose-invert-td-borders":
              "rgb(var(--color-border-primary-inverted))",
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
}
