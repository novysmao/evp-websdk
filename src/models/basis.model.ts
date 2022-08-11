import {
  BasisConfig,
  ChannelBackgroundImageLocation,
  ChannelLanguageType,
  ChannelLiveType,
  NumberResult,
  UPV,
} from '@type/basis.type';
import { userModel } from './user.model';
import { Model, connect, AModel } from '../lib/model';
import {
  getAdvertisementConfig,
  getAttachmentConfig,
  getBasicConfig,
  getDecorationConfig,
  getMediahubConfig,
  getPlaybackConfig,
  getShareConfig,
  getWechatSdkConfig,
  getOnlineNum,
  getUpv,
} from '@backends/basis.backend';
import { cloneDeep } from 'lodash';
import { roomModel } from './room.model';
import { getConfigsParts } from '@backends/room.backend';

export type BasisModelState = {
  config: BasisConfig;
  'config.async'?: any;
  'config.sync'?: any;
};

export const DEFAULT_STATE: BasisModelState = {
  config: {
    basic: {
      id: '', // 频道hashid
      name: '', // 频道名称
      description: '', // 频道描述
      is_live: false, // 频道直播状态
      is_visible: true, // 直播间是否可见: true-是 false-否
      live_type: ChannelLiveType.Standard, // 频道类型(标准直播频道、摄像头直播频道、Vr直播)
      pv: 0, // 累计观看次数
      uv: 0, // 累计观看人数
      base_num: 0, // uv,pv倍增基数
      online_num: 0, // 在线人数
      wechat_auth_url: '', // 微信授权跳转地址
      current_timestamp: 0, // 服务器时间戳
      tool_id: '', // 直播间的网页直播工具id, live_type = 1 时不为空
      is_ok: false, // 为true表示请求接口成功，false表示失败返回默认数据
    },
    decoration: {
      cover: '', // 播放器封面链接地址
      logo: '', // 直播间的logo
      icon: '', // 直播间的icon链接地址
      is_lang_btn_open: true, // 语言栏展示
      language: ChannelLanguageType.Auto, // 语言 1：自动 2：中文 3：英文
      is_launch_open: false, // 引导图开关
      launch_img_url: '', // 引导图链接地址
      watch_bgimg_color: '', // 观看页背景色
      watch_bgimg_location: ChannelBackgroundImageLocation.None, // 观看页背景图位置 banner：显示在顶部 bg：显示在整个页面 none：不显示背景图
      is_watch_bgimg_open: false, // 观看页背景图开关
      watch_bgimg: '', // 观看页背景图
      is_ok: false, // 为true表示请求接口成功，false表示失败返回默认数据
    },
    share: {
      facebook: false,
      google: false,
      linkedin: false,
      preview: '', // 描述
      title: '', // 标题
      twitter: false,
      wechat: false,
      weibo: false,
      is_ok: false, // 为true表示请求接口成功，false表示失败返回默认数据
    },
    attachment: {
      tool_id: '', // 网页直播工具id
      is_open: false, // 是否开启连麦: true-是 false-否
      is_ok: false, // 为true表示请求接口成功，false表示失败返回默认数据
    },
    advertisement: {
      is_open: false, // 是否开启广告片展示: true-是 false-否
      video: null, // 广告片视频信息
      is_ok: false, // 为true表示请求接口成功，false表示失败返回默认数据
    },
    playback: {
      is_auto_play: false, // 是否开启自动播放: true-是 false-否
      is_available: false, // 是否有效: true-是 false-否
      expire_at: 0, // 视频回放的指定过期时间
      video: null, // 视频回放信息
      is_ok: false, // 为true表示请求接口成功，false表示失败返回默认数据
    },
    wechat_sdk: {
      appid: '',
      timestamp: 0,
      nonce_str: '', // 随机字符串
      signature: '', // 签名
      is_ok: false, // 为true表示请求接口成功，false表示失败返回默认数据
    },
    media: {
      analytic_id: 0, // 数据分析id
      is_use_webvtt: false, // 是否使用webvtt: true-是 false-否
      domain: '', // 媒体中心域名
      board_rw_domain: '', // 白板读写域名
      nats_addr: '', // nats连接地址
      websocket_addr: '', // websocket 连接地址
      is_ok: false, // 为true表示请求接口成功，false表示失败返回默认数据
    },
  },
};

