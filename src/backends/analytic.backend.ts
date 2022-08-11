import { http } from '@core/http';
import { AnalyticPageEventRequestData, AnalyticRequestData, AnalyticTokenRequestData } from '@type/analytic.type';
import { ApiPrefix } from 'src/constans/base';
import { ApiHost } from './host';

export const reportOnline = (act_id: string, visitor_id: number, data: AnalyticRequestData) =>
  http.post(`${ApiHost}${ApiPrefix}/activities/${act_id}/visitors/${visitor_id}/online`, data);

export const reportLeave = (
  act_id: string,
  visitor_id: number,
  data: AnalyticRequestData & AnalyticTokenRequestData,
) => {
  const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
  navigator.sendBeacon(`${ApiHost}${ApiPrefix}/activities/${act_id}/visitors/${visitor_id}/leave`, blob);
};

export const reportPageEvent = (
  act_id: string,
  visitor_id: number,
  data: AnalyticRequestData & AnalyticPageEventRequestData,
) => http.post(`${ApiHost}${ApiPrefix}/activities/${act_id}/visitors/${visitor_id}/page`, data);
