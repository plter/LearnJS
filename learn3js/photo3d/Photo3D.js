///<reference path="../lib/three.d.ts"/>
/**
 * Created by plter on 1/31/16.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var plter;
(function (plter) {
    var Photo3D = (function (_super) {
        __extends(Photo3D, _super);
        function Photo3D(texture) {
            var geometry = new THREE.PlaneGeometry(5, 5);
            var material = new THREE.MeshLambertMaterial({ color: 0xffffff, side: THREE.DoubleSide, map: texture });
            _super.call(this, geometry, material);
            this.position.z = -5;
        }
        Photo3D.prototype.onRender = function () {
            this.rotation.y += 0.01;
        };
        return Photo3D;
    })(THREE.Mesh);
    plter.Photo3D = Photo3D;
})(plter || (plter = {}));
//# sourceMappingURL=Photo3D.js.map