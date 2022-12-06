import { resolve } from "path";
import { defineConfig } from "vite";
import typescript from "rollup-plugin-typescript2";

export default defineConfig({
  plugins: [
    typescript({
      rollupCommonJSResolveHack: false,
      clean: false,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "index",
      fileName: (format) => `index.${format}.js`,
    },
    sourcemap: true,
    rollupOptions: {
      external: ["axios"],
      output: {
        globals: {
          // vue: "Vue",
        },
      },
    },
  },
});
