/**
 * Created by plter on 2/3/16.
 */
var plter;
(function (plter) {
    var Main = (function () {
        function Main() {
            this.context = document.getElementById("canvas").getContext("2d");
            this.fillRandom();
        }
        Main.prototype.fillRandom = function () {
            var imgData = this.context.createImageData(400, 300);
            var colorValue;
            //for (let i = 0; i < imgData.data.length; i += 4) {
            //    imgData.data[i] = 255 * Math.random();
            //    imgData.data[i + 1] = 255 * Math.random();
            //    imgData.data[i + 2] = 255 * Math.random();
            //    imgData.data[i + 3] = 255;
            //}
            for (var i = 0; i < imgData.data.length; i += 4) {
                colorValue = Math.floor(256 * Math.random());
                imgData.data[i] = colorValue;
                imgData.data[i + 1] = colorValue;
                imgData.data[i + 2] = colorValue;
                imgData.data[i + 3] = 255;
            }
            this.context.putImageData(imgData, 0, 0);
        };
        return Main;
    })();
    plter.Main = Main;
})(plter || (plter = {}));
new plter.Main();
//# sourceMappingURL=Main.js.map