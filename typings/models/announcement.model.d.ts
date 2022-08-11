import { AnnouncementConfig } from '@type/announcement.type';
import { AModel, Model } from 'src/lib/model';
export interface AnnouncementModelState {
    config: AnnouncementConfig;
}
export declare class AnnouncementModel extends Model<AnnouncementModelState> implements AModel {
    name: string;
    constructor();
    init(config?: AnnouncementConfig): Promise<boolean>;
    get config(): AnnouncementConfig;
    getConfig(): Promise<void>;
    resolveConfigUpdate(config: AnnouncementConfig): void;
    subNats(): void;
    destroy(): void;
}
export declare const announcementModel: AnnouncementModel;
