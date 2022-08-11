import { SignupConfig } from '@type/signup.type';
import { Model } from 'src/lib/model';
export interface SignupModelState {
    config: SignupConfig;
}
export declare class SignupModel extends Model<SignupModelState> {
    name: string;
    constructor();
    init(config: SignupConfig): void;
    getConfig(): Promise<void>;
    subNats(): void;
    upload(): void;
    destroy(): void;
}
export declare const signupModel: SignupModel;
