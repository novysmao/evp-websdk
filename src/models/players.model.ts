import { PlayerModel } from './player.model';
import { cloneDeep } from 'lodash';
import { PlayerOption } from 'mudu-player';
import { Model } from 'src/lib/model';

export type PlayersModelState = {
  [key: string]: PlayerModel;
};

export class PlayersModel extends Model<PlayersModelState> {
  name = 'players';
  cdnConfig = {};
  constructor() {
    super({});
  }

  setPath(path: string) {
    this.cdnConfig = {
      fileCdnPath: path,
      skin: {
        name: 'default',
        url: `${path}/mudu-player.css`,
      },
    };
  }

  setup(dom: string, option: PlayerOption): PlayerModel {
    const playerModelsMap = cloneDeep(this.getState());
    playerModelsMap[dom] = new PlayerModel(dom, Object.assign({}, option, this.cdnConfig));
    this.setState({ ...playerModelsMap });
    return playerModelsMap[dom];
  }

  getPlayerInstance(dom: string): PlayerModel {
    const playerModelsMap = this.getState();
    return playerModelsMap[dom];
  }

  destroy() {
    Object.values(this.getState()).map((player: PlayerModel) => {
      player.destroy();
    });
    this.cdnConfig = {};
  }
}

export const playerModel = new PlayersModel();
