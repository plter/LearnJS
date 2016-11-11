///<reference path="../lib/three.d.ts"/>
/**
 * Created by plter on 1/31/16.
 */

namespace plter {
    export class Photo3D extends THREE.Mesh {

        constructor(texture:THREE.Texture) {
            var geometry = new THREE.PlaneGeometry(5, 5);
            var material = new THREE.MeshLambertMaterial({color: 0xffffff, side: THREE.DoubleSide, map: texture});
            super(geometry, material);

            this.position.z = -5;
        }

        public onRender() {
            this.rotation.y += 0.01;
        }
    }
}