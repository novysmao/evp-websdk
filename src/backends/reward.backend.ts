import { http } from '@core/http';
import { RewardOrder, RewardRecordsRes } from '@type/reward.type';
import { Observable } from 'rxjs';
import { stringify } from 'qs';
import { RequestPage } from '@type/common.type';
import { ApiPrefix } from 'src/constans/base';
import { ApiHost } from './host';

/**
 * @description: 获取频道的打赏配置
 * @param {string} act_id 频道HashID
 * @return {*}
 */
export const getRewardConfig = (act_id: string) =>
  http.get(`${ApiHost}${ApiPrefix}/activities/${act_id}/configs/reward`);

/**
 * @description: 获取频道的观众打赏记录
 * @param {string} act_id 频道HashID
 * @param {RequestPage} data
 * @return {*}
 */
export const getRewardRecords = (act_id: string, data: RequestPage): Observable<RewardRecordsRes> =>
  http.get(`${ApiHost}${ApiPrefix}/activities/${act_id}/rewards?${stringify(data)}`);

/**
 * @description: 观众在频道进行打赏
 * @param {*} data: { act_id: string, prop_id: number, num: number }
 * @return {*}
 */
export const rewardProp = (act_id: string, data: { prop_id: number; num: number }): Observable<RewardOrder> =>
  http.post(`${ApiHost}${ApiPrefix}/activities/${act_id}/rewards`, data);
