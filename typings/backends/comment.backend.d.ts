import { Observable } from 'rxjs';
import { CommentConfig, GetCommentsRes } from '@type/comment.type';
import { RequestPage } from '@type/common.type';
export declare const getCommentConfig: (data: {
    act_id: string;
}) => Observable<CommentConfig>;
export declare const sendComment: (act_id: string, message: string) => Observable<any>;
export declare const getComments: (act_id: string, data: RequestPage) => Observable<GetCommentsRes>;
