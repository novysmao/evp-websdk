import { Pagination } from './common.type';

export interface CommentConfig {
  is_open: boolean; // 是否开启评论: true-是 false-否
  is_comments_num_show: boolean; // 是否展示评论数目: true-是 false-否
  is_barrage_open: boolean; // 是否展示弹幕: true-是 false-否
  is_ok: boolean; // 为true表示请求接口成功，false表示失败返回默认数据
}

export interface CommentItem {
  id: number; // 评论id
  visitor_id: number; // 观众id
  message: string; // 评论内容
  title: string; // 评论标题
  name: string; // 观众昵称
  avatar: string; // 观众展示头像
  is_approved: boolean; // 观众是否认证: true-是， false-否
  is_live_comment_pushed: boolean; // 是否作为弹幕推送: true-是，false-否
  is_top: boolean; // 评论是否置顶： true-是，false-否
  created_at: number; // 评论创建时间
  reply_comments: ReplyComment[]; // 评论回复
  type: CommentType; // 评论类型
}

export interface ReplyComment {
  id: number; // 评论回复id
  created: number; // 评论回复创建时间
  is_public: boolean; // 是否公开展示次回复: true-是， false-否
  message: string; // 评论回复内容
  title: string; // 评论回复标题
  name: string; // 评论人昵称
  avatar: string; // 评论人展示头像
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
  Type: CommentType; // 评论类型
}

export enum WsCommentType {
  CommentNew = 'comment_new',
  CommentTop = 'comment_top',
  CommentReplyUpdate = 'comment_reply_update',
  CommentConfigUpdate = 'comments_config_update',
  CommentDelete = 'comment_delete',
}

/**
 * 评论类型
 * status = 0 文本内容
 * status = 1 图片内容
 * status = 2 超链接
 */
export enum CommentType {
  Word = 0,
  ImgLink = 1,
  HyperLinks = 2,
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
