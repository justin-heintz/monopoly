class playerManager{
	constructor(noPlayers){	
		this.players = []; 
		this.colors = ["yellow", "purple", "orange"];
		for(let i=0; i<noPlayers; i++){
			this.players.push ( new player(i,this.colors[i]));
		}		
		//dice numbers to calc rent on utilities + maybe later for chest and chance 
		this.currentDiceRoll=[];
		this.whosTurn = 0;
	}
	nextPlayer(rolled_doubles=false){
		if(!rolled_doubles){
			this.whosTurn++;

			if(this.whosTurn >= this.players.length){ 
				this.whosTurn = 0; 
			}
 
			this.drawDom();	
 
			//reset amount of doubles rolled
			this.players[this.whosTurn].doublesRolled = 0; 
	 
			if(this.players[this.whosTurn].jailed){	
				log('player '+ this.whosTurn +' in jail');
				this.players[this.whosTurn].jailedTurns++;
				
				if(this.players[this.whosTurn].jailedTurns >= 2 || this.players[this.whosTurn].getOutOfJail){
					this.players[this.whosTurn].jailedTurns = 0;
					this.players[this.whosTurn].jailed = false
					this.players[this.whosTurn].getOutOfJail = false;
				}
				this.nextPlayer();
			}
		}
	}
	drawDom(){
		var divs = document.querySelectorAll('.propertyElm');
		for(let i=0;i<divs.length; i++){ divs[i].remove(); }	
		
		spacesOwned[this.whosTurn].forEach(function(sp,index){ spaces[index].createDomElm(); });
		
		var divs = document.querySelectorAll('.propertyElm');
		for(let i=0;i<divs.length;i++){
			divs[i].addEventListener('click',function(){
				var divs = document.querySelectorAll('.propertyElm');
				for(let i=0;i<divs.length;i++){
					divs[i].classList.remove('active');
				}
				this.classList.add('active');
				console.log(this);
			});
		}		
		
	}
	drawHouses(canvas){
		for(let i = 0; i<spacesOwned.length; i++){
			spacesOwned[i].forEach(function(sp,index){
				
				if(spacesOwned[i][index].hotels != 0 ){
					canvas.fillStyle='red';
					for(let h=1; h<=spacesOwned[i][index].hotels; h++){
						if(index >=1 && index<=9){
							canvas.fillRect(spaces[index].shape.x, spaces[index].shape.y+87.5, 50, 12.5);
						}
						if(index >=11 && index<=19){
							canvas.fillRect(spaces[index].shape.x, spaces[index].shape.y, spaces[index].shape.w-87.5, 50 );
						}	
						if(index >=21 && index<=29){
							canvas.fillRect(spaces[index].shape.x, spaces[index].shape.y, 50, 12.5);
						}	
						if(index >=31 && index<=39){
							canvas.fillRect(spaces[index].shape.x+87.5, spaces[index].shape.y, spaces[index].shape.w-87.5, 50);
						}
					}					
				}
				if(spacesOwned[i][index].houses != 0 ){

					for(let h=1; h<=spacesOwned[i][index].houses; h++){
						switch(h){
							case 1: 
								canvas.fillStyle='red';
							break;
							case 2: 
								canvas.fillStyle='blue';
							break;
							case 3: 
								canvas.fillStyle='green';
							break;
							case 4: 
								canvas.fillStyle='purple';
							break;							
						}
						
						if(index >=1 && index<=9){
							canvas.fillRect(spaces[index].shape.x+((h-1)*12.5), spaces[index].shape.y+87.5, 12.5, 12.5);
						}
						if(index >=11 && index<=19){
							canvas.fillRect(spaces[index].shape.x, spaces[index].shape.y+((h-1)*12.5), spaces[index].shape.w-87.5,  12.5);
						}	
						if(index >=21 && index<=29){
							canvas.fillRect(spaces[index].shape.x+((h-1)*12.5), spaces[index].shape.y , 12.5 , 12.5);
						}	
						if(index >=31 && index<=39){
							canvas.fillRect(spaces[index].shape.x+87.5, spaces[index].shape.y+((h-1)*12.5), spaces[index].shape.w-87.5, 12.5);
						}
					}				
				}

			});	
		}
	}
	drawCardBlocks(){
		var html = '';
		var curColor = '#864c38';
		var ignoreIds = [0,2,4,7,10,12,17,20,22,27,30,33,36,38,5,15,25,35];
		document.getElementById('propertyCardBlocks').innerHTML = html;
/**-----------------------------------------------------------------------------------------------------------*/
		for(let playerId=0; playerId<this.players.length; playerId++){
			var starting = 1;
			html+='<div class="blockWrap clearfix">'
			for(let spaceId=0; spaceId<spaces.length; spaceId++){
				if(ignoreIds.indexOf( spaceId ) == -1){
					if(starting == 1){html+=' <div class="cardBlockRow clearfix">';}
					if(curColor != spaces[spaceId].color ){html+='</div><div class="cardBlockRow clearfix">';}

					html += this.cardBlock(playerId,spaceId);
					
					if(curColor != spaces[spaceId].color){ curColor = spaces[spaceId].color; }
					starting = 0;
				}
			}
			html+='</div>'
/**-----------------------------------------------------------------------------------------------------------*/			
			html+=' <div class="cardBlockRow clearfix">';
			for(let spaceId=5; spaceId<=35; spaceId+=10){ html += this.cardBlock(playerId,spaceId); }
			html+='</div>'
/**-----------------------------------------------------------------------------------------------------------*/			
			html+=' <div class="cardBlockRow clearfix">';
			for(let spaceId=12; spaceId<=27; spaceId+=15){ html += this.cardBlock(playerId,spaceId); }
			html+='</div>'
			
			if(playerId!=this.players.length-1){html+='</div>'}
		}
 
		document.getElementById('propertyCardBlocks').innerHTML = html;
	}
	cardBlock(pid,spid){
		var html='';
		html+='<div class="cardBlock" pl="'+pid+'" sp="'+spid+'" ';
		if(spacesOwned[pid][spid] != undefined && spacesOwned[pid][spid].own){
			html+='style="background:'+ spaces[spid].color +'; border:1px solid #000"';
		}else{
			html+='style=" border:1px solid '+spaces[spid].color+'"';
		}
		
		
		html+='></div>';			
		return html;
	}
	drawCards(){
		var html = '';
		document.getElementById('propertyCards').innerHTML = html;
		spacesOwned[this.whosTurn].forEach(function(sp,index){
			if(index==12 || index==27){//utilities
				html += '<div class="card">'+
						'<div class="header" style="background:'+ spaces[index].color+'">'+
						spaces[index].name+
						'</div>'+
						'<div class="body">'+
							'<p class="rent">if one "Utility" is owned, rent is 4 times amount shown on dice.</p> '+
							'<p class="rent">if both "Utilities" are owned, rent is 10 times amount shown on dice.</p> '+
						'</div>'+
						'<div class="footer">'+
						'</div>'+
					'</div>';							
			}else if(index==5 || index==15 || index==25 || index==35){//trains
				html += '<div class="card">'+
						'<div class="header" style="background:'+ spaces[index].color+'">'+
						spaces[index].name+
						'</div>'+
						'<div class="body">'+
							'<p class="rent">Rent $'+spaces[index].cost.rent+'.</p> '+
							'<p class="rent">If 2 R.R\'s are owned 50.</p> '+
							'<p class="rent">If 3 " " 100.</p> '+
							'<p class="rent">If 4 " " 200.</p> '+
						'</div>'+
						'<div class="footer">'+
						'</div>'+
					'</div>';				
			}else{
				html += '<div class="card">'+
						'<div class="header" style="background:'+ spaces[index].color+'">'+
						spaces[index].name+
						'</div>'+
						'<div class="body">'+
							'<p class="rent">Rent $'+spaces[index].cost.rent+'</p> '+
							'<div class="widthHouse clearfix">With 1 House <span>$'+spaces[index].cost.housRent[1]+'</span></div>'+
							'<div class="widthHouse clearfix">With 2 Houses <span>$'+spaces[index].cost.housRent[2]+'</span></div>'+
							'<div class="widthHouse clearfix">With 3 Houses <span>$'+spaces[index].cost.housRent[3]+'</span></div>'+
							'<div class="widthHouse clearfix">With 4 Houses <span>$'+spaces[index].cost.housRent[4]+'</span></div>'+
							'<p class="rent">With Hotel $'+spaces[index].cost.hotelRent[1]+'</p>'+
						'</div>'+
						'<div class="footer">'+
							'House Cost $'+spaces[index].cost.houseCost+' each<br>'+
							'Hotel, $'+spaces[index].cost.hotelCost+ ' plus 4 houses<br>'+
						'</div>'+
					'</div>';
			}
		});
		document.getElementById('propertyCards').innerHTML = html;		
	}
	updatePlayer(rolled){
		this.currentDiceRoll = rolled;
		if(!this.players[this.whosTurn].jailed){
			this.players[this.whosTurn].update(rolled);
			this.isOwned();
		}
	}
	isOwned(){
		var id = this.players[this.whosTurn].id;
		var space = this.players[this.whosTurn].space;
		if(spacesOwned[id][space] != undefined && spacesOwned[id][space].own){
			//player owns property
			log('You own '+spaces[space].name);
			this.players[this.whosTurn].spaceOptions.canBuy = false;
			document.getElementById('purchase').setAttribute('disabled',true);
		}else{
			for(let players=0; players<this.players.length; players++){
				if(players != id){
					if(spacesOwned[players][space] != undefined && spacesOwned[players][space].own){
						//a player thats not this one owens
						var rent = this.calcRent(space, players, this.hasMonopoly(spaces[space].color, players) );
						log('PAY PLAYER '+ players + ': $'+rent);
						this.players[this.whosTurn].spaceOptions.canBuy = false;
						this.players[this.whosTurn].money -= rent;
						this.players[players].money += rent;
						break;
					}
				}
			}
			if(rent == undefined){
				if(spaces[space].cost.purchase == 0){
					//log('You can not buy this some other action is needed',false);
					this.players[this.whosTurn].spaceOptions.canBuy = false;
					document.getElementById('purchase').setAttribute('disabled',true);
				}else{
					log('Want to buy '+spaces[space].name+' for $'+spaces[space].cost.purchase+'?');
					this.players[this.whosTurn].spaceOptions.canBuy = true;
					document.getElementById('purchase').removeAttribute('disabled');
				}
			}
		}
	}
	numberOwned(color, player){
		var own=0;
		for(let i=0; i<spacesGroup[color].length; i++){
			if(spacesOwned[player][spacesGroup[color][i]]!= undefined && spacesOwned[player][spacesGroup[color][i]].own){
				own++;
			}
		}	
		return own;
	}
	hasMonopoly(color, player ){
		var own=false;
		if( spacesGroup[color] != undefined){
			own = this.numberOwned(color,player);
		}else{
			log('Error:', color, spacesGroup[color]);
		}
		if(own == spacesGroup[color].length){return true;}else{return false;}
	}
	calcRent(spaceId, player, isMonopoly){
		if(!spacesOwned[player][spaceId].mortgage){
			if(isMonopoly){
				if(spaceId==12 || spaceId==27){
					return ((this.currentDiceRoll[0]+this.currentDiceRoll[1])*10)
				}else{					
					if(spacesOwned[player][spaceId].hotels==0){
						if(spacesOwned[player][spaceId].houses==0){
							return spaces[spaceId].cost.rent * 2;
						}else{
							return spaces[spaceId].cost.housRent[ spacesOwned[player][spaceId].houses];
						}
					}else{
						return spaces[spaceId].cost.hotelRent[ spacesOwned[player][spaceId].hotels];
					}
				}
				
			}else{
				if(spaceId==12 || spaceId==27){
					return ((this.currentDiceRoll[0]+this.currentDiceRoll[1])*4)
				}else{
					return spaces[spaceId].cost.rent;
				}
			}
		}else{
			return 0;
		}
	}	
}

