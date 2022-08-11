import { getStreamViewConfig } from '@backends/stream-view.backend';
import {
  StreamViewItem,
  WsStreamView,
  WsStreamViewlive,
  WsStreamType,
  WsStreamViewItem,
  ViewAddress,
  ViewAddressSource,
} from '@type/stream-view.type';
import { PlaylistItemSource } from '@type/player.type';
import { basisModel } from './basis.model';
import { getStreamViews } from '@backends/stream-view.backend';
import { roomModel } from './room.model';
import { eventEmitterModel } from './event-emitter.model';
import { cloneDeep } from 'lodash';
import {
  StreamViewAdd,
  StreamViewDelete,
  StreamViewLive,
  StreamViewMasterChange,
  StreamViewUpdate,
} from '../constans/events';
import { AModel, connect, Model } from 'src/lib/model';
import { DefaultStreamViewCoverImage } from 'src/constans/resources';

export interface StreamViewModelState {
  views: StreamViewItem[];
  isMultithread: boolean;
}

const DEFAULT_STATE = {
  views: [],
  isMultithread: false, // 是否是多流
};

@connect({
  views: {
    backend: getStreamViewConfig,
    params: () => ({ act_id: basisModel.getState().config.basic.id }),
    transform: (views: StreamViewItem[]) => StreamViewModel.transformViewAddressToPlaylistSources(views),
  },
})
export class StreamViewModel extends Model<StreamViewModelState> implements AModel {
  name = 'stream-view';
  constructor() {
    super(DEFAULT_STATE);
  }

  static transformViewAddressToPlaylistSources(ViewAddress: StreamViewItem[]): StreamViewItem[] {
    return ViewAddress.map((item) => ({
      ...item,
      view_address: {
        is_abroad: item.view_address.is_abroad,
        sources: (item.view_address as ViewAddressSource).sources
          ? (item.view_address as ViewAddressSource).sources
          : (item.view_address as ViewAddress).mobile.map((item) => ({
              file: item.address,
              label: item.resolution,
              path: String(item.line_id),
              path_name: item.line_name,
            })),
      },
    }));
  }

  static transformViewAddressItemToPlaylistSources(ViewAddress: StreamViewItem): StreamViewItem {
    return {
      ...ViewAddress,
      view_address: {
        is_abroad: ViewAddress.view_address.is_abroad,
        sources: (ViewAddress.view_address as ViewAddressSource).sources
          ? (ViewAddress.view_address as ViewAddressSource).sources
          : (ViewAddress.view_address as ViewAddress).mobile.map((ViewAddress) => ({
              file: ViewAddress.address,
              label: ViewAddress.resolution,
              path: String(ViewAddress.line_id),
              path_name: ViewAddress.line_name,
            })),
      },
    };
  }

  async init(views?: StreamViewItem[]) {
    if (views?.length > 0) {
      this.setState({
        views: StreamViewModel.transformViewAddressToPlaylistSources(views),
        isMultithread: views.length > 1,
      });
    } else {
      await this.updateKeys();
      const views = this.getState().views;
      console.log(views);
      this.setState({
        isMultithread: views.length > 1,
      });
    }
    this.subNats();
    console.log(this.getState());
    return Promise.resolve(true);
  }

  get defaultCoverImage() {
    return DefaultStreamViewCoverImage;
  }

  get views() {
    return this.getState().views;
  }

  get isMultithread() {
    return this.getState().isMultithread;
  }

  get masterStreamView() {
    return this.getState().views.filter((item) => item.is_master)[0];
  }

  get defaultStreamView() {
    return this.getState().views.filter((item) => item.is_default)[0];
  }

