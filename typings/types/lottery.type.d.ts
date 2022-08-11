export interface LotteryConfig {
    id: number;
    name: string;
    is_allow_watch: boolean;
    join_types: LotterJoinType[];
    draw_range?: number;
    status: LotteryStatus;
    is_ok: boolean;
    prize?: LotteryPrizeItem[];
}
export declare enum LotterJoinType {
    LocalImport = "local_import",
    Phone = "phone",
    Nickname = "nickname"
}
export interface LotteryResult {
    is_join: boolean;
    is_allow_watch: boolean;
    is_ok: boolean;
    prize: LotteryPrizeResult[];
}
export interface LotteryPrizeItem {
    award_name: string;
    count: number;
    prize_id: number;
    image: string;
    name: string;
    open_at: number;
    open_type: LotteryPrizeOpenType;
    start_at: number;
    status: LotteryPrizeStatus;
}
export interface LotteryPrizeResult {
    prize_id: number;
    is_lucky: boolean;
    people: PrizeResultPeopleItem[];
}
export interface PrizeResultPeopleItem {
    viewer_name: string;
    viewer_message: string;
}
export declare enum LotteryStatus {
    Close = 0,
    Open = 1,
    Unknow = 100
}
export declare enum LotteryPrizeOpenType {
    Timing = 0,
    Manual = 1
}
export declare enum LotteryPrizeStatus {
    NotLotteryYet = 0,
    Drawing = 1,
    Completed = 100
}
export interface WsLotteryPrizeItem {
    award_name: string;
    count: number;
    id: number;
    img: string;
    lottery_id: number;
    name: string;
    open_at: string;
    open_type: number;
    sort: number;
    start_at: string;
    status: number;
}
export interface WsLottery {
    event: WsLotteryEvents;
    data: WsLotteryConfig | WsLotteryPrizeItem;
}
export interface WsLotteryConfig {
    created_at: string;
    draw_range: number;
    id: number;
    is_allow_viewer_watch: number;
    name: string;
    status: number;
}
export declare enum WsLotteryEvents {
    LotteryOpen = "lottery_open",
    PrizeOpen = "prize_open",
    PrizeOver = "prize_over",
    ViewerJoin = "viewer_join"
}
