import { QuestionnaireConfig, SubmitType, QuestionnaireItem } from '@type/questionnaire.type';
import { AModel, Model } from 'src/lib/model';
export interface QuestionnaireModelState {
    config: QuestionnaireConfig;
}
export declare class QuestionnaireModel extends Model<QuestionnaireModelState> implements AModel {
    name: string;
    constructor();
    static transformConfig(config: QuestionnaireConfig): QuestionnaireConfig;
    static transformQuestionItem(content: SubmitType, item: QuestionnaireItem, index: number): any;
    init(config?: QuestionnaireConfig): Promise<boolean>;
    get config(): QuestionnaireConfig;
    getConfig(): Promise<void>;
    submit(content: SubmitType): Promise<boolean>;
    subNats(): void;
    destroy(): void;
}
export declare const questionnaireModel: QuestionnaireModel;
