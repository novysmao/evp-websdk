import { http } from '@core/http';
import { ApiPrefix } from 'src/constans/base';
import { ApiHost } from './host';

/**
 * @description: 获取频道的倒计时配置
 * @param {data: { act_id: string }} act_id 频道HashID
 * @return {*}
 */
export const getCountdownConfig = (data: { act_id: string }): any =>
  http.get(`${ApiHost}${ApiPrefix}/activities/${data.act_id}/configs/countdown`);
