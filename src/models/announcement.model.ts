import { getAnnouncementConfig } from '@backends/announcement.backend';
import { AnnouncementConfig, WsAnnouncementConfig, WsAnnouncementType } from '@type/announcement.type';
import { AModel, connect, Model } from 'src/lib/model';
import { basisModel } from './basis.model';
import { roomModel } from './room.model';
import { cloneDeep } from 'lodash';
import { eventEmitterModel } from './event-emitter.model';
import { AnnouncementConfigUpdate } from 'src/constans/events';

export interface AnnouncementModelState {
  config: AnnouncementConfig;
}

const DEFAULT_STATE = {
  config: {
    color: '', // 公告展示的颜色
    content: '', // 公告的内容
    is_visible: false, // 是否展示公告: true-是 false-否
    is_ok: false, // 为true表示请求接口成功，false表示失败返回默认数据
  },
};

@connect({
  config: {
    backend: getAnnouncementConfig,
    params: () => ({ act_id: basisModel.getState().config.basic.id }),
  },
})
export class AnnouncementModel extends Model<AnnouncementModelState> implements AModel {
  name = 'announcement';

  constructor() {
    super(DEFAULT_STATE);
  }

  async init(config?: AnnouncementConfig) {
    if (config) {
      this.setState({ config });
    } else {
      await this.getConfig();
    }
    this.subNats();
    return Promise.resolve(true);
  }

  get config() {
    return this.getState().config;
  }

  async getConfig() {
    await this.updateKeys();
  }

  resolveConfigUpdate(config: AnnouncementConfig) {
    if (!config.is_ok) return;

    this.setState({ config });
    eventEmitterModel.emit(this.name, {
      type: AnnouncementConfigUpdate,
      data: config,
    });
  }

  subNats() {
    // 监听公告
    roomModel.nats
      .from(`bugu.activity.announcement.${basisModel.getState().config.basic.id}`)
      .subscribe((v: WsAnnouncementConfig) => {
        switch (v.type) {
          case WsAnnouncementType.Update:
            const announcementConfig = {
              color: v.color,
              content: v.content,
              is_visible: v.visible,
              is_ok: true,
            };
            const config = Object.assign({}, cloneDeep(this.getState().config), announcementConfig);
            this.resolveConfigUpdate(config);
            break;
        }
      });
  }

  destroy() {
    console.log(`[${this.name}]:销毁`);
    this.setState(DEFAULT_STATE);
  }
}

export const announcementModel = new AnnouncementModel();
