import { Observable, Subject } from 'rxjs';
import * as WebSocketNats from 'websocket-nats';
import { finalize, share } from 'rxjs/operators';
export interface NatsOptions {
  mid: number;
  act_id: string;
}
export interface ConnectedNats {
  from: <T>(topic: string) => Observable<T>;
  close: () => void;
}
export class Nats {
  opts = {
    act_id: '',
    mid: 0,
  };

  nc = null;

  connectWebsocket(url: string) {
    this.nc = WebSocketNats.connect({
      url,
      json: true,
      ...this.opts,
    });
  }

  subscribe(topic: string | number, callback) {
    return this.nc.subscribe(topic, callback);
  }

  unsubscribe(topic, sid) {
    this.nc.unsubscribe(sid);
  }

  close() {
    console.log('nats销毁');
    this.nc.close();
    this.nc = null;
  }

  listen(callback) {
    this.nc.on('connect', callback);
  }

  getTopic(topic: string) {
    return topic;
  }

  connect(url: string, opts: NatsOptions) {
    this.opts = opts;
    return new Observable<ConnectedNats>((observer) => {
      this.connectWebsocket(url);

      this.listen(() => {
        const subjectMap = {};

        const ret = {
          /**
           * 订阅消息
           * 多次传入同一个 topic 只会产生一条消息订阅，通过 rxjs 进行数据广播。
           * @param topic 消息地址
           */
          from: <T>(topic: string): Observable<T> => {
            if (subjectMap[topic]) {
              return subjectMap[topic];
            }

            const subject = new Subject<T>();
            const sid = this.subscribe(this.getTopic(topic), (msg: T) => subject.next(msg));
            const shared = subject.pipe(
              finalize(() => {
                this.unsubscribe(this.getTopic(topic), sid);
                subjectMap[topic] = null;
              }),
              share(),
            );

            subjectMap[topic] = shared;

            return shared;
          },
          /**
           * 关闭连接
           */
          close: () => {
            this.close();
          },
        };

        observer.next(ret);
        observer.complete();
      });
    });
  }
}
