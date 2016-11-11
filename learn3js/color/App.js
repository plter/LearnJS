///<reference path="../lib/three.d.ts"/>
/**
 * Created by plter on 2/2/16.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var plter;
(function (plter) {
    var Constants = (function () {
        function Constants() {
        }
        Constants.WIDTH = 550;
        Constants.HEIGHT = 400;
        return Constants;
    })();
    plter.Constants = Constants;
    var MyPoint = (function (_super) {
        __extends(MyPoint, _super);
        function MyPoint(x, y, z) {
            _super.call(this, x, y, z);
        }
        return MyPoint;
    })(THREE.Vector3);
    plter.MyPoint = MyPoint;
    var MyPoints = (function (_super) {
        __extends(MyPoints, _super);
        function MyPoints() {
            this.colorH = 0;
            this.geom = new THREE.Geometry();
            var material = new THREE.PointsMaterial();
            material.vertexColors = true;
            _super.call(this, this.geom, material);
            this.addPoints();
        }
        MyPoints.prototype.addPoints = function () {
            this.geom.vertices.push(new MyPoint(0, 0, 0));
            var c = new THREE.Color();
            this.geom.colors.push(c);
        };
        MyPoints.prototype.onRender = function () {
            this.geom.colorsNeedUpdate = true;
            this.colorH += 0.5;
            this.geom.colors[0].setHSL((this.colorH % 360) / 360, 1, 0.5);
        };
        return MyPoints;
    })(THREE.Points);
    plter.MyPoints = MyPoints;
    var App = (function () {
        function App() {
            this.scene = new THREE.Scene();
            this.camera = new THREE.PerspectiveCamera(45, Constants.WIDTH / Constants.HEIGHT, 0.1, 1000);
            this.camera.position.z = 1;
            this.renderer = new THREE.WebGLRenderer();
            this.renderer.setSize(Constants.WIDTH, Constants.HEIGHT);
            document.body.appendChild(this.renderer.domElement);
            this.addMyPoints();
            this.render();
        }
        App.prototype.render = function () {
            requestAnimationFrame(this.render.bind(this));
            this.points.onRender();
            this.renderer.render(this.scene, this.camera);
        };
        App.prototype.addMyPoints = function () {
            this.points = new MyPoints();
            this.scene.add(this.points);
        };
        return App;
    })();
    plter.App = App;
})(plter || (plter = {}));
new plter.App();
//# sourceMappingURL=App.js.map