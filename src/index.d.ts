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
    update?: (reload: () => void, options?: {
        version?: IVersion;
    }) => void;
}
export declare const webVersionCheck: (options: IOptions) => void;
export {};
