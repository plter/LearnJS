///<reference path="ColorTool.ts"/>
/**
 * Created by plter on 6/7/16.
 */
var Main = (function () {
    function Main() {
        this.WIDTH = 550;
        this.HEIGHT = 400;
        this.colorH = 0;
        this.msgContainer = document.createElement('div');
        document.body.appendChild(this.msgContainer);
        this.canvas = document.createElement('canvas');
        this.canvas.width = this.WIDTH;
        this.canvas.height = this.HEIGHT;
        document.body.appendChild(this.canvas);
        this.context2d = this.canvas.getContext('2d');
        this.render();
    }
    Main.prototype.render = function () {
        var color = ColorTool.makeColorByH(this.colorH);
        this.context2d.save();
        this.context2d.fillStyle = color;
        this.context2d.fillRect(0, 0, this.WIDTH, this.HEIGHT);
        this.context2d.restore();
        this.colorH += 0.6;
        this.msgContainer.innerHTML = "颜色:<span style='width: 100px;display: inline-block;'>" + color + "</span>" + "色相:" + Math.round(this.colorH % 360);
        requestAnimationFrame(this.render.bind(this));
    };
    return Main;
}());
new Main();
//# sourceMappingURL=main.js.map