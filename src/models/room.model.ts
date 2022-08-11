import { Nats, ConnectedNats } from '@core/nats';
import { tap } from 'rxjs/operators';
import { getConfigs } from '@backends/room.backend';
import { RoomInfo, RoomOptions } from '@type/room.type';
import { commentModel } from '@models/comment.model';
import { menusModel } from '@models/menus.model';
import { documentModel } from '@models/document.model';
import { countdownModel } from './countdown.model';
import { StreamViewModel, streamViewModel } from './stream-view.model';
import { lotteryModel } from './lottery.model';
import { questionnaireModel } from './questionnaire.model';
import { pick } from 'lodash';
import { UserModel, userModel } from './user.model';
import { AnalyticModel, analyticModel } from './analytic.model';
import { BasisModel, basisModel } from './basis.model';
import { announcementModel } from './announcement.model';
import { setHost } from '@backends/host';
import { http } from '@core/http';
import { GoimNats } from '@core/goim-nats';
import { playerModel } from './players.model';
import { Model } from 'src/lib/model';
import { ModelsNameMap } from './models-name-map';
import { eventEmitterModel } from './event-emitter.model';

export interface RoomModelState {
  nats: ConnectedNats;
  diffTimestamp: number;
  options: RoomOptions;
}

const DEFAULT_STATE: RoomModelState = {
  nats: null,
  diffTimestamp: 0,
  options: null,
};

// 必要的组件
const NecessaryModels = [userModel, basisModel, streamViewModel, analyticModel];

export class RoomModel extends Model<RoomModelState> {
  name = 'room';
  registeredModels = [];

  get nats() {
    return this.getState().nats;
  }

  constructor() {
    super(DEFAULT_STATE);
  }

  async init(options: RoomOptions) {
    this.setState({ options });
    const { host, access_token } = options;
    http.headers['X-Access-Token'] = access_token;
    setHost(host);

    if (Object.prototype.toString.call(options?.models) === '[object Array]' && options?.models?.length > 0) {
      await this.initNecessaryModels();
      await this.initModels(options.models);
    } else {
      await this.initAllModels();
    }
    console.log('频道初始化完成');
  }

  async initAllModels() {
    const { act_id } = this.getState().options;
    await userModel.init();
    const info = await getConfigs(act_id).toPromise();
    this.setState({
      diffTimestamp: info.basic.current_timestamp - new Date().valueOf() / 1000,
    });
    await this.initNats(info.media.nats_addr, act_id).toPromise();
    await this.initOtherModels(info);
  }

  // 初始化必要的组件，有顺序要求
  // 依次为：User-> Basis -> nats -> StreamView -> Analytic
  async initNecessaryModels() {
    return userModel
      .init()
      .then(() => {
        return basisModel.init();
      })
      .then(() => {
        this.setState({
          diffTimestamp: basisModel.getState().config.basic.current_timestamp - new Date().valueOf() / 1000,
        });
        return this.initNats(basisModel.getState().config.media.nats_addr, this.getState().options.act_id).toPromise();
      })
      .then(() => {
        return streamViewModel.init();
      })
      .then(() => {
        return analyticModel.init();
      });
  }

  async initModels(models?: Model<any>[]) {
    const promises = [];
    models.map((model: any) => {
      if (!NecessaryModels.includes(model)) {
        promises.push(model.init());
      }
    });
    return Promise.all(promises);
  }

  async initOtherModels(info: RoomInfo) {
    const { announcement, comment, document, menus, countdown, streams, lottery, questionnaire } = info;
    return Promise.all([
      basisModel.init(pick(info, Object.keys(basisModel.getState().config))),
      commentModel.init(comment),
      announcementModel.init(announcement),
      documentModel.init(document),
      countdownModel.init(countdown),
      streamViewModel.init(streams),
      lotteryModel.init(lottery),
      questionnaireModel.init(questionnaire),
      menusModel.init(menus),
      analyticModel.init(),
    ]);
  }

  initNats(url: string, act_id: string) {
    const mid = userModel.getState()?.mid;
    const natsObj = mid ? new GoimNats() : new Nats();

    return natsObj.connect(url, { mid, act_id }).pipe(
      tap((r: ConnectedNats) => {
        this.setState({
          nats: r,
        });
        userModel.subNats();
      }),
    );
  }

  destroy() {
    console.log(`[${this.name}]:销毁`);
    NecessaryModels.map((model: any) => {
      ModelsNameMap[model.name]?.destroy();
    });
    const options = this.getState().options;
    if (Object.prototype.toString.call(options?.models) === '[object Array]' && options?.models?.length > 0) {
      options?.models.map((model: any) => {
        ModelsNameMap[model.name]?.destroy();
      });
    }
    playerModel.destroy(); // 播放器不需要初始化，需要单独销毁
    this.nats.close();
    eventEmitterModel.removeAllListeners(); // 移除所有监听
    this.setState(DEFAULT_STATE);
  }
}

export const roomModel = new RoomModel();
