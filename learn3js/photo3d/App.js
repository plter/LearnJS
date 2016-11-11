///<reference path="../lib/three.d.ts"/>
///<reference path="Photo3D.ts"/>
/**
 * Created by plter on 1/31/16.
 */
var plter;
(function (plter) {
    var App = (function () {
        function App() {
            this.WIDTH = 550;
            this.HEIGHT = 400;
            this.objs = [];
            this.scene = new THREE.Scene();
            this.camera = new THREE.PerspectiveCamera(45, this.WIDTH / this.HEIGHT, 0.1, 1000);
            this.camera.position.z = 5;
            this.renderer = new THREE.WebGLRenderer();
            this.renderer.setSize(this.WIDTH, this.HEIGHT);
            document.body.appendChild(this.renderer.domElement);
            this.render();
            this.loadPhoto();
            this.addLight();
        }
        App.prototype.render = function () {
            function r() {
                requestAnimationFrame(r.bind(this));
                for (var k in this.objs) {
                    this.objs[k].onRender();
                }
                this.renderer.render(this.scene, this.camera);
            }
            r.call(this);
        };
        App.prototype.loadPhoto = function () {
            var loader = new THREE.TextureLoader();
            loader.load("img.jpg", function (texture) {
                this.addPhoto3D(texture);
            }.bind(this));
        };
        App.prototype.addPhoto3D = function (texture) {
            this.addObj(new plter.Photo3D(texture));
        };
        App.prototype.addObj = function (obj) {
            this.scene.add(obj);
            this.objs.push(obj);
        };
        App.prototype.addLight = function () {
            var l = new THREE.PointLight(0xffffff, 1, 1000);
            l.position.set(0, 5, 5);
            this.scene.add(l);
        };
        return App;
    })();
    plter.App = App;
})(plter || (plter = {}));
//run this app
new plter.App();
//# sourceMappingURL=App.js.map