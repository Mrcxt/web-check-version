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

const getVersion = (filePath: string) => {
  return axios.get(filePath, {
    params: { t: Date.now() },
  });
};

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
  update?: (reload: () => void, options?: { version?: IVersion }) => void;
}

export const webVersionCheck = (options: IOptions) => {
  let version: IVersion;
  let timer: number = 0;
  const {
    filePath = "version.json",
    interval = 5 * 60 * 1000,
    key = "version",
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
      if (version && version !== data[key]) {
        // 关闭定时
        timer && window.clearTimeout(timer);
        update?.(reload, { version: data[key] });
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
