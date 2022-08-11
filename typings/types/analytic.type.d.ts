export interface AnalyticRequestData {
    page_view_id: number;
    analytic_id: number;
}
export interface AnalyticTokenRequestData {
    analytic_session: string;
    signature: string;
}
export interface AnalyticPageEventRequestData {
    category: string;
    action: PageWatchEventActions;
    label: string;
    value: number;
}
export declare enum PageWatchEventActions {
    Ad = "ad_watch_time",
    Vod = "vod_watch_time",
    Live = "live_watch_time"
}
