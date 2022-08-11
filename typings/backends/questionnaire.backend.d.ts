import { QuestionnaireConfig } from '@type/questionnaire.type';
import { Observable } from 'rxjs';
export declare const getQuestionnaireConfig: (data: {
    act_id: string;
}) => Observable<QuestionnaireConfig>;
export declare const submitQuestionnaire: (act_id: string, question_id: string, columns: string) => Observable<unknown>;
