export interface AnalyticRequestData {
  page_view_id: number; // 观众在观众页的行为id
  analytic_id: number; // 媒体中心的analytic_id
}

export interface AnalyticTokenRequestData {
  analytic_session: string;
  signature: string;
}
export interface AnalyticPageEventRequestData {
  category: string; // 页面事件分类，一般是 video
  action: PageWatchEventActions; // 页面事件key：1: ad_watch_time:广告观看时长， 2-vod_watch_time:点播观看时长 3-live_watch_time: 直播观看时长
  label: string; // 页面事件标签: 若action = ad_watch_time 或者 vod_watch_time , 则 label 为对应视频的下载地址； 若action = live_watch_time, 则 label 为 对应直播的拉流地址
  value: number; // 页面事件值
}

export enum PageWatchEventActions {
  Ad = 'ad_watch_time',
  Vod = 'vod_watch_time',
  Live = 'live_watch_time',
}
