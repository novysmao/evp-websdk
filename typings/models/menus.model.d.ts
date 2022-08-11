import { MenuItem } from '@type/menus.type';
import { Video } from '@type/video.type';
import { AModel, Model } from 'src/lib/model';
export interface MenusState {
    menus: MenuItem[];
    menusContent: {
        [K: number]: string | Video[];
    };
}
export declare class MenusModel extends Model<MenusState> implements AModel {
    name: string;
    constructor();
    init(menus?: MenuItem[]): Promise<boolean>;
    getMenus(): Promise<void>;
    getMenuContent(menu: MenuItem): Promise<string | Video[]>;
    destroy(): void;
}
export declare const menusModel: MenusModel;
