/**
 * Created by plter on 3/4/16.
 */

namespace plter {

    export class App {


        private info:HTMLDivElement;
        private canvas:HTMLCanvasElement;

        constructor() {

            this.info = document.getElementById("info") as HTMLDivElement;
            this.canvas = document.getElementById("canvas") as HTMLCanvasElement;

            this.canvas.addEventListener("click", function (event:MouseEvent) {
                this.info.innerHTML = "x:" + event.clientX + ",y:" + event.clientY;
            }.bind(this));
        }
    }
}

new plter.App();