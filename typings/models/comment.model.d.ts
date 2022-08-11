import { CommentConfig, CommentItem, ReplyComment, WsComemntConfig, WsCommentItem, WsReplyCommentItem } from '@type/comment.type';
import { Model, AModel } from '../lib/model';
import { Pagination, RequestPage } from '@type/common.type';
import { Subject } from 'rxjs';
export interface CommentModelState {
    pagination: Pagination;
    config: CommentConfig;
    topCommentIds: [];
    untopCommentIds: [];
    topComments: CommentItem[];
    untopComments: CommentItem[];
    comments: CommentItem[];
    commentsMap: {
        [K: number]: CommentItem;
    };
    loading: boolean;
}
export declare class CommentModel extends Model<CommentModelState> implements AModel {
    bufferCount: number;
    bufferTime: number;
    comment$: Subject<CommentItem>;
    name: string;
    constructor();
    static transformWsConfigData(data: WsComemntConfig): CommentConfig;
    static transformWsData(data: WsCommentItem): CommentItem;
    static transformWsReplyComment(data: WsReplyCommentItem): ReplyComment;
    get config(): CommentConfig;
    get pagination(): Pagination;
    getConfig(): Promise<void>;
    init(config?: CommentConfig): Promise<boolean>;
    subNats(): void;
    setBarrageStatus(value: boolean): void;
    getComments(queryData: RequestPage): Promise<CommentItem[]>;
    getCurrentPageComments(): Promise<CommentItem[]>;
    getNextPageComments(): Promise<CommentItem[]>;
    sendComment(message: string): Promise<CommentItem>;
    resolveComments(comments: CommentItem[]): void;
    resolveCommentDelete(commentId: number): CommentItem;
    destroy(): void;
}
export declare const commentModel: CommentModel;
