import { DocumentDetail } from '@type/document.type';
import { DocumentConfig, WsDocument, DocumentList, DocumentDownload } from '@type/document.type';
import { AModel, Model } from 'src/lib/model';
export interface DocumentState {
    config: DocumentConfig;
    list: DocumentDetail[];
}
export declare class DocumentModel extends Model<DocumentState> implements AModel {
    name: string;
    mainPlayer: string;
    delayTime: number;
    constructor();
    static transformWsDocument(data: any, state: DocumentState): DocumentConfig;
    static transformVtt(data: WsDocument, state: DocumentState): DocumentConfig;
    get config(): DocumentConfig;
    get isUseWebvtt(): boolean;
    getConfig(): Promise<void>;
    init(config?: DocumentConfig): Promise<boolean>;
    subNats(): void;
    getDocumentList(param: any): Promise<DocumentList>;
    getDocumentDownloadLink(docId: any): Promise<DocumentDownload>;
    setDelayTime(time: number): void;
    getIsMainPlayer(): void;
    destroy(): void;
}
export declare const documentModel: DocumentModel;
