export interface MenuItem {
    id: number;
    order: number;
    text: string;
    title: string;
    type: number;
    video_id: number[];
}
export declare enum MenuType {
    Graphics = 1,
    Videos = 2
}
