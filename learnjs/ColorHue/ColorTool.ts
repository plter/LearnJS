/**
 * Created by plter on 6/8/16.
 */
class ColorTool{
    static formatToRadix16(num:number):String {
        return num < 16 ? "0" + num.toString(16) : num.toString(16);
    }

    static makeColorByH(h):string {
        h %= 360;

        var r:number = 0;
        var g:number = 0;
        var b:number = 0;

        if (h <= 60) {
            r = 255;
            g = 255 * h / 60;
        } else if (h <= 120) {
            r = 255 * (120 - h) / 60;
            g = 255;
        } else if (h <= 180) {
            g = 255;
            b = 255 * (h - 120) / 60;
        } else if (h <= 240) {
            g = 255 * (240 - h) / 60;
            b = 255;
        } else if (h <= 300) {
            b = 255;
            r = 255 * (h - 240) / 60;
        } else {
            b = 255 * (360 - h) / 60;
            r = 255;
        }

        r = Math.round(r);
        g = Math.round(g);
        b = Math.round(b);

        return "#" + this.formatToRadix16(r) + this.formatToRadix16(g) + this.formatToRadix16(b);
    }
}