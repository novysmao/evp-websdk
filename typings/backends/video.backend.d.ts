import { Video } from '@type/video.type';
import { Observable } from 'rxjs';
export declare const getVideos: (ids: number[]) => Observable<Video[]>;
