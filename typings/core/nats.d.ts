import { Observable } from 'rxjs';
export interface NatsOptions {
    mid: number;
    act_id: string;
}
export interface ConnectedNats {
    from: <T>(topic: string) => Observable<T>;
    close: () => void;
}
export declare class Nats {
    opts: {
        act_id: string;
        mid: number;
    };
    nc: any;
    connectWebsocket(url: string): void;
    subscribe(topic: string | number, callback: any): any;
    unsubscribe(topic: any, sid: any): void;
    close(): void;
    listen(callback: any): void;
    getTopic(topic: string): string;
    connect(url: string, opts: NatsOptions): Observable<ConnectedNats>;
}
