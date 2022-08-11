import { getMenuGraphics, getMenus, getMenuVideos } from '@backends/menus.backend';
import { MenuItem, MenuType } from '@type/menus.type';
import { basisModel } from './basis.model';
import { cloneDeep } from 'lodash';
import { Video } from '@type/video.type';
import { AModel, connect, Model } from 'src/lib/model';

export interface MenusState {
  menus: MenuItem[];
  menusContent: {
    [K: number]: string | Video[];
  };
}

const DEFAULT_STATE = {
  menus: [],
  menusContent: {},
};

@connect({
  menus: {
    backend: getMenus,
    params: () => ({ act_id: basisModel.getState().config.basic.id }),
  },
})
export class MenusModel extends Model<MenusState> implements AModel {
  name = 'menus';
  constructor() {
    super(DEFAULT_STATE);
  }

  async init(menus?: MenuItem[]) {
    if (menus) {
      this.setState({ menus });
      menus.map((menu: MenuItem) => {
        void this.getMenuContent(menu);
      });
    } else {
      await this.getMenus();
    }
    return Promise.resolve(true);
  }

  async getMenus() {
    await this.updateKeys();
    this.getState().menus.map((menu: MenuItem) => {
      void this.getMenuContent(menu);
    });
  }

  getMenuContent(menu: MenuItem): Promise<string | Video[]> {
    return new Promise((resolve, reject) => {
      const act_id = basisModel.getState().config.basic.id;
      if (menu.type === MenuType.Graphics) {
        getMenuGraphics(act_id, menu.id).subscribe({
          next: (v: any) => {
            const menusContent = cloneDeep(this.getState().menusContent);
            const { text } = v;
            menusContent[menu.id] = text;
            this.setState({ menusContent });
            resolve(text);
          },
          error: (err) => {
            reject(err);
          },
        });
      } else if (menu.type === MenuType.Videos) {
        getMenuVideos(act_id, menu.id).subscribe({
          next: (v: Video[]) => {
            const menusContent = cloneDeep(this.getState().menusContent);
            menusContent[menu.id] = v;
            this.setState({ menusContent });
            resolve(v);
          },
          error: (err) => {
            reject(err);
          },
        });
      }
    });
  }

  destroy() {
    console.log(`[${this.name}]:销毁`);
    this.setState(DEFAULT_STATE);
  }
}

export const menusModel = new MenusModel();
