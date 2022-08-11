import { ActAuthConfig, ActAuthType } from '@type/act-auth.type';
import { auth, getActAuthConfig } from '@backends/act-auth.backend';
import { basisModel } from './basis.model';
import { Model, connect, AModel } from '../lib/model';
import { ajax } from 'rxjs/ajax';
import { roomModel } from './room.model';
import { http } from '@core/http';
import stringify from 'qs-stringify';

export interface ActAuthModelState {
  config: ActAuthConfig;
}

const DEFAULT_STATE = {
  config: {
    type: ActAuthType.None,
    is_ok: false,
  },
};

@connect({
  config: {
    backend: getActAuthConfig,
    params: () => ({ act_id: roomModel.getState().options.act_id }),
  },
})
export class ActAuthModel extends Model<ActAuthModelState> implements AModel {
  name = 'act-auth';
  constructor() {
    super(DEFAULT_STATE);
  }

  async getConfig() {
    await this.updateKeys();
  }

  async init(config?: ActAuthConfig) {
    if (config) {
      this.setState({ config });
    } else {
      await this.getConfig();
    }

    return Promise.resolve(true);
  }

  async auth(code?: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (this.getState().config.type === ActAuthType.Custom) {
        auth(roomModel.getState().options.act_id, code).subscribe({
          next: () => {
            resolve(true)
          },
          error: (err) => {
            void ajax({
              url: `${this.getState().config.custom_auth.url}?${stringify(roomModel.getState().options.third_party)}`,
              method: 'GET',
              headers: Object.assign({}, http.headers, roomModel.getState().options.third_party),
              withCredentials: true,
            }).subscribe(v => {
              console.log(v)
            });
            // window.location.href = `${this.getState().config.custom_auth.url}?${stringify(roomModel.getState().options.third_party)}`
            reject(err)
          },
        });
      }
    });
  }

  destroy() {
    this.setState(DEFAULT_STATE);
  }
}

export const actAuthModel = new ActAuthModel();
