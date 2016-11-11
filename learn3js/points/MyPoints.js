///<reference path="../lib/three.d.ts"/>
///<reference path="MyPoint.ts"/>
/**
 * Created by plter on 2/1/16.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var plter;
(function (plter) {
    var CustomPoints = (function (_super) {
        __extends(CustomPoints, _super);
        function CustomPoints() {
            this.geometry_ = new THREE.Geometry();
            var material = new THREE.PointsMaterial();
            material.vertexColors = true;
            _super.call(this, this.geometry_, material);
            this.addVertices();
        }
        CustomPoints.prototype.addVertices = function () {
            var color;
            for (var i = 0; i < 10000; i++) {
                this.geometry_.vertices.push(new plter.MyPoint());
                color = new THREE.Color(0xffffff * Math.random());
                this.geometry_.colors.push(color);
            }
        };
        CustomPoints.prototype.onRender = function () {
            this.geometry_.verticesNeedUpdate = true;
            for (var k in this.geometry_.vertices) {
                this.geometry_.vertices[k].move();
            }
        };
        return CustomPoints;
    })(THREE.Points);
    plter.CustomPoints = CustomPoints;
})(plter || (plter = {}));
//# sourceMappingURL=MyPoints.js.map