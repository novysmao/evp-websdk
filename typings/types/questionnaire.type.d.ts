export interface QuestionnaireConfig {
    id: string;
    name: string;
    description: string;
    is_force: boolean;
    open_at: number;
    pic: string;
    updated_at: number;
    is_open: boolean;
    items: string | QuestionnaireItem[];
    is_ok: boolean;
    exist: boolean;
}
export declare type SubmitType = {
    [key: number]: any;
};
export interface QuestionnaireChoiceItem {
    inEdit: boolean;
    value: string;
}
export declare enum QuestionnaireType {
    Phone = "phone",
    Input = "input",
    Textarea = "textarea",
    Question = "question",
    QuestionAnswer = "questionAnswer"
}
export interface QuestionnaireItem {
    allow_fill_by_self?: boolean;
    inEdit: boolean;
    multi_select?: 0 | 1;
    must: 0 | 1;
    name: string;
    num: number;
    options?: QuestionnaireChoiceItem[];
    type: QuestionnaireType;
}
export declare enum WsQuestionnaireType {
    QuestionHide = "question_hide",
    QuestionPop = "question_pop"
}
export interface WsQuestionnaire {
    Type: WsQuestionnaireType;
}
