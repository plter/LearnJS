///<reference path="../lib/three.d.ts"/>
/**
 * Created by plter on 1/31/16.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Photo = (function (_super) {
    __extends(Photo, _super);
    function Photo(texture) {
        this.frames = 0;
        var material = new THREE.SpriteMaterial();
        material.map = texture;
        material.color = new THREE.Color(0xffffff);
        _super.call(this, material);
    }
    Photo.prototype.onRender = function () {
        this.frames += 0.1;
        this.position.z = 0.5 * Math.sin(this.frames);
    };
    return Photo;
})(THREE.Sprite);
//# sourceMappingURL=Photo.js.map