import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background)/<alpha-value>)",
        foreground: "hsl(var(--foreground)/<alpha-value>)",
        redunilim: "hsl(var(--redunilim)/<alpha-value>)",
      },
    },
  },
  plugins: [],
} satisfies Config;
