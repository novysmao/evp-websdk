import { RedPacketConfig } from '@type/red-packet.type';
import { getRedPacketConfig } from '@backends/red-packet.backend';
import { basisModel } from './basis.model';
import { Model, connect } from '../lib/model';
import { roomModel } from './room.model';

export interface RedPacketModelState {
  config: RedPacketConfig;
}

const DEFAULT_STATE = {
  config: {
    is_open: false,
    items: [],
    is_ok: false,
  },
};

@connect({
  config: {
    backend: getRedPacketConfig,
    params: () => ({ act_id: basisModel.getState().config.basic.id }),
  },
})
export class RedPacketModel extends Model<RedPacketModelState> {
  name = 'red-packet';
  constructor() {
    super(DEFAULT_STATE);
  }

  init(config: RedPacketConfig) {
    this.setState({ config });
    this.subNats();
  }

  subNats() {
    // 红包-发送
    roomModel.nats.from(`bugu.red_packet.send.${basisModel.getState().config.basic.id}`).subscribe((v) => {
      console.log(v);
    });
  }

  destroy() {
    console.log(`[${this.name}]:销毁`);
    this.setState(DEFAULT_STATE);
  }
}

export const redPacketModel = new RedPacketModel();
