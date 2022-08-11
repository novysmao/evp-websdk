export interface HotVideo {
    name: string;
    order: number;
    thumb_url: string;
    url: {
        resolution: string;
        url: string;
    }[];
    video_id: number;
}
