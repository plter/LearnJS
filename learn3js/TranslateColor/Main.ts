/**
 * Created by plter on 2/3/16.
 */

namespace plter {
    export class Main {

        private context:CanvasRenderingContext2D;
        private invisibleCanvasContext;

        constructor() {
            this.context = (document.getElementById("canvas") as HTMLCanvasElement).getContext("2d");
            this.createInvisibleCanvasContext();

            this.loadImage();
        }

        private createInvisibleCanvasContext() {
            let tmpCanvas = document.createElement("canvas");
            tmpCanvas.width = 800;
            tmpCanvas.height = 600;
            this.invisibleCanvasContext = tmpCanvas.getContext("2d");
        }

        private loadImage() {
            let img = new Image();
            img.onload = function () {
                this.context.drawImage(img, 0, 0);
                this.context.putImageData(this.translateToBlackAndWhite(this.getImageDataFromImage(img)), 300, 0);
                this.context.putImageData(this.translateToRevertColor(this.getImageDataFromImage(img)), 600, 0);
            }.bind(this);
            img.src = "img.jpg";
        }

        private translateToBlackAndWhite(imageData:ImageData):ImageData {
            let newImageData:ImageData = this.context.createImageData(imageData.width, imageData.height);

            let m;
            for (let i = 0; i < imageData.data.length; i += 4) {
                m = (imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2]) / 3;
                newImageData.data[i] = m;
                newImageData.data[i + 1] = m;
                newImageData.data[i + 2] = m;
                newImageData.data[i + 3] = 255;
            }

            return newImageData;
        }

        private translateToRevertColor(imageData:ImageData):ImageData {
            let newImageData:ImageData = this.context.createImageData(imageData.width, imageData.height);

            let r, g, b, m;
            for (let i = 0; i < imageData.data.length; i += 4) {
                newImageData.data[i] = 255 - imageData.data[i];
                newImageData.data[i + 1] = 255 - imageData.data[i + 1];
                newImageData.data[i + 2] = 255 - imageData.data[i + 2];
                newImageData.data[i + 3] = 255;
            }

            return newImageData;
        }

        private getImageDataFromImage(img:HTMLImageElement):ImageData {
            this.invisibleCanvasContext.drawImage(img, 0, 0);
            return this.invisibleCanvasContext.getImageData(0, 0, img.width, img.height);
        }
    }
}


new plter.Main();