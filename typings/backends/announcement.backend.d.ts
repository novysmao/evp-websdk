import { AnnouncementConfig } from '@type/announcement.type';
import { Observable } from 'rxjs';
export declare const getAnnouncementConfig: (data: {
    act_id: string;
}) => Observable<AnnouncementConfig>;
