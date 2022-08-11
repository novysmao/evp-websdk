import { ActAuthConfig } from '@type/act-auth.type';
import { Model, AModel } from '../lib/model';
export interface ActAuthModelState {
    config: ActAuthConfig;
}
export declare class ActAuthModel extends Model<ActAuthModelState> implements AModel {
    name: string;
    constructor();
    getConfig(): Promise<void>;
    init(config?: ActAuthConfig): Promise<boolean>;
    auth(code?: string): Promise<boolean>;
    destroy(): void;
}
export declare const actAuthModel: ActAuthModel;
