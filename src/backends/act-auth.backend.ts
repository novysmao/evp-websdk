import { http } from '@core/http';
import { ActAuthConfig } from '@type/act-auth.type';
import { Observable } from 'rxjs';
import { ApiPrefix } from 'src/constans/base';
import { ApiHost } from './host';

export const getActAuthConfig = (data: {act_id: string }): Observable<ActAuthConfig> =>
  http.get(`${ApiHost}${ApiPrefix}/activities/${data.act_id}/configs/act-auth`);

/**
 * 授权观看验证权限
 * @param act_id 频道hashid
 * @param code 验证数据（验证码观看需要传，其他情况传空）
 * @returns
 */
export const auth = (act_id: string, code: string = ''): Observable<any> =>
  http.post(`${ApiHost}${ApiPrefix}/activities/${act_id}/actauth/auth`, {
    data: code,
  });
