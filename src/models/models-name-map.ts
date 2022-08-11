import { analyticModel } from './analytic.model';
import { announcementModel } from './announcement.model';
import { basisModel } from './basis.model';
import { commentModel } from './comment.model';
import { countdownModel } from './countdown.model';
import { documentModel } from './document.model';
import { eventEmitterModel } from './event-emitter.model';
import { lotteryModel } from './lottery.model';
import { menusModel } from './menus.model';
import { playerModel } from './players.model';
import { questionnaireModel } from './questionnaire.model';
import { streamViewModel } from './stream-view.model';
import { userModel } from './user.model';

export const ModelsNameMap = {
  analytic: analyticModel,
  announcement: announcementModel,
  basis: basisModel,
  comment: commentModel,
  countdown: countdownModel,
  document: documentModel,
  lottery: lotteryModel,
  menus: menusModel,
  player: playerModel,
  questionnaire: questionnaireModel,
  'stream-view': streamViewModel,
  user: userModel,
  'event-emitter': eventEmitterModel,
};
