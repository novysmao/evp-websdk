import { CommentModel } from '@models/comment.model';
import { PlayersModel } from '@models/players.model';
import { MenusModel } from '@models/menus.model';
import { DocumentModel } from '@models/document.model';
import { CountdownModel } from '@models/countdown.model';
import { LotteryModel } from '@models/lottery.model';
import { QuestionnaireModel } from '@models/questionnaire.model';
import { StreamViewModel } from '@models/stream-view.model';
import { UserModel } from '@models/user.model';
import { BasisModel } from '@models/basis.model';
import { EventEmitterModel } from '@models/event-emitter.model';
import { AnnouncementModel } from '@models/announcement.model';
import { AnalyticModel } from '@models/analytic.model';
export interface ModelMap {
    Analytic: AnalyticModel;
    Announcement: AnnouncementModel;
    Basis: BasisModel;
    Comment: CommentModel;
    Countdown: CountdownModel;
    Document: DocumentModel;
    Lottery: LotteryModel;
    Menus: MenusModel;
    Player: PlayersModel;
    Questionnaire: QuestionnaireModel;
    StreamView: StreamViewModel;
    User: UserModel;
    Event: EventEmitterModel;
}
export declare const ModelNameMap: ModelMap;
