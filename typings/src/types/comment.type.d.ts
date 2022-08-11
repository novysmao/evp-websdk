import { Pagination } from './common.type';
export interface CommentConfig {
    is_open: boolean;
    is_comments_num_show: boolean;
    is_barrage_open: boolean;
    is_ok: boolean;
}
export interface CommentItem {
    id: number;
    visitor_id: number;
    message: string;
    title: string;
    name: string;
    avatar: string;
    is_approved: boolean;
    is_live_comment_pushed: boolean;
    is_top: boolean;
    created_at: number;
    reply_comments: ReplyComment[];
}
export interface ReplyComment {
    id: number;
    created: number;
    is_public: boolean;
    message: string;
    title: string;
    name: string;
    avatar: string;
}
export interface WsReplyCommentItem {
    ID: number;
    Avatar: string;
    CreateAt: string;
    Message: string;
    Name: string;
    Public: boolean;
    Title: string;
}
export interface GetCommentsRes {
    data: CommentItem[];
    page: Pagination;
}
export interface WsCommentItem {
    ID: number;
    UserID: number;
    Message: string;
    Title: string;
    Name: string;
    Avatar: string;
    Approved: boolean;
    LivecommentPushed: boolean;
    Top: boolean;
    CreateAt: string;
    CommentReplies: WsReplyCommentItem[];
}
export declare enum WsCommentType {
    CommentNew = "comment_new",
    CommentTop = "comment_top",
    CommentReplyUpdate = "comment_reply_update",
    CommentConfigUpdate = "comments_config_update",
    CommentDelete = "comment_delete"
}
export interface WsComment {
    Type: WsCommentType;
    Data: WsCommentItem;
    Top?: boolean;
    CommentId?: number;
}
export interface WsComemntConfig {
    Type: WsCommentType;
    BarrageOpen: boolean;
    Open: boolean;
    ShowCommentsNum: boolean;
}
