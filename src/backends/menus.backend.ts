import { http } from '@core/http';
import { Video } from '@type/video.type';
import { Observable } from 'rxjs';
import { ApiPrefix } from 'src/constans/base';
import { ApiHost } from './host';

/**
 * @description: 获取菜单列表
 * @param {data: { act_id: string }} act_id 频道hashid
 * @return {*}
 */
export const getMenus = (data: { act_id: string }) =>
  http.get(`${ApiHost}${ApiPrefix}/activities/${data.act_id}/configs/menu`);

/**
 * @description: 获取自定义菜单栏的视频信息
 * @param {string} act_id 频道hashid
 * @param {number} menu_id 菜单栏id
 * @return {*}
 */
export const getMenuVideos = (act_id: string, menu_id: number): Observable<Video[]> =>
  http.get(`${ApiHost}${ApiPrefix}/activities/${act_id}/menus/${menu_id}/videos`);

/**
 * @description: 获取自定义菜单栏的图文信息
 * @param {string} act_id 频道hashid
 * @param {number} menu_id 菜单栏id
 * @return {*}
 */
export const getMenuGraphics = (act_id: string, menu_id: number) =>
  http.get(`${ApiHost}${ApiPrefix}/activities/${act_id}/menus/${menu_id}/graphics`);
