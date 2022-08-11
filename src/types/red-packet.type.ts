export enum RedPacketType {
  Normal = 1, // 普通红包
  Token = 2, // 口令红包
}

// 红包
export interface RedPacket {
  id: string; // 红包Id  red_packet_id
  type: RedPacketType; // 红包类型
  total_fee: number; // 总金额 单位：分
  total_num: number; // 子红包总个数
  get_num: number; // 子红包已领个数
  bless_words: string; // 祝福语
  password: string; // 口令
  expired_at: string; // 过期时间
  sent_at: string; // 红包发送时间
  is_get: boolean; // 是否抢到
  get_fee: number; // 已经领取金额
}

export interface RedPacketConfig {
  is_open: boolean;
  items: RedPacket[];
  is_ok: boolean;
}
