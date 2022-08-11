import { join, update, updatePageViewId } from '@backends/user.backend';
import { http } from '@core/http';
import { LanguageType } from '@type/room.type';
import { User, UserIdentity, UserUpdateInfo, WsBanlist, WsBanlistType, enterResult } from '@type/user.type';
import { basisModel } from './basis.model';
import { roomModel } from './room.model';
import { cloneDeep, pick } from 'lodash';
import { eventEmitterModel } from './event-emitter.model';
import { UserBanned, UserDequeued, UserUpdate } from 'src/constans/events';
import { Model } from 'src/lib/model';
import { actAuthModel } from './act-auth.model';

const SIGNATURE_STORAGE_PREFIX = 'user_signature';
const ANALYTIC_SESSION_STORAGE_PREFIX = 'user_analytic_session';

const DEFAULT_STATE: User = {
  id: 0,
  username: '',
  nickname: '',
  avatar: '',
  third_party_id: '',
  is_admin: false,
  is_root: false,
  is_wechat_auth: false,
  signature: '',
  page_view_id: 0,
  analytic_session: '',
  is_banned: false,
  waiter_num: 0,
  is_signup: false,
};

const DEFAULT_USER_INDENTITY: UserIdentity = {
  screen_resolution: `${window.screen.width}*${window.screen.height}`,
  language: LanguageType.CN,
};

export class UserModel extends Model<User> {
  name = 'user';
  constructor() {
    super(DEFAULT_STATE);
  }

  get info(): User {
    return this.getState();
  }

  get waiterNumber(): number {
    return this.getState().waiter_num;
  }

  /**
   * 如果isQueuing = true表示开启了并发管控，并且在排队中
   * 在队列中时，调用其他接口会受到权限限制
   * 可通过Event.on('user.dequeued')接收出队通知
   */
  get isQueuing(): boolean {
    return this.getState().waiter_num > 0;
  }

  init = async () => {
    const act_id = roomModel.getState().options.act_id;
    // 查看localstorage里是否有analytic_session，有则设置http请求头
    this.checkUserStorage(act_id);
    const analytic_session = this.getAnalyticSession(act_id);
    const signature = this.getSignature(act_id);
    http.headers = { 'X-Analytic-Session': analytic_session, Authorization: `Bearer ${signature}` };
    try {
      await this.join(act_id);
    } catch (e) {
      this.removeUserStorage(act_id);
      http.headers = { 'X-Analytic-Session': analytic_session, Authorization: 'Bearer null' };
      await this.join(act_id);
    }
  };

  getSignature(id: string) {
    return window.localStorage.getItem(`${SIGNATURE_STORAGE_PREFIX}_${id}`);
  }

  setSignature(id: string, signature: string) {
    http.headers = { Authorization: `Bearer ${signature}` };
    window.localStorage.setItem(`${SIGNATURE_STORAGE_PREFIX}_${id}`, signature);
  }

  getAnalyticSession(id: string) {
    return window.localStorage.getItem(`${ANALYTIC_SESSION_STORAGE_PREFIX}_${id}`);
  }

  setAnalyticSession(id: string, analytic_session: string) {
    http.headers = { 'X-Analytic-Session': analytic_session };
    window.localStorage.setItem(`${ANALYTIC_SESSION_STORAGE_PREFIX}_${id}`, analytic_session);
  }

  async join(act_id: string, userIdentity?: Partial<UserIdentity>) {
    return new Promise((resolve, reject) => {
      const signature = this.getSignature(act_id);
      const third_party_id = roomModel.getState().options.third_party_id;
      join(act_id, Object.assign({}, DEFAULT_USER_INDENTITY, userIdentity, { signature, third_party_id })).subscribe({
        next: (res) => {
          this.setState({ ...res });
          this.setSignature(act_id, res.signature);
          this.setAnalyticSession(act_id, res.analytic_session);
          resolve(true);
        },
        error: (err) => {
          reject(err);
        },
      });
    });
  }

  checkUserStorage(id: string) {
    if (this.getSignature(id) && this.getAnalyticSession(id)) {
      return;
    }
    this.removeUserStorage(id);
  }

  removeUserStorage(id: string) {
    window.localStorage.removeItem(`${SIGNATURE_STORAGE_PREFIX}_${id}`);
    window.localStorage.removeItem(`${ANALYTIC_SESSION_STORAGE_PREFIX}_${id}`);
  }

  subNats() {
    const act_id = roomModel.getState().options.act_id;
    const user_id = this.getState().id;
    // 用户支付
    roomModel.nats.from(`bugu.payment.${act_id}`).subscribe((v) => {
      console.log(v);
    });

    // 用户扫码
    roomModel.nats.from(`bugu.signup.wechat.${act_id}.${user_id}`).subscribe((v) => {
      console.log(v);
    });

    // 禁言
    roomModel.nats.from(`bugu.activity.banlist.${act_id}`).subscribe((v: WsBanlist) => {
      if (v.Data !== user_id) return;

      switch (v.Type) {
        case WsBanlistType.Add:
          this.setState({ is_banned: true });
          break;
        case WsBanlistType.Remove:
          this.setState({ is_banned: false });
          break;
      }
      eventEmitterModel.emit(UserBanned, this.getState().is_banned);
    });

    // 排队
    roomModel.nats.from(`actqueue_dequeued_${act_id}`).subscribe((userIds: string[]) => {
      if (userIds.find((v) => Number(v) === this.getState().id)) {
        updatePageViewId(basisModel.getState().config.basic.id, this.getState().id, {
          screen_resolution: `${window.screen.width}*${window.screen.height}`,
          language: LanguageType.CN,
          analytic_id: basisModel.getState().config.media.analytic_id,
        }).subscribe((result: enterResult) => {
          this.setState({
            waiter_num: 0,
            page_view_id: result.page_view_id,
          });
          eventEmitterModel.emit(UserDequeued);
        });
      }
    });
  }

  update(userUpdateInfo: UserUpdateInfo): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const act_id = basisModel.getState().config.basic.id;
      const user_id = this.getState().id;
      update(act_id, user_id, userUpdateInfo).subscribe({
        next: (v: User) => {
          const user = cloneDeep(this.getState());
          this.setState({ ...Object.assign({}, user, v) });
          eventEmitterModel.emit(UserUpdate, this.getState());
          resolve(true);
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

export const userModel = new UserModel();
