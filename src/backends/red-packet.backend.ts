import { http } from '@core/http';
import { ApiPrefix } from 'src/constans/base';
import { ApiHost } from './host';

/**
 * @description: 获取频道的红包配置
 * @param {string} act_id
 * @return {*}
 */
export const getRedPacketConfig = (act_id: string) =>
  http.get(`${ApiHost}${ApiPrefix}/activities/${act_id}/configs/red-packet`);
