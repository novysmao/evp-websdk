import { User, UserIdentity, UserUpdateInfo, ChannelInfo, enterResult } from '@type/user.type';
import { Observable } from 'rxjs';
export declare const join: (act_id: string, userIdentity: UserIdentity) => Observable<User>;
export declare const update: (act_id: string, visitor_id: any, userUpdateInfo: UserUpdateInfo) => Observable<unknown>;
export declare const updatePageViewId: (act_id: string, visitor_id: any, channelInfo: ChannelInfo) => Observable<enterResult>;
