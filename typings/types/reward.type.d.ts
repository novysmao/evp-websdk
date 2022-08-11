import { Pagination } from './common.type';
export interface RewardConfig {
    is_open: boolean;
    props: RewardProp[];
    is_ok: boolean;
}
export interface RewardProp {
    id: number;
    name: string;
    cover: string;
    price: number;
    is_highlight: number;
    srceen_type: RewardPropEffects;
}
export declare enum RewardPropEffects {
    None = 0,
    ToRight = 1,
    ToTop = 2,
    CenterZoom = 3
}
export interface RewardRecord {
    username?: string;
    prop_name?: string;
    reward_num?: number;
    amount?: number;
    user_avatar?: string;
    prop_img?: string;
    prop_id?: number;
    price?: number;
}
export interface RewardOrder {
    order_id: string;
    order_status: boolean;
}
export interface RewardRecordsRes {
    data: RewardRecord[];
    page: Pagination;
}
