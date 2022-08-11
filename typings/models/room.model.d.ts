import { ConnectedNats } from '@core/nats';
import { RoomInfo, RoomOptions } from '@type/room.type';
import { Model } from 'src/lib/model';
export interface RoomModelState {
    nats: ConnectedNats;
    diffTimestamp: number;
    options: RoomOptions;
}
export declare class RoomModel extends Model<RoomModelState> {
    name: string;
    registeredModels: any[];
    get nats(): ConnectedNats;
    constructor();
    init(options: RoomOptions): Promise<void>;
    initAllModels(): Promise<void>;
    initNecessaryModels(): Promise<boolean>;
    initModels(models?: Model<any>[]): Promise<any[]>;
    initOtherModels(info: RoomInfo): Promise<[boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean]>;
    initNats(url: string, act_id: string): import("rxjs").Observable<ConnectedNats>;
    destroy(): void;
}
export declare const roomModel: RoomModel;
