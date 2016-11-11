/**
 * Created by plter on 7/9/16.
 */

(function () {

    function Main() {
        this._video = document.getElementById("video");

        this.connectScreen();
    }

    var p = Main.prototype;

    p.connectScreen = function () {
        navigator.webkitGetUserMedia({
            video: {
                mandatory: {
                    chromeMediaSource: "screen"
                }
            }
        }, function (stream) {
            this._video.src = URL.createObjectURL(stream);
        }.bind(this), function (error) {
            console.error(error);
        });
    };

    new Main();
})();