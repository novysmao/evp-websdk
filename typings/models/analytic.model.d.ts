import { State } from '@core/state';
import { AnalyticPageEventRequestData } from '@type/analytic.type';
import { Subscription } from 'rxjs';
import { AModel } from 'src/lib/model';
export interface AnalyticModelState {
    time: number;
}
export declare class AnalyticModel extends State<AnalyticModelState> implements AModel {
    name: string;
    onlineSub: Subscription;
    exitSub: Subscription;
    constructor();
    init(): Promise<boolean>;
    getRequestData(): {
        analytic_id: number;
        page_view_id: number;
    };
    trackerOnline(): Promise<void>;
    trackerPageExit(): void;
    trackerPageEvent(pageEventData: AnalyticPageEventRequestData): Promise<void>;
    destroy(): void;
}
export declare const analyticModel: AnalyticModel;
