export interface CountdownConfig {
  is_open: boolean; // 是否开启倒计时: true-是 false-否
  title: string; // 倒计时展示的标题信息
  date_time: number; // 倒计时选定的时间
  is_ok: boolean; // 为true表示请求接口成功，false表示失败返回默认数据
}
