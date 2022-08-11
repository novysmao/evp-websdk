import { DocDot } from './document.type';
export declare enum VideoStatus {
    Init = 0,
    Success = 1,
    Transcoding = 2,
    TranscodeSuccess = 3,
    TranscodeFail = 4,
    Uploading = 5,
    UploadFail = 6
}
export interface Video {
    duration: number;
    end_at: number;
    id: number;
    name: string;
    size: number;
    start_at: number;
    status: VideoStatus;
    cover: string;
    url: string;
    playback: VideoPlayback[];
    video_dot: VideoDot[];
    doc_dot: DocDot[];
}
export interface VideoDot {
    video_id: number;
    offset: number;
    content: string;
}
export interface VideoPlayback {
    video_id: number;
    resolution: string;
    video_url: string;
}
