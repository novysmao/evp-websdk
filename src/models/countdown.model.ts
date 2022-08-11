import { getCountdownConfig } from '@backends/countdown.backend';
import { CountdownConfig } from '@type/countdown.type';
import { CountdownCounting, CountdownEnd, CountdownStart } from 'src/constans/events';
import { AModel, connect, Model } from 'src/lib/model';
import { basisModel } from './basis.model';
import { eventEmitterModel } from './event-emitter.model';
import { roomModel } from './room.model';

export interface CountdownState {
  isCounting: boolean;
  config: CountdownConfig;
  remainingSeconds: number;
}

const DEFAULT_STATE: CountdownState = {
  isCounting: false,
  remainingSeconds: 0,
  config: {
    is_open: false,
    title: '',
    date_time: 0,
    is_ok: false,
  },
};

@connect({
  config: {
    backend: getCountdownConfig,
    params: () => ({ act_id: basisModel.getState().config.basic.id }),
  },
})
export class CountdownModel extends Model<CountdownState> implements AModel {
  timer: any = null;
  name = 'countdown';
  constructor() {
    super(DEFAULT_STATE);
  }

  get config() {
    return this.getState().config;
  }

  async init(config?: CountdownConfig) {
    if (config) {
      this.setState({ config });
    } else {
      await this.getConfig();
    }
    this.start();
    return Promise.resolve(true);
  }

  async getConfig() {
    await this.updateKeys();
  }

  start() {
    const { config, isCounting } = this.getState();
    if (isCounting) return;

    if (!config.is_open) return;

    if (roomModel.getState().diffTimestamp + new Date().valueOf() / 1000 >= config.date_time) return;

    if (this.timer) return;

    eventEmitterModel.emit(CountdownStart);

    this.timer = setInterval(() => {
      const remainingSeconds = Math.floor(
        config.date_time - roomModel.getState().diffTimestamp - new Date().valueOf() / 1000,
      );
      if (remainingSeconds <= 0) {
        this.stop();
      } else {
        this.setState({ remainingSeconds, isCounting: true });
        eventEmitterModel.emit(CountdownCounting, remainingSeconds);
      }
    }, 1000);
  }

  stop() {
    this.setState({
      isCounting: false,
      remainingSeconds: 0,
    });
    clearInterval(this.timer);
    this.timer = null;
    eventEmitterModel.emit(CountdownEnd);
  }

  destroy() {
    console.log(`[${this.name}]:销毁`);
    this.setState(DEFAULT_STATE);
  }
}

export const countdownModel = new CountdownModel();
