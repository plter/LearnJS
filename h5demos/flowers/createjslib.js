(function (lib, img, cjs) {

var p; // shortcut to reference prototypes

// library properties:
lib.properties = {
	width: 550,
	height: 400,
	fps: 30,
	color: "#FFFFFF",
	manifest: [
		{src:"images/rose.png", id:"rose"}
	]
};

// stage content:
(lib.createjslib = function() {
	this.initialize();

}).prototype = p = new cjs.Container();
p.nominalBounds = null;


// symbols:
(lib.rose = function() {
	this.initialize(img.rose);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,48,48);


(lib.FlowerGraphic = function() {
	this.initialize();

	// Layer 1
	this.instance = new lib.rose();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,48,48);


(lib.RoseAnim = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.FlowerGraphic("synched",0);
	this.instance.setTransform(24,24,1,1,0,0,0,24,24);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({y:16.3,alpha:0.966},0).wait(1).to({y:8.6,alpha:0.931},0).wait(1).to({y:0.9,alpha:0.897},0).wait(1).to({y:-6.8,alpha:0.862},0).wait(1).to({y:-14.6,alpha:0.828},0).wait(1).to({y:-22.3,alpha:0.793},0).wait(1).to({y:-30,alpha:0.759},0).wait(1).to({y:-37.7,alpha:0.724},0).wait(1).to({y:-45.5,alpha:0.69},0).wait(1).to({y:-53.2,alpha:0.655},0).wait(1).to({y:-60.9,alpha:0.621},0).wait(1).to({y:-68.6,alpha:0.586},0).wait(1).to({y:-76.4,alpha:0.552},0).wait(1).to({y:-84.1,alpha:0.517},0).wait(1).to({y:-91.8,alpha:0.483},0).wait(1).to({y:-99.5,alpha:0.448},0).wait(1).to({y:-107.3,alpha:0.414},0).wait(1).to({y:-115,alpha:0.379},0).wait(1).to({y:-122.7,alpha:0.345},0).wait(1).to({y:-130.4,alpha:0.31},0).wait(1).to({y:-138.2,alpha:0.276},0).wait(1).to({y:-145.9,alpha:0.241},0).wait(1).to({y:-153.6,alpha:0.207},0).wait(1).to({y:-161.3,alpha:0.172},0).wait(1).to({y:-169,alpha:0.138},0).wait(1).to({y:-176.8,alpha:0.103},0).wait(1).to({y:-184.5,alpha:0.069},0).wait(1).to({y:-192.2,alpha:0.034},0).wait(1).to({y:-200,alpha:0},0).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-224,48,272);


(lib.FlowersAnimClass = function() {
	this.initialize();

	// Layer 1
	this.instance = new lib.RoseAnim();
	this.instance.setTransform(54.1,54.1,1,1,-15,0,0,25,48);

	this.instance_1 = new lib.RoseAnim();
	this.instance_1.setTransform(54,54.1,1,1,-30,0,0,24.9,48);

	this.instance_2 = new lib.RoseAnim();
	this.instance_2.setTransform(54,54.1,1,1,-45,0,0,24.9,48);

	this.instance_3 = new lib.RoseAnim();
	this.instance_3.setTransform(54,54.1,1,1,-60,0,0,24.9,48);

	this.instance_4 = new lib.RoseAnim();
	this.instance_4.setTransform(54.1,54.1,1,1,-75,0,0,24.9,48);

	this.instance_5 = new lib.RoseAnim();
	this.instance_5.setTransform(54.1,54.1,1,1,-90,0,0,24.9,48);

	this.instance_6 = new lib.RoseAnim();
	this.instance_6.setTransform(54.1,54.1,1,1,-105,0,0,25,48);

	this.instance_7 = new lib.RoseAnim();
	this.instance_7.setTransform(54.1,54.1,1,1,-120,0,0,24.9,48);

	this.instance_8 = new lib.RoseAnim();
	this.instance_8.setTransform(54.1,54.1,1,1,-135,0,0,24.9,48);

	this.instance_9 = new lib.RoseAnim();
	this.instance_9.setTransform(54.2,54.1,1,1,-150,0,0,24.9,48.1);

	this.instance_10 = new lib.RoseAnim();
	this.instance_10.setTransform(54.1,54.1,1,1,-165,0,0,24.9,48);

	this.instance_11 = new lib.RoseAnim();
	this.instance_11.setTransform(54.1,54.1,1,1,180,0,0,24.9,48);

	this.instance_12 = new lib.RoseAnim();
	this.instance_12.setTransform(54.1,54.1,1,1,165,0,0,25,48);

	this.instance_13 = new lib.RoseAnim();
	this.instance_13.setTransform(54.1,54,1,1,150,0,0,24.9,48.1);

	this.instance_14 = new lib.RoseAnim();
	this.instance_14.setTransform(54.1,54,1,1,135,0,0,24.9,48);

	this.instance_15 = new lib.RoseAnim();
	this.instance_15.setTransform(54.1,54,1,1,120,0,0,24.9,48.1);

	this.instance_16 = new lib.RoseAnim();
	this.instance_16.setTransform(54.1,54.1,1,1,105,0,0,24.9,48);

	this.instance_17 = new lib.RoseAnim();
	this.instance_17.setTransform(54.1,54,1,1,90,0,0,24.9,48);

	this.instance_18 = new lib.RoseAnim();
	this.instance_18.setTransform(54.1,54.1,1,1,75,0,0,25,48);

	this.instance_19 = new lib.RoseAnim();
	this.instance_19.setTransform(54,54.1,1,1,0,0,0,24.9,48);

	this.instance_20 = new lib.RoseAnim();
	this.instance_20.setTransform(54,54.1,1,1,60,0,0,24.9,48.1);

	this.instance_21 = new lib.RoseAnim();
	this.instance_21.setTransform(54,54,1,1,45,0,0,24.9,48);

	this.instance_22 = new lib.RoseAnim();
	this.instance_22.setTransform(54,54,1,1,30,0,0,24.9,48);

	this.instance_23 = new lib.RoseAnim();
	this.instance_23.setTransform(54.1,54.1,1,1,15,0,0,24.9,48);

	this.instance_24 = new lib.RoseAnim();
	this.instance_24.setTransform(54,54.1,1,1,0,0,0,24.9,48);

	this.addChild(this.instance_24,this.instance_23,this.instance_22,this.instance_21,this.instance_20,this.instance_19,this.instance_18,this.instance_17,this.instance_16,this.instance_15,this.instance_14,this.instance_13,this.instance_12,this.instance_11,this.instance_10,this.instance_9,this.instance_8,this.instance_7,this.instance_6,this.instance_5,this.instance_4,this.instance_3,this.instance_2,this.instance_1,this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,108.2,108.2);

})(lib = lib||{}, images = images||{}, createjs = createjs||{});
var lib, images, createjs;