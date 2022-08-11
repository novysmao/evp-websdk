export declare enum ActAuthType {
    None = "NONE",
    Password = "PASSWORD",
    PhoneWhite = "PHONEWHITE",
    UserWhiteList = "USERWHITELIST",
    Custom = "CUSTOM"
}
export interface ActAuthPasswordConfig {
    title: string;
    password: string;
}
export interface ActAuthPhoneWhiteConfig {
    notice: string;
}
export interface ActAuthUserWhiteListConfig {
    input_notice: string;
    mobile_bg_img: string;
    notice: string;
    password_check: boolean;
    pc_bg_img: string;
}
export interface ActAuthCustomConfig {
    url: string;
}
