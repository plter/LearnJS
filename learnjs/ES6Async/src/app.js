/**
 * Created by plter on 11/14/16.
 */

class Hello {
    constructor() {
        console.log("Hello");

        this.run();
    }

    wait(delay) {
        return new Promise(function (ok, rej) {
            setTimeout(ok, delay);
        });
    }

    async run() {
        console.log("Step 1");
        await this.wait(1000);
        console.log("Step 2");
    }
}

new Hello();