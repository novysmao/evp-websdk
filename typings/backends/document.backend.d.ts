import { Observable } from 'rxjs';
import { RequestDocPage, DocumentList, DocumentDownload } from '@type/document.type';
export declare const getDocumentConfig: (data: {
    act_id: string;
}) => Observable<unknown>;
export declare const getDocumentList: (act_id: string, data: RequestDocPage) => Observable<DocumentList>;
export declare const getDocumentDownloadLink: (act_id: string, doc_id: number) => Observable<DocumentDownload>;
