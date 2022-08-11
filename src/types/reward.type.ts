import { Pagination } from './common.type';

/**
 * 打赏配置
 */
export interface RewardConfig {
  is_open: boolean; // 是否开启打赏: true-是 false-否
  props: RewardProp[]; // 打赏道具信息
  is_ok: boolean; // 为true表示请求接口成功，false表示失败返回默认数据
}

export interface RewardProp {
  id: number; // 道具id
  name: string; // 道具名称
  cover: string; // 道具封面图片
  price: number; // 道具价格，单位: 分
  is_highlight: number; // 高亮特效展示: true-是 false-否
  srceen_type: RewardPropEffects; // 全屏特效: 0-无特效(默认) 1-从左到右 2-从下至上 3-中心扩散
}

export enum RewardPropEffects {
  None = 0,
  ToRight = 1,
  ToTop = 2,
  CenterZoom = 3,
}

// 打赏记录
export interface RewardRecord {
  username?: string; // 观众昵称
  prop_name?: string; // 道具名称
  reward_num?: number; // 打赏数量
  amount?: number; // 打赏金额
  user_avatar?: string; // 观众头像
  prop_img?: string; // 道具展示的图片url
  prop_id?: number; // 道具id
  price?: number; // 道具单价
}

// 打赏订单信息
export interface RewardOrder {
  order_id: string; // 订单id
  order_status: boolean; // 订单状态。false为未完成，true为已完成。免费道具默认状态为true，付费道具默认状态为false
}

export interface RewardRecordsRes {
  data: RewardRecord[];
  page: Pagination;
}
