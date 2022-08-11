import { http } from '@core/http';
import { ApiPrefix } from 'src/constans/base';
import { QuestionnaireConfig } from '@type/questionnaire.type';
import { Observable } from 'rxjs';
import { ApiHost } from './host';

/**
 * @description: 获取频道的问卷配置
 * @param {string} act_id 频道HashID
 * @return {*}
 */
export const getQuestionnaireConfig = (data: { act_id: string }): Observable<QuestionnaireConfig> =>
  http.get(`${ApiHost}${ApiPrefix}/activities/${data.act_id}/configs/questionnaire`);

/**
 * @description: 提交问卷
 * @param {string} act_id 频道HashID
 * @param {number} columns
 * @return {*}
 */
export const submitQuestionnaire = (act_id: string, question_id: string, columns: string) =>
  http.post(`${ApiHost}${ApiPrefix}/activities/${act_id}/question/${question_id}/submit`, { columns });
