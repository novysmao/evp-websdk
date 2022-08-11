import { State } from '@core/state';
import muduPlayer from 'mudu-player/dist/umd/mudu-player';
import { Player, PlayerOption, PlaylistItem } from 'mudu-player';
import { ViewAddressSource } from '@type/stream-view.type';
import { cloneDeep } from 'lodash';
import { basisModel } from './basis.model';
import { userModel } from './user.model';
import { documentModel } from './document.model';
import { streamViewModel } from './stream-view.model';
import { PlaybackConfig, AdvertisementConfig } from '@type/basis.type';
import { PageWatchEventActions } from '@type/analytic.type';
import { eventEmitterModel } from './event-emitter.model';
import { statusCodeMap } from '../constans/error';
import {
  PlayerPlaylistItemChange,
  PlayerError,
  PlayerPause,
  PlayerPlay,
  DocumentPlaybackPagingUpdate,
} from '../constans/events';
import { interval, BehaviorSubject, Subscription, Subject, merge } from 'rxjs';
import { bufferCount } from 'rxjs/operators';
import { reportPageEvent } from '@backends/analytic.backend';

export interface PLayerModelState {
  player: Player;
  playList: PlaylistItem[];
  currentPlayListItem: PlaylistItem;
  currentPlayListIndex: number;
  currentPlayAddress: string;
  isMyunSyncAvailable: boolean;
  myunSyncMessage: any;
}

export type DanmuStyle = Pick<CSSStyleDeclaration, 'color' | 'fontSize'>;

const DEFAULT_STATE = {
  player: null,
  playList: [], // 用户传入的playList
  currentPlayListItem: {}, // 当前画面对应的playListItem
  currentPlayListIndex: -1, // 当前画面对应的playListIndex
  currentPlayAddress: '', // 当前画面对应的地址
  isMyunSyncAvailable: false, // 是否有目睹云同步功能
  myunSyncMessage: null, // 当播放器收到云同步发来的消息
};

export class PlayerModel extends State<PLayerModelState> {
  name = 'player';
  private dom: string;
  private option: PlayerOption;
  private playbackPassTime = -1;
  private playbackDocId = -1;
  private playlist: PlaylistItem[] = [];
  private danmaku: any;
  private times = 0;
  private durationVideo$: BehaviorSubject<number> = new BehaviorSubject(this.times);
  private immediatelyReport$: Subject<any> = new Subject();
  private intervalSubject: Subscription;
  private currentPageActions: PageWatchEventActions;
  private barrageSpeed = 144;

  constructor(playerId: string, option: PlayerOption) {
    super(DEFAULT_STATE);
    this.setup(playerId, option);
    this.init();
  }

  get isVideoExist(): boolean {
    const { playback, advertisement } = basisModel.getState().config;
    const { views } = streamViewModel.getState();
    return (
      playback.is_available ||
      advertisement.is_open ||
      Boolean(views.filter((item) => (item.view_address as ViewAddressSource).sources.length).length)
    );
  }

  get isDefalutLivingView() {
    const defalutView = streamViewModel.defaultStreamView;
    if (this.currentPlayListItem.sources) {
      const currentAdressArr = this.currentPlayListItem.sources.map((item) => item.file);
      const currentAdressSet = new Set(currentAdressArr);
      const judgeFunc = (item) => currentAdressSet.has(item);
      if ([...(defalutView.view_address as ViewAddressSource).sources.map((item) => item.file)].some(judgeFunc)) {
        return true;
      }
    }
    return false;
  }

  get isLivingPlayback() {
    if (this.playback.video) {
      const playback = this.playback.video.playback;
      if (this.currentPlayListItem.sources) {
        const currentAdressArr = this.currentPlayListItem.sources.map((item) => item.file);
        const currentAdressSet = new Set(currentAdressArr);
        const judgeFunc = (item) => currentAdressSet.has(item);
        if (playback.map((item) => item.video_url).some(judgeFunc)) {
          return true;
        }
      }
    }
    return false;
  }

  get isDocPlayback() {
    return !!this.playback.video && !!this.playback.video.doc_dot.length;
  }

  get currentPlayListItem(): PlaylistItem {
    return this.getState().currentPlayListItem;
  }

  get playback(): PlaybackConfig {
    return basisModel.getState().config.playback;
  }

