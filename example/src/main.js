import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { webVersionCheck } from "web-check-version";
webVersionCheck({
    filePath: "version.json",
    interval: 5 * 1000,
    key: "version",
    update(reload, { version }) {
        console.log("发现新版本，是否刷新");
        console.log("最新版本号为：", version);
        // reload?.();
        const confirm = window.confirm(`
    "发现新版本，是否刷新"
    "最新版本号为：", ${version}
    `);
    },
    debug: true,
});
createApp(App).mount("#app");
