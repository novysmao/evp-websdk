import { CountdownConfig } from '@type/countdown.type';
import { AModel, Model } from 'src/lib/model';
export interface CountdownState {
    isCounting: boolean;
    config: CountdownConfig;
    remainingSeconds: number;
}
export declare class CountdownModel extends Model<CountdownState> implements AModel {
    timer: any;
    name: string;
    constructor();
    get config(): CountdownConfig;
    init(config?: CountdownConfig): Promise<boolean>;
    getConfig(): Promise<void>;
    start(): void;
    stop(): void;
    destroy(): void;
}
export declare const countdownModel: CountdownModel;
