/**
 * Created by plter on 2/3/16.
 */
var plter;
(function (plter) {
    var Main = (function () {
        function Main() {
            this.context = document.getElementById("canvas").getContext("2d");
            this.createInvisibleCanvasContext();
            this.loadImage();
        }
        Main.prototype.createInvisibleCanvasContext = function () {
            var tmpCanvas = document.createElement("canvas");
            tmpCanvas.width = 800;
            tmpCanvas.height = 600;
            this.invisibleCanvasContext = tmpCanvas.getContext("2d");
        };
        Main.prototype.loadImage = function () {
            var img = new Image();
            img.onload = function () {
                this.context.drawImage(img, 0, 0);
                this.context.putImageData(this.translateToBlackAndWhite(this.getImageDataFromImage(img)), 300, 0);
                this.context.putImageData(this.translateToRevertColor(this.getImageDataFromImage(img)), 600, 0);
            }.bind(this);
            img.src = "img.jpg";
        };
        Main.prototype.translateToBlackAndWhite = function (imageData) {
            var newImageData = this.context.createImageData(imageData.width, imageData.height);
            var m;
            for (var i = 0; i < imageData.data.length; i += 4) {
                m = (imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2]) / 3;
                newImageData.data[i] = m;
                newImageData.data[i + 1] = m;
                newImageData.data[i + 2] = m;
                newImageData.data[i + 3] = 255;
            }
            return newImageData;
        };
        Main.prototype.translateToRevertColor = function (imageData) {
            var newImageData = this.context.createImageData(imageData.width, imageData.height);
            var r, g, b, m;
            for (var i = 0; i < imageData.data.length; i += 4) {
                newImageData.data[i] = 255 - imageData.data[i];
                newImageData.data[i + 1] = 255 - imageData.data[i + 1];
                newImageData.data[i + 2] = 255 - imageData.data[i + 2];
                newImageData.data[i + 3] = 255;
            }
            return newImageData;
        };
        Main.prototype.getImageDataFromImage = function (img) {
            this.invisibleCanvasContext.drawImage(img, 0, 0);
            return this.invisibleCanvasContext.getImageData(0, 0, img.width, img.height);
        };
        return Main;
    })();
    plter.Main = Main;
})(plter || (plter = {}));
new plter.Main();
//# sourceMappingURL=Main.js.map