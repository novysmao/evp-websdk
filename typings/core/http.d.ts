import { Observable } from 'rxjs';
export interface HttpHeaders {
    'Content-Type'?: string;
    Authorization?: string;
    'X-Analytic-Session'?: string;
    'X-Access-Token'?: string;
}
export interface HttpDefaults {
    headers: HttpHeaders;
    withCredentials: boolean;
}
export declare class HttpClient {
    protected defaults: HttpDefaults;
    get<T>(url: string, headers?: HttpHeaders): Observable<T>;
    post<T>(url: string, body?: any, headers?: HttpHeaders): Observable<T>;
    put<T>(url: string, body?: any, headers?: HttpHeaders): Observable<T>;
    delete<T>(url: string, headers?: HttpHeaders): Observable<T>;
    private request;
    set headers(v: HttpHeaders);
    get headers(): HttpHeaders;
    set withCredentials(v: boolean);
    get withCredentials(): boolean;
}
export declare const http: HttpClient;
