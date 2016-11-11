///<reference path="../lib/three.d.ts"/>
///<reference path="MyPoint.ts"/>
/**
 * Created by plter on 2/1/16.
 */

namespace plter {
    export class CustomPoints extends THREE.Points {


        private geometry_:THREE.Geometry;

        constructor() {
            this.geometry_ = new THREE.Geometry();
            let material = new THREE.PointsMaterial();
            material.vertexColors = true;

            super(this.geometry_, material);

            this.addVertices();
        }

        private addVertices() {
            let color:THREE.Color;
            for (let i = 0; i < 10000; i++) {
                this.geometry_.vertices.push(new plter.MyPoint());

                color = new THREE.Color(0xffffff * Math.random());
                this.geometry_.colors.push(color);
            }
        }

        public onRender() {
            this.geometry_.verticesNeedUpdate = true;

            for (let k in this.geometry_.vertices) {
                (this.geometry_.vertices[k] as MyPoint).move();
            }
        }
    }
}