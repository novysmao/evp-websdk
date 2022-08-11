import { http } from '@core/http';
import { AnnouncementConfig } from '@type/announcement.type';
import { Observable } from 'rxjs';
import { ApiPrefix } from 'src/constans/base';
import { ApiHost } from './host';

/**
 * @description: 获取频道的公告配置
 * @param {string} act_id 频道HashID
 * @return {*}
 */
export const getAnnouncementConfig = (data: { act_id: string }): Observable<AnnouncementConfig> =>
  http.get(`${ApiHost}${ApiPrefix}/activities/${data.act_id}/configs/announcement`);
