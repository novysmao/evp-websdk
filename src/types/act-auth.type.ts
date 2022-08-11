export enum ActAuthType {
  None = 0,
  Password = 1,
  Custom = 2,
  PhoneWhite = 3,
  UserWhiteList = 4,
}

// 密码验证方式
export interface ActAuthPasswordConfig {
  title: string;
  password: string;
}

// 手机白名单验证方式
export interface ActAuthPhoneWhiteConfig {
  notice: string;
}

// 用户白名单验证方式
export interface ActAuthUserWhiteListConfig {
  custom_notice: string; // 自定义提示信息
  mobile_bg_img: string;
  notice: string; // 提示信息
  is_pwd_check: boolean; // 是否进行密码检查: true-是， false-否
  pc_bg_img: string;
}

// 自定义验证方式
export interface ActAuthCustomConfig {
  url: string;
}

export interface ActAuthConfig {
  type: ActAuthType;
  pwd_auth?: ActAuthPhoneWhiteConfig;
  custom_auth?: ActAuthCustomConfig;
  phone_white_list?: ActAuthPhoneWhiteConfig;
  user_white_list?: ActAuthUserWhiteListConfig;
  is_ok: boolean;
}
