import { http } from '@core/http';
import { Video } from '@type/video.type';
import { Observable } from 'rxjs';
import { ApiPrefix } from 'src/constans/base';
import { ApiHost } from './host';

export const getVideos = (ids: number[]): Observable<Video[]> =>
  http.get(`${ApiHost}${ApiPrefix}/videos/${ids.join(',')}`);
