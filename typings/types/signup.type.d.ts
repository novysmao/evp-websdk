export interface SignupConfig {
    is_open: boolean;
    description: string;
    name: string;
    pic: string;
    items: SignupItem[];
    is_ok: boolean;
}
export interface SignupItem {
    type: string;
    name: string;
    is_must: boolean;
}
