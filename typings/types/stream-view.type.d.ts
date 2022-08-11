import { ChannelLiveType } from '@type/basis.type';
export interface StreamViewItem {
    cover: string;
    is_default: boolean;
    is_master: boolean;
    is_live: boolean;
    name: string;
    view_page: number;
    view_id: number;
    view_address: ViewAddress | ViewAddressSource;
}
export interface ViewAddress {
    is_abroad: boolean;
    pc: ViewAddressItem[];
    mobile: ViewAddressItem[];
}
export interface ViewAddressSource {
    is_abroad: boolean;
    sources: ViewAddressItemSource[];
}
export interface ViewAddressItemSource {
    file: string;
    label: string;
    path: string;
    path_name: string;
}
export interface ViewAddressItem {
    address: string;
    cdn: string;
    is_default: boolean;
    is_timeshift: boolean;
    line_id: number;
    line_name: string;
    protocol: string;
    region: string;
    resolution: string;
}
export declare enum WsStreamType {
    ViewMasterChange = "view_master_change",
    ViewDelete = "view_delete",
    ViewAdd = "view_add",
    ViewUpdate = "view_update"
}
export interface WsStreamView {
    type: WsStreamType;
    data: WsStreamViewItem;
}
export interface WsStreamViewlive {
    live: boolean;
    live_type: ChannelLiveType;
    view_page: number;
}
export interface WsStreamViewItem {
    cover_image: string;
    is_default: boolean;
    is_master: boolean;
    live: boolean;
    name: string;
    view_page: number;
    viewid: number;
    view_address?: ViewAddress;
}
