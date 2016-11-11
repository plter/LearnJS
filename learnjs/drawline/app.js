/**
 * Created by plter on 6/27/16.
 */


(function () {

    var context = document.getElementById("canvas").getContext("2d");


    context.moveTo(100, 100);
    // context.lineTo(200, 200);
    context.quadraticCurveTo(150, 0, 200, 100);
    context.stroke();

})();