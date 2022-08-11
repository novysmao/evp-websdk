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
export interface RequestDocPage {
    page_num?: number;
    page_size?: number;
    is_doc_download: boolean;
}
export interface DocumentImages {
    id: number;
    doc_id: number;
    index: number;
    url: string;
}
export interface DocumentDetail {
    id: number;
    status: number;
    page_num: number;
    file_size: number;
    download_times: number;
    title: string;
    is_doc_downLoad: boolean;
    images: DocumentImages[];
}
export interface DocumentPage {
    page_num: number;
    page_size: number;
    total_num: number;
    total_page: number;
}
export interface DocumentList {
    data: DocumentDetail[];
    page: DocumentPage;
}
export interface DocumentDownload {
    id: number;
    download_url: string;
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
export interface WsDocumentConfig {
    background_url: string;
    download: boolean;
    name: string;
    open: boolean;
    turn: boolean;
    type: string;
}
export interface WsDocumentList {
    docid: number;
    download: boolean;
    title: string;
    type: string;
}
export interface WsDocumentTranscode {
    docid: string;
    status: 1 | 2;
    type: string;
}
