import { State } from '@core/state';
import { Developer } from '@type/developer.type';
export interface DeveloperState extends Developer {
    id?: string;
}
export declare class DeveloperModel extends State<DeveloperState> {
    name: string;
    constructor();
    auth(): Promise<boolean>;
    destroy(): void;
}
export declare const developerModel: DeveloperModel;
