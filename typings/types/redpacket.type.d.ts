export declare enum RedpacketType {
    Normal = 1,
    Token = 2
}
export interface Redpacket {
    id: string;
    type: RedpacketType;
    total_fee: number;
    total_num: number;
    get_num: number;
    bless_words: string;
    password: string;
    expired_at: string;
    sent_at: string;
    created_at: string;
    updated_at: string;
    is_get: boolean;
    get_fee: number;
}
