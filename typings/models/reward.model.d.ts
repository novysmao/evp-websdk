import { State } from '@core/state';
import { RewardConfig } from '@type/reward.type';
export interface RewardModelState {
    config: RewardConfig;
}
export declare class RewardModel extends State<RewardModelState> {
    name: string;
    constructor();
    init(config: RewardConfig): void;
    subNats(): void;
    destroy(): void;
}
export declare const rewardModel: RewardModel;
