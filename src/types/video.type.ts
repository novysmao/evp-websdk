import { DocDot } from './document.type';

/**
 * 视频的状态
 * status = 0 初始状态
 * status = 1 上传完成（最终状态）
 * status = 2 转码中(过程状态)
 * status = 3 转码成功
 * status = 4 转码失败
 * status = 5 转码完成，正在上传
 * status = 6 上传失败
 */
export enum VideoStatus {
  Init = 0,
  Success = 1,
  Transcoding = 2,
  TranscodeSuccess = 3,
  TranscodeFail = 4,
  Uploading = 5,
  UploadFail = 6,
}

/**
 * 视频信息
 */
export interface Video {
  duration: number; // 视频的时长, 单位: 秒
  end_at: number; // 视频结束时间戳
  id: number; // 视频的id
  name: string; // 视频的名称
  size: number; // 视频的大小, 单位: 字节
  start_at: number; // 视频开始时间戳
  status: VideoStatus; // 视频的状态
  cover: string; // 视频的封面
  url: string; // 视频的拉流/下载地址
  playback: VideoPlayback[]; // 视频回放信息
  video_dot: VideoDot[]; // 视频打点信息
  doc_dot: DocDot[]; // 文档打点信息
}

// export interface PlaySources {
//   file: string; // 视频地址
//   label?: string; // 展示在视频切换时的文字: 如720p, HD
//   defaultPlay?: boolean; // 是否默认播放该source
//   path?: string; // 线路名称: 如aliyun，tencent
//   path_name?: string; // 展示在线路切换时的文字: 如线路一, 线路二
// }

// export interface Playlist {
//   image?: string; // 视频的背景图
//   title?: string; // 视频的title,全屏时显示
//   isLive?: boolean; // 是否是直播，如果是直播的话，播放器会隐藏进度条/播放速率切换等dom
//   sources?: PlaySources; // 当前视频的源列表(一个视频可能会有多个源720p/480p/flv源/m3u8源)
// }

/**
 * 视频打点信息
 */
export interface VideoDot {
  video_id: number; // 视频id
  offset: number; // 视频打点下标, 单位：秒
  content: string; // 视频打点内容
}

/**
 * 视频信息
 */
export interface VideoPlayback {
  video_id: number; // 视频id
  resolution: string; // 视频分辨率
  video_url: string; // 视频的拉流/下载地址
}
