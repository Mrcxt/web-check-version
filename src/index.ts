/*
 * @LastEditTime: 2022-12-06 23:15:25
 * @Description:
 * @Date: 2022-12-06 14:33:17
 * @Author: @虾哔哔
 */
import axios from "axios";

const reload = () => {
  window.location.reload();
};

const getVersion = (filePath: string) => {
  return axios.get(filePath, {
    params: { t: Date.now() },
  });
};

type IVersion = string | number;

export interface IOptions {
  filePath?: string;
  interval?: number;
  update?: (f: () => void, options?: { version?: IVersion }) => void;
}

export const webVersionCheck = async (options: IOptions = {}) => {
  let version: IVersion;
  let timer: number | undefined = undefined;
  const {
    filePath = "version.json",
    interval = 5 * 60 * 1000,
    update,
  } = options;

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
      if (version && version !== data["version"]) {
        // 关闭定时
        timer && window.clearTimeout(timer);
        update?.(reload, { version: data["version"] });
        return;
      } else {
        version = data.version;
        // 开启定时器
      }
    }
    startTimer();
  };

  check();
};