class player{
	constructor(id, color="teal"){
		this.id = id;
		this.color = color;
		this.space = 0;
		this.spaceOptions = {'canBuy':false};
		this.money = 1500;
		this.jailed = false;
		this.jailedTurns = 0;
		this.getOutOfJail = false;
		this.position={x:0,y:(25 * this.id)};
		
		this.doublesRolled = 0;
		
		this.engine = Random.engines.mt19937().autoSeed();
		
		var srcImg = ['images/players/car.png','images/players/hat.png','images/players/iron.png','images/players/wheel.png'];
		this.img = new Image();
		this.img.src = srcImg[this.id];
	}
	draw(canvas){
		canvas.drawImage(this.img, this.position.x, this.position.y);
	}
	update(rolled){
		var preRolledSpace=this.space;
		
		if(!rolled){this.space=10;}else{
		this.space+=rolled[0]+rolled[1];
		}
		//income tax 
		if(this.space == 4 ){
			this.money -= parseInt(this.money*.1);
		}
		//luxury tax
		if(this.space == 38 ){
			this.money -= 75;
		}
		//Chance
		if(this.space == 7 || this.space == 22|| this.space == 36){
			log('Chance',cards['chance'].length);
			log( cards['chance'][Random.integer(0, cards['chance'].length-1)(this.engine)](this) );
		}
		//Community Chest
		if(this.space == 2 || this.space == 17|| this.space == 33){
			log('Community Chest',cards['chance'].length);
			log( cards['chest'][Random.integer(0, cards['chance'].length-1)(this.engine)](this) );
		}
		//Jail
		if(this.space == 30 ){
			this.gotoJail();
		}	
		//Go
		if(this.space > 39 ){
			this.space = (rolled[0]+rolled[1]) - (40 - preRolledSpace);
			this.money+=200;
		}

		if(this.space >= 0 && this.space <= 10){
			this.position.x = (this.space+1)*50;
			this.position.y = 0+(25 * this.id);
		}else if(this.space >= 11 && this.space <= 20){
			this.position.x = 625-(25 * this.id);
			this.position.y = (this.space+1-10)*50;
		}else if(this.space >= 21 && this.space <= 30){
			this.position.x = 500 - ((this.space-1-20)*50);
			this.position.y = 625-(25 * this.id);
		}else if(this.space >= 31 && this.space <= 39){
			this.position.x = 0+(25 * this.id);
			this.position.y = 550 -((this.space-30)*50);
		}
	}
	gotoJail(){
		log('Go To Jail player:' + this.id);
		this.jailed = true;
		this.jailedTurns = 0;			
		this.space = 10;		
	}
}