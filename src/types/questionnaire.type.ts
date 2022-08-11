/**
 * 问卷配置
 */
export interface QuestionnaireConfig {
  id: string; // 问卷id
  name: string; // 问卷展示名称
  description: string; // 问卷的描述信息
  is_force: boolean; // 是否强制填写: true-是 false-否
  open_at: number; // 问卷开启时间
  pic: string; // 问卷展示图片
  updated_at: number; // 问卷更新时间
  is_open: boolean; // 是否开启问卷: true-是 false-否
  items: string | QuestionnaireItem[]; // 问卷选项信息
  is_ok: boolean; // 为true表示请求接口成功，false表示失败返回默认数据
  exist: boolean; // 是否有填写过该问券
}

/**
 * 用户端提交类型
 */
export type SubmitType = {
  [key: number]: any;
};

/**
 * 问卷选择题题目
 */
export interface QuestionnaireChoiceItem {
  inEdit: boolean;
  value: string; // 选项名称
}

/**
 * 问卷类型
 */
export enum QuestionnaireType {
  Phone = 'phone', // 手机号
  Input = 'input', // 单行文字
  Textarea = 'textarea', // 多行文字
  Question = 'question', // 选择题
  QuestionAnswer = 'questionAnswer', // 问答题
}

/**
 * 问卷题目
 */
export interface QuestionnaireItem {
  allow_fill_by_self?: boolean; // 选择题用户允许填写答案
  inEdit: boolean;
  multi_select?: 0 | 1; // 选择题是否多选 0：单选 1：多选
  must: 0 | 1; // 是否必填
  name: string; // 问题名称
  num: number; // 问题题号，从零开始
  options?: QuestionnaireChoiceItem[]; // 多选题
  type: QuestionnaireType;
}

/**
 * 问卷 -- WS
 */

export enum WsQuestionnaireType {
  QuestionHide = 'question_hide', // 取消使用问卷
  QuestionPop = 'question_pop', // 使用问卷
}

export interface WsQuestionnaire {
  Type: WsQuestionnaireType;
}
