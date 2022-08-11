import { BehaviorSubject, Observable } from 'rxjs';
export interface callbackItem {
    name: string;
    callback: (T: any) => void;
}
declare class State<T> {
    protected callbacks: callbackItem[];
    protected state$: BehaviorSubject<T>;
    get state(): T;
    constructor(state: T);
    select<V>(selectFn: (state: T) => V): Observable<V>;
    getState(): T;
    set: (state: T) => void;
    setState(state: Partial<T> | ((state: T) => void)): void;
    on(name: string, callback: () => void): void;
}
export { State };
