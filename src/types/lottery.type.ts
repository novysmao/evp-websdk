// 抽奖配置信息
export interface LotteryConfig {
  id: number; // 抽奖id
  name: string; // 抽奖名称
  is_allow_watch: boolean; // 是否让观众看到: true-是 false-否
  join_types: LotterJoinType[]; // 抽奖报名方式
  draw_range?: number;
  status: LotteryStatus;
  is_ok: boolean; // 为true表示请求接口成功，false表示失败返回默认数据
  prize?: LotteryPrizeItem[];
}

// 抽奖报名方式
export enum LotterJoinType {
  LocalImport = 'local_import', // 本地名单导入
  Phone = 'phone', // 手机号
  Nickname = 'nickname', // 昵称
}

// 抽奖结果
export interface LotteryResult {
  is_join: boolean; // 是否参与抽奖
  is_allow_watch: boolean; // 是否允许查看中奖人列表
  is_ok: boolean;
  prize: LotteryPrizeResult[];
}

// 奖品
export interface LotteryPrizeItem {
  award_name: string; // 奖品名称
  count: number; // 中奖名额
  prize_id: number; // 奖品id
  image: string; // 奖品图片
  name: string; // 奖品名称
  open_at: number; // 开奖时间
  open_type: LotteryPrizeOpenType; // 开奖类型 1 手动开奖 0 定时开奖
  start_at: number; // 定时开奖时间戳
  status: LotteryPrizeStatus; // 奖项开奖状态 0 未开奖 1 开奖中 2 开奖失败 100 已开奖
}

// 抽奖奖品结果
export interface LotteryPrizeResult {
  prize_id: number; // 奖品id
  is_lucky: boolean; // 是否中奖
  people: PrizeResultPeopleItem[]; // 中奖人列表
}

// 中奖人
export interface PrizeResultPeopleItem {
  viewer_name: string; // 中奖人名称
  viewer_message: string; // 中奖人信息
}

// 抽奖状态
export enum LotteryStatus {
  Close = 0, // 关闭
  Open = 1, // 开启
  Unknow = 100, // 观看页未使用
}

// 抽奖开启类型
export enum LotteryPrizeOpenType {
  Timing = 0, // 定时
  Manual = 1, // 手动
}

// 抽奖奖品状态
export enum LotteryPrizeStatus {
  NotLotteryYet = 0, // 未开奖
  Drawing = 1, // 开奖中
  Completed = 100, // 开奖完成
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

export enum WsLotteryEvents {
  LotteryOpen = 'lottery_open',
  PrizeOpen = 'prize_open',
  PrizeOver = 'prize_over',
  ViewerJoin = 'viewer_join',
}
