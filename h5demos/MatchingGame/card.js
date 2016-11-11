function Card(frameIndex){
	lib.Card10.call(this);
	
	//init properties
	this.frameIndex=frameIndex;
	this.rectoVisible=true;
	this._scaleSpeed=0.1;
	
	this.gotoAndStop(frameIndex);
}
Card.prototype=new lib.Card10();

Card.prototype.showRecto=function(){
	this.gotoAndStop(this.frameIndex);
	this.rectoVisible=true;
};

Card.prototype.showVerso=function(){
	this.gotoAndStop(0);
	this.rectoVisible=false;
};

Card.prototype.turnToRecto=function(){
	if(this.rectoVisible){
		return;
	}
	
	this.onTick=function(){
		this.scaleX-=this._scaleSpeed;
		if(this.scaleX<0){
			this.scaleX=0;
			this.showRecto();
			
			this.onTick=function(){
				this.scaleX+=this._scaleSpeed;
				if(this.scaleX>=1){
					this.scaleX=1;
					this.onTick=null;
				}
			};
		}
	};
};

Card.prototype.turnToVerso=function(){
	if(!this.rectoVisible){
		return;
	}
	
	this.onTick=function(){
		this.scaleX-=this._scaleSpeed;
		if(this.scaleX<0){
			this.scaleX=0;
			this.showVerso();
			
			this.onTick=function(){
				this.scaleX+=this._scaleSpeed;
				if(this.scaleX>=1){
					this.scaleX=1;
					this.onTick=null;
				}
			};
		}
	};
};

Card.WIDTH=50;
Card.HEIGHT=50;