export interface UserInfo {
  avatar: string;
  id: number;
  is_admin: boolean;
  is_root: boolean;
  name: string;
  third_party_id: string;
  username: string;
  wechat_auth_status: number; // 微信授权状态，0未授权、1已授权
}

export enum AuthMethod {
  NONE = 'NONE',
  PASSWORD = 'PASSWORD',
  PHONEWHITE = 'PHONEWHITE',
  USERWHITELIST = 'USERWHITELIST',
  CUSTOM = 'CUSTOM',
}
