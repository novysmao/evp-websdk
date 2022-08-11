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
export interface RoomInfo extends BasisConfig {
    announcement: AnnouncementConfig;
    comment: CommentConfig;
    document: DocumentConfig;
    menus: MenuItem[];
    countdown: CountdownConfig;
    streams: StreamViewItem[];
    reward: RewardConfig;
    lottery: LotteryConfig;
    signup: SignupConfig;
    questionnaire: QuestionnaireConfig;
    examination: ExaminationConfig;
    red_packet: RedPacketConfig;
    act_auth: ActAuthConfig;
}
export declare type RoomInfoRes = RoomInfo | ErrorRes;
export declare enum LanguageType {
    CN = "zh",
    EN = "en"
}
export interface RoomOptions {
    act_id: string;
    host?: string;
    access_token: string;
    models?: Model<any>[];
    third_party_id?: string;
}
