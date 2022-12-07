/*
 * @LastEditTime: 2022-12-07 15:48:08
 * @Description:
 * @Date: 2022-12-06 14:33:17
 * @Author: @虾哔哔
 */
import axios from "axios";
const reload = () => {
    window.location.reload();
};
const getVersion = (filePath) => {
    return axios.get(filePath, {
        params: { t: Date.now() },
    });
};
export const webVersionCheck = (options) => {
    let version;
    let timer = 0;
    const { filePath = "version.json", interval = 5 * 60 * 1000, key = "version", update, } = options;
    const startTimer = () => {
        timer = window.setTimeout(() => {
            check();
        }, interval);
    };
    //
    const check = async () => {
        const res = await getVersion(filePath);
        const { status, data } = res;
        if (status === 200) {
            if (version && version !== data[key]) {
                // 关闭定时
                timer && window.clearTimeout(timer);
                update === null || update === void 0 ? void 0 : update(reload, { version: data[key] });
                return;
            }
            else {
                version = data.version;
                // 开启定时器
            }
        }
        startTimer();
    };
    check();
};
