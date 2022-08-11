import { http } from '@core/http';
import { stringify } from 'qs';
import {
  AdvertisementConfig,
  AttachmentConfig,
  BasicConfig,
  DecorationConfig,
  MediaHubConfig,
  PlaybackConfig,
  SocialShareConfig,
  WechatJssdkConfig,
  NumberResult,
  UPV,
} from '@type/basis.type';
import { Observable } from 'rxjs';
import { ApiPrefix } from 'src/constans/base';
import { ApiHost } from './host';

/**
 * @description: 获取频道的基本配置
 * @param {data: { act_id: string }} act_id 频道HashID
 * @return {*}
 */
export const getBasicConfig = (data: { act_id: string }): Observable<BasicConfig> =>
  http.get(`${ApiHost}${ApiPrefix}/activities/${data.act_id}/configs/basic`);

/**
 * @description: 获取频道的装修配置
 * @param {data: { act_id: string }} act_id 频道HashID
 * @return {*}
 */
export const getDecorationConfig = (data: { act_id: string }): Observable<DecorationConfig> =>
  http.get(`${ApiHost}${ApiPrefix}/activities/${data.act_id}/configs/decoration`);

/**
 * @description: 获取频道的分享配置
 * @param {data: { act_id: string }} act_id 频道HashID
 * @return {*}
 */
export const getShareConfig = (data: { act_id: string }): Observable<SocialShareConfig> =>
  http.get(`${ApiHost}${ApiPrefix}/activities/${data.act_id}/configs/share`);

/**
 * @description: 获取频道的连麦配置
 * @param {data: { act_id: string }} act_id 频道HashID
 * @return {*}
 */
export const getAttachmentConfig = (data: { act_id: string }): Observable<AttachmentConfig> =>
  http.get(`${ApiHost}${ApiPrefix}/activities/${data.act_id}/configs/attachment`);

/**
 * @description: 获取频道的广告配置
 * @param {data: { act_id: string }} act_id 频道HashID
 * @return {*}
 */
export const getAdvertisementConfig = (data: { act_id: string }): Observable<AdvertisementConfig> =>
  http.get(`${ApiHost}${ApiPrefix}/activities/${data.act_id}/configs/advertisement`);

/**
 * @description: 获取频道的视频回放配置
 * @param {data: { act_id: string }} act_id 频道HashID
 * @return {*}
 */
export const getPlaybackConfig = (data: { act_id: string }): Observable<PlaybackConfig> =>
  http.get(`${ApiHost}${ApiPrefix}/activities/${data.act_id}/configs/playback`);

/**
 * @description: 获取频道的微信sdk配置
 * @param {data: { act_id: string }} act_id 频道HashID
 * @return {*}
 */
export const getWechatSdkConfig = (data: { act_id: string }): Observable<WechatJssdkConfig> =>
  http.get(`${ApiHost}${ApiPrefix}/activities/${data.act_id}/configs/wechat-sdk`);

/**
 * @description: 获取频道的媒体中心配置
 * @param {data: { act_id: string }} act_id 频道HashID
 * @return {*}
 */
export const getMediahubConfig = (data: { act_id: string }): Observable<MediaHubConfig> =>
  http.get(`${ApiHost}${ApiPrefix}/activities/${data.act_id}/configs/media`);

/**
 * @description: 获取当前在线人数
 * @param {string} act_id 频道HashID
 * @return {*}
 */
export const getOnlineNum = (act_id: string, analytic_id: number): Observable<NumberResult> =>
  http.get(`${ApiHost}${ApiPrefix}/activities/${act_id}/visitors/number?${stringify({ analytic_id })}`);

export const getUpv = (data: { act_id: string }): Observable<UPV> =>
  http.get(`${ApiHost}${ApiPrefix}/activities/${data.act_id}/statistics/upv`);
