/**
 * Created by plter on 6/19/16.
 */

(function () {

    function App() {

        this._videoMetaLoaded = false;

        /**
         *
         * @type {HTMLCanvasElement}
         * @private
         */
        this._canvas = document.getElementById("canvas");
        this._context2d = this._canvas.getContext("2d");

        this._memoryCanvas = document.createElement("canvas");
        this._memoryCanvas.width = 1000;
        this._memoryCanvas.height = 800;
        this._memoryContext2d = this._memoryCanvas.getContext("2d");

        this.createVideo();

        this.render();
    }


    App.prototype.render = function () {

        if (this._videoMetaLoaded) {
            this._memoryContext2d.drawImage(this._video, 0, 0);

            /**
             *
             * @type {ImageData}
             */
            this._tmpImageData = this._memoryContext2d.getImageData(0, 0, this._video.videoWidth, this._video.videoHeight);
            for (var i = 0; i < this._tmpImageData.data.length; i += 4) {
                this._tmpPixelValue = (this._tmpImageData.data[i] + this._tmpImageData.data[i + 1] + this._tmpImageData.data[i + 2]) / 3;
                this._videoFrame.data[i] = this._tmpPixelValue;
                this._videoFrame.data[i + 1] = this._tmpPixelValue;
                this._videoFrame.data[i + 2] = this._tmpPixelValue;
                this._videoFrame.data[i + 3] = 255;
            }

            this._context2d.putImageData(this._tmpImageData, 0, 0);
            this._context2d.putImageData(this._videoFrame, this._video.videoWidth, 0);
        }

        requestAnimationFrame(this.render.bind(this));
    };

    App.prototype.createVideo = function () {
        /**
         *
         * @type {HTMLVideoElement}
         * @private
         */
        this._video = document.createElement("video");
        this._video.autoplay = true;
        this._video.src = "video.mp4";
        this._video.addEventListener("loadedmetadata", function (e) {
            //create video image
            this._videoFrame = this._context2d.createImageData(this._video.videoWidth, this._video.videoHeight);

            this._videoMetaLoaded = true;
        }.bind(this));
    };

    new App();
})();