/**
 * 公告
 */
export interface AnnouncementConfig {
  color: string; // 公告展示的颜色
  content: string; // 公告的内容
  is_visible: boolean; // 是否展示公告: true-是 false-否
  is_ok: boolean; // 为true表示请求接口成功，false表示失败返回默认数据
}

export enum WsAnnouncementType {
  Update = 'announcement_update',
}
export interface WsAnnouncementConfig {
  color: string;
  content: string;
  visible: boolean;
  type: WsAnnouncementType;
}
