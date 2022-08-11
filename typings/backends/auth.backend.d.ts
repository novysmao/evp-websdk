declare const queryUserInfo: () => import("rxjs").Observable<any>;
declare const registerAnonymous: () => import("rxjs").Observable<any>;
declare const queryAccessList: () => import("rxjs").Observable<any>;
declare const queryAuthMethod: (act_id: string) => import("rxjs").Observable<any>;
declare const auth: (act_id: string) => import("rxjs").Observable<any>;
export { queryUserInfo, registerAnonymous, queryAccessList, queryAuthMethod, auth };
