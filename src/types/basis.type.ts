import { Video } from '@type/video.type';

export interface BasisConfig {
  basic: BasicConfig; // 频道直播间的基本信息
  decoration: DecorationConfig; // 频道直播间的装修配置信息
  share: SocialShareConfig; // 频道直播间的分享配置信息
  attachment: AttachmentConfig; // 连麦配置
  advertisement: AdvertisementConfig; // 广告配置
  playback: PlaybackConfig; // 视频回放配置, 未直播时会可以选择播放回放视频
  wechat_sdk: WechatJssdkConfig; // 微信Js SDK 信息
  media: MediaHubConfig;
}

export enum ChannelLiveType {
  Standard = 0, // 标准直播
  Camera = 1, // 摄像头
  Vr = 3, // Vr
}

export enum ChannelLanguageType {
  Auto = 1,
  Zh = 2,
  En = 3,
}

export enum ChannelBackgroundImageLocation {
  Top = 'banner',
  Background = 'bg',
  None = 'none',
}

/**
 * 频道直播间的基本信息
 */
export interface BasicConfig {
  id: string; // 频道hashid
  name: string; // 频道名称
  description: string; // 频道描述
  is_live: boolean; // 频道直播状态
  is_visible: boolean; // 直播间是否可见: true-是 false-否
  live_type: ChannelLiveType; // 频道类型(标准直播频道、摄像头直播频道、Vr直播)
  pv: number; // 累计观看次数
  uv: number; // 累计观看人数
  base_num: number; // uv,pv倍增基数
  online_num: number; // 在线人数
  wechat_auth_url: string; // 微信授权跳转地址
  current_timestamp: number; // 服务器时间戳
  tool_id: string; // 直播间的网页直播工具id, live_type = 1 时不为空
  is_ok: boolean; // 为true表示请求接口成功，false表示失败返回默认数据
}

/**
 * 分享设置配置信息
 */
export interface SocialShareConfig {
  facebook: boolean;
  google: boolean;
  linkedin: boolean;
  preview: string; // 描述
  title: string; // 标题
  twitter: boolean;
  wechat: boolean;
  weibo: boolean;
  is_ok: boolean; // 为true表示请求接口成功，false表示失败返回默认数据
}

/**
 * 频道直播间的装修配置信息
 */
export interface DecorationConfig {
  cover: string; // 播放器封面链接地址
  logo: string; // 直播间的logo
  icon: string; // 直播间的icon链接地址
  is_lang_btn_open: boolean; // 语言栏展示
  language: ChannelLanguageType; // 语言 1：自动 2：中文 3：英文
  is_launch_open: boolean; // 引导图开关
  launch_img_url: string; // 引导图链接地址
  watch_bgimg_color: string; // 观看页背景色
  watch_bgimg_location: ChannelBackgroundImageLocation; // 观看页背景图位置 banner：显示在顶部 bg：显示在整个页面 none：不显示背景图
  is_watch_bgimg_open: boolean; // 观看页背景图开关
  watch_bgimg: string; // 观看页背景图
  is_ok: boolean; // 为true表示请求接口成功，false表示失败返回默认数据
}

/**
 * 连麦配置
 */
export interface AttachmentConfig {
  tool_id: string; // 网页直播工具id
  is_open: boolean; // 是否开启连麦: true-是 false-否
  is_ok: boolean; // 为true表示请求接口成功，false表示失败返回默认数据
}

/**
 * 广告片配置
 */
export interface AdvertisementConfig {
  is_open: boolean; // 是否开启广告片展示: true-是 false-否
  video: Video; // 广告片视频
  is_ok: boolean; // 为true表示请求接口成功，false表示失败返回默认数据
}

/**
 * 视频回放
 */
export interface PlaybackConfig {
  is_auto_play: boolean; // 是否开启自动播放: true-是 false-否
  is_available: boolean; // 是否有效: true-是 false-否
  expire_at: number; // 视频回放的指定过期时间
  video: Video; // 视频回放信息
  is_ok: boolean; // 为true表示请求接口成功，false表示失败返回默认数据
}

/**
 * 微信jssdk配置
 */
export interface WechatJssdkConfig {
  appid: string;
  timestamp: number;
  nonce_str: string; // 随机字符串
  signature: string; // 签名
  is_ok: boolean; // 为true表示请求接口成功，false表示失败返回默认数据
}

/**
 * 媒体中心配置
 */
export interface MediaHubConfig {
  analytic_id: number; // 数据分析id
  is_use_webvtt: boolean; // 是否使用webvtt: true-是 false-否
  domain: string; // 媒体中心域名
  board_rw_domain: string; // 白板读写域名
  nats_addr: string; // nats连接地址
  websocket_addr: string; // websocket 连接地址
  is_ok: boolean; // 为true表示请求接口成功，false表示失败返回默认数据
}

/**
 * 获取在线人数结果
 */
export interface NumberResult {
  online_num: number;
}

/**
 * 获取uv、pv
 * uv: 累计观看人数
 * pv: 累计观看次数
 */
export interface UPV {
  uv: number;
  pv: number;
}
