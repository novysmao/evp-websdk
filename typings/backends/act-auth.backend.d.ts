import { ActAuthConfig } from '@type/act-auth.type';
import { Observable } from 'rxjs';
export declare const getActAuthConfig: (data: {
    act_id: string;
}) => Observable<ActAuthConfig>;
export declare const auth: (act_id: string, code?: string) => Observable<any>;
