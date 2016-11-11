///<reference path="../lib/three.d.ts"/>
/**
 * Created by plter on 3/3/16.
 */


namespace plter {


    import Scene = THREE.Scene;
    import Renderer = THREE.Renderer;
    import Camera = THREE.Camera;
    import WebGLRenderer = THREE.WebGLRenderer;
    import PerspectiveCamera = THREE.PerspectiveCamera;
    import Mesh = THREE.Mesh;
    import PlaneGeometry = THREE.PlaneGeometry;
    import MeshBasicMaterial = THREE.MeshBasicMaterial;
    export class App {

        private _scene:Scene;
        private _renderer:Renderer;
        private _camera:Camera;
        private static WIDTH = 600;
        private static HEIGHT = 400;

        constructor() {
            this._camera = new PerspectiveCamera(90, App.WIDTH / App.HEIGHT, 0.01, 10);
            this._camera.position.z = 0.5;

            this._scene = new Scene();

            this._renderer = new WebGLRenderer();
            this._renderer.setSize(App.WIDTH, App.HEIGHT);

            document.body.appendChild(this._renderer.domElement);

            this.render();

            this.addPlane();
        }

        private addPlane():void {
            var geom = new PlaneGeometry(1, 1);
            var mat = new MeshBasicMaterial({color: 0xffffff});
            var mesh = new Mesh(geom, mat);
            this._scene.add(mesh);
        }

        private render():void {

            this._renderer.render(this._scene, this._camera);

            requestAnimationFrame(this.render.bind(this));
        }
    }
}


new plter.App();