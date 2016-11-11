///<reference path="ColorTool.ts"/>
/**
 * Created by plter on 6/8/16.
 */
var HueCircle = (function () {
    function HueCircle() {
        this.canvas = document.createElement('canvas');
        this.context2d = this.canvas.getContext('2d');
        this.canvas.width = 550;
        this.canvas.height = 400;
        document.body.appendChild(this.canvas);
        this.drawHueCircle();
    }
    HueCircle.prototype.drawHueCircle = function () {
        var x = 100;
        var y = 100;
        var r = 100;
        for (var i = 0; i < 360; i++) {
            this.context2d.save();
            this.context2d.translate(x, y);
            this.context2d.rotate(i / 180 * Math.PI - Math.PI / 2);
            this.context2d.beginPath();
            this.context2d.fillStyle = ColorTool.makeColorByH(i);
            this.context2d.arc(0, 0, r, 0, Math.PI / 180);
            this.context2d.lineTo(0, 0);
            this.context2d.fill();
            this.context2d.closePath();
            this.context2d.restore();
        }
    };
    return HueCircle;
}());
new HueCircle();
//# sourceMappingURL=HueCircle.js.map