import { ChannelLiveType } from '@type/basis.type';

/**
 * 多流直播配置
 */
export interface StreamViewItem {
  cover: string; // 直播画面图片
  is_default: boolean; // 是否为默认直播画面: true-是 false-否
  is_master: boolean; // 是否为主流直播画面, 优先级 > is_default， : true-是 false-否
  is_live: boolean; // 当前画面是否正在直播: true-是 false-否
  name: string; // 直播画面展示名称
  view_page: number; // 直播画面索引值
  view_id: number; // 直播画面id
  view_address: ViewAddress | ViewAddressSource; // 当前画面的直播拉流地址列表
}

/**
 * 多流直播 -- 单流地址
 */
export interface ViewAddress {
  is_abroad: boolean; // 是否为海外地址: true-是 false-否
  pc: ViewAddressItem[];
  mobile: ViewAddressItem[];
}

/**
 * 多流直播 -- 单流地址
 */
export interface ViewAddressSource {
  is_abroad: boolean; // 是否为海外地址: true-是 false-否
  sources: ViewAddressItemSource[]; // 对应PlaylistItemSource[]
}

/**
 * 多流直播 -- 地址、多分辨率、多线路
 */
export interface ViewAddressItemSource {
  file: string; // 直播拉流地址
  label: string; // 直播流分辨率: origin, 720p等
  path: string; // 直播流线路id
  path_name: string; // 直播流线路名称
}

export interface ViewAddressItem {
  address: string; // 直播拉流地址
  cdn: string; // 直播流的CDN类型
  is_default: boolean; // 是否为默认的直播流线路: true-是 false-否
  is_timeshift: boolean; // 是否开启播放器的时移功能: true-是 false-否
  line_id: number; // 直播流线路id
  line_name: string; // 直播流线路名称
  protocol: string; // 直播流协议: rtmp, hls, flv等
  region: string; // 直播流地区: mainland等
  resolution: string; // 直播流分辨率: origin, 720p等
}

/**
 * 多流直播 -- WS
 */

export enum WsStreamType {
  ViewMasterChange = 'view_master_change', // 切换主画面
  ViewDelete = 'view_delete', // 删除画面
  ViewAdd = 'view_add', // 增加画面
  ViewUpdate = 'view_update', // 更新画面配置
}

export interface WsStreamView {
  type: WsStreamType;
  data: WsStreamViewItem;
}

export interface WsStreamViewlive {
  live: boolean; // 是否直播
  live_type: ChannelLiveType; // 频道类型(标准直播频道、摄像头直播频道、VR直播)
  view_page: number; // 直播索引
}

export interface WsStreamViewItem {
  cover_image: string;
  is_default: boolean;
  is_master: boolean;
  live: boolean;
  name: string;
  view_page: number;
  viewid: number;
  view_address?: ViewAddress;
}
