Array.prototype.remove=function(obj){
	for ( var i = 0; i < this.length; i++) {
		if(this[i]==obj){
			this.splice(i, 1);
			return obj;
		}
	}
	return null;
};



var cjs = createjs;
var stage = new cjs.Stage(document.getElementById("gameView"));
cjs.Ticker.setFPS(60);
cjs.Ticker.addListener(stage);

//var c;
//for ( var i = 0; i < 10; i++) {
//	c = new Card(parseInt(Math.random()*18)+1);
//	c.y=Card.HEIGHT/2;
//	c.x=Card.WIDTH/2+(Card.WIDTH+5)*i;
//	c.onClick=cardClickHandler;
//	stage.addChild(c);
//}
//
//
//function cardClickHandler(event){
//	
//	/**
//	 * @type Card
//	 */
//	var c = event.target;
//	if(c.rectoVisible){
//		c.turnToVerso();
//	}else{
//		c.turnToRecto();
//	}
//};


var cardsArr=[];
var cardsContainer = new cjs.Container();
cardsContainer.x = 100;
cardsContainer.y=30;
stage.addChild(cardsContainer);

/**
 * @type Card
 */
var card;
var gameStarted=false;

/**
 * @type Card
 */
var currentSelectedCard=null;
/**
 * @type Card
 */
var lastSelectedCard=null;

//add cards
function addCards(){
	
	cardsContainer.removeAllChildren();
	cardsArr.length=0;

	for(var i =1;i<=18;i++){
		card = new Card(i);
		cardsArr.push(card);
		cardsContainer.addChild(card);
		card = new Card(i);
		cardsArr.push(card);
		cardsContainer.addChild(card);
	}
	
	
	for(var a=0;a<30;a++){
		cardsArr.splice(parseInt(Math.random()*cardsArr.length), 0, cardsArr.splice(parseInt(Math.random()*cardsArr.length),1)[0]);
	}
	

	//reset position
	for ( var j = 0; j < cardsArr.length; j++) {
		card = cardsArr[j];
		card.x=Card.WIDTH/2+(Card.WIDTH+5)*(j%6);
		card.y=Card.HEIGHT/2+(Card.HEIGHT+5)*(parseInt(j/6));
		card.onClick=cardClickHandler;
	}
}

function cardClickHandler(event){
	if(!gameStarted){
		return;
	}
	
	currentSelectedCard = event.target;
	if(lastSelectedCard!=null){
		if(currentSelectedCard.frameIndex==lastSelectedCard.frameIndex){
			cardsContainer.removeChild(currentSelectedCard);
			cardsContainer.removeChild(lastSelectedCard);
			cardsArr.remove(currentSelectedCard);
			cardsArr.remove(lastSelectedCard);
			currentSelectedCard=null;
			lastSelectedCard=null;
			
			if(cardsArr.length<=0){
				alert("成功了");
			}
		}else{
			currentSelectedCard.turnToRecto();
			setTimeout(turnTwoCardsOver, 2000,currentSelectedCard,lastSelectedCard);
			
			currentSelectedCard=null;
			lastSelectedCard=null;
		}
	}else{
		lastSelectedCard=currentSelectedCard;
		currentSelectedCard.turnToRecto();
	}
}

/**
 * 
 * @param card1	{Card}
 * @param card2	{Card}
 */
function turnTwoCardsOver(card1,card2){
	card1.turnToVerso();
	card2.turnToVerso();
}


function turnAllCardsOver(){
	for ( var i = 0; i < cardsArr.length; i++) {
		card=cardsArr[i];
		card.turnToVerso();
	}
	gameStarted=true;
}

function restartGame(){
	gameStarted=false;
	addCards();
	
	setTimeout(turnAllCardsOver, 3000);
}








//actions
restartGame();
