///<reference path="../lib/three.d.ts"/>
/**
 * Created by plter on 3/10/16.
 */

namespace plter {

    export class Box extends THREE.Mesh {

        constructor(boxColor) {
            var geom = new THREE.BoxGeometry(1, 1, 1);
            var mater = new THREE.MeshLambertMaterial({color: boxColor});
            super(geom, mater);
        }

        update() {
            this.rotation.x += 0.01;
            this.rotation.y += 0.01;
            this.rotation.z += 0.01;
        }
    }

    export class Config {
        static CANVAS_WIDTH:number = 800;
        static CANVAS_HEIGHT:number = 500;
    }

    export class App {

        private _camera:THREE.Camera;
        private _renderer:THREE.Renderer;
        private _scene:THREE.Scene;
        private _light:THREE.Light;
        private _boxes:Array<Box> = [];
        private _raycaster = new THREE.Raycaster();
        private _mouse = new THREE.Vector2();

        constructor() {

            this._camera = new THREE.PerspectiveCamera(90, Config.CANVAS_WIDTH / Config.CANVAS_HEIGHT, 0.1, 1000);
            this._camera.position.z = 5;

            this._renderer = new THREE.WebGLRenderer();
            this._renderer.setSize(Config.CANVAS_WIDTH, Config.CANVAS_HEIGHT);
            document.body.appendChild(this._renderer.domElement);
            this._renderer.domElement.addEventListener("click", this.clickHandler.bind(this));

            this._scene = new THREE.Scene();

            this.render();

            this.addLight();
            this.addBoxes();
        }

        private render():void {
            this._boxes.forEach(function (obj, index, arr) {
                obj.update();
            });

            this._renderer.render(this._scene, this._camera);

            requestAnimationFrame(this.render.bind(this));
        }

        private addLight():void {
            this._light = new THREE.PointLight(0xffffff, 1, 1000);
            this._light.position.set(0, 5, 5);
            this._scene.add(this._light);
        }

        private addBoxes():void {
            var b;

            for (var i = 0; i < 10; i++) {
                b = new Box(0xff0000);
                b.position.set(Math.random() * 10 - 5, Math.random() * 10 - 5, -Math.random() * 10);
                this._boxes.push(b);
                this._scene.add(b);
            }
        }

        private clickHandler(e:MouseEvent):void {
            this._mouse.x = e.offsetX / Config.CANVAS_WIDTH * 2 - 1;
            this._mouse.y = 1 - e.offsetY / Config.CANVAS_HEIGHT * 2;

            this._raycaster.setFromCamera(this._mouse, this._camera);
            var result = this._raycaster.intersectObjects(this._scene.children);

            if (result.length > 0) {
                var obj = result[0].object as THREE.Mesh;
                (obj.material as THREE.MeshLambertMaterial).color = new THREE.Color(0xffff00);
            }
        }
    }
}

new plter.App();