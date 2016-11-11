Array.prototype.remove=function(obj){
	for ( var i = 0; i < this.length; i++) {
		if(this[i]==obj){
			this.splice(i, 1);
			break;
		}
	}
};



var STAGE_HEIGHT=400;
var STAGE_WIDTH=550;
var DIR_LEFT=1;
var DIR_RIGHT=2;
var DIR_NONE=0;
var currentDir=0;
var gunSpeed=5;
var planesArr=[];

var cjs = createjs;

var stage = new cjs.Stage($('#gameView')[0]);
cjs.Ticker.setFPS(50);
cjs.Ticker.addListener(stage);

//add bg
var bg = new lib.Background();
stage.addChild(bg);

//add gun
var gun = new lib.AAGun();
stage.addChild(gun);
gun.y=350;
gun.x=275;

function gun_tickHandler(){
	if (currentDir==DIR_LEFT) {
		gun.x-=gunSpeed;
		
		if(gun.x<0){
			gun.x=0;
		}
	}else if(currentDir==DIR_RIGHT){
		gun.x+=gunSpeed;
		
		if(gun.x>STAGE_WIDTH){
			gun.x=STAGE_WIDTH;
		}
	}
}


function addBullet(){
	var b = new PBullet();
	b.x=gun.x;
	b.y=350;
	stage.addChild(b);
}

var addPlaneTimerId=0;
function startAddPlane(){
	if(addPlaneTimerId==0){
		addPlaneTimerId=setInterval(addPlane, 2000);
	}
}

function stopAddPlane(){
	if(addPlaneTimerId!=0){
		clearInterval(addPlaneTimerId);
		addPlaneTimerId=0;
	}
}

function addPlane(){
	var p = new Plane();
	stage.addChild(p);
	planesArr.push(p);
}

startAddPlane();

//add listeners
$(document).keydown(function(event){
	if(event.keyCode==37){
		currentDir = DIR_LEFT;
		gun.onTick=gun_tickHandler;
	}else if(event.keyCode==39){
		currentDir=DIR_RIGHT;
		gun.onTick=gun_tickHandler;
	}else if(event.keyCode==32){
		addBullet();
	}
});
$(document).keyup(function(event){
	gun.onTick=null;
	currentDir=DIR_NONE;
});