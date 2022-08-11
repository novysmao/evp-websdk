import { getExaminationConfig } from '@backends/examination.backend';
import { State } from '@core/state';
import { ExaminationConfig, ExaminationReportType, ExaminationStatus } from '@type/examination.type';
import { basisModel } from './basis.model';
import { roomModel } from './room.model';

export interface ExaminationModelState {
  config: ExaminationConfig;
}

const DEFAULT_STATE = {
  config: {
    id: 0, // 考试id
    name: '', // 考试展示名称
    description: '', // 考试描述信息
    exam_num: 0, // 考试人数
    end_at: 0, // 考试结束时间
    duration: 0, // 考试时长, 单位: 分钟
    report_at: 0, // 考试上报时间
    report_type: ExaminationReportType.None, // 考试上报类型: 1-不显示报告，2-仅显示成绩，3-显示所有报告内容
    status: ExaminationStatus.None, // 考试状态: 0-未参加过考试 1-考试中 2-已完成考试（仅当为1时，sheet带有内容)
    items: '', // 考试内容
    is_open: false, // 是否开启考试: true-是 false-否
    answers: '', // 答案
    is_ok: false,
  },
};

export class ExaminationModel extends State<ExaminationModelState> {
  name = 'examination';
  constructor() {
    super(DEFAULT_STATE);
  }

  init(config: ExaminationConfig) {
    this.setState({ config });
    this.subNats();
  }

  subNats() {
    roomModel.nats.from(`bugu.activity.examination.${basisModel.getState().config.basic.id}`).subscribe((v) => {
      console.log(v);
    });
  }

  destroy() {
    console.log(`[${this.name}]:销毁`);
    this.setState(DEFAULT_STATE);
  }
}

export const examinationModel = new ExaminationModel();
