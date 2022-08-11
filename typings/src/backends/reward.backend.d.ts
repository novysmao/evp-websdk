import { RewardOrder, RewardRecordsRes } from '@type/reward.type';
import { Observable } from 'rxjs';
import { RequestPage } from '@type/common.type';
export declare const getRewardConfig: (act_id: string) => Observable<unknown>;
export declare const getRewardRecords: (act_id: string, data: RequestPage) => Observable<RewardRecordsRes>;
export declare const rewardProp: (act_id: string, data: {
    prop_id: number;
    num: number;
}) => Observable<RewardOrder>;
