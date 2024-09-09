import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // Note the addition of the `app` directory.
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        opacityChange: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideFromBottom: {
          from: { opacity: "0", bottom: "-300px" },
          to: { opacity: "1", bottom: "0" },
        },
      },
      animation: {
        opacityChange: "opacityChange 0.3s ease-in-out",
        slideFromBottom: "slideFromBottom 0.3s ease-in-out ",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      gridTemplateColumns: {
        bestseller_grid: "repeat(3, minmax(0, 1fr))",
        bestseller_container:
          "minmax(0,14rem) minmax(0,1fr) minmax(0,1fr) minmax(0,14rem)",
        book_preview_grid: "minmax(0,300px), minmax(auto,1fr)",
        register_grid: "minmax(aAuto,600px) minmax(0,1fr)",
      },
      fontFamily: {
        robotoSzef: "var(--font-dancingScript)",
        roboto: "var(--font-roboto)",
      },
      colors: {
        midnight_green: {
          DEFAULT: "#1a535c",
          100: "#051112",
          200: "#0a2125",
          300: "#0f3237",
          400: "#154249",
          500: "#1a535c",
          600: "#2b8a99",
          700: "#47bacb",
          800: "#84d1dc",
          900: "#c2e8ee",
        },
        robin_egg_blue: {
          DEFAULT: "#4ecdc4",
          100: "#0c2c2a",
          200: "#195853",
          300: "#25837d",
          400: "#31afa7",
          500: "#4ecdc4",
          600: "#70d7d0",
          700: "#94e1dc",
          800: "#b7ebe7",
          900: "#dbf5f3",
        },
        mint_cream: {
          DEFAULT: "#f7fff7",
          100: "#006400",
          200: "#00c800",
          300: "#2dff2d",
          400: "#91ff91",
          500: "#f7fff7",
          600: "#f7fff7",
          700: "#f9fff9",
          800: "#fbfffb",
          900: "#fdfffd",
        },
        light_red: {
          DEFAULT: "#ff6b6b",
          100: "#480000",
          200: "#910000",
          300: "#d90000",
          400: "#ff2323",
          500: "#ff6b6b",
          600: "#ff8989",
          700: "#ffa6a6",
          800: "#ffc4c4",
          900: "#ffe1e1",
        },
        naples_yellow: {
          DEFAULT: "#ffe66d",
          100: "#483c00",
          200: "#917900",
          300: "#d9b500",
          400: "#ffda23",
          500: "#ffe66d",
          600: "#ffeb89",
          700: "#fff0a6",
          800: "#fff5c4",
          900: "#fffae1",
        },
      },
    },
  },
  plugins: [],
};
export default config;
