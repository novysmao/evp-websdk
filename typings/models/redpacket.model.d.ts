import { RedpacketConfig } from '@type/Redpacket.type';
import { Model } from '../lib/model';
export interface RedpacketModelState {
    config: RedpacketConfig;
}
export declare class RedpacketModel extends Model<RedpacketModelState> {
    constructor();
    init(config: RedpacketConfig): void;
    destroy: () => void;
}
export declare const redpacketModel: RedpacketModel;
