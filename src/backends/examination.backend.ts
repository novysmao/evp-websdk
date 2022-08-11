import { http } from '@core/http';
import { ApiPrefix } from 'src/constans/base';
import { ApiHost } from './host';

/**
 * @description: 获取频道的考试配置
 * @param {string} act_id 频道HashID
 * @return {*}
 */
export const getExaminationConfig = (act_id: string) =>
  http.get(`${ApiHost}${ApiPrefix}/activities/${act_id}/configs/examination`);
