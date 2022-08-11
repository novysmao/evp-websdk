import { State } from '@core/state';
import { ExaminationConfig } from '@type/examination.type';
export interface ExaminationModelState {
    config: ExaminationConfig;
}
export declare class ExaminationModel extends State<ExaminationModelState> {
    name: string;
    constructor();
    init(config: ExaminationConfig): void;
    subNats(): void;
    destroy(): void;
}
export declare const examinationModel: ExaminationModel;
