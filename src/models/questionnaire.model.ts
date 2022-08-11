import { getQuestionnaireConfig, submitQuestionnaire } from '@backends/questionnaire.backend';
import {
  QuestionnaireConfig,
  SubmitType,
  QuestionnaireItem,
  WsQuestionnaireType,
  WsQuestionnaire,
} from '@type/questionnaire.type';
import { basisModel } from './basis.model';
import { roomModel } from './room.model';
import { eventEmitterModel } from './event-emitter.model';
import { QuestionnaireHide, QuestionnairePop } from '../constans/events';
import { AModel, connect, Model } from 'src/lib/model';
import { cloneDeep } from 'lodash';

export interface QuestionnaireModelState {
  config: QuestionnaireConfig;
}

const DEFAULT_STATE = {
  config: {
    id: '', // 问卷id
    name: '', // 问卷展示名称
    description: '', // 问卷的描述信息
    is_force: false, // 是否强制填写: true-是 false-否
    open_at: 0, // 问卷开启时间
    pic: '', // 问卷展示图片
    updated_at: 0, // 问卷更新时间
    is_open: false, // 是否开启问卷: true-是 false-否
    items: '', // 问卷选项信息字符串
    is_ok: false,
    exist: false, // 是否有填写过该问券
  },
};

@connect({
  config: {
    backend: getQuestionnaireConfig,
    params: () => ({ act_id: basisModel.getState().config.basic.id }),
    transform: (config: QuestionnaireConfig) => QuestionnaireModel.transformConfig(config),
  },
})
export class QuestionnaireModel extends Model<QuestionnaireModelState> implements AModel {
  name = 'questionnaire';
  constructor() {
    super(DEFAULT_STATE);
  }

  static transformConfig(config: QuestionnaireConfig) {
    if (!config.items) {
      config.items = [];
    } else {
      config.items = JSON.parse(config.items as string);
    }
    return config;
  }

  static transformQuestionItem(content: SubmitType, item: QuestionnaireItem, index: number) {
    if (item.type === 'question') {
      return content[index].join(';') || '-空答案-';
    } else {
      return content[index] || '-空答案-';
    }
  }

  async init(config?: QuestionnaireConfig) {
    if (config) {
      QuestionnaireModel.transformConfig(config);
      this.setState({ config });
    } else {
      await this.getConfig();
    }
    this.subNats();
    return Promise.resolve(true);
  }

  get config() {
    return this.getState().config;
  }

  async getConfig() {
    await this.updateKeys();
  }

  submit(content: SubmitType): Promise<boolean> {
    const items = this.getState().config.items as QuestionnaireItem[];
    const contents = Object.values(content);
    const conductItems = items.map((item, index) => ({
      ...item,
      value: QuestionnaireModel.transformQuestionItem(contents, item, index),
      xlxsValue: QuestionnaireModel.transformQuestionItem(contents, item, index),
    }));
    return new Promise((resolve, reject) => {
      submitQuestionnaire(
        basisModel.getState().config.basic.id,
        this.getState().config.id,
        JSON.stringify(conductItems),
      ).subscribe({
        next: () => resolve(true),
        error: (err) => reject(err),
      });
    });
  }

  subNats() {
    // 问卷
    roomModel.nats
      .from(`bugu.activity.question.${basisModel.getState().config.basic.id}`)
      .subscribe((v: WsQuestionnaire) => {
        switch (v.Type) {
          case WsQuestionnaireType.QuestionHide:
            const config: QuestionnaireConfig = cloneDeep(this.getState().config);
            config.is_open = false;
            this.setState({ config });
            eventEmitterModel.emit(this.name, {
              type: QuestionnaireHide,
            });
            break;
          case WsQuestionnaireType.QuestionPop:
            void this.updateKeys().then(() => {
              eventEmitterModel.emit(this.name, {
                type: QuestionnairePop,
                data: this.config,
              });
            });
            break;
        }
      });
  }
  destroy() {
    console.log(`[${this.name}]:销毁`);
    this.setState(DEFAULT_STATE);
  }
}

export const questionnaireModel = new QuestionnaireModel();
