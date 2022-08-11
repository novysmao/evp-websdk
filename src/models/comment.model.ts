import {
  CommentConfig,
  CommentItem,
  GetCommentsRes,
  ReplyComment,
  WsComemntConfig,
  WsComment,
  WsCommentItem,
  WsCommentType,
  WsReplyCommentItem,
} from '@type/comment.type';
import { getCommentConfig, getComments, sendComment } from '@backends/comment.backend';
import { basisModel } from './basis.model';
import { Model, connect, AModel } from '../lib/model';
import { Pagination, RequestPage } from '@type/common.type';
import { uniq, uniqBy, cloneDeep, remove, sortBy, uniqWith } from 'lodash';
import { roomModel } from './room.model';
import { Observable, Subject } from 'rxjs';
import { bufferTime, filter } from 'rxjs/operators';
import { eventEmitterModel } from './event-emitter.model';
import {
  CommentConfigUpdate,
  CommentNew,
  CommentReplyUpdate,
  CommentTop,
  CommentBarrageClose,
  CommentBarrageNew,
  CommentBarrageOpen,
  CommentDelete,
} from '../constans/events';
import { userModel } from './user.model';

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

const DEFAULT_STATE: CommentModelState = {
  loading: false,
  config: {
    is_open: false,
    is_comments_num_show: false,
    is_barrage_open: false,
    is_ok: false,
  },
  topCommentIds: [],
  untopCommentIds: [],
  topComments: [],
  untopComments: [],
  comments: [],
  commentsMap: {},
  pagination: {
    total_num: 0,
    total_page: 1,
    page_num: 1,
    page_size: 10,
  },
};

@connect({
  config: {
    backend: getCommentConfig,
    params: () => ({ act_id: basisModel.getState().config.basic.id }),
  },
})
export class CommentModel extends Model<CommentModelState> implements AModel {
  bufferCount = 20; // 缓冲区条数
  bufferTime = 500; // 缓冲区时间，单位ms
  comment$: Subject<CommentItem> = new Subject();
  name = 'comment';

  constructor() {
    super(DEFAULT_STATE);
  }

  static transformWsConfigData(data: WsComemntConfig): CommentConfig {
    const { BarrageOpen, Open, ShowCommentsNum } = data;
    return {
      is_open: Open,
      is_barrage_open: BarrageOpen,
      is_comments_num_show: ShowCommentsNum,
      is_ok: true,
    };
  }

  static transformWsData(data: WsCommentItem): CommentItem {
    const {
      ID,
      UserID,
      Message,
      Title,
      Name,
      Avatar,
      Approved,
      LivecommentPushed,
      Top,
      CreateAt,
      CommentReplies,
      Type,
    } = data;
    const replyComments = (CommentReplies || []).map((v) => CommentModel.transformWsReplyComment(v));
    return {
      id: ID,
      visitor_id: UserID,
      message: Message,
      title: Title,
      name: Name,
      avatar: Avatar,
      is_approved: Approved,
      is_live_comment_pushed: LivecommentPushed,
      is_top: Top,
      created_at: new Date(CreateAt.replace(/\-/g, '/')).valueOf() / 1000,
      reply_comments: replyComments,
      type: Type,
    };
  }

  static transformWsReplyComment(data: WsReplyCommentItem): ReplyComment {
    const { ID, Message, Title, Name, Avatar, Public, CreateAt } = data;
    return {
      id: ID,
      message: Message,
      title: Title,
      name: Name,
      avatar: Avatar,
      is_public: Public,
      created: new Date(CreateAt.replace(/\-/g, '/')).valueOf() / 1000,
    };
  }

  get config(): CommentConfig {
    return this.getState().config;
  }

  get pagination(): Pagination {
    return this.getState().pagination;
  }

  async getConfig() {
    await this.updateKeys();
  }

  async init(config?: CommentConfig) {
    if (config) {
      this.setState({ config });
    } else {
      await this.getConfig();
    }
    this.subNats();

    this.comment$
      .pipe(
        bufferTime(500, null, this.bufferCount),
        filter((v) => v.length !== 0),
      )
      .subscribe((comments: CommentItem[]) => {
        this.resolveComments(comments);
      });

    return Promise.resolve(true);
  }

