export default class Mediator {
    constructor() {
        this.channels = {};
    }

    pub(channel, data) {
        if (this.channels[channel]) {
            this.channels[channel].forEach(fn => fn(data));
        }
    }

    sub(channel, fn) {
        if (!this.channels[channel]) {
            this.channels[channel] = [];
        }

        this.channels[channel].push(fn);
    }

    unSub(channel) {
        if (!this.channels[channel]) {
            this.channels[channel] = [];
        }

        this.channels[channel] = null;
    }
}