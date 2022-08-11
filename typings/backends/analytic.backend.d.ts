import { AnalyticPageEventRequestData, AnalyticRequestData, AnalyticTokenRequestData } from '@type/analytic.type';
export declare const reportOnline: (act_id: string, visitor_id: number, data: AnalyticRequestData) => import("rxjs").Observable<unknown>;
export declare const reportLeave: (act_id: string, visitor_id: number, data: AnalyticRequestData & AnalyticTokenRequestData) => void;
export declare const reportPageEvent: (act_id: string, visitor_id: number, data: AnalyticRequestData & AnalyticPageEventRequestData) => import("rxjs").Observable<unknown>;