  subNats() {
    console.log('sub');
    const act_id = basisModel.getState().config.basic.id;
    // 聊天消息
    roomModel.nats.from(`bugu.activity.comments.${act_id}`).subscribe((v: WsComment | WsComemntConfig) => {
      const user_id = userModel.getState().id;
      switch (v.Type) {
        case WsCommentType.CommentNew:
          let comment = CommentModel.transformWsData((v as WsComment).Data);
          // 不是本人的未过审评论不显示
          if (comment.visitor_id !== user_id && !comment.is_approved) break;
          eventEmitterModel.emit(this.name, {
            type: CommentNew,
            data: comment,
          });
          this.comment$.next(comment);
          let pagination = cloneDeep(this.getState().pagination);
          pagination.total_num += 1;
          this.setState({ pagination });
          break;
        case WsCommentType.CommentDelete:
          const commentId = (v as WsComment).CommentId;
          const removedComment = this.resolveCommentDelete(commentId);
          eventEmitterModel.emit(this.name, {
            type: CommentDelete,
            data: removedComment,
          });
          pagination = cloneDeep(this.getState().pagination);
          pagination.total_num -= 1;
          this.setState({ pagination });
          break;
        case WsCommentType.CommentTop:
          comment = CommentModel.transformWsData((v as WsComment).Data);

          eventEmitterModel.emit(this.name, {
            type: CommentTop,
            data: comment,
          });
          this.comment$.next(comment);
          break;
        case WsCommentType.CommentReplyUpdate:
          comment = CommentModel.transformWsData((v as WsComment).Data);
          // 不是本人的未过审评论不显示
          if (comment.visitor_id !== user_id && !comment.is_approved) break;
          eventEmitterModel.emit(this.name, {
            type: CommentReplyUpdate,
            data: comment,
          });
          this.comment$.next(comment);
          break;
        case WsCommentType.CommentConfigUpdate:
          const config = CommentModel.transformWsConfigData(v as WsComemntConfig);
          eventEmitterModel.emit(this.name, {
            type: CommentConfigUpdate,
            data: config,
          });
          this.setState({ config });
          break;
      }
    });

    // 弹幕
    roomModel.nats.from(`bugu.activity.livecomments.${act_id}`).subscribe((v: any) => {
      if (this.getState().config.is_barrage_open) {
        eventEmitterModel.emit(this.name, {
          type: CommentBarrageNew,
          data: v.text,
        });
      }
    });
  }

  setBarrageStatus(value: boolean) {
    const config: CommentConfig = cloneDeep(this.getState().config);
    if (config.is_barrage_open === value) return;

    config.is_barrage_open = value;
    eventEmitterModel.emit(this.name, {
      type: value ? CommentBarrageOpen : CommentBarrageClose,
      data: value,
    });
    this.setState({ config });
  }

  async getComments(queryData: RequestPage): Promise<CommentItem[]> {
    return new Promise((resolve, reject) => {
      const { loading } = this.getState();
      if (loading) reject('comments is loading');

      this.setState({ loading: true });

      void getComments(basisModel.getState().config.basic.id, queryData).subscribe({
        next: (v: GetCommentsRes) => {
          const { data, page: pagination } = v;
          data.map((v) => this.comment$.next(v));
          this.setState({
            loading: false,
            pagination,
          });
          resolve(v.data);
        },
        error: (err) => {
          this.setState({ loading: false });
          reject(err);
        },
      });
    });
  }

  async getCurrentPageComments(): Promise<CommentItem[]> {
    const { pagination } = this.getState();
    const queryData = {
      page_num: pagination.page_num,
      page_size: pagination.page_size,
    };
    const comments = await this.getComments(queryData);
    return Promise.resolve(comments);
  }

  async getNextPageComments(): Promise<CommentItem[]> {
    const pagination = cloneDeep(this.getState().pagination);
    pagination.page_num += 1;
    this.setState({ pagination });
    const comments = await this.getCurrentPageComments();
    return Promise.resolve(comments);
  }

  sendComment(message: string): Promise<CommentItem> {
    return new Promise((resolve, reject) => {
      sendComment(basisModel.getState().config.basic.id, message).subscribe({
        next: (v) => {
          resolve(v);
        },
        error: (err) => {
          reject(err);
        },
      });
    });
  }

  resolveComments(comments: CommentItem[]) {
    const state = cloneDeep(this.getState());
    let { topCommentIds, untopCommentIds } = state;
    const { commentsMap } = state;
    comments.map((comment: CommentItem) => {
      commentsMap[comment.id] = comment;
      if (comment.is_top) {
        remove(untopCommentIds, (id: number) => id === comment.id);
        topCommentIds.unshift(comment.id);
      } else {
        remove(topCommentIds, (id: number) => id === comment.id);
        untopCommentIds.unshift(comment.id);
      }
    });
    topCommentIds = uniq(topCommentIds);
    untopCommentIds = uniq(untopCommentIds);
    const topComments = topCommentIds.map((id: number) => commentsMap[id]);
    let untopComments = untopCommentIds.map((id: number) => commentsMap[id]);
    untopComments = sortBy(untopComments, (v: CommentItem) => -v.created_at);
    this.setState({
      topCommentIds,
      untopCommentIds,
      commentsMap,
      topComments,
      untopComments,
      comments: topComments.concat(untopComments),
    });
  }

  resolveCommentDelete(commentId: number): CommentItem {
    const state = cloneDeep(this.getState());
    const { topCommentIds, untopCommentIds, commentsMap } = state;

    remove(topCommentIds, (id: number) => id === commentId);
    remove(untopCommentIds, (id: number) => id === commentId);
    const removedComment = commentsMap[commentId];
    delete commentsMap[commentId];

    const topComments = topCommentIds.map((id: number) => commentsMap[id]);
    let untopComments = untopCommentIds.map((id: number) => commentsMap[id]);
    untopComments = sortBy(untopComments, (v: CommentItem) => -v.created_at);

    this.setState({
      topCommentIds,
      untopCommentIds,
      commentsMap,
      topComments,
      untopComments,
      comments: topComments.concat(untopComments),
    });
    return removedComment;
  }

  destroy() {
    console.log(`[${this.name}]:销毁`);
    this.setState(DEFAULT_STATE);
  }
}

export const commentModel = new CommentModel();
