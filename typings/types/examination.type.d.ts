export declare enum ExaminationUseStatus {
    InUse = 1,
    UnUse = 0
}
export declare enum ExaminationReportType {
    None = 1,
    Grade = 2,
    All = 3
}
export declare enum ExaminationStatus {
    None = 0,
    InProgress = 1,
    Finished = 2
}
export declare enum ExaminationUploadAnswerSheetStatus {
    InProgress = 0,
    Finished = 1
}
export declare enum ExaminationSheetReportStatus {
    InProgress = 0,
    WithoutCorrect = 1,
    Corrected = 2
}
export interface ExaminationConfig {
    id: number;
    name: string;
    description: string;
    exam_num: number;
    end_at: number;
    duration: number;
    report_at: number;
    report_type: ExaminationReportType;
    status: ExaminationStatus;
    items: string;
    is_open: boolean;
    answers: string;
    is_ok: boolean;
}
