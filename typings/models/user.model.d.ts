import { User, UserIdentity, UserUpdateInfo } from '@type/user.type';
import { Model } from 'src/lib/model';
export declare class UserModel extends Model<User> {
    name: string;
    constructor();
    get info(): User;
    get waiterNumber(): number;
    get isQueuing(): boolean;
    init: () => Promise<void>;
    getSignature(id: string): string;
    setSignature(id: string, signature: string): void;
    getAnalyticSession(id: string): string;
    setAnalyticSession(id: string, analytic_session: string): void;
    join(act_id: string, userIdentity?: Partial<UserIdentity>): Promise<unknown>;
    checkUserStorage(id: string): void;
    removeUserStorage(id: string): void;
    subNats(): void;
    update(userUpdateInfo: UserUpdateInfo): Promise<boolean>;
    destroy(): void;
}
export declare const userModel: UserModel;
