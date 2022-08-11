export enum ExaminationUseStatus {
  InUse = 1, // 开始，对应状态使用中
  UnUse = 0, // 结束，对应状态未使用
}
export enum ExaminationReportType {
  None = 1, // 不显示报告
  Grade = 2, // 仅显示成绩
  All = 3, // 显示所有报告内容
}
export enum ExaminationStatus {
  None = 0, // 未参加过考试
  InProgress = 1, // 考试中
  Finished = 2, // 已完成考试
}
export enum ExaminationUploadAnswerSheetStatus {
  InProgress = 0, // 考试中
  Finished = 1, // 完成考试
}
export enum ExaminationSheetReportStatus {
  InProgress = 0, // 考试中
  WithoutCorrect = 1, // 完成考试，未改卷
  Corrected = 2, // 已改卷
}

export interface ExaminationConfig {
  id: number; // 考试id
  name: string; // 考试展示名称
  description: string; // 考试描述信息
  exam_num: number; // 考试人数
  end_at: number; // 考试结束时间
  duration: number; // 考试时长, 单位: 分钟
  report_at: number; // 考试上报时间
  report_type: ExaminationReportType; // 考试上报类型: 1-不显示报告，2-仅显示成绩，3-显示所有报告内容
  status: ExaminationStatus; // 考试状态: 0-未参加过考试 1-考试中 2-已完成考试（仅当为1时，sheet带有内容)
  items: string; // 考试内容
  is_open: boolean; // 是否开启考试: true-是 false-否
  answers: string; // 答案
  is_ok: boolean; // 为true表示请求接口成功，false表示失败返回默认数据
}
