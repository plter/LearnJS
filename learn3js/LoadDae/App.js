/**
 * Created by plter on 3/25/16.
 */

(function () {
    function App() {

        this.WIDTH = 550;
        this.HEIGHT = 400;

        this.render = function () {

            var delta = this._clock.getDelta();

            THREE.AnimationHandler.update(delta);

            this._renderer.render(this._scene, this._camera);

            requestAnimationFrame(this.render.bind(this));
        };

        this.loadModel = function () {
            var loader = new THREE.ColladaLoader();
            loader.load("Untitled.dae", function (collada) {
                this._theObject = collada.scene;
                this._scene.add(collada.scene);
                //collada.scene.rotation.x = Math.PI * 3 / 2;

                var sm = collada.skins[0];
                var animation = new THREE.Animation(sm, sm.geometry.animation);
                animation.play(1);

                collada.scene.updateMatrix();
            }.bind(this));
        };


        this.addLight = function () {
            var light = new THREE.PointLight(0xffffff, 1, 100);
            light.position.set(0, 5, 5);
            this._scene.add(light);
        };


        this.init = function () {

            this._clock = new THREE.Clock();

            this._camera = new THREE.PerspectiveCamera(90, this.WIDTH / this.HEIGHT, 0.01, 1000);
            this._camera.position.z = 5;

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