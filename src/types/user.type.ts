/**
 * 用户身份信息
 */
export interface User {
  id: number; // 用户id
  username: string; // 用户名称
  nickname: string; // 用户昵称
  avatar: string; // 用户头像
  third_party_id: string; // 第三方id
  is_admin: boolean; // 是否为管理员: true-是 false-否
  is_root: boolean; // 是否为root用户: true-是 false-否
  is_wechat_auth: boolean; // 是否微信授权: true-是 false-否
  signature: string; // 用户鉴权用的签名
  analytic_session: string; // 用户分析session
  page_view_id: number; // 用于在观看页的行为id
  is_banned: boolean; // 是否被禁言
  waiter_num: number; // 并发管控开启后的等进入观看页的人数，如果没有开启并发管控，则返回为0
  is_signup: boolean; // 观众是否已经报名: true-是， false-否
  mid?: number; // 招行id
}

/**
 * 用户申请身份资料
 */
export interface UserIdentity {
  nickname?: string; // 第一次进入观看页可以通过传递nickname来设置自己的昵称
  avatar?: string; // 第一次进入观看页可以传递avatar来设置自己的头像
  screen_resolution: string; // 屏幕分辨率
  language: string; // 语言
  signature?: string; // 观众身份签名，非必须
}

export interface WsBanlist {
  Data: number;
  Type: string;
}

export enum WsBanlistType {
  Add = 'ban_list_add',
  Remove = 'ban_list_remove',
}

// 更新的用户信息
export interface UserUpdateInfo {
  nickname?: string;
  avatar?: string;
  third_party_id?: string;
}

// 频道信息
export interface ChannelInfo extends UserIdentity {
  analytic_id: number;
}

// enter接口返回
export interface enterResult {
  page_view_id: number;
}
