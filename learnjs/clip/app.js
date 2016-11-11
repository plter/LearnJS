/**
 * Created by plter on 6/20/16.
 */

(function () {

    function Main() {
        Promise.all([new Promise(function (suc, fail) {
            this._img = new Image();
            this._img.onload = suc;
            this._img.onerror = fail;
            this._img.src = "image.jpg";
        }.bind(this))]).then(function (result) {
            this.imageLoaded();
        }.bind(this)).catch(function (error) {
            console.log(error);
        });
    }

    Main.prototype.imageLoaded = function () {
        /**
         *
         * @type {HTMLCanvasElement}
         * @private
         */
        this._canvas = document.createElement("canvas");
        this._canvas.width = 550;
        this._canvas.height = 400;
        document.body.appendChild(this._canvas);

        this._context2d = this._canvas.getContext("2d");

        this.draw();
    };


    Main.prototype.draw = function () {

        this._context2d.drawImage(this._img, 0, 0);

        // this._context2d.save();
        // this._context2d.beginPath();
        // this._context2d.arc(100, 100, 50, 0, Math.PI * 2);
        // this._context2d.closePath();
        // this._context2d.clip();
        // this._context2d.fillRect(0, 0, this._canvas.width, this._canvas.height);
        // this._context2d.restore();

        this._context2d.save();
        this._context2d.globalAlpha = 0.95;
        this._context2d.fillStyle = "#ffffff";
        this._context2d.rect(0, 0, this._canvas.width, this._canvas.height);
        this._context2d.arc(100, 100, 50, 0, Math.PI * 2);
        this._context2d.fill("evenodd");
        this._context2d.restore();
    };

    new Main();
})();