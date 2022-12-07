import { resolve } from "path";
import { defineConfig } from "vite";
import typescript from "rollup-plugin-typescript2";

let defaults = { compilerOptions: { declaration: true } };
let override = { compilerOptions: { declaration: false } };

export default defineConfig({
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
      plugins: [
        typescript({
          rollupCommonJSResolveHack: false,
          clean: true,
        }),
      ],
    },
  },
});
