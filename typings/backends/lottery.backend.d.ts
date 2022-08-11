import { LotteryPrizeResult, LotteryResult } from '@type/lottery.type';
import { Observable } from 'rxjs';
export declare const getLotteryConfig: (data: {
    act_id: string;
}) => Observable<unknown>;
export declare const joinWithPhone: (act_id: string, lottery_id: number, phone: string) => Observable<unknown>;
export declare const checkPhone: (act_id: string, lottery_id: number, phone: string, code: string) => Observable<unknown>;
export declare const join: (act_id: string, lottery_id: number) => Observable<unknown>;
export declare const getPrizeResult: (act_id: string, lottery_id: number, prize_id: number) => Observable<LotteryPrizeResult>;
export declare const getLotteryResult: (act_id: string, lottery_id: number) => Observable<LotteryResult>;
