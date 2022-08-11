import { getRewardConfig } from '@backends/reward.backend';
import { State } from '@core/state';
import { RewardConfig } from '@type/reward.type';
import { basisModel } from './basis.model';
import { roomModel } from './room.model';

export interface RewardModelState {
  config: RewardConfig;
}

const DEFAULT_STATE = {
  config: {
    is_open: false,
    props: [],
    is_ok: false,
  },
};
export class RewardModel extends State<RewardModelState> {
  name = 'reward';
  constructor() {
    super(DEFAULT_STATE);
  }

  init(config: RewardConfig) {
    this.setState({ config });
    this.subNats();
  }

  subNats() {
    // 打赏-特效
    roomModel.nats.from(`bugu.reward.special_effects.${basisModel.getState().config.basic.id}`).subscribe((v) => {
      console.log(v);
    });

    // 打赏-道具更新
    roomModel.nats.from(`bugu.reward.prop.${basisModel.getState().config.basic.id}`).subscribe((v) => {
      console.log(v);
    });

    // 打赏-支付成功
    roomModel.nats.from(`bugu.reward.pay.success.${basisModel.getState().config.basic.id}`).subscribe((v) => {
      console.log(v);
    });
  }

  destroy() {
    console.log(`[${this.name}]:销毁`);
    this.setState(DEFAULT_STATE);
  }
}

export const rewardModel = new RewardModel();
