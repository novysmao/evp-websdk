export interface User {
    id: number;
    username: string;
    nickname: string;
    avatar: string;
    third_party_id: string;
    is_admin: boolean;
    is_root: boolean;
    is_wechat_auth: boolean;
    signature: string;
    analytic_session: string;
    page_view_id: number;
    is_banned: boolean;
    waiter_num: number;
    is_signup: boolean;
    mid?: number;
}
export interface UserIdentity {
    nickname?: string;
    avatar?: string;
    screen_resolution: string;
    language: string;
    signature?: string;
}
export interface WsBanlist {
    Data: number;
    Type: string;
}
export declare enum WsBanlistType {
    Add = "ban_list_add",
    Remove = "ban_list_remove"
}
export interface UserUpdateInfo {
    nickname?: string;
    avatar?: string;
    third_party_id?: string;
}
export interface ChannelInfo extends UserIdentity {
    analytic_id: number;
}
export interface enterResult {
    page_view_id: number;
}
