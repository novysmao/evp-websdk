import { stringify } from 'qs';
import { http } from '@core/http';
import { Observable } from 'rxjs';
import { CommentConfig, GetCommentsRes } from '@type/comment.type';
import { RequestPage } from '@type/common.type';
import { ApiPrefix } from 'src/constans/base';
import { ApiHost } from './host';

/**
 * @description: 获取频道的评论配置
 * @param {data: { act_id: string }} act_id 频道HashID
 * @return {*}
 */
export const getCommentConfig = (data: { act_id: string }): Observable<CommentConfig> =>
  http.get(`${ApiHost}${ApiPrefix}/activities/${data.act_id}/configs/comment`);

/**
 * @description: 观众在频道留言
 * @param {string} act_id 频道HashID
 * @param {string} message 消息
 * @return {*}
 */
export const sendComment = (act_id: string, message: string): Observable<any> =>
  http.post(`${ApiHost}${ApiPrefix}/activities/${act_id}/comments`, { message });

/**
 * @description: 获取频道的观众留言记录列表
 * @param {string} act_id 频道HashID
 * @param {RequestPage} data 请求的页码数据
 * @return {*}
 */
export const getComments = (act_id: string, data: RequestPage): Observable<GetCommentsRes> =>
  http.get(`${ApiHost}${ApiPrefix}/activities/${act_id}/comments?${stringify(data)}`);
