import { Video } from '@type/video.type';
import { Observable } from 'rxjs';
export declare const getMenus: (data: {
    act_id: string;
}) => Observable<unknown>;
export declare const getMenuVideos: (act_id: string, menu_id: number) => Observable<Video[]>;
export declare const getMenuGraphics: (act_id: string, menu_id: number) => Observable<unknown>;
