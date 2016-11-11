/**
 * Created by plter on 3/21/16.
 */


var Constants = {WIDTH: 550, HEIGHT: 400};


function App() {


    /**
     * @returns {HTMLCanvasElement}
     */
    this.getCanvas = function () {
        if (!this._canvas) {
            /**
             * @type {HTMLCanvasElement}
             * @private
             */
            this._canvas = document.createElement("canvas");
            this._canvas.width = 512;
            this._canvas.height = 512;
        }
        return this._canvas;
    };

    this.createTexture = function () {
        var ctx = this.getCanvas().getContext("2d");
        ctx.fillStyle = "#ff0000";
        ctx.fillRect(0, 0, 512, 512);
        var texture = new THREE.Texture(this.getCanvas());
        texture.needsUpdate = true;
        return texture;
    };

    this.addImageData = function () {
        this._geom = new THREE.PlaneGeometry(1, 1);
        this._geom.scale();
        this._mater = new THREE.MeshBasicMaterial({
            map: this.createTexture(),
            side: THREE.DoubleSide
        });
        this._imageMesh = new THREE.Mesh(this._geom, this._mater);
        this._scene.add(this._imageMesh);
    };

    this.render = function () {

        this._renderer.render(this._scene, this._camera);

        requestAnimationFrame(this.render.bind(this));
    };

    this.init = function () {
        this._camera = new THREE.PerspectiveCamera(90, Constants.WIDTH / Constants.HEIGHT, 0.01, 1000);
        this._camera.position.z = 1;

        this._renderer = new THREE.WebGLRenderer();
        this._renderer.setSize(Constants.WIDTH, Constants.HEIGHT);

        this._scene = new THREE.Scene();

        document.body.appendChild(this._renderer.domElement);

        this.addImageData();

        this.render();
    };


    this.init()
}

new App();