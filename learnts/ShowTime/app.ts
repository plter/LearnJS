/**
 * Created by plter on 2/24/16.
 */

namespace plter {
    export class App {

        private divClock:HTMLDivElement;

        constructor() {
            this.divClock = document.getElementById("div_clock") as HTMLDivElement;

            this.showTimeHandler();
        }

        private showTimeHandler() {

            var date:Date = new Date();
            this.divClock.innerText = date.toString();

            setTimeout(this.showTimeHandler.bind(this), 999);
        }
    }
}


new plter.App();