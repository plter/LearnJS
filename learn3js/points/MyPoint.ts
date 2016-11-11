///<reference path="../lib/three.d.ts"/>
/**
 * Created by plter on 2/2/16.
 */

namespace plter {
    import Vector3 = THREE.Vector3;
    export class MyPoint extends Vector3 {

        private speedX;
        private speedY;
        private speedZ;

        constructor() {
            super(0, 0, 0);

            this.speedX = Math.random() * 2 - 1;
            this.speedY = Math.random() * 2 - 1;
            this.speedZ = Math.random() * 2 - 1;
        }

        public move() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.z += this.speedZ;

            if (this.z > 0) {
                this.speedZ = -Math.abs(this.speedZ);
            }
            if (this.z < -500) {
                this.speedZ = Math.abs(this.speedZ);
            }
            if (this.x < -250) {
                this.speedX = Math.abs(this.speedX);
            }
            if (this.x > 250) {
                this.speedX = -Math.abs(this.speedX);
            }
            if (this.y < -250) {
                this.speedY = Math.abs(this.speedY);
            }
            if (this.y > 250) {
                this.speedY = -Math.abs(this.speedY);
            }
        }
    }
}