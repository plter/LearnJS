///<reference path="../lib/three.d.ts"/>
/**
 * Created by plter on 2/2/16.
 */

namespace plter {
    export class Constants {
        public static WIDTH = 550;
        public static HEIGHT = 400;
    }

    export class MyPoint extends THREE.Vector3 {

        constructor(x:number, y:number, z:number) {
            super(x, y, z);
        }
    }

    export class MyPoints extends THREE.Points {
        private geom:THREE.Geometry;
        private colorH;

        constructor() {
            this.colorH = 0;

            this.geom = new THREE.Geometry();
            let material = new THREE.PointsMaterial();
            material.vertexColors = true;
            super(this.geom, material);

            this.addPoints();
        }

        private addPoints() {
            this.geom.vertices.push(new MyPoint(0, 0, 0));

            let c = new THREE.Color();
            this.geom.colors.push(c);
        }

        public onRender() {
            this.geom.colorsNeedUpdate = true;
            this.colorH += 0.5;
            this.geom.colors[0].setHSL((this.colorH % 360) / 360, 1, 0.5);
        }
    }


    export class App {

        private scene:THREE.Scene;
        private camera:THREE.PerspectiveCamera;
        private renderer:THREE.WebGLRenderer;
        private points:MyPoints;

        constructor() {
            this.scene = new THREE.Scene();
            this.camera = new THREE.PerspectiveCamera(45, Constants.WIDTH / Constants.HEIGHT, 0.1, 1000);
            this.camera.position.z = 1;

            this.renderer = new THREE.WebGLRenderer();
            this.renderer.setSize(Constants.WIDTH, Constants.HEIGHT);
            document.body.appendChild(this.renderer.domElement);

            this.addMyPoints();

            this.render();
        }

        private render() {
            requestAnimationFrame(this.render.bind(this));

            this.points.onRender();
            this.renderer.render(this.scene, this.camera);
        }

        private addMyPoints() {
            this.points = new MyPoints();
            this.scene.add(this.points);
        }
    }
}

new plter.App();