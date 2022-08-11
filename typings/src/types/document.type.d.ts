export declare enum DocType {
    None = -1,
    Board = 0,
    Doc = 1
}
export interface DocBoard {
    id: string;
    r_token: string;
    operation_time: number;
}
export interface DocPPT {
    id: string;
    index: number;
    url: string;
}
export interface DocumentConfig {
    is_doc_show: boolean;
    is_doc_download: boolean;
    bgimg: string;
    doc_type: DocType;
    board: DocBoard;
    ppt: DocPPT;
    is_ok: boolean;
}
export interface DocDot {
    dot_id: number;
    offset: number;
    content: string;
}
export interface WsDocument {
    board: {
        board_id: string;
        r_token: string;
    };
    board_operation_time: number;
    docid: string;
    index: number;
    type: string;
    url: string;
}
