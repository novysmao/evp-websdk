import {
  checkPhone,
  getLotteryConfig,
  getLotteryResult,
  getPrizeResult,
  join,
  joinWithPhone,
} from '@backends/lottery.backend';
import {
  LotterJoinType,
  LotteryConfig,
  LotteryPrizeItem,
  LotteryPrizeResult,
  LotteryPrizeStatus,
  LotteryResult,
  LotteryStatus,
  WsLottery,
  WsLotteryConfig,
  WsLotteryEvents,
  WsLotteryPrizeItem,
} from '@type/lottery.type';
import {
  LotteryConfigUpdate,
  LotteryPrizeUpdate,
  LotteryPrizeStatusUpdate,
  LotteryPrizeAdd,
  LotteryPrizeDelete,
  LotteryResultUpdate,
  LotteryOpen,
  LotteryClose,
} from 'src/constans/events';
import { basisModel } from './basis.model';
import { eventEmitterModel } from './event-emitter.model';
import { roomModel } from './room.model';
import { cloneDeep, eq, find } from 'lodash';
import { AModel, connect, Model } from 'src/lib/model';

export interface LotterModelState {
  config: LotteryConfig;
  result: LotteryResult;
}

const DEFAULT_STATE = {
  config: {
    id: 0,
    name: '',
    is_allow_watch: false,
    join_types: [],
    status: 0,
    is_ok: false,
    prize: [],
  },
  result: {
    is_join: false,
    is_allow_watch: false,
    is_ok: false,
    prize: [],
  },
};

@connect({
  config: {
    backend: getLotteryConfig,
    params: () => ({ act_id: roomModel.getState().options.act_id }),
    transform: (config: LotteryConfig) => LotteryModel.filterLotteryDrawRange(config),
  },
})
export class LotteryModel extends Model<LotterModelState> implements AModel {
  name = 'lottery';

  constructor() {
    super(DEFAULT_STATE);
  }

  /**
   * draw_range 计算方式为【观众名单报名方式 * 10 + 本地名单 = draw_range】
   * 本地名单：0 未选中、1 选中
   * 观众名单报名方式： 0 未选中、1 手机号报名、2 公开报名
   * 例如本地名单未选中，观众名单报名方式为手机号报名，则可以计算  1 * 10 + 0 = 10，
   * 再譬如选中了本地名单，观众报名方式为公开报名，则可以计算 2 * 10 + 1 = 21，
   */
  static getJoinTypes(draw_range: number): LotterJoinType[] {
    if (!draw_range || draw_range === 0) return [];

    const type = [];
    const hasLocalImport = draw_range % 10 === 1;
    const hasPhoneType = draw_range / 10 === 1;
    const hasNicknameType = draw_range / 10 === 2;
    if (hasLocalImport) {
      type.push(LotterJoinType.LocalImport);
    }
    if (hasPhoneType) {
      type.push(LotterJoinType.Phone);
    }
    if (hasNicknameType) {
      type.push(LotterJoinType.Nickname);
    }
    return type;
  }

  static transformWsLotteryPrizeItem(data: WsLotteryPrizeItem): LotteryPrizeItem {
    const { id: prize_id, award_name, count, img: image, name, open_at, open_type, start_at, status } = data;
    return {
      prize_id,
      award_name,
      count,
      image,
      name,
      open_at: !open_at ? 0 : new Date(open_at.replace(/\-/g, '/')).valueOf() / 1000,
      open_type,
      start_at: !start_at ? 0 : new Date(start_at.replace(/\-/g, '/')).valueOf() / 1000,
      status,
    };
  }

  static transformWsLotteryConfig(data: WsLotteryConfig): LotteryConfig {
    const { id, name, is_allow_viewer_watch, draw_range, status } = data;
    return {
      id,
      name,
      is_allow_watch: is_allow_viewer_watch === 1,
      join_types: this.getJoinTypes(draw_range),
      status,
      is_ok: true,
    };
  }

  static filterLotteryDrawRange(config: LotteryConfig): LotteryConfig {
    if (!config || !config.hasOwnProperty('draw_range')) return config;

    const { id, name, is_allow_watch, draw_range, status, is_ok, prize } = config;
    return {
      id,
      name,
      is_allow_watch,
      status,
      is_ok,
      prize,
      join_types: this.getJoinTypes(draw_range),
    };
  }

  get config(): LotteryConfig {
    return this.getState().config;
  }

  get result(): LotteryResult {
    return this.getState().result;
  }

  get isJoin(): boolean {
    return this.getState().result.is_join;
  }

  get isAllowWatch(): boolean {
    return this.getState().config.is_allow_watch;
  }

  get joinTypes(): LotterJoinType[] {
    return this.getState().config.join_types;
  }

  async init(config?: LotteryConfig) {
    if (config) {
      this.setState({
        config: LotteryModel.filterLotteryDrawRange(config),
      });
    } else {
      await this.getConfig();
    }
    if (this.getState().config.status === 1) {
      await this.getLotteryResult();
    }
    this.subNats();
    return Promise.resolve(true);
  }

  async getConfig() {
    await this.updateKeys();
  }