  get advertisement(): AdvertisementConfig {
    return basisModel.getState().config.advertisement;
  }

  static judgeAction(currentPlayListItem: PlaylistItem) {
    const { advertisement } = basisModel.getState().config;
    const { views } = streamViewModel.getState();
    const currentAdressArr = currentPlayListItem.sources.map((item) => item.file);
    // const AdAdressArr = advertisement.video.playback.map(item => item.video_url);
    const ViewAdressArr = views.reduce((acc, cur) => {
      return [...acc, ...(cur.view_address as ViewAddressSource).sources.map((item) => item.file)];
    }, []);
    const currentAdressSet = new Set(currentAdressArr);
    const judgeFunc = (item) => currentAdressSet.has(item);
    if (views.length && ViewAdressArr.some(judgeFunc)) {
      return PageWatchEventActions.Live;
    }
    if (advertisement.is_open && (currentPlayListItem as any).isAd) {
      return PageWatchEventActions.Ad;
    }
    return PageWatchEventActions.Vod;
  }

  static destroyReport(subject: Subscription) {
    subject.unsubscribe();
    subject = undefined;
  }

  getMyunSyncAvailable() {
    return (this.getState().player as any).getMyunSyncAvailable();
  }

  setControls(flag: boolean) {
    const { player } = this.getState();
    player.setControls(flag);
  }

  play() {
    this.getState().player.play();
  }

  pause() {
    this.getState().player.pause();
  }

  next() {
    this.getState().player.next();
  }

  prev() {
    this.getState().player.prev();
  }

  setFullscreen(status: boolean) {
    this.getState().player.setFullscreen(status);
  }

  sendBarrage(text: string, style: DanmuStyle = { color: '#ffffff', fontSize: '20px' }) {
    this.danmaku.emit({
      text,
      style,
    });
  }

  // 设置弹幕速度
  setBarrageSpeed(speed: number) {
    this.barrageSpeed = speed;
    if (this.danmaku) {
      this.danmaku.setSpeed(speed);
    }
  }

  init() {
    // 观看时长上报
    merge(this.durationVideo$.pipe(bufferCount(20)), this.immediatelyReport$).subscribe(() => {
      reportPageEvent(basisModel.getState().config.basic.id, userModel.getState().id, {
        analytic_id: basisModel.getState().config.media.analytic_id,
        page_view_id: userModel.getState().page_view_id,
        category: 'video',
        action: this.currentPageActions,
        label: this.getState().currentPlayAddress,
        value: this.times,
      }).subscribe();
      this.times = 0;
    });
  }

