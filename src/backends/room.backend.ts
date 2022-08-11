import { http } from '@core/http';
import { RoomInfo } from '@type/room.type';
import { Observable } from 'rxjs';
import { ApiPrefix } from 'src/constans/base';
import { ApiHost } from './host';

/**
 * @description: 获取观看页配置信息
 * @param {string} act_id 频道HashID
 * @param {string} signature 用户签名
 * @return {*}
 */
export const getConfigs = (act_id: string): Observable<RoomInfo> =>
  http.get(`${ApiHost}${ApiPrefix}/activities/${act_id}/configs`);

export const getConfigsParts = (data: { act_id: string; parts: string }) =>
  http.get(`${ApiHost}${ApiPrefix}/activities/${data.act_id}/configs/parts?part=${data.parts}`);
