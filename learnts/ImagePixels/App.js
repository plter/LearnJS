/**
 * Created by plter on 2/25/16.
 */
var plter;
(function (plter) {
    var ImageTool = (function () {
        function ImageTool() {
        }
        ImageTool.getImageCanvas = function () {
            if (!ImageTool.imgCanvas) {
                ImageTool.imgCanvas = document.createElement("canvas");
                ImageTool.imgCanvas.width = ImageTool.IMAGE_CANVAS_WIDTH;
                ImageTool.imgCanvas.height = ImageTool.IMAGE_CANVAS_HEIGHT;
            }
            return ImageTool.imgCanvas;
        };
        ImageTool.getImageCanvasContext2D = function () {
            if (!ImageTool.imgContext2D) {
                ImageTool.imgContext2D = ImageTool.getImageCanvas().getContext("2d");
            }
            return ImageTool.imgContext2D;
        };
        ImageTool.getImageData = function (img) {
            if (img.width > ImageTool.IMAGE_CANVAS_WIDTH || img.height > ImageTool.IMAGE_CANVAS_HEIGHT) {
                throw new Error("Image size too big");
            }
            var context2d = ImageTool.getImageCanvasContext2D();
            context2d.clearRect(0, 0, ImageTool.IMAGE_CANVAS_WIDTH, ImageTool.IMAGE_CANVAS_HEIGHT);
            context2d.drawImage(img, 0, 0, img.width, img.height);
            return context2d.getImageData(0, 0, img.width, img.height);
        };
        ImageTool.IMAGE_CANVAS_WIDTH = 2000;
        ImageTool.IMAGE_CANVAS_HEIGHT = 2000;
        return ImageTool;
    }());
    var Point = (function () {
        function Point(colorA, colorR, colorG, colorB, originalPositionX, originalPositionY) {
            this.colorA = 0;
            this.colorR = 0;
            this.colorG = 0;
            this.colorB = 0;
            this.positionX = 0;
            this.positionY = 0;
            this.index = 0;
            this.originalPositionX = 0;
            this.originalPositionY = 0;
            this.amplitudeX = 0;
            this.amplitudeY = 0;
            this.offsetX = 0;
            this.offsetY = 0;
            this.translateX = 100;
            this.translateY = 100;
            this.colorA = colorA;
            this.colorR = colorR;
            this.colorG = colorG;
            this.colorB = colorB;
            this.originalPositionX = originalPositionX;
            this.originalPositionY = originalPositionY;
            this.positionX = originalPositionX + this.translateX;
            this.positionY = originalPositionY + this.translateY;
            this.reRandAmplitude();
            this.syncIndex();
        }
        Point.moveTimeline = function () {
            if (!Point.timeStopped) {
                Point.timeLine += 0.05;
                //stop time and restart ofter a random delay
                if (Math.abs(Point.timeLine % (Math.PI * 2)) < 0.03) {
                    Point.timeStopped = true;
                    //reset time
                    Point.timeLine = 0;
                    setTimeout(function () {
                        Point.timeStopped = false;
                    }, Math.round(Math.random() * 5000) + 1000);
                }
            }
            //console.log(Math.abs(Point.timeLine % (Math.PI * 2)));
        };
        Point.prototype.reRandAmplitude = function () {
            this.amplitudeX = Math.random() * 200 - 100;
            this.amplitudeY = Math.random() * 200 - 100;
        };
        Point.prototype.syncIndex = function () {
            this.index = (this.positionX + this.positionY * App.CANVAS_WIDTH) * 4;
        };
        Point.prototype.move = function () {
            this.offsetX = Math.round(this.amplitudeX * Math.sin(Point.timeLine));
            this.offsetY = Math.round(this.amplitudeY * Math.sin(Point.timeLine));
            this.positionX = this.originalPositionX + this.offsetX + 100;
            this.positionY = this.originalPositionY + this.offsetY + 100;
            this.syncIndex();
        };
        Point.timeLine = 0;
        Point.timeStopped = false;
        return Point;
    }());
    var App = (function () {
        function App() {
            this.points = [];
            this.frameIndex = 0;
            this.lastTime = 0;
            this.currentFrameDeday = 0;
            this.divFrameRate = document.getElementById("div_frame_rate");
            this.canvas = document.getElementById("canvas");
            this.canvas.width = App.CANVAS_WIDTH;
            this.canvas.height = App.CANVAS_HEIGHT;
            this.context = this.canvas.getContext("2d");
            //create canvas image data
            this.canvasImageData = new ImageData(App.CANVAS_WIDTH, App.CANVAS_HEIGHT);
            this.render();
            this.loadImage();
        }
        App.getInstance = function () {
            if (!App.__ins) {
                App.__ins = new App();
            }
            return App.__ins;
        };
        App.prototype.render = function () {
            Point.moveTimeline();
            this.frameIndex++;
            //get the frame rate
            if (this.frameIndex % 30 == 0) {
                this.divFrameRate.innerHTML = (1000 / this.currentFrameDeday) + "fps";
            }
            //calculate the frame delay
            var currentTime = new Date().getTime();
            if (this.lastTime != 0) {
                this.currentFrameDeday = currentTime - this.lastTime;
                this.lastTime = currentTime;
            }
            else {
                this.lastTime = currentTime;
            }
            this.movePoints();
            this.buildCanvasImageData();
            this.context.putImageData(this.canvasImageData, 0, 0);
            requestAnimationFrame(this.render.bind(this));
        };
        App.prototype.loadImage = function () {
            var img = document.createElement("img");
            img.onload = function () {
                var id = ImageTool.getImageData(img);
                var pixelPosition;
                var imgWidth = img.width;
                for (var i = 0; i < id.data.length; i += 4) {
                    pixelPosition = i / 4;
                    this.points.push(new Point(255, id.data[i], id.data[i + 1], id.data[i + 2], pixelPosition % imgWidth, Math.floor(pixelPosition / imgWidth)));
                }
            }.bind(this);
            img.src = "img.jpg";
        };
        App.prototype.buildCanvasImageData = function () {
            var p;
            for (var i = 0; i < this.canvasImageData.data.length; i += 4) {
                this.canvasImageData.data[i] = 255;
                this.canvasImageData.data[i + 1] = 255;
                this.canvasImageData.data[i + 2] = 255;
                this.canvasImageData.data[i + 3] = 255;
            }
            for (var k in this.points) {
                p = this.points[k];
                this.canvasImageData.data[p.index] = p.colorR;
                this.canvasImageData.data[p.index + 1] = p.colorG;
                this.canvasImageData.data[p.index + 2] = p.colorB;
                this.canvasImageData.data[p.index + 3] = p.colorA;
            }
        };
        App.prototype.movePoints = function () {
            for (var k in this.points) {
                this.points[k].move();
            }
        };
        App.CANVAS_WIDTH = 600;
        App.CANVAS_HEIGHT = 450;
        return App;
    }());
    plter.App = App;
})(plter || (plter = {}));
plter.App.getInstance();
//# sourceMappingURL=App.js.map