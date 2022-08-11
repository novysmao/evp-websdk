import { State } from '@core/state';
import { Observable } from 'rxjs';
export interface ModelUpdateMap {
    [K: string]: {
        backend: (v: any) => Observable<any>;
        params: () => any;
    };
}
export declare class Model<T> extends State<T> {
    UPDATE_MAPS: ModelUpdateMap;
    constructor(state: T);
    update(keys?: string | string[]): boolean;
    private isKeyInMaps;
    private updateItem;
}
export declare const updateStateMaps: (updateMaps: ModelUpdateMap) => (target: any) => void;
