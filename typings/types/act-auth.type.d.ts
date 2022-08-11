export declare enum ActAuthType {
    None = 0,
    Password = 1,
    Custom = 2,
    PhoneWhite = 3,
    UserWhiteList = 4
}
export interface ActAuthPasswordConfig {
    title: string;
    password: string;
}
export interface ActAuthPhoneWhiteConfig {
    notice: string;
}
export interface ActAuthUserWhiteListConfig {
    custom_notice: string;
    mobile_bg_img: string;
    notice: string;
    is_pwd_check: boolean;
    pc_bg_img: string;
}
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
