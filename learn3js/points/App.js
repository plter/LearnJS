///<reference path="../lib/three.d.ts"/>
///<reference path="MyPoints.ts"/>
/**
 * Created by plter on 2/1/16.
 */
var plter;
(function (plter) {
    var App = (function () {
        function App() {
            this.WIDTH = 550;
            this.HEIGHT = 400;
            this.time = 0;
            this.frameIndex = 0;
            this.fpsDiv = document.getElementById("fpsDiv");
            this.scene = new THREE.Scene();
            this.camera = new THREE.PerspectiveCamera(45, this.WIDTH / this.HEIGHT, 0.1, 1000);
            this.camera.position.z = 5;
            this.renderer = new THREE.WebGLRenderer();
            this.renderer.setSize(this.WIDTH, this.HEIGHT);
            document.body.appendChild(this.renderer.domElement);
            this.addPoints();
            this.render();
        }
        App.prototype.addPoints = function () {
            this.points = new plter.CustomPoints();
            this.scene.add(this.points);
        };
        App.prototype.render = function () {
            requestAnimationFrame(this.render.bind(this));
            this.points.onRender();
            this.renderer.render(this.scene, this.camera);
            var currentTime = new Date().getTime();
            if (this.time == 0) {
                this.time = currentTime;
            }
            else {
                this.currentFps = Math.floor(1000 / (currentTime - this.time));
                this.time = currentTime;
            }
            this.frameIndex++;
            if (this.frameIndex % 60 == 0) {
                this.fpsDiv.innerText = this.currentFps + "fps";
            }
        };
        return App;
    })();
    plter.App = App;
})(plter || (plter = {}));
new plter.App();
//# sourceMappingURL=App.js.map