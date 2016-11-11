/**
 * Created by plter on 3/30/16.
 */
(function () {

    var Constants = {WIDTH: 550, HEIGHT: 400, R: 50};

    function App() {

        this.render = function () {

            if (this._skyBall) {
                this._skyBall.rotation.y += 0.01;
            }

            this._renderer.render(this._scene, this._camera);
            requestAnimationFrame(this.render.bind(this));
        };

        this.addSkyBall = function () {
            var geometry = new THREE.SphereGeometry(Constants.R, 20, 20);
            var material = new THREE.MeshBasicMaterial({
                map: new THREE.TextureLoader().load("photo.jpg"),
                side: THREE.BackSide
            });
            this._skyBall = new THREE.Mesh(geometry, material);
            this._scene.add(this._skyBall);
        };


        this.init = function () {
            this._scene = new THREE.Scene();

            this._camera = new THREE.PerspectiveCamera(25, Constants.WIDTH / Constants.HEIGHT, 0.01, 1000);
            this._camera.position.z = Constants.R * 3 / 2;
            this._scene.add(this._camera);

            this._renderer = new THREE.WebGLRenderer();
            this._renderer.setSize(Constants.WIDTH, Constants.HEIGHT);

            document.body.appendChild(this._renderer.domElement);

            this.addSkyBall();

            this.render();
        };

        this.init();
    }

    new App();
}());