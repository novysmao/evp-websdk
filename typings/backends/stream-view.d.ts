import { StreamViewItem } from '@type/stream-view.type';
import { Observable } from 'rxjs';
export declare const getStreamViewConfig: (act_id: string) => Observable<unknown>;
export declare const getStreamViews: (act_id: string, view_page: number) => Observable<StreamViewItem>;
