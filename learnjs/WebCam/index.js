/**
 * Created by plter on 6/21/16.
 */

(function () {

    var video, btnSnap, canvas, context2d;

    navigator.getMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);

    function init() {
        canvas = document.querySelector("#canvas");
        context2d = canvas.getContext("2d");

        video = document.querySelector("#video");

        navigator.getMedia({video: true}, function (stream) {
            video.src = window.URL.createObjectURL(stream);
            video.play();
        }, function (err) {
            console.error(err);
        });

        btnSnap = document.querySelector("#btn-snap");
        btnSnap.onclick = function () {
            context2d.drawImage(video, 0, 0, 400, 300);
        };
    }

    init();

})();