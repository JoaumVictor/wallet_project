/** @type {import('tailwindcss').Config} */

export const content = ["./src/**/*.{js,jsx,ts,tsx}"];

export const theme = {
  extend: {
    colors: {
      primary: {
        DEFAULT: "rgba(104, 149, 248, 1)",
        light: "rgba(104, 149, 248, 0.8)",
        dark: "rgba(104, 149, 248, 0.6)",
      },
      black: "#000000",
      white: "#ffffff",
      smoke: "rgba(233, 236, 239, 1)",
      gray: {
        0: "rgba(74, 82, 96, 1)",
        1: "#f8f9fa",
        2: "#e9ecef",
        3: "#dee2e6",
        4: "#ced4da",
        5: "#adb5bd",
        6: "#6c757d",
        7: "#495057",
        8: "#343a40",
        9: "#212529",
      },
      blue: {
        DEFAULT: "#007bff",
        light: "#5bc0de",
        dark: "#0056b3",
      },
      red: {
        DEFAULT: "#dc3545",
        light: "#e57373",
        dark: "#c82333",
      },
      orange: {
        DEFAULT: "#fd7e14",
        light: "#ffad66",
        dark: "#e65100",
      },
      green: {
        DEFAULT: "#28a745",
        light: "#66bb6a",
        dark: "#1e7e34",
      },
      yellow: {
        DEFAULT: "#ffc107",
        light: "#ffecb3",
        dark: "#ff9800",
      },
    },
    fontFamily: {
      sans: ["Poppins", "sans-serif"],
    },
    fontWeight: {
      bold: "500",
    },
  },
};

export const plugins = [];
