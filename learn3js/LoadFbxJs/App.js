/**
 * Created by plter on 3/25/16.
 */

(function () {
    function App() {

        this.WIDTH = 550;
        this.HEIGHT = 400;

        this.render = function () {

            if (this._theObject) {
                this._theObject.rotation.y += 0.01;
            }

            this._renderer.render(this._scene, this._camera);

            requestAnimationFrame(this.render.bind(this));
        };

        this.loadModel = function () {
            var loader = new THREE.SceneLoader();
            loader.load("Untitled.js", function (obj) {
                this._theObject = obj.scene;
                this._scene = obj.scene;
            }.bind(this));
        };


        this.addLight = function () {
            var light = new THREE.PointLight(0xffffff, 1, 100);
            light.position.set(0, 0, 5);
            this._scene.add(light);
        };


        this.init = function () {
            this._camera = new THREE.PerspectiveCamera(90, this.WIDTH / this.HEIGHT, 0.01, 1000);
            this._camera.position.z = 200;

            this._renderer = new THREE.WebGLRenderer();
            this._renderer.setSize(this.WIDTH, this.HEIGHT);
            document.body.appendChild(this._renderer.domElement);

            this._scene = new THREE.Scene();

            this.render();

            this.addLight();
            this.loadModel();
        };

        this.init();
    }

    new App();
}());