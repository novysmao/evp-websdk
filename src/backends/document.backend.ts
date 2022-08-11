import { http } from '@core/http';
import { stringify } from 'qs';
import { Observable } from 'rxjs';
import { ApiPrefix } from 'src/constans/base';
import { ApiHost } from './host';
import { RequestDocPage, DocumentList, DocumentDownload } from '@type/document.type';

/**
 * @description: 获取频道的文档配置
 * @param {data: { act_id: string }} act_id 频道HashID
 * @return {*}
 */
export const getDocumentConfig = (data: { act_id: string }) =>
  http.get(`${ApiHost}${ApiPrefix}/activities/${data.act_id}/configs/document`);

/**
 * @description: 获取频道的文档列表
 * @param {string} act_id 频道HashID
 * @param {RequestDocPage} data 请求的页码数据
 * @return {*}
 */
export const getDocumentList = (act_id: string, data: RequestDocPage): Observable<DocumentList> =>
  http.get(`${ApiHost}${ApiPrefix}/activities/${act_id}/documents?${stringify(data)}`);

/**
 * @description: 获取频道文档的下载链接
 * @param {string} act_id 频道HashID
 * @param {string} doc_id 文档的id
 * @return {*}
 */
export const getDocumentDownloadLink = (act_id: string, doc_id: number): Observable<DocumentDownload> =>
  http.get(`${ApiHost}${ApiPrefix}/activities/${act_id}/documents/${doc_id}/download`);
