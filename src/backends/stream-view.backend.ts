import { http } from '@core/http';
import { StreamViewItem } from '@type/stream-view.type';
import { Observable } from 'rxjs';
import { ApiPrefix } from 'src/constans/base';
import { ApiHost } from './host';

/**
 * @description: 获取频道的多流画面配置
 * @param {data: {act_id: string}} act_id 频道HashID
 * @return {*}
 */
export const getStreamViewConfig = (data: { act_id: string }) =>
  http.get(`${ApiHost}${ApiPrefix}/activities/${data.act_id}/configs/stream`);

/**
 * @description: 获取单个直播画面的推流地址信息
 * @param {string} act_id 频道HashID
 * @param {number} view_page 直播画面索引
 * @return {*}
 */
export const getStreamViews = (act_id: string, view_page: number): Observable<StreamViewItem> =>
  http.get(`${ApiHost}${ApiPrefix}/activities/${act_id}/view-pages/${view_page}/streams`);
