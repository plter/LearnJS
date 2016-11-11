/**
 * Created by plter on 10/29/14.
 */

var canvas, stage, exportRoot,txt;

function init() {
    canvas = document.getElementById("canvas");
    images = images||{};

    var loader = new createjs.LoadQueue(false);
    loader.addEventListener("fileload", handleFileLoad);
    loader.addEventListener("complete", handleComplete);
    loader.loadManifest(lib.properties.manifest);
}

function handleFileLoad(evt) {
    if (evt.item.type == "image") { images[evt.item.id] = evt.result; }
}

function handleComplete() {

    stage = new createjs.Stage(canvas);
    createjs.Ticker.setFPS(lib.properties.fps);
    createjs.Ticker.addEventListener("tick", stage);

    resizeCanvasByWindow();
    startGame();
}

function resizeCanvasByWindow(){
    var gameCanvas = document.getElementById("canvas");

    gameCanvas.width = window.innerWidth;
    gameCanvas.height = window.innerHeight;
}


function getUrlParam(name){
    if(!window._____urlParams) {
        window._____urlParams = {};

        var startIndex = location.href.indexOf("?");

        if (startIndex > -1) {
            var paramsStr = location.href.substring(startIndex+1);
            var tokens = paramsStr.split("&");
            for (var i = 0; i < tokens.length; i++) {
                var kvArr = tokens[i].split("=");
                window._____urlParams[kvArr[0]] = kvArr[1];
            }
        }
    }
    var value = null;
    try{
        value = decodeURIComponent(window._____urlParams[name]);
    }catch (e){}
    if(value=="undefined"){
        value = null;
    }
    return value;
}

function startGame(){
    addFlowers();
    addText();

    var words = getUrlParam("words");
    if(!words){
        words = "给女神送花";
    }
    setText(words);
}

function setText(words){
    txt.text = words;
    document.title = words;

    var bounds = txt.getBounds();
    txt.x = (stage.canvas.width-bounds.width)/2;
    txt.y = (stage.canvas.height-bounds.height)/2;
}

function addText(){
    txt = new createjs.Text("","bold 14pt Arial","#ff00ff");
    stage.addChild(txt);
}

function addFlowers(){
    var c = new createjs.Container();
    stage.addChild(c);

    for(var i = 0;i<10;i++){
        var f = new lib.FlowersAnimClass();
        c.addChild(f);
        f.x = Math.random()*stage.canvas.width;
        f.y = Math.random()*stage.canvas.height;
    }
}

init();