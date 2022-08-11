import { BasisConfig, NumberResult, UPV } from '@type/basis.type';
import { Model, AModel } from '../lib/model';
export declare type BasisModelState = {
    config: BasisConfig;
    'config.async'?: any;
    'config.sync'?: any;
};
export declare const DEFAULT_STATE: BasisModelState;
export declare class BasisModel extends Model<BasisModelState> implements AModel {
    name: string;
    constructor();
    get basic(): import("../types/basis.type").BasicConfig;
    get decoration(): import("../types/basis.type").DecorationConfig;
    get share(): import("../types/basis.type").SocialShareConfig;
    get attachment(): import("../types/basis.type").AttachmentConfig;
    get advertisement(): import("../types/basis.type").AdvertisementConfig;
    get playback(): import("../types/basis.type").PlaybackConfig;
    get media(): import("../types/basis.type").MediaHubConfig;
    getOnlineNum(): Promise<NumberResult>;
    getUPV(): Promise<UPV>;
    getConfig(parts?: string): Promise<boolean>;
    init(config?: BasisConfig): Promise<boolean>;
    destroy(): void;
}
export declare const basisModel: BasisModel;
