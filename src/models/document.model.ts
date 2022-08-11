import { getDocumentConfig, getDocumentList, getDocumentDownloadLink } from '@backends/document.backend';
import { DocumentDetail } from '@type/document.type';
import {
  DocType,
  DocumentConfig,
  WsDocument,
  WsDocumentConfig,
  DocumentList,
  DocumentDownload,
  WsDocumentList,
  WsDocumentTranscode,
} from '@type/document.type';
import { basisModel } from './basis.model';
import { ViewAddressSource } from '@type/stream-view.type';
import { roomModel } from './room.model';
import { playerModel } from './players.model';
import { eventEmitterModel } from './event-emitter.model';
import {
  DocumentPagingUpdate,
  DocumentConfigUpdate,
  DocumentListDownload,
  DocumentListDelete,
  DocumentListAdd,
  DocumentListTranscode,
} from '../constans/events';
import { streamViewModel } from './stream-view.model';
import { cloneDeep } from 'lodash';
import { combineLatest } from 'rxjs';
import { AModel, connect, Model } from 'src/lib/model';

export interface DocumentState {
  config: DocumentConfig;
  list: DocumentDetail[];
}

const DEFAULT_STATE: DocumentState = {
  config: {
    is_doc_show: false,
    bgimg: '', // 文档背景图片
    doc_type: DocType.None, // 文档的类型
    board: null, // 白板信息
    ppt: null, // PPT信息
    is_ok: false,
  },
  list: [],
};

@connect({
  config: {
    backend: getDocumentConfig,
    params: () => ({ act_id: basisModel.getState().config.basic.id }),
  },
})
export class DocumentModel extends Model<DocumentState> implements AModel {
  name = 'document';
  mainPlayer = '';
  delayTime = 30000; // 文档延迟

  constructor() {
    super(DEFAULT_STATE);
  }

  static transformWsDocument(data: any, state: DocumentState): DocumentConfig {
    const { board, board_operation_time, docid, index, url } = data;
    return {
      is_doc_show: state.config.is_doc_show,
      bgimg: state.config.bgimg,
      doc_type: state.config.doc_type,
      board: {
        id: board.board_id,
        r_token: board.r_token,
        operation_time: board_operation_time,
      },
      ppt: {
        id: docid,
        index,
        url,
      },
      is_ok: state.config.is_ok,
    };
  }

  static transformVtt(data: WsDocument, state: DocumentState): DocumentConfig {
    const { docid, url } = data;
    return {
      is_doc_show: state.config.is_doc_show,
      bgimg: state.config.bgimg,
      doc_type: state.config.doc_type,
      board: state.config.board,
      ppt: {
        id: docid,
        index: state.config.ppt.index,
        url,
      },
      is_ok: state.config.is_ok,
    };
  }

  get config(): DocumentConfig {
    return this.getState().config;
  }

  get isUseWebvtt(): boolean {
    return basisModel.media.is_use_webvtt && playerModel.getPlayerInstance(this.mainPlayer).getState().isMyunSyncAvailable
  }

  async getConfig() {
    await this.updateKeys();
  }

  async init(config?: DocumentConfig) {
    this.getIsMainPlayer();
    this.subNats();
    if (config) {
      this.setState({ config });
    } else {
      await this.getConfig();
    }
    console.log(this.getState().config);
    return Promise.resolve(true);
  }

  subNats() {
    roomModel.nats
      .from(`doc.sync.${basisModel.getState().config.basic.id}`)
      .subscribe((v: WsDocument | WsDocumentConfig | WsDocumentList | WsDocumentTranscode) => {
        switch (v.type) {
          case 'doc':
            let config = DocumentModel.transformWsDocument(v, this.getState());
            if (this.mainPlayer) {
              setTimeout(() => {
                if (!this.isUseWebvtt) {
                  eventEmitterModel.emit(this.name, {
                    type: DocumentPagingUpdate,
                    data: config,
                  });
                  this.setState({ config });
                }
              }, this.delayTime);
            }
            break;
          case 'config':
            config = cloneDeep(this.getState().config);
            config.is_doc_show = (v as WsDocumentConfig).open;
            config.bgimg = (v as WsDocumentConfig).background_url;
            eventEmitterModel.emit(this.name, {
              type: DocumentConfigUpdate,
              data: config,
            });
            this.setState({ config });
            break;
          case 'updatedoc':
            eventEmitterModel.emit(this.name, {
              type: DocumentListDownload,
              data: {
                docid: (v as WsDocumentList).docid,
                is_doc_downLoad: (v as WsDocumentList).download,
              },
            });
            break;
          case 'adddoc':
            eventEmitterModel.emit(this.name, {
              type: DocumentListAdd,
              data: (v as WsDocumentList).docid,
            });
            break;
          case 'transcode':
            eventEmitterModel.emit(this.name, {
              type: DocumentListTranscode,
              data: {
                docid: (v as any).docid - 0,
                status: (v as WsDocumentTranscode).status,
              },
            });
            break;
          case 'deldoc':
            eventEmitterModel.emit(this.name, {
              type: DocumentListDelete,
              data: (v as WsDocumentList).docid,
            });
            break;
        }
      });
  }

  // 获取文档列表
  getDocumentList(param): Promise<DocumentList> {
    return new Promise((resolve, reject) => {
      getDocumentList(basisModel.getState().config.basic.id, param).subscribe({
        next: (v) => {
          resolve(v);
        },
        error: (err) => {
          reject(err);
        },
      });
    });
  }

  // 获取文档下载链接
  getDocumentDownloadLink(docId): Promise<DocumentDownload> {
    return new Promise((resolve, reject) => {
      getDocumentDownloadLink(basisModel.getState().config.basic.id, docId).subscribe({
        next: (v) => {
          resolve(v);
        },
        error: (err) => {
          reject(err);
        },
      });
    });
  }

  // 设置非vtt延时
  setDelayTime(time: number) {
    this.delayTime = time;
  }

  getIsMainPlayer() {
    combineLatest([streamViewModel.select((state) => state.views), playerModel.select((state) => state)]).subscribe(
      (v) => {
        const playerIds = Object.keys(v[1]);
        if (v[0].length && playerIds.length && !this.mainPlayer) {
          for (const domId of playerIds) {
            v[1][domId]
              .select((state) => state.playList)
              .subscribe((playlist) => {
                if (playlist.length) {
                  const defaltView = streamViewModel.defaultStreamView;
                  const playlistAdressArr = playlist.reduce((acc, cur) => {
                    return [...acc, ...cur.sources.map((item) => item.file)];
                  }, []);
                  const ViewAdressArr = [
                    ...(defaltView.view_address as ViewAddressSource).sources.map((item) => item.file),
                  ];
                  const playlistAdressArrSet = new Set(playlistAdressArr);
                  const judgeFunc = (item) => playlistAdressArrSet.has(item);
                  if (ViewAdressArr.some(judgeFunc)) {
                    this.mainPlayer = domId;
                    playerModel
                      .getPlayerInstance(this.mainPlayer)
                      .select((state) => state.myunSyncMessage)
                      .subscribe((v) => {
                        if (v && this.isUseWebvtt) {
                          const config = DocumentModel.transformVtt(v, this.getState());
                          eventEmitterModel.emit(this.name, {
                            type: DocumentPagingUpdate,
                            data: config,
                          });
                          this.setState({ config });
                        }
                      });
                  }
                }
              });
          }
        }
      },
    );
  }

  destroy() {
    console.log(`[${this.name}]:销毁`);
    this.setState(DEFAULT_STATE);
  }
}

export const documentModel = new DocumentModel();
