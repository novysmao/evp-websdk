import { topicCompatible } from '@utils/goim';
import { connectWs } from 'websocket-protobuf/dist/bundle';
import { Nats } from './nats';

export class GoimNats extends Nats {
  connectWebsocket(url: string) {
    this.nc = connectWs({
      servers: url,
      mid: this.opts.mid,
      room_id: `live://${this.opts.act_id}`,
    });
  }

  subscribe(topic: string | number, callback) {
    return this.nc.subscribeNotify(topic, (data) => {
      callback(JSON.parse(data));
    });
  }

  unsubscribe(topic, sid) {
    this.nc.unSubscribeNotify(topic);
  }

  close() {
    console.log('[goim-nats]:销毁');
    this.nc.destroy();
  }

  listen(callback) {
    // 直接执行即可，不需要listen，不然收到消息会重复
    callback();
  }

  getTopic(topic: string) {
    return topicCompatible(topic, this.opts.mid);
  }
}
