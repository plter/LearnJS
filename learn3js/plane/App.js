///<reference path="../lib/three.d.ts"/>
/**
 * Created by plter on 3/3/16.
 */
var plter;
(function (plter) {
    var Scene = THREE.Scene;
    var WebGLRenderer = THREE.WebGLRenderer;
    var PerspectiveCamera = THREE.PerspectiveCamera;
    var Mesh = THREE.Mesh;
    var PlaneGeometry = THREE.PlaneGeometry;
    var MeshBasicMaterial = THREE.MeshBasicMaterial;
    var App = (function () {
        function App() {
            this._camera = new PerspectiveCamera(90, App.WIDTH / App.HEIGHT, 0.01, 10);
            this._camera.position.z = 0.5;
            this._scene = new Scene();
            this._renderer = new WebGLRenderer();
            this._renderer.setSize(App.WIDTH, App.HEIGHT);
            document.body.appendChild(this._renderer.domElement);
            this.render();
            this.addPlane();
        }
        App.prototype.addPlane = function () {
            var geom = new PlaneGeometry(1, 1);
            var mat = new MeshBasicMaterial({ color: 0xffffff });
            var mesh = new Mesh(geom, mat);
            this._scene.add(mesh);
        };
        App.prototype.render = function () {
            this._renderer.render(this._scene, this._camera);
            requestAnimationFrame(this.render.bind(this));
        };
        App.WIDTH = 600;
        App.HEIGHT = 400;
        return App;
    })();
    plter.App = App;
})(plter || (plter = {}));
new plter.App();
//# sourceMappingURL=App.js.map