///<reference path="../lib/three.d.ts"/>
///<reference path="Photo3D.ts"/>
/**
 * Created by plter on 1/31/16.
 */

namespace plter {

    export class App {

        private scene:THREE.Scene;
        private renderer:THREE.WebGLRenderer;
        private camera:THREE.Camera;
        private WIDTH = 550;
        private HEIGHT = 400;
        private objs = [];

        constructor() {
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

        private render() {
            function r() {
                requestAnimationFrame(r.bind(this));

                for (let k in this.objs) {
                    this.objs[k].onRender();
                }

                this.renderer.render(this.scene, this.camera);
            }

            r.call(this);
        }

        private loadPhoto() {
            let loader = new THREE.TextureLoader();
            loader.load("img.jpg", function (texture:THREE.Texture) {
                this.addPhoto3D(texture);
            }.bind(this));
        }

        private addPhoto3D(texture:THREE.Texture) {
            this.addObj(new plter.Photo3D(texture));
        }

        private addObj(obj:THREE.Object3D) {
            this.scene.add(obj);
            this.objs.push(obj);
        }

        private addLight() {
            let l = new THREE.PointLight(0xffffff, 1, 1000);
            l.position.set(0, 5, 5);
            this.scene.add(l);
        }
    }
}

//run this app
new plter.App();