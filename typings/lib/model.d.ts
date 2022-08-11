import { State } from '@core/state';
import { Observable } from 'rxjs';
export interface ModelUpdateMap {
    [K: string]: {
        updateKey?: string;
        backend: (v: any) => Observable<any>;
        params: () => any;
        transform?: (v: any) => any;
        updateKeyValue?: (key: string) => any;
    };
}
export declare abstract class Model<T> extends State<T> {
    UPDATE_MAPS: ModelUpdateMap;
    constructor(state: T);
    updateKeys(keys?: string | string[]): Promise<any>;
    private updateItems;
    private isKeyInMaps;
    private updateItem;
}
export declare const connect: (updateMaps: ModelUpdateMap) => (target: any) => void;
export declare abstract class AModel {
    abstract init(config?: any): Promise<boolean>;
    abstract destroy(): void;
}
