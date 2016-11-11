///<reference path="../lib/three.d.ts"/>
///<reference path="MyPoints.ts"/>
/**
 * Created by plter on 2/1/16.
 */

namespace plter {
    import Vector = THREE.Vector;
    export class App {

        private scene:THREE.Scene;
        private camera:THREE.PerspectiveCamera;
        private renderer:THREE.WebGLRenderer;
        private WIDTH = 550;
        private HEIGHT = 400;
        private points:plter.CustomPoints;
        private time = 0;
        private currentFps;
        private fpsDiv:HTMLElement;
        private frameIndex = 0;

        constructor() {

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

        private addPoints() {
            this.points = new plter.CustomPoints();
            this.scene.add(this.points);
        }

        private render() {
            requestAnimationFrame(this.render.bind(this));

            this.points.onRender();
            this.renderer.render(this.scene, this.camera);

            let currentTime = new Date().getTime();
            if (this.time == 0) {
                this.time = currentTime;
            } else {
                this.currentFps = Math.floor(1000 / (currentTime - this.time));
                this.time = currentTime;
            }

            this.frameIndex++;
            if (this.frameIndex % 60 == 0) {
                this.fpsDiv.innerText = this.currentFps + "fps";
            }
        }
    }
}

new plter.App();