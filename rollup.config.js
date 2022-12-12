import { terser } from "rollup-plugin-terser";
import typescript from "rollup-plugin-typescript2";
import { string } from "rollup-plugin-string";

export default {
  input: "index.ts",
  external: ["fs", "vite", "axios"],
  output: [{ file: "dist/index.es.js", format: "es" }],
  plugins: [
    string({
      include: "**/*.ejs",
    }),
    typescript({
      rollupCommonJSResolveHack: false,
      // clean: true,
    }),
    terser(),
  ],
};
