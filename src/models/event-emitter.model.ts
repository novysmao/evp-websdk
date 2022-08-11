import EventEmitter from 'eventemitter3';

export class EventEmitterModel extends EventEmitter {
  name = 'event-emitter';
  constructor() {
    super();
  }
}

export const eventEmitterModel = new EventEmitterModel();
