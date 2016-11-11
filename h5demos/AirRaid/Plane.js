function Plane(){
	lib.Airplane.call(this);
	
	this.gotoAndStop(parseInt(Math.random()*5));
	this.onTick=this._tick_handler;
	
	this.y = Math.random()*50+25;
	this.speedX = (Math.random()*5+2)*(Math.random()>=0.5?1:-1);
	if(this.speedX<0){
		this.scaleX=1;
		this.x=STAGE_WIDTH+100;
	}else{
		this.scaleX=-1;
		this.x=-100;
	}
}
Plane.prototype = new lib.Airplane();
Plane.prototype._tick_handler=function(){
	this.x+=this.speedX;
	
	if(this.x<-100||this.x>STAGE_WIDTH+100){
		this.removeSelf();
	}
};

Plane.prototype.removeSelf=function(){
	if(this.parent){
		planesArr.remove(this);
		
		this.parent.removeChild(this);
		this.onTick=null;
	}
};

Plane.prototype.removeSelfWithEffect=function(){
	if(this.parent){
		planesArr.remove(this);
		this.onTick=null;
		
		this.gotoAndPlay("explode");
	}
};