export declare enum RedPacketType {
    Normal = 1,
    Token = 2
}
export interface RedPacket {
    id: string;
    type: RedPacketType;
    total_fee: number;
    total_num: number;
    get_num: number;
    bless_words: string;
    password: string;
    expired_at: string;
    sent_at: string;
    is_get: boolean;
    get_fee: number;
}
export interface RedPacketConfig {
    is_open: boolean;
    items: RedPacket[];
    is_ok: boolean;
}
