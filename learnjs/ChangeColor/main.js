/**
 * Created by plter on 8/20/16.
 */

(function () {

    var start = 0xff0000;
    var end = 0x00ff00;
    var frames = 60;
    var frameIndex = 0;
    var color = start;
    var speedRed = (getRedChannel(end) - getRedChannel(start)) / frames;
    var speedGreen = (getGreenChannel(end) - getGreenChannel(start)) / frames;
    var speedBlue = (getBlueChannel(end) - getBlueChannel(start)) / frames;
    var greenChannel = getGreenChannel(start);
    var redChannel = getRedChannel(start);
    var blueChannel = getBlueChannel(start);

    function getColorString(red, green, blue) {
        return "rgb(" +
            Math.round(redChannel) + "," +
            Math.round(greenChannel) + "," +
            Math.round(blueChannel) + ")";
    }

    var div = document.createElement("div");
    div.style.width = "200px";
    div.style.height = "200px";
    div.style.backgroundColor = getColorString(getRedChannel(start), getGreenChannel(start), getBlueChannel(start));
    document.body.appendChild(div);

    function getRedChannel(color) {
        return (color & 0xff0000) >> 16;
    }

    function getGreenChannel(color) {
        return (color & 0x00ff00) >> 8;
    }

    function getBlueChannel(color) {
        return color & 0x0000ff;
    }

    function runAnimation() {
        frameIndex++;
        if (frameIndex <= frames) {
            requestAnimationFrame(runAnimation);
        } else {
            color = end;
            blueChannel = getBlueChannel(end);
            redChannel = getRedChannel(end);
            greenChannel = getGreenChannel(end);
        }

        var colorString = getColorString(redChannel, greenChannel, blueChannel);
        div.style.backgroundColor = colorString;

        console.log(frameIndex, colorString);

        blueChannel += speedBlue;
        redChannel += speedRed;
        greenChannel += speedGreen;
    }

    div.onclick = runAnimation;

})();