import { ajax, AjaxResponse } from 'rxjs/ajax';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ErrorRes } from '@type/backend.type';
import { resolve } from 'src/constans/error';

/**
 * Authorization: 格式为`Bearer ${鉴权token}`
 */
export interface HttpHeaders {
  'Content-Type'?: string;
  Authorization?: string; // 这个是开发者使用web-sdk需要用到的access_token, 为必须传递的值
  'X-Analytic-Session'?: string; // 属于本接口会返回的analytic_session字段的值，非必须传递字段，第一次进入观看页，或者直接从控制台进入可以不用传递该值
  'X-Access-Token'?: string;
}

export interface HttpDefaults {
  headers: HttpHeaders;
  withCredentials: boolean;
}

const isErrorRes = (res: any): res is ErrorRes => {
  return res && res.code && res.message;
};

// 对请求状态进行统一拦截
const ajaxIntercept = () => {
  return <T extends AjaxResponse>(source: Observable<T>) => {
    return source.pipe(
      map((v) => {
        const { response } = v;
        return response;
      }),
      catchError((v: any) => {
        const response = v?.response;
        if (isErrorRes(response)) {
          return throwError(resolve(response));
        }
        return throwError(v);
      }),
    );
  };
};

/**
 * 统一封装 http 请求
 * ts 类型声明还有待优化
 */
export class HttpClient {
  protected defaults: HttpDefaults = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: '',
      'X-Access-Token': '',
      'X-Analytic-Session': '',
    },
    withCredentials: true,
  };

  get<T>(url: string, headers?: HttpHeaders): Observable<T> {
    return this.request(url, 'GET', null, headers);
  }

  post<T>(url: string, body?: any, headers?: HttpHeaders): Observable<T> {
    return this.request(url, 'POST', body, headers);
  }

  put<T>(url: string, body?: any, headers?: HttpHeaders): Observable<T> {
    return this.request(url, 'PUT', body, headers);
  }

  delete<T>(url: string, headers?: HttpHeaders): Observable<T> {
    return this.request(url, 'DELETE', null, headers);
  }

  private request<T>(
    url: string,
    method: string,
    body: any,
    headers: HttpHeaders,
    withCredentials?: boolean,
  ): Observable<T> {
    return ajax({
      url,
      method,
      body,
      headers: Object.assign({}, this.defaults.headers, headers),
      withCredentials: withCredentials || this.defaults.withCredentials,
    }).pipe(ajaxIntercept());
  }

  set headers(v: HttpHeaders) {
    this.defaults.headers = Object.assign({}, this.defaults.headers, v);
  }

  get headers() {
    return this.defaults.headers;
  }

  set withCredentials(v: boolean) {
    this.defaults.withCredentials = v;
  }

  get withCredentials() {
    return this.defaults.withCredentials;
  }
}

export const http = new HttpClient();
