///<reference path="../lib/three.d.ts"/>
/**
 * Created by plter on 3/10/16.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var plter;
(function (plter) {
    var Box = (function (_super) {
        __extends(Box, _super);
        function Box(boxColor) {
            var geom = new THREE.BoxGeometry(1, 1, 1);
            var mater = new THREE.MeshLambertMaterial({ color: boxColor });
            _super.call(this, geom, mater);
        }
        Box.prototype.update = function () {
            this.rotation.x += 0.01;
            this.rotation.y += 0.01;
            this.rotation.z += 0.01;
        };
        return Box;
    })(THREE.Mesh);
    plter.Box = Box;
    var Config = (function () {
        function Config() {
        }
        Config.CANVAS_WIDTH = 800;
        Config.CANVAS_HEIGHT = 500;
        return Config;
    })();
    plter.Config = Config;
    var App = (function () {
        function App() {
            this._boxes = [];
            this._raycaster = new THREE.Raycaster();
            this._mouse = new THREE.Vector2();
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
        App.prototype.render = function () {
            this._boxes.forEach(function (obj, index, arr) {
                obj.update();
            });
            this._renderer.render(this._scene, this._camera);
            requestAnimationFrame(this.render.bind(this));
        };
        App.prototype.addLight = function () {
            this._light = new THREE.PointLight(0xffffff, 1, 1000);
            this._light.position.set(0, 5, 5);
            this._scene.add(this._light);
        };
        App.prototype.addBoxes = function () {
            var b;
            for (var i = 0; i < 10; i++) {
                b = new Box(0xff0000);
                b.position.set(Math.random() * 10 - 5, Math.random() * 10 - 5, -Math.random() * 10);
                this._boxes.push(b);
                this._scene.add(b);
            }
        };
        App.prototype.clickHandler = function (e) {
            this._mouse.x = e.offsetX / Config.CANVAS_WIDTH * 2 - 1;
            this._mouse.y = 1 - e.offsetY / Config.CANVAS_HEIGHT * 2;
            this._raycaster.setFromCamera(this._mouse, this._camera);
            var result = this._raycaster.intersectObjects(this._scene.children);
            if (result.length > 0) {
                var obj = result[0].object;
                obj.material.color = new THREE.Color(0xffff00);
            }
        };
        return App;
    })();
    plter.App = App;
})(plter || (plter = {}));
new plter.App();
//# sourceMappingURL=App.js.map