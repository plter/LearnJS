///<reference path="../lib/three.d.ts"/>
/**
 * Created by plter on 2/2/16.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var plter;
(function (plter) {
    var Vector3 = THREE.Vector3;
    var MyPoint = (function (_super) {
        __extends(MyPoint, _super);
        function MyPoint() {
            _super.call(this, 0, 0, 0);
            this.speedX = Math.random() * 2 - 1;
            this.speedY = Math.random() * 2 - 1;
            this.speedZ = Math.random() * 2 - 1;
        }
        MyPoint.prototype.move = function () {
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
        };
        return MyPoint;
    })(Vector3);
    plter.MyPoint = MyPoint;
})(plter || (plter = {}));
//# sourceMappingURL=MyPoint.js.map