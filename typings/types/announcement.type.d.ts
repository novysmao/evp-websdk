export interface AnnouncementConfig {
    color: string;
    content: string;
    is_visible: boolean;
    is_ok: boolean;
}
export declare enum WsAnnouncementType {
    Update = "announcement_update"
}
export interface WsAnnouncementConfig {
    color: string;
    content: string;
    visible: boolean;
    type: WsAnnouncementType;
}
