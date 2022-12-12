import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import webVersionCheck from "web-check-version";

webVersionCheck({
  filePath: "version.json",
  interval: 5 * 1000,
  key: "version",
  update(reload, { version }) {
    const confirm = window.confirm(`
    "发现新版本，是否刷新"
    "最新版本号为：", ${version}
    `);
    if (confirm) {
      reload?.();
    }
  },
  debug: false, //是否开启debug模式， debug模式下，update回调时机与实际相反。主要用于测试
});
createApp(App).mount("#app");
