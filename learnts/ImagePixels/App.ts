/**
 * Created by plter on 2/25/16.
 */

namespace plter {

    class ImageTool {

        private static imgCanvas:HTMLCanvasElement;
        private static imgContext2D:CanvasRenderingContext2D;
        private static IMAGE_CANVAS_WIDTH = 2000;
        private static IMAGE_CANVAS_HEIGHT = 2000;

        static getImageCanvas():HTMLCanvasElement {
            if (!ImageTool.imgCanvas) {
                ImageTool.imgCanvas = document.createElement("canvas");
                ImageTool.imgCanvas.width = ImageTool.IMAGE_CANVAS_WIDTH;
                ImageTool.imgCanvas.height = ImageTool.IMAGE_CANVAS_HEIGHT;
            }
            return ImageTool.imgCanvas;
        }

        static getImageCanvasContext2D():CanvasRenderingContext2D {
            if (!ImageTool.imgContext2D) {
                ImageTool.imgContext2D = ImageTool.getImageCanvas().getContext("2d");
            }
            return ImageTool.imgContext2D;
        }

        static getImageData(img:HTMLImageElement):ImageData {
            if (img.width > ImageTool.IMAGE_CANVAS_WIDTH || img.height > ImageTool.IMAGE_CANVAS_HEIGHT) {
                throw new Error("Image size too big");
            }

            var context2d:CanvasRenderingContext2D = ImageTool.getImageCanvasContext2D();
            context2d.clearRect(0, 0, ImageTool.IMAGE_CANVAS_WIDTH, ImageTool.IMAGE_CANVAS_HEIGHT);
            context2d.drawImage(img, 0, 0, img.width, img.height);
            return context2d.getImageData(0, 0, img.width, img.height);
        }
    }


    class Point {

        colorA = 0;
        colorR = 0;
        colorG = 0;
        colorB = 0;
        positionX = 0;
        positionY = 0;
        index = 0;
        originalPositionX = 0;
        originalPositionY = 0;
        static timeLine:number = 0;
        amplitudeX:number = 0;
        amplitudeY:number = 0;
        offsetX:number = 0;
        offsetY:number = 0;
        translateX = 100;
        translateY = 100;
        static timeStopped = false;

        static moveTimeline() {
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
        }

        constructor(colorA:number, colorR:number, colorG:number, colorB:number, originalPositionX:number, originalPositionY:number) {
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

        reRandAmplitude(){
            this.amplitudeX = Math.random() * 200 - 100;
            this.amplitudeY = Math.random() * 200 - 100;
        }

        syncIndex() {
            this.index = (this.positionX + this.positionY * App.CANVAS_WIDTH) * 4;
        }

        public move() {

            this.offsetX = Math.round(this.amplitudeX * Math.sin(Point.timeLine));
            this.offsetY = Math.round(this.amplitudeY * Math.sin(Point.timeLine));

            this.positionX = this.originalPositionX + this.offsetX + 100;
            this.positionY = this.originalPositionY + this.offsetY + 100;

            this.syncIndex();
        }
    }

    export class App {

        canvas:HTMLCanvasElement;
        context:CanvasRenderingContext2D;
        canvasImageData:ImageData;
        points:Array<Point> = [];
        frameIndex = 0;
        lastTime:number = 0;
        currentFrameDeday = 0;
        divFrameRate:HTMLDivElement;

        static CANVAS_WIDTH = 600;
        static CANVAS_HEIGHT = 450;

        private static __ins:App;

        static getInstance(){
            if(!App.__ins){
                App.__ins = new App();
            }
            return App.__ins;
        }


        constructor() {
            this.divFrameRate = document.getElementById("div_frame_rate") as HTMLDivElement;

            this.canvas = document.getElementById("canvas") as HTMLCanvasElement;
            this.canvas.width = App.CANVAS_WIDTH;
            this.canvas.height = App.CANVAS_HEIGHT;
            this.context = this.canvas.getContext("2d");

            //create canvas image data
            this.canvasImageData = new ImageData(App.CANVAS_WIDTH, App.CANVAS_HEIGHT);

            this.render();

            this.loadImage();
        }


        render() {

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
            } else {
                this.lastTime = currentTime;
            }

            this.movePoints();

            this.buildCanvasImageData();
            this.context.putImageData(this.canvasImageData, 0, 0);

            requestAnimationFrame(this.render.bind(this));
        }

        private loadImage():void {
            var img:HTMLImageElement = document.createElement("img") as HTMLImageElement;
            img.onload = function () {
                var id:ImageData = ImageTool.getImageData(img);
                var pixelPosition:number;
                var imgWidth:number = img.width;

                for (var i = 0; i < id.data.length; i += 4) {
                    pixelPosition = i / 4;
                    this.points.push(new Point(255, id.data[i], id.data[i + 1], id.data[i + 2], pixelPosition % imgWidth, Math.floor(pixelPosition / imgWidth)));
                }
            }.bind(this);
            img.src = "img.jpg";
        }

        private buildCanvasImageData() {
            var p:Point;

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
        }

        private movePoints():void {
            for (var k in this.points) {
                this.points[k].move();
            }
        }
    }
}


plter.App.getInstance();