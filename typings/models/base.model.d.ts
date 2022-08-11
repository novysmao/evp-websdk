import { State } from '@core/state';
export declare class Model<T> extends State<T> {
    constructor(state: T);
    init(): void;
}
