import { State } from '@core/state';
import { PlaylistItem } from 'mudu-player';
import { StreamView } from '@type/stream-view.type';
import { Subscription } from 'rxjs';
export declare enum PlayType {
    None = 0,
    Live = 1,
    Ad = 2,
    HotVideo = 3,
    Playback = 4
}
export interface WatchModelState {
    views: StreamView[];
    currentView?: StreamView;
    playlist: PlaylistItem[];
    playType: PlayType;
}
export declare class WatchModel extends State<WatchModelState> {
    msgSubs: Subscription;
    constructor();
    init: () => void;
}
export declare const watchModel: WatchModel;
