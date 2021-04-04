export default class Clock {
    constructor() {
        this.interval = 1000;
        this.last = null;
    }

    timeToDrop() {
        if (this.last == null) {
            this.last = Date.now();
        }
        if (Date.now() > this.last + this.interval) {
            this.last += this.interval;
            return true;
        }
        return false;
    }

    speedUp() {
        this.interval = Math.floor(this.interval * 0.9);
    }
}