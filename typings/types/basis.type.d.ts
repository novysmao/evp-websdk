import { Video } from '@type/video.type';
export interface BasisConfig {
    basic: BasicConfig;
    decoration: DecorationConfig;
    share: SocialShareConfig;
    attachment: AttachmentConfig;
    advertisement: AdvertisementConfig;
    playback: PlaybackConfig;
    wechat_sdk: WechatJssdkConfig;
    media: MediaHubConfig;
}
export declare enum ChannelLiveType {
    Standard = 0,
    Camera = 1,
    Vr = 3
}
export declare enum ChannelLanguageType {
    Auto = 1,
    Zh = 2,
    En = 3
}
export declare enum ChannelBackgroundImageLocation {
    Top = "banner",
    Background = "bg",
    None = "none"
}
export interface BasicConfig {
    id: string;
    name: string;
    description: string;
    is_live: boolean;
    is_visible: boolean;
    live_type: ChannelLiveType;
    pv: number;
    uv: number;
    base_num: number;
    online_num: number;
    wechat_auth_url: string;
    current_timestamp: number;
    tool_id: string;
    is_ok: boolean;
}
export interface SocialShareConfig {
    facebook: boolean;
    google: boolean;
    linkedin: boolean;
    preview: string;
    title: string;
    twitter: boolean;
    wechat: boolean;
    weibo: boolean;
    is_ok: boolean;
}
export interface DecorationConfig {
    cover: string;
    logo: string;
    icon: string;
    is_lang_btn_open: boolean;
    language: ChannelLanguageType;
    is_launch_open: boolean;
    launch_img_url: string;
    watch_bgimg_color: string;
    watch_bgimg_location: ChannelBackgroundImageLocation;
    is_watch_bgimg_open: boolean;
    watch_bgimg: string;
    is_ok: boolean;
}
export interface AttachmentConfig {
    tool_id: string;
    is_open: boolean;
    is_ok: boolean;
}
export interface AdvertisementConfig {
    is_open: boolean;
    video: Video;
    is_ok: boolean;
}
export interface PlaybackConfig {
    is_auto_play: boolean;
    is_available: boolean;
    expire_at: number;
    video: Video;
    is_ok: boolean;
}
export interface WechatJssdkConfig {
    appid: string;
    timestamp: number;
    nonce_str: string;
    signature: string;
    is_ok: boolean;
}
export interface MediaHubConfig {
    analytic_id: number;
    is_use_webvtt: boolean;
    domain: string;
    board_rw_domain: string;
    nats_addr: string;
    websocket_addr: string;
    is_ok: boolean;
}
export interface NumberResult {
    online_num: number;
}
export interface UPV {
    uv: number;
    pv: number;
}
