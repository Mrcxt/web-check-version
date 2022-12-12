import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import generateFile from "vite-plugin-generate-file";
// https://vitejs.dev/config/
export default defineConfig({
    server: {
        port: 8000, //
    },
    plugins: [
        vue(),
        generateFile([
            // version.json 标识当前版本信息，用于页面更新提醒
            {
                type: "json",
                output: "version.json",
                data: {
                    version: Date.now(),
                },
            },
        ]),
    ],
});
