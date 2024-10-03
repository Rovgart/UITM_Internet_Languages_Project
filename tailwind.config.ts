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
        dashboard_layout: "minmax(100px, 250px) minmax(0,1fr) minmax(0,1fr)",
      },
      gridTemplateRows: {
        dashboard_rows: "minmax(2rem,5rem) minmax(0,1fr)",
      },
      fontFamily: {
        robotoSzef: "var(--font-dancingScript)",
        roboto: "var(--font-roboto)",
      },
      colors: {
        tea_green: {
          DEFAULT: "#ccd5ae",
          100: "#2d331a",
          200: "#5b6635",
          300: "#88994f",
          400: "#acbb7b",
          500: "#ccd5ae",
          600: "#d6debe",
          700: "#e1e6cf",
          800: "#ebeedf",
          900: "#f5f7ef",
        },
        beige: {
          DEFAULT: "#e9edc9",
          100: "#3d4216",
          200: "#79842c",
          300: "#b3c146",
          400: "#ced788",
          500: "#e9edc9",
          600: "#edf1d4",
          700: "#f2f4df",
          800: "#f6f8ea",
          900: "#fbfbf4",
        },
        cornsilk: {
          DEFAULT: "#fefae0",
          100: "#5d5103",
          200: "#baa206",
          300: "#f8dc27",
          400: "#fbeb84",
          500: "#fefae0",
          600: "#fefbe7",
          700: "#fefced",
          800: "#fffdf3",
          900: "#fffef9",
        },
        papaya_whip: {
          DEFAULT: "#faedcd",
          100: "#533e08",
          200: "#a57b10",
          300: "#eab227",
          400: "#f2d079",
          500: "#faedcd",
          600: "#fbf1d6",
          700: "#fcf4e0",
          800: "#fdf8eb",
          900: "#fefbf5",
        },
        buff: {
          DEFAULT: "#d4a373",
          100: "#32210f",
          200: "#64411f",
          300: "#96622e",
          400: "#c58341",
          500: "#d4a373",
          600: "#dcb68f",
          700: "#e5c8ab",
          800: "#eedac7",
          900: "#f6ede3",
        },
      },
    },
  },
  plugins: [],
};
export default config;
