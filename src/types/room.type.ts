import { Model } from 'src/lib/model';
import { ActAuthConfig } from './act-auth.type';
import { AnnouncementConfig } from './announcement.type';
import { ErrorRes } from './backend.type';
import { BasisConfig } from './basis.type';
import { CommentConfig } from './comment.type';
import { CountdownConfig } from './countdown.type';
import { DocumentConfig } from './document.type';
import { ExaminationConfig } from './examination.type';
import { LotteryConfig } from './lottery.type';
import { MenuItem } from './menus.type';
import { QuestionnaireConfig } from './questionnaire.type';
import { RedPacketConfig } from './red-packet.type';
import { RewardConfig } from './reward.type';
import { SignupConfig } from './signup.type';
import { StreamViewItem } from './stream-view.type';

/**
 * 频道信息
 */
export interface RoomInfo extends BasisConfig {
  announcement: AnnouncementConfig; // 公告配置
  comment: CommentConfig; // 频道直播间的评论配置
  document: DocumentConfig; // 频道直播间的文档配置
  menus: MenuItem[]; // 频道直播间的自定义菜单栏配置
  countdown: CountdownConfig; // 倒计时配置
  streams: StreamViewItem[]; // 多流直播配置
  reward: RewardConfig; // 打赏配置
  lottery: LotteryConfig; // 抽奖配置
  signup: SignupConfig; // 报名配置
  questionnaire: QuestionnaireConfig; // 问卷配置
  examination: ExaminationConfig; // 考试配置
  red_packet: RedPacketConfig; // 红包配置
  act_auth: ActAuthConfig; // 频道验证方式配置
}

export type RoomInfoRes = RoomInfo | ErrorRes;

export enum LanguageType {
  CN = 'zh',
  EN = 'en',
}

export interface RoomOptions {
  act_id: string;
  host?: string; // 域名
  access_token: string; // 令牌
  models?: Model<any>[]; // 需要初始化的组件
  third_party_id?: string; // 第三方用户id
}

