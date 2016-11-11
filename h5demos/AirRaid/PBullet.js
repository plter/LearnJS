function PBullet(){
	lib.Bullet.call(this);
	
	this._speedY=-5;
	this.onTick=this._tick_handler;
}
PBullet.prototype = new lib.Bullet();
PBullet.prototype._tick_handler=function(){
	this.y+=this._speedY;
	
	if(this.y<0&&this.parent!=null){
		this.removeSelf();
	}
	
	/**
	 * @type Plane
	 */
	var p;
	var point;
	for ( var i = 0; i < planesArr.length; i++) {
		p=planesArr[i];
		point = this.localToLocal(0,0,p);
		
		if(p.hitTest(point.x,point.y)){
			this.removeSelf();
			p.removeSelfWithEffect();
			planesArr.remove(p);
			break;
		}
	}
};

PBullet.prototype.removeSelf=function(){
	if(this.parent){
		this.parent.removeChild(this);
		this.onTick=null;
	}
};