import { AdvertisementConfig, AttachmentConfig, BasicConfig, DecorationConfig, MediaHubConfig, PlaybackConfig, SocialShareConfig, WechatJssdkConfig, NumberResult, UPV } from '@type/basis.type';
import { Observable } from 'rxjs';
export declare const getBasicConfig: (data: {
    act_id: string;
}) => Observable<BasicConfig>;
export declare const getDecorationConfig: (data: {
    act_id: string;
}) => Observable<DecorationConfig>;
export declare const getShareConfig: (data: {
    act_id: string;
}) => Observable<SocialShareConfig>;
export declare const getAttachmentConfig: (data: {
    act_id: string;
}) => Observable<AttachmentConfig>;
export declare const getAdvertisementConfig: (data: {
    act_id: string;
}) => Observable<AdvertisementConfig>;
export declare const getPlaybackConfig: (data: {
    act_id: string;
}) => Observable<PlaybackConfig>;
export declare const getWechatSdkConfig: (data: {
    act_id: string;
}) => Observable<WechatJssdkConfig>;
export declare const getMediahubConfig: (data: {
    act_id: string;
}) => Observable<MediaHubConfig>;
export declare const getOnlineNum: (act_id: string, analytic_id: number) => Observable<NumberResult>;
export declare const getUpv: (data: {
    act_id: string;
}) => Observable<UPV>;