  subNats() {
    // 抽奖
    roomModel.nats.from(`bugu.market.prize.${basisModel.getState().config.basic.id}`).subscribe((v: WsLottery) => {
      const { config: currentConfig } = cloneDeep(this.getState());
      switch (v.event) {
        case WsLotteryEvents.LotteryOpen:
          // 抽奖配置消息
          const config = Object.assign(
            {},
            currentConfig,
            LotteryModel.transformWsLotteryConfig(v.data as WsLotteryConfig),
          );

          this.setState({ config });

          eventEmitterModel.emit(this.name, {
            type: config.status === LotteryStatus.Open ? LotteryOpen : LotteryClose,
          });

          if (config.status === LotteryStatus.Open) {
            void this.getConfig().then(() => {
              const newConfig = this.getState().config;
              this.resolveLotteryResult(config.prize, newConfig.prize);
            });
          } else {
            eventEmitterModel.emit(this.name, {
              type: LotteryConfigUpdate,
              data: config,
            });
          }
          break;
        case WsLotteryEvents.PrizeOpen:
        case WsLotteryEvents.PrizeOver:
          const prizeItem: LotteryPrizeItem = LotteryModel.transformWsLotteryPrizeItem(v.data as WsLotteryPrizeItem);
          const configPrize = currentConfig.prize.map((v: LotteryPrizeItem) => {
            if (v.prize_id === prizeItem.prize_id) {
              return prizeItem;
            }
            return v;
          });
          const nextConfig = Object.assign({}, currentConfig, {
            prize: configPrize,
          });

          this.setState({ config: nextConfig });
          console.log(nextConfig, prizeItem);
          // 抽奖奖品变化
          eventEmitterModel.emit(this.name, {
            type: LotteryConfigUpdate,
            data: nextConfig,
          });
          eventEmitterModel.emit(this.name, {
            type: LotteryPrizeUpdate,
            data: prizeItem,
          });

          if (prizeItem.status === LotteryPrizeStatus.Completed) {
            void this.getLotteryResult().then(() => {
              eventEmitterModel.emit(this.name, {
                type: LotteryResultUpdate,
                data: this.getState().result,
              });
            });
          }
          break;
        case WsLotteryEvents.ViewerJoin:
          break;
      }
    });
  }

  joinSuccessCallback() {
    const currentResult = cloneDeep(this.getState().result);
    const nextResult = Object.assign({}, currentResult, {
      is_join: true,
    });

    this.setState({ result: nextResult });
  }

  joinWithPhone(phone: string) {
    return new Promise((resolve, reject) => {
      joinWithPhone(basisModel.getState().config.basic.id, this.getState().config.id, phone).subscribe({
        next: () => {
          resolve(true);
        },
        error: (err) => {
          reject(err);
        },
      });
    });
  }

  join(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      join(basisModel.getState().config.basic.id, this.getState().config.id).subscribe({
        next: () => {
          this.joinSuccessCallback();
          resolve(true);
        },
        error: (err) => {
          reject(err);
        },
      });
    });
  }

  smsVerify(phone: string, code: string) {
    return checkPhone(basisModel.getState().config.basic.id, this.getState().config.id, phone, code)
      .toPromise()
      .then(() => {
        this.joinSuccessCallback();
      });
  }

  getPrizeResult(prize_id: number): Promise<LotteryPrizeResult> {
    return new Promise((resolve, reject) => {
      getPrizeResult(basisModel.getState().config.basic.id, this.getState().config.id, prize_id).subscribe({
        next: (v) => {
          resolve(v);
        },
        error: (err) => {
          reject(err);
        },
      });
    });
  }

  resolveLotteryResult(oldLotteryResults: LotteryPrizeItem[], newLotteryResults: LotteryPrizeItem[]) {
    newLotteryResults.map((newPrizeItem: LotteryPrizeItem) => {
      const oldPrizeItem = find(oldLotteryResults, (v: LotteryPrizeItem) => v.prize_id === newPrizeItem.prize_id);
      // 新增
      if (!oldPrizeItem) {
        eventEmitterModel.emit(this.name, {
          type: LotteryPrizeAdd,
          data: newPrizeItem,
        });
        return;
      }

      // 更新
      if (eq(oldPrizeItem, newPrizeItem)) {
        eventEmitterModel.emit(this.name, {
          type: LotteryPrizeUpdate,
          data: newPrizeItem,
        });
        return;
      }
    });

    oldLotteryResults.map((oldPrizeItem: LotteryPrizeItem) => {
      const newPrizeItem = find(newLotteryResults, (v: LotteryPrizeItem) => v.prize_id === oldPrizeItem.prize_id);
      // 删除
      if (!newPrizeItem) {
        eventEmitterModel.emit(this.name, {
          type: LotteryPrizeDelete,
          data: oldPrizeItem,
        });
        return;
      }
    });

    eventEmitterModel.emit(this.name, {
      type: LotteryConfigUpdate,
      data: this.getState().config,
    });
  }

  getLotteryResult(): Promise<LotteryResult> {
    return new Promise((resolve, reject) => {
      getLotteryResult(basisModel.getState().config.basic.id, this.getState().config.id).subscribe({
        next: (v) => {
          this.setState({ result: v });
          resolve(v);
        },
        error: (err) => {
          reject(err);
        },
      });
    });
  }

  destroy() {
    console.log(`[${this.name}]:销毁`);
    this.setState(DEFAULT_STATE);
  }
}

export const lotteryModel = new LotteryModel();
