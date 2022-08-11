export interface SignupConfig {
  is_open: boolean; // 是否开启报名系统: true-是 false-否
  description: string; // 报名描述信息
  name: string; // 报名展示标题
  pic: string; // 报名展示图片
  items: SignupItem[];
  is_ok: boolean; // 为true表示请求接口成功，false表示失败返回默认数据
}

export interface SignupItem {
  type: string; // 表单类型: name，phone等
  name: string; // 表单类型的中文名称
  is_must: boolean; // 是否必填
}
