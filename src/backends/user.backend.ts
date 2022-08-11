import { http } from '@core/http';
import { User, UserIdentity, UserUpdateInfo, ChannelInfo, enterResult } from '@type/user.type';
import { Observable } from 'rxjs';
import { ApiPrefix } from 'src/constans/base';
import { ApiHost } from './host';

export const join = (act_id: string, userIdentity: UserIdentity): Observable<User> =>
  http.post(`${ApiHost}${ApiPrefix}/activities/${act_id}/visitors/join`, userIdentity);

/**
 * @description: 更新用户信息
 * @param {string} act_id
 * @param {*} visitor_id
 * @param {UserUpdateInfo} userUpdateInfo
 * @return {*}
 */
export const update = (act_id: string, visitor_id, userUpdateInfo: UserUpdateInfo) =>
  http.put(`${ApiHost}${ApiPrefix}/activities/${act_id}/visitors/${visitor_id}`, { ...userUpdateInfo });

/**
 * @description: 获取最新page_view_id
 * @param {string} act_id
 * @param {*} visitor_id
 * @param {ChannelInfo} channelInfo
 * @return {*}
 */
export const updatePageViewId = (act_id: string, visitor_id, channelInfo: ChannelInfo): Observable<enterResult> =>
  http.post(`${ApiHost}${ApiPrefix}/activities/${act_id}/visitors/${visitor_id}/enter`, { ...channelInfo });