const CONFIG_PARTS_ASYNC = ['decoration', 'share', 'attachment', 'advertisement'];
const CONFIG_PARTS_SYNC = ['basic', 'playback', 'media'];

const UPDATE_STATE_MAPS = {
  'config.sync': {
    backend: getConfigsParts,
    updateKey: 'config',
    params: () => ({
      act_id: roomModel.getState().options.act_id,
      parts: CONFIG_PARTS_SYNC.join(','),
    }),
  },
  'config.async': {
    backend: getConfigsParts,
    updateKey: 'config',
    params: () => ({
      act_id: roomModel.getState().options.act_id,
      parts: CONFIG_PARTS_ASYNC.join(','),
    }),
  },
  'config.basic': {
    backend: getBasicConfig,
    params: () => ({ act_id: roomModel.getState().options.act_id, signature: userModel.getState().signature }),
  },
  'config.decoration': {
    backend: getDecorationConfig,
    params: () => ({ act_id: roomModel.getState().options.act_id }),
  },
  'config.share': {
    backend: getShareConfig,
    params: () => ({ act_id: roomModel.getState().options.act_id }),
  },
  'config.attachment': {
    backend: getAttachmentConfig,
    params: () => ({ act_id: roomModel.getState().options.act_id }),
  },
  'config.advertisement': {
    backend: getAdvertisementConfig,
    params: () => ({ act_id: roomModel.getState().options.act_id }),
  },
  'config.playback': {
    backend: getPlaybackConfig,
    params: () => ({ act_id: roomModel.getState().options.act_id }),
  },
  // 暂时不考虑
  // 'config.wechat_sdk': {
  //   backend: getWechatSdkConfig,
  //   params: () => ({ act_id: roomModel.getState().options.act_id }),
  // },
  'config.media': {
    backend: getMediahubConfig,
    params: () => ({ act_id: roomModel.getState().options.act_id }),
  },
};

@connect(UPDATE_STATE_MAPS)
export class BasisModel extends Model<BasisModelState> implements AModel {
  name = 'basis';
  constructor() {
    super(DEFAULT_STATE);
  }

  get basic() {
    return this.getState().config.basic;
  }

  get decoration() {
    return this.getState().config.decoration;
  }

  get share() {
    return this.getState().config.share;
  }

  get attachment() {
    return this.getState().config.attachment;
  }

  get advertisement() {
    return this.getState().config.advertisement;
  }

  get playback() {
    return this.getState().config.playback;
  }

  get media() {
    return this.getState().config.media;
  }

  getOnlineNum(): Promise<NumberResult> {
    return new Promise((resolve, reject) => {
      getOnlineNum(this.getState().config.basic.id, this.getState().config.media.analytic_id).subscribe({
        next: (v) => {
          resolve(v);
        },
        error: (err) => {
          reject(err);
        },
      });
    });
  }

  getUPV(): Promise<UPV> {
    return new Promise((resolve, reject) => {
      getUpv({ act_id: this.getState().config.basic.id }).subscribe({
        next: (v) => {
          const config = cloneDeep(this.getState().config);
          config.basic.pv = v.pv;
          config.basic.uv = v.uv;
          this.setState({ config });
          resolve(v);
        },
        error: (err) => {
          reject(err);
        },
      });
    });
  }

  async getConfig(parts?: string) {
    if (parts) {
      await this.updateKeys(parts);
    } else {
      await this.updateKeys('config.sync');
      void this.updateKeys('config.async');
    }
    return Promise.resolve(true);
  }

  async init(config?: BasisConfig) {
    if (config) {
      this.setState({ config });
    } else {
      await this.getConfig();
    }
    return Promise.resolve(true);
  }

  destroy() {
    console.log(`[${this.name}]:销毁`);
    this.setState(DEFAULT_STATE);
  }
}

export const basisModel = new BasisModel();
