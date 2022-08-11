import { AResBaseType } from '@type/backend.type';
export interface MultiStreamViewsRes extends AResBaseType {
    results: MultiStreamView[];
}
export declare type ViewAddressItem = {
    address: string;
    protocol: string;
    region: string;
    resolution: string;
};
export interface ViewAddressRes extends AResBaseType {
    abroad: boolean;
    result: {
        mobile: ViewAddressItem[];
        pc: ViewAddressItem[];
    };
}
export interface PlaybackRes extends AResBaseType {
    autoplay: boolean;
    available: boolean;
    expire: string;
    video_id: number;
}
export interface VideoInfoRes extends AResBaseType {
    result: {
        act_id: number;
        create_at: string;
        duration: number;
        end_at: number;
        hub_id: number;
        hubuser_id: number;
        id: number;
        import_doc_kfd: number;
        key_frame_desc: any;
        name: string;
        play_back_messages: any;
        playset: any[];
        size: number;
        sourcefrom: 'UPLOAD';
        start_at: number;
        status: 1;
        thumburl: string;
        url: string;
        watch_times: number;
    };
}
export interface MultiStreamView {
    cover_image: string;
    is_default: boolean;
    is_master: boolean;
    live: boolean;
    name: string;
    view_page: number;
    viewid: number;
}
