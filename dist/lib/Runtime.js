"use strict";
const Timer_1 = require("./Timer");
const moody_1 = require("moody");
class Runtime {
    constructor() {
        this.timer = new Timer_1.Timer();
        this.moody = new moody_1.Moody();
    }
    run() {
        this.timer.update();
        this.moody.execute("update", this.timer.dt);
        this.moody.execute("draw");
        requestAnimationFrame(() => this.run());
    }
    push(newState, ...args) {
        return this.moody.push(newState, ...args);
    }
    pop() {
        return this.moody.pop();
    }
    swap(newState, ...args) {
        return this.moody.swap(newState, ...args);
    }
}
exports.Runtime = Runtime;
//# sourceMappingURL=Runtime.js.map