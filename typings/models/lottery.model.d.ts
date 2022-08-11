import { LotterJoinType, LotteryConfig, LotteryPrizeItem, LotteryPrizeResult, LotteryResult, WsLotteryConfig, WsLotteryPrizeItem } from '@type/lottery.type';
import { AModel, Model } from 'src/lib/model';
export interface LotterModelState {
    config: LotteryConfig;
    result: LotteryResult;
}
export declare class LotteryModel extends Model<LotterModelState> implements AModel {
    name: string;
    constructor();
    static getJoinTypes(draw_range: number): LotterJoinType[];
    static transformWsLotteryPrizeItem(data: WsLotteryPrizeItem): LotteryPrizeItem;
    static transformWsLotteryConfig(data: WsLotteryConfig): LotteryConfig;
    static filterLotteryDrawRange(config: LotteryConfig): LotteryConfig;
    get config(): LotteryConfig;
    get result(): LotteryResult;
    get isJoin(): boolean;
    get isAllowWatch(): boolean;
    get joinTypes(): LotterJoinType[];
    init(config?: LotteryConfig): Promise<boolean>;
    getConfig(): Promise<void>;
    subNats(): void;
    joinSuccessCallback(): void;
    joinWithPhone(phone: string): Promise<unknown>;
    join(): Promise<boolean>;
    smsVerify(phone: string, code: string): Promise<void>;
    getPrizeResult(prize_id: number): Promise<LotteryPrizeResult>;
    resolveLotteryResult(oldLotteryResults: LotteryPrizeItem[], newLotteryResults: LotteryPrizeItem[]): void;
    getLotteryResult(): Promise<LotteryResult>;
    destroy(): void;
}
export declare const lotteryModel: LotteryModel;