  setup(dom: string, option: PlayerOption) {
    this.dom = dom;
    this.option = option;
    try {
      const player = muduPlayer(dom);
      player
        .setup(option)
        .then(() => {
          this.playlist = option.playlist;
          player.play();
          this.setState({
            playList: this.playlist,
            currentPlayListItem: this.playlist[0],
            currentPlayListIndex: 0,
          });
          eventEmitterModel.emit(this.name, {
            type: PlayerPlaylistItemChange,
            data: {
              currentPlayListItem: this.getState().currentPlayListItem,
              currentPlayListIndex: 0,
            },
          });
          const danmaku = player.plugin.danmaku;
          return danmaku.init();
        })
        .then(() => {
          this.danmaku = player.plugin.danmaku;
          this.danmaku.setSpeed(this.barrageSpeed);
        });
      player.on('playlistItem', (playlistItem) => {
        this.setState({
          currentPlayListItem: this.playlist[playlistItem.index],
          currentPlayListIndex: playlistItem.index,
        });
        eventEmitterModel.emit(this.name, {
          type: PlayerPlaylistItemChange,
          data: {
            currentPlayListItem: this.getState().currentPlayListItem,
            currentPlayListIndex: this.getState().currentPlayListIndex,
          },
        });
      });
      player.on('play', () => {
        eventEmitterModel.emit(this.name, {
          type: PlayerPlay,
        });
        const { player } = this.getState();
        if (this.currentPageActions !== PlayerModel.judgeAction(this.getState().currentPlayListItem)) {
          if (this.times !== 0) {
            this.immediatelyReport$.next();
          }
          this.currentPageActions = PlayerModel.judgeAction(this.getState().currentPlayListItem);
          const { currentPlayAddress } = this.getState();
          const sourcesItemAddress = (player.getPlaylistItem(player.getPlaylistIndex()) as PlaylistItem).sources.filter(
            (item: any) => item.active,
          )[0]?.file;
          if (currentPlayAddress !== sourcesItemAddress) {
            this.setState({
              currentPlayAddress: sourcesItemAddress,
            });
          }
        }
        if (!this.intervalSubject) {
          this.intervalSubject = interval(1000).subscribe(() => {
            this.durationVideo$.next(++this.times);
          });
        }
      });
      player.on('myunSyncAvailable', (isMyunSync) => {
        if (isMyunSync.type === 'myunSyncAvailable') {
          this.setState({
            isMyunSyncAvailable: isMyunSync.available,
          });
        }
      });
      player.on('myunSyncMessage', (MyunSyncMessege) => {
        console.log(MyunSyncMessege);
        if (MyunSyncMessege.type === 'myunSyncMessage') {
          this.setState({
            myunSyncMessage: JSON.parse(MyunSyncMessege.message),
          });
        }
      });
      player.on('time', (time) => {
        if (this.isDocPlayback && this.isLivingPlayback && this.playbackPassTime !== Math.floor(time.position)) {
          this.playbackPassTime = Math.floor(time.position);
          const playbackDocDot = this.playback.video.doc_dot.filter(
            (item) => item.offset === Math.floor(time.position),
          );
          if (playbackDocDot.length) {
            const content = JSON.parse(playbackDocDot[0].content);
            eventEmitterModel.emit(documentModel.name, {
              type: DocumentPlaybackPagingUpdate,
              data: {
                docid: content.docid,
                url: content.url,
                playerId: this.dom,
              },
            });
          }
        }
      });
      player.on('seek', (seek) => {
        if (this.isDocPlayback && this.isLivingPlayback) {
          const sortVideoDot = cloneDeep(this.playback.video.doc_dot).sort((a, b) => a.offset - b.offset);
          let docIndex = sortVideoDot.findIndex((item) => item.offset > seek.offset);
          if (seek.offset >= sortVideoDot.slice(-1)[0].offset) {
            docIndex = sortVideoDot.length;
          }
          const docItem = sortVideoDot[docIndex - 1];
          if (docIndex && this.playbackDocId !== docItem.id) {
            const content = JSON.parse(docItem.content);
            this.playbackDocId = docItem.id;
            eventEmitterModel.emit(documentModel.name, {
              type: DocumentPlaybackPagingUpdate,
              data: {
                docid: content.docid,
                url: content.url,
                playerId: this.dom,
              },
            });
          }
        }
      });
      player.on('error', (errorInfo) => {
        player.setControls(false);
        eventEmitterModel.emit(this.name, {
          type: PlayerError,
          data: statusCodeMap[40903],
        });
        if (this.intervalSubject) this.intervalSubject.unsubscribe();
        this.intervalSubject = undefined;
      });
      player.on('pause', () => {
        eventEmitterModel.emit(this.name, {
          type: PlayerPause,
        });
        if (this.intervalSubject) this.intervalSubject.unsubscribe();
        this.intervalSubject = undefined;
      });
      this.setState({
        player,
      });
    } catch (err) {
      eventEmitterModel.emit(this.name, {
        type: PlayerError,
        data: statusCodeMap[40902],
      });
    }
  }

  loadPlay(playlist: PlaylistItem[]) {
    const { player } = this.getState();
    if (!player) {
      this.option.playlist = playlist;
      this.setup(this.dom, this.option);
    } else {
      this.playlist = playlist;
      this.setState({
        playList: this.playlist,
        currentPlayListItem: this.playlist[0],
        currentPlayListIndex: 0,
      });
      eventEmitterModel.emit(this.name, {
        type: PlayerPlaylistItemChange,
        data: {
          currentPlayListItem: this.getState().currentPlayListItem,
          currentPlayListIndex: 0,
        },
      });
      player.load(this.playlist);
    }
  }

  destroy() {
    console.log(`[${this.name}]:销毁`);
    this.getState().player?.remove();
    this.setState(DEFAULT_STATE);
    if (this.intervalSubject) this.intervalSubject.unsubscribe();
    this.intervalSubject = undefined;
    this.playbackPassTime = -1;
    this.playbackDocId = -1;
    this.times = 0;
  }
}
