import { Nats } from './nats';
export declare class GoimNats extends Nats {
    connectWebsocket(url: string): void;
    subscribe(topic: string | number, callback: any): any;
    unsubscribe(topic: any, sid: any): void;
    close(): void;
    listen(callback: any): void;
    getTopic(topic: string): any;
}