  subNats() {
    roomModel.nats.from(`bugu.activity.view.${basisModel.getState().config.basic.id}`).subscribe((v: WsStreamView) => {
      switch (v.type) {
        case WsStreamType.ViewAdd:
          const viewAddArr = cloneDeep(this.getState().views);
          getStreamViews(basisModel.getState().config.basic.id, v.data.view_page).subscribe((view: StreamViewItem) => {
            const eventAddViews = this.transformWsData(v.data, view);
            viewAddArr.push(eventAddViews);
            this.setState({ views: StreamViewModel.transformViewAddressToPlaylistSources(viewAddArr) });
            eventEmitterModel.emit(this.name, {
              type: StreamViewAdd,
              data: StreamViewModel.transformViewAddressItemToPlaylistSources(eventAddViews),
            });
          });
          break;
        case WsStreamType.ViewDelete:
          const viewDeleteArr = cloneDeep(this.getState().views).filter((item) => item.view_id !== v.data.viewid);
          const viewDeleteSourcesArr = StreamViewModel.transformViewAddressToPlaylistSources(viewDeleteArr);
          this.setState({ views: viewDeleteSourcesArr });
          eventEmitterModel.emit(this.name, {
            type: StreamViewDelete,
            data: {
              views: viewDeleteSourcesArr,
              deleteId: v.data.viewid,
            },
          });
          break;
        case WsStreamType.ViewMasterChange:
          const viewMasterChangeArr = cloneDeep(this.getState().views).map((item) => ({
            ...item,
            is_master: item.view_page === v.data.view_page ? v.data.is_master : false,
          }));
          const viewMasterChangeSourcesArr = StreamViewModel.transformViewAddressToPlaylistSources(viewMasterChangeArr);
          this.setState({ views: viewMasterChangeSourcesArr });
          eventEmitterModel.emit(this.name, {
            type: StreamViewMasterChange,
            data: viewMasterChangeSourcesArr,
          });
          break;
        case WsStreamType.ViewUpdate:
          const viewUpdateArr = cloneDeep(this.getState().views).map((item) => ({
            ...item,
            cover: item.view_page === v.data.view_page ? v.data.cover_image : item.cover,
            name: item.view_page === v.data.view_page ? v.data.name : item.name,
          }));
          const viewUpdateSourcesArr = StreamViewModel.transformViewAddressToPlaylistSources(viewUpdateArr);
          this.setState({ views: viewUpdateSourcesArr });
          eventEmitterModel.emit(this.name, {
            type: StreamViewUpdate,
            data: viewUpdateSourcesArr,
          });
          break;
        default:
          break;
      }
    });
    roomModel.nats
      .from(`bugu.activity.viewlive.${basisModel.getState().config.basic.id}`)
      .subscribe((v: WsStreamViewlive) => {
        const { views } = this.getState();
        if (v.live) {
          getStreamViews(basisModel.getState().config.basic.id, v.view_page).subscribe((view: StreamViewItem) => {
            const newViews = views.map((item) => ({
              ...item,
              is_live: item.view_page === v.view_page ? v.live : item.is_live,
              view_address: item.view_page === v.view_page ? view.view_address : item.view_address,
            }));
            this.setState({
              views: StreamViewModel.transformViewAddressToPlaylistSources(newViews),
            });
            const eventViewLive = cloneDeep(this.getState().views);
            eventEmitterModel.emit(this.name, {
              type: StreamViewLive,
              data: {
                views: eventViewLive,
                view_page: v.view_page,
                live: v.live,
                live_type: v.live_type,
              },
            });
          });
        } else {
          const newViews = views.map((item) => ({
            ...item,
            is_live: item.view_page === v.view_page ? v.live : item.is_live,
            view_address:
              item.view_page === v.view_page
                ? {
                    mobile: [],
                    is_abroad: false,
                    pc: [],
                  }
                : item.view_address,
          }));
          this.setState({
            views: StreamViewModel.transformViewAddressToPlaylistSources(newViews),
          });
          const eventViewLive = cloneDeep(this.getState().views);
          eventEmitterModel.emit(this.name, {
            type: StreamViewLive,
            data: {
              views: eventViewLive,
              view_page: v.view_page,
              live: v.live,
              live_type: v.live_type,
            },
          });
        }
      });
  }

  transformWsData(data: WsStreamViewItem, view: StreamViewItem): StreamViewItem {
    const { cover_image, is_default, is_master, live, name, view_page, viewid } = data;
    return {
      cover: cover_image,
      is_default,
      is_master,
      is_live: live,
      name,
      view_page,
      view_id: viewid,
      view_address: view.view_address,
    };
  }

  destroy() {
    console.log(`[${this.name}]:销毁`);
    this.setState(DEFAULT_STATE);
  }
}

export const streamViewModel = new StreamViewModel();
