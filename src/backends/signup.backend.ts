import { http } from '@core/http';
import { ApiPrefix } from 'src/constans/base';
import { ApiHost } from './host';

/**
 * @description: 获取频道的报名配置
 * @param {string} act_id 频道HashID
 * @return {*}
 */
export const getSignupConfig = (act_id: string) =>
  http.get(`${ApiHost}${ApiPrefix}/activities/${act_id}/configs/signup`);

export const uploadSignup = (act_id: string, visitor_id: number) =>
  http.post(`${ApiHost}${ApiPrefix}/activities/${act_id}/visitors/${visitor_id}/signup`);
