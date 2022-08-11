import { asapScheduler, timer } from 'rxjs';

export * as platform from './platform';

/**
 * 类似 vue 中的 nextTick
 * @param cb 回调函数
 */
export const nextTick = (cb: () => void) => {
  timer(0, asapScheduler).subscribe(cb);
};

/**
 * 将一个 url 的协议与本地对齐
 * @param url 原 url 地址
 */
export const correctUrl = (url: string) => {
  return url.replace(/http(s)?:/g, location.protocol);
};
