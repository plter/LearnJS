/**
 * Created by plter on 6/18/16.
 */

(function () {

    var audio = document.getElementById("_audio");

    setInterval(function () {
        console.log(audio.currentTime, audio);
    }, 1000);

})();