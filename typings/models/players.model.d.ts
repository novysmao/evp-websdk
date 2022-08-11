import { PlayerModel } from './player.model';
import { PlayerOption } from 'mudu-player';
import { Model } from 'src/lib/model';
export declare type PlayersModelState = {
    [key: string]: PlayerModel;
};
export declare class PlayersModel extends Model<PlayersModelState> {
    name: string;
    cdnConfig: {};
    constructor();
    setPath(path: string): void;
    setup(dom: string, option: PlayerOption): PlayerModel;
    getPlayerInstance(dom: string): PlayerModel;
    destroy(): void;
}
export declare const playerModel: PlayersModel;
