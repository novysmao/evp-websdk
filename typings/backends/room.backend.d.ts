import { RoomInfo } from '@type/room.type';
import { Observable } from 'rxjs';
export declare const getConfigs: (act_id: string) => Observable<RoomInfo>;
export declare const getConfigsParts: (data: {
    act_id: string;
    parts: string;
}) => Observable<unknown>;
