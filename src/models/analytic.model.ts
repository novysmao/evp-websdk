import { reportLeave, reportOnline, reportPageEvent } from '@backends/analytic.backend';
import { State } from '@core/state';
import { AnalyticPageEventRequestData, PageWatchEventActions } from '@type/analytic.type';
import { fromEvent, interval, race, Subscription } from 'rxjs';
import { bufferTime } from 'rxjs/operators';
import { AModel } from 'src/lib/model';
import { basisModel } from './basis.model';
import { roomModel } from './room.model';
import { userModel } from './user.model';

export interface AnalyticModelState {
  time: number;
}

const DEFAULT_STATE = {
  time: 0,
};

export class AnalyticModel extends State<AnalyticModelState> implements AModel {
  name = 'analytic';
  onlineSub: Subscription;
  exitSub: Subscription;
  constructor() {
    super(DEFAULT_STATE);
  }

  async init() {
    this.onlineSub = interval(1000)
      .pipe(bufferTime(20000))
      .subscribe(() => {
        if (!userModel.isQueuing) {
          void this.trackerOnline();
        }
      });

    this.exitSub = race(
      fromEvent(window, 'pagehide'),
      fromEvent(window, 'beforeunload'),
      fromEvent(window, 'close'),
      fromEvent(window, 'pagehide'),
      fromEvent(window, 'popstate'),
    ).subscribe(() => {
      this.trackerPageExit();
    });

    return Promise.resolve(true);
  }

  getRequestData() {
    return {
      analytic_id: basisModel.getState().config.media.analytic_id,
      page_view_id: userModel.getState().page_view_id,
    };
  }

  trackerOnline(): Promise<void> {
    return new Promise((resolve, reject) => {
      reportOnline(basisModel.getState().config.basic.id, userModel.getState().id, this.getRequestData()).subscribe({
        next: () => {
          resolve();
        },
        error: (err) => {
          reject(err);
        },
      });
    });
  }

  trackerPageExit() {
    const act_id = basisModel.getState().config.basic.id;
    const requestData = Object.assign({}, this.getRequestData(), {
      analytic_session: userModel.getAnalyticSession(act_id),
      signature: userModel.getSignature(act_id),
    });
    try {
      reportLeave(basisModel.getState().config.basic.id, userModel.getState().id, requestData);
    } catch (err) {
      console.log(err);
    }
  }

  trackerPageEvent(pageEventData: AnalyticPageEventRequestData): Promise<void> {
    return new Promise((resolve, reject) => {
      const requestData = Object.assign({}, this.getRequestData(), pageEventData);
      void reportPageEvent(basisModel.getState().config.basic.id, userModel.getState().id, requestData).subscribe({
        next: () => {
          resolve();
        },
        error: (err) => {
          reject(err);
        },
      });
    });
  }

  destroy() {
    console.log(`[${this.name}]:销毁`);
    this.onlineSub.unsubscribe();
    this.exitSub.unsubscribe();
  }
}

export const analyticModel = new AnalyticModel();
