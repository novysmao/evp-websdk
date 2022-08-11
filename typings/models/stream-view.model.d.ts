import { StreamViewItem, WsStreamViewItem } from '@type/stream-view.type';
import { AModel, Model } from 'src/lib/model';
export interface StreamViewModelState {
    views: StreamViewItem[];
    isMultithread: boolean;
}
export declare class StreamViewModel extends Model<StreamViewModelState> implements AModel {
    name: string;
    constructor();
    static transformViewAddressToPlaylistSources(ViewAddress: StreamViewItem[]): StreamViewItem[];
    static transformViewAddressItemToPlaylistSources(ViewAddress: StreamViewItem): StreamViewItem;
    init(views?: StreamViewItem[]): Promise<boolean>;
    get defaultCoverImage(): string;
    get views(): StreamViewItem[];
    get isMultithread(): boolean;
    get masterStreamView(): StreamViewItem;
    get defaultStreamView(): StreamViewItem;
    subNats(): void;
    transformWsData(data: WsStreamViewItem, view: StreamViewItem): StreamViewItem;
    destroy(): void;
}
export declare const streamViewModel: StreamViewModel;
