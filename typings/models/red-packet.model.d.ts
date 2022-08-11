import { RedPacketConfig } from '@type/red-packet.type';
import { Model } from '../lib/model';
export interface RedPacketModelState {
    config: RedPacketConfig;
}
export declare class RedPacketModel extends Model<RedPacketModelState> {
    name: string;
    constructor();
    init(config: RedPacketConfig): void;
    subNats(): void;
    destroy(): void;
}
export declare const redPacketModel: RedPacketModel;
