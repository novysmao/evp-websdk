import { http } from '@core/http';
import { LotteryPrizeResult, LotteryResult } from '@type/lottery.type';
import { Observable } from 'rxjs';
import { ApiPrefix } from 'src/constans/base';
import { ApiHost } from './host';

/**
 * @description: 获取频道的抽奖配置
 * @param {string} act_id 频道HashID
 * @return {*}
 */
export const getLotteryConfig = (data: { act_id: string }) =>
  http.get(`${ApiHost}${ApiPrefix}/activities/${data.act_id}/configs/lottery`);

/**
 * @description: 手机号报名抽奖
 * @param {string} act_id
 * @param {number} lottery_id
 * @param {string} phone
 * @return {*}
 */
export const joinWithPhone = (act_id: string, lottery_id: number, phone: string) =>
  http.post(`${ApiHost}${ApiPrefix}/activities/${act_id}/lottery/${lottery_id}/join/phone`, { phone });

/**
 * @description: 手机号报名抽奖-验证
 * @param {string} act_id
 * @param {number} lottery_id
 * @param {string} phone
 * @param {string} code
 * @return {*}
 */
export const checkPhone = (act_id: string, lottery_id: number, phone: string, code: string) =>
  http.post(`${ApiHost}${ApiPrefix}/activities/${act_id}/lottery/${lottery_id}/check`, { phone, code });

/**
 * @description: 普通报名抽奖
 * @param {string} act_id
 * @param {number} lottery_id
 * @return {*}
 */
export const join = (act_id: string, lottery_id: number) =>
  http.post(`${ApiHost}${ApiPrefix}/activities/${act_id}/lottery/${lottery_id}/join/nick`);

export const getPrizeResult = (act_id: string, lottery_id: number, prize_id: number): Observable<LotteryPrizeResult> =>
  http.get(`${ApiHost}${ApiPrefix}/activities/${act_id}/lottery/${lottery_id}/result/${prize_id}/prize`);

export const getLotteryResult = (act_id: string, lottery_id: number): Observable<LotteryResult> =>
  http.get(`${ApiHost}${ApiPrefix}/activities/${act_id}/lottery/${lottery_id}/result`);
