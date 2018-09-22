class player{
	constructor(id, color="teal"){
		this.id = id;
		this.color = color;
		
		this.spaceOptions = {'canBuy':false};
		this.money = 1500;
		this.jailed = false;
		this.jailedTurns = 0;
		this.getOutOfJail = false;
		
		this.side = 0;
		this.speed = 10;
		this.sideGoingTo = 0;
		this.space = 0;		
		this.preRolledSpace = 0;		
		this.waypoints = [false,false,false,false];
		this.position={x:0,y:(20 * this.id)};
		this.pos={
			at:{
				x:0,
				y:(20 * this.id)
			},
			to:{
				x:0,
				y:(20 * this.id)
			}
		};
		
		this.doublesRolled = 0;
		
		this.engine = Random.engines.mt19937().autoSeed();
		
		this.srcImg = [
			'images/players/car.png',
			'images/players/hat.png',
			'images/players/iron.png',
			'images/players/wheel.png'
		];
		this.img = new Image();
		this.img.src = this.srcImg[this.id];
	}
	gotoJail(){
		log('Go To Jail player:' + this.id,'bad');
		this.jailed = true;
		this.jailedTurns = 0;			
		this.space = 10;		
	}	
	update(){
 		if(this.pos.at.x != this.pos.to.x || this.pos.at.y != this.pos.to.y){
			this.axisPriority();
		}		
	}

	axisPriority(){
		var sideToUse = 0;
		if(this.side != this.sideGoingTo){
			sideToUse = this.side;
		}else{
			sideToUse = this.sideGoingTo;
		}
		
		if(sideToUse == 0 || sideToUse == 2){
			if(this.pos.at.x !=this.pos.to.x){
				this.pos.at.x += this.dir(this.pos.at.x, this.pos.to.x);
			}else{
				this.pos.at.y += this.dir(this.pos.at.y, this.pos.to.y);
			}
			
		}else if(sideToUse == 1 || sideToUse == 3){
			if(this.pos.at.y !=this.pos.to.y){
				this.pos.at.y += this.dir(this.pos.at.y, this.pos.to.y);
			}else{
				this.pos.at.x += this.dir(this.pos.at.x, this.pos.to.x);
			}		
		}		
	}
	whatSide(space){
		if(space >= 0 && space <= 10){
			return 0;
		}else if(space >= 11 && space <= 20){
			return 1;
		}else if(space >= 21 && space <= 30){
			return 2;
		}else if(space >= 31 && space <= 39){
			return 3;
 		}		
	}	
	dir(at, to){
		if(at != to){
			if(at < to){
				return (this.speed);
			}else{
				return (-1*this.speed);
			}
		}else{
			return 0;
		}		
	}	
	draw(canvas){
		this.update();
		canvas.drawImage(this.img, this.pos.at.x, this.pos.at.y);
	}
	//this function is only called when the player presses the roll function
	rollAction(rolled){
		this.preRolledSpace = this.space;
		this.side = this.whatSide(this.preRolledSpace);
		//this is only false when the player rolles 3 doubles
		if(!rolled){
			//this is jail
			this.space=10;
		}else{
			this.space+=rolled[0]+rolled[1];
		}
		//income tax 
		if(this.space == 4 ){
			this.money -= parseInt(this.money*.1);
			log('Income tax','bad');
		}
		//luxury tax
		if(this.space == 38 ){
			this.money -= 75;
			log('Luxury tax','bad');
		}
		//Chance
		if(this.space == 7 || this.space == 22|| this.space == 36){
			var results = cards['chance'][Random.integer(0, cards['chance'].length-1)(this.engine)](this);
			log(results.msg,results.type);
		}
		//Community Chest
		if(this.space == 2 || this.space == 17|| this.space == 33){
			var results = cards['chest'][Random.integer(0, cards['chance'].length-1)(this.engine)](this)
			log(results.msg,results.type);
		}
		//Jail
		if(this.space == 30 ){
			this.gotoJail();
		}	
		//Go
		if(this.space > 39 ){
			this.space = (rolled[0]+rolled[1]) - (40 - this.preRolledSpace);
			this.money+=200;
		}
		
		if(this.space >= 0 && this.space <= 10){
			this.sideGoingTo = 0;
			this.pos.to.x = (this.space+1)*50;
			this.pos.to.y = 0+(25 * this.id);
		}else if(this.space >= 11 && this.space <= 20){
			this.sideGoingTo = 1;
			this.pos.to.x = 625-(25 * this.id);
			this.pos.to.y = (this.space+1-10)*50;
		}else if(this.space >= 21 && this.space <= 30){
			this.sideGoingTo = 2;
			this.pos.to.x = 500 - ((this.space-1-20)*50);
			this.pos.to.y = 625-(25 * this.id);
		}else if(this.space >= 31 && this.space <= 39){
			this.sideGoingTo = 3;
			this.pos.to.x = 0+(25 * this.id);
			this.pos.to.y = 550 -((this.space-30)*50);
		}
		
		this.pos.to.x = this.pos.to.x - (this.pos.to.x % this.speed);
		this.pos.to.y = this.pos.to.y - (this.pos.to.y % this.speed);
	}
}