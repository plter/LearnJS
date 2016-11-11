/**
 * Created by plter on 6/19/16.
 */


(function () {

    function Index() {
        this._canvas = document.getElementById("canvas");
        /**
         *
         * @type {CanvasRenderingContext2D}
         * @private
         */
        this._context2d = this._canvas.getContext("2d");

        // this.drawLine();
        // this.drawCircle();
        this.drawImage();
    }


    Index.prototype.drawLine = function () {
        this._context2d.moveTo(100, 100);
        this._context2d.lineTo(200, 200);
        this._context2d.lineTo(200, 100);
        this._context2d.stroke();
    };

    Index.prototype.drawCircle = function () {
        this._context2d.fillStyle = "#cccccc";
        this._context2d.beginPath();
        this._context2d.arc(100, 100, 50, 0, Math.PI);
        this._context2d.closePath();
        this._context2d.fill();
        this._context2d.stroke();
    };

    Index.prototype.drawImage = function () {
        /**
         *
         * @type {HTMLImageElement}
         */
        var img = document.createElement("img");
        img.onload = function () {

            //clip
            this._context2d.save();
            this._context2d.beginPath();
            this._context2d.arc(200, 100, 100, 0, Math.PI * 2);
            this._context2d.closePath();
            this._context2d.clip();
            //
            this._context2d.drawImage(img, 0, 0);
            this._context2d.restore();

            this.drawCircle();

            // this._context2d.clearRect(50,50,100,100);


        }.bind(this);
        img.src = "image.png";
    };


    new Index();
})();