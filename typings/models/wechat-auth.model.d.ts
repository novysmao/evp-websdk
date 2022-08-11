import { State } from '../core/state';
export interface WechatAuthModelState {
    isAuthed: boolean;
}
export declare class WechatAuthModel extends State<WechatAuthModelState> {
    constructor();
}
export declare const wechatAuthModel: WechatAuthModel;
