import { getSignupConfig, uploadSignup } from '@backends/signup.backend';
import { State } from '@core/state';
import { SignupConfig } from '@type/signup.type';
import { connect, Model } from 'src/lib/model';
import { basisModel } from './basis.model';
import { roomModel } from './room.model';
import { userModel } from './user.model';

export interface SignupModelState {
  config: SignupConfig;
}
const DEFAULT_STATE = {
  config: {
    is_open: false, // 是否开启报名系统: true-是 false-否
    description: '', // 报名描述信息
    name: '', // 报名展示标题
    pic: '', // 报名展示图片
    items: [],
    is_ok: false,
  },
};

@connect({
  config: {
    backend: getSignupConfig,
    params: () => ({ act_id: basisModel.getState().config.basic.id }),
  },
})
export class SignupModel extends Model<SignupModelState> {
  name = 'signup';
  constructor() {
    super(DEFAULT_STATE);
  }

  init(config: SignupConfig) {
    this.setState({ config });
    this.subNats();
  }

  async getConfig() {
    const config = await this.updateKeys();
    console.log(config);
  }

  subNats() {
    roomModel.nats.from(`bugu.signup.wechat.${basisModel.getState().config.basic.id}`).subscribe((v) => {
      console.log(v);
    });
  }

  upload() {
    void uploadSignup(basisModel.getState().config.basic.id, userModel.getState().id).toPromise();
  }

  destroy() {
    console.log(`[${this.name}]:销毁`);
    this.setState(DEFAULT_STATE);
  }
}

export const signupModel = new SignupModel();
