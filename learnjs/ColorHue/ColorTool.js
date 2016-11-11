/**
 * Created by plter on 6/8/16.
 */
var ColorTool = (function () {
    function ColorTool() {
    }
    ColorTool.formatToRadix16 = function (num) {
        return num < 16 ? "0" + num.toString(16) : num.toString(16);
    };
    ColorTool.makeColorByH = function (h) {
        h %= 360;
        var r = 0;
        var g = 0;
        var b = 0;
        if (h <= 60) {
            r = 255;
            g = 255 * h / 60;
        }
        else if (h <= 120) {
            r = 255 * (120 - h) / 60;
            g = 255;
        }
        else if (h <= 180) {
            g = 255;
            b = 255 * (h - 120) / 60;
        }
        else if (h <= 240) {
            g = 255 * (240 - h) / 60;
            b = 255;
        }
        else if (h <= 300) {
            b = 255;
            r = 255 * (h - 240) / 60;
        }
        else {
            b = 255 * (360 - h) / 60;
            r = 255;
        }
        r = Math.round(r);
        g = Math.round(g);
        b = Math.round(b);
        return "#" + this.formatToRadix16(r) + this.formatToRadix16(g) + this.formatToRadix16(b);
    };
    return ColorTool;
}());
//# sourceMappingURL=ColorTool.js.map