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
        primary: {
          main: "#ccd5ae",
          light: "#dbb44d",
        },
        secondary: {
          main: "#b7aed5",
        },
        info: {
          main: "#aeccd5",
        },
        success: {
          main: "#aed5b7",
        },
        background: {
          default: "#eaf5ed",
          paper: "#c9e1e8",
        },
      },
    },
  },
  plugins: [],
};
export default config;
