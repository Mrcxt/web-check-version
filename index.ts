/*
 * @LastEditTime: 2022-12-12 21:53:37
 * @Description:
 * @Date: 2022-12-06 14:33:17
 * @Author: @虾哔哔
 */
import axios from "axios";

type IVersion = string | number;

export interface IOptions {
  /**
   * 远程文件位置的绝对路径
   * TODO 注意：如果网站部署在网址根目录，可以只写相对路径，如果部署在二级目录下，请填写绝对路径
   * */
  filePath?: string;
  /**
   * 检测时间间隔，默认 5分钟 检测一次
   */
  interval?: number;
  /**
   * 存放版本号的key，默认为 'version'
   */
  key?: string;
  /**
   * 检测到有新版本时的回调
   * 回调参数：
   * reload:() => void 是否刷新页面
   * options?:{version} 版本号
   */
  update?: (reload: () => void, options: { version: IVersion }) => void;
  debug?: boolean;
}

const reload = () => {
  window.location.reload();
};

const getVersion = (filePath: string) => {
  return axios.get(filePath, {
    params: { t: Date.now() },
  });
};

export default (options: IOptions) => {
  let version: IVersion;
  let timer: number = 0;
  const {
    filePath = "version.json",
    interval = 5 * 60 * 1000,
    key = "version",
    update,
    debug = false,
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
      if (debug) {
        if (version !== data[key]) {
          version = data.version;
        } else {
          timer && window.clearTimeout(timer);
          update?.(reload, { version: data[key] });
          return;
        }
      } else {
        if (version && version !== data[key]) {
          timer && window.clearTimeout(timer);
          update?.(reload, { version: data[key] });
          return;
        } else {
          version = data.version;
        }
      }
    }
    startTimer();
  };

  check();
};
