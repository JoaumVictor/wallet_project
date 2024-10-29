import { resolve } from "path";

export default {
  webpack: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
};
