// RULES 
//http://monopoly.wikia.com/wiki/Official_Rules
//houses + hotels can be sold
//to get a mortgage all houses + hotels must be sold on that color group
//to pay mortgage back pay mortgage plus 10% 

/* Houses and Hotels may be sold back to the Bank at any time for one-half
 the price paid for them. All houses on one color-group may be sold at once,
 or they may be sold one house at a time (one hotel equals five houses), 
 evenly, in reverse of the manner in which they were erected.
 */

	mousePos = {};
	dice = new dice();
	specialSpaces = new Image();
	specialSpaces.src = 'images/spaces2.png';	
	centerBoard = new Image();
	centerBoard.src = 'images/center.jpg';	
	
	canvas = {foreground: document.getElementById('foreground').getContext("2d")}				
	pm  = new playerManager(parseInt(document.getElementById('noplayers').value));
	auc = new auction(parseInt(document.getElementById('noplayers').value));
	trade = new tradeObj(parseInt(document.getElementById('noplayers').value));
 
	window.onload = function(e){ 
		document.getElementById('start').click();//this is only for dev
	}

	document.onmousemove = function(e) { mousePos.x = e.pageX; mousePos.y = e.pageY;} 
	
	document.getElementById('noplayers').addEventListener('change',function(){
		document.getElementById('noPlayersDisplay').innerHTML = this.value+' Players';
	});
	
	document.getElementById('start').addEventListener('click',function(){
		document.getElementById('hiddenGame').classList.remove('hidden');
		document.getElementById('hiddenStart').classList.add('hidden');
		pm.drawCards();
		pm.drawDom();//this is only for dev
		pm.drawCardBlocks();
		
		MainLoop.setDraw(draw).start();
	});	
	document.getElementById('purchase').addEventListener('click',function(){
		//later this should not be a problem because as the rules say a player must buy the property OR auction the property off.
		if(pm.players[pm.whosTurn].doublesRolled >=1 || document.getElementById('dice').getAttribute('disabled')){
			if(pm.players[ pm.whosTurn ].spaceOptions.canBuy){
				if(pm.players[ pm.whosTurn ].money >= spaces[ pm.players[pm.whosTurn].space ].cost.purchase){
					spacesOwned[pm.whosTurn][ pm.players[pm.whosTurn].space ]={own:true,houses:0,hotels:0,mortgage:false};
					pm.players[pm.whosTurn].money -= spaces[ pm.players[pm.whosTurn].space ].cost.purchase;
					pm.players[pm.whosTurn].spaceOptions.canBuy = false;
					pm.drawCardBlocks();
					pm.initEvents();
					spacesOwned[pm.whosTurn].forEach(function(sp,index){ spaces[index].createDomElm(); });					
					this.setAttribute('disabled',true);
					log('You bought '+spaces[ pm.players[pm.whosTurn].space ].name+' for $'+spaces[ pm.players[pm.whosTurn].space ].cost.purchase,'good');
				}else{
					log('You do not have enough money to buy this property','warning');
				}
			}
		}
	});
	document.getElementById('nextTurn').addEventListener("click",function(){
		//need to check if anyone owns this property id not then auction starts
		var owned=false
		for(let playerId=0; playerId<pm.players.length; playerId++){
			if(spacesOwned[playerId][pm.players[pm.whosTurn].space] != undefined && spacesOwned[playerId][pm.players[pm.whosTurn].space].own){
				document.getElementById('dice').removeAttribute('disabled');
				this.setAttribute('disabled',true);
				pm.nextPlayer(dice.rolled[0] == dice.rolled[1]);
				owned=true;
				break;			
			}
		}
		if(!owned){
			if(spaces[ pm.players[pm.whosTurn].space ].purchase){
				auc.open(pm.players[pm.whosTurn].space);
				this.setAttribute('disabled',true);
			}else{
				document.getElementById('dice').removeAttribute('disabled');
				this.setAttribute('disabled',true);
			}
			pm.nextPlayer(dice.rolled[0] == dice.rolled[1]);
		}
	});
	document.getElementById('dice').addEventListener('click',function(){
		if( !this.getAttribute('disabled') ){
			dice.roll();
			//dice.rolled[0] = 4; dice.rolled[1] = 4;
			if(dice.rolled[0] == dice.rolled[1]){ 
				pm.players[pm.whosTurn].doublesRolled++;
				log('Player '+pm.whosTurn +' rolled doubles: '+ pm.players[pm.whosTurn].doublesRolled,'good');
				if(pm.players[pm.whosTurn].doublesRolled>=3){
					
					log('Shame on you rolling 3 doubles, go to jail','bad');
					pm.players[pm.whosTurn].gotoJail();
					pm.players[pm.whosTurn].rollAction(false);
					pm.players[pm.whosTurn].draw(canvas.foreground);
					pm.players[pm.whosTurn].doublesRolled = 0;
					pm.nextPlayer();
					
				}
			}
			this.setAttribute('disabled',true);
			document.getElementById("nextTurn").removeAttribute('disabled');
			pm.updatePlayer(dice.rolled);					
		}
	});
	document.getElementById('build').addEventListener('click',function(){
		var selected = document.querySelector('.propertyElm.active');
		var pid = selected.getAttribute('pid');
		var houseCount = spacesOwned[pm.whosTurn][pid].houses;
		var HotelCount = spacesOwned[pm.whosTurn][pid].hotels;
		
		var even = true;	

		if(houseCount < 4 && HotelCount == 0 ){
			if(spaces[pid].cost['houseCost'] <= pm.players[pm.whosTurn].money){
				for(let i=0; i<spacesGroup[spaces[pid].color].length; i++){
					if(spacesGroup[spaces[pid].color][i]!=pid){
						if( (houseCount+1) - spacesOwned[pm.whosTurn][ spacesGroup[spaces[pid].color][i] ].houses >= 2){
							log('Distribute houses evenly on properties of the same color','warning');
							even = false;
							break;
						}
					}
				}
				if(even){
					log('House purchased on '+spaces[pid].name+' for $'+ spaces[pid].cost['houseCost'] ,'good');
					spacesOwned[pm.whosTurn][pid].houses++;
					pm.players[pm.whosTurn].money -=  spaces[pid].cost['houseCost'];
				}
			}else{
				log('You do not have enough money to buy a house.','warning');
			}
		}else{
			if(spaces[pid].cost['hotelCost'] <= pm.players[pm.whosTurn].money){
				var canBuyHotel = true;
				for(let i=0; i<spacesGroup[spaces[pid].color].length; i++){
					if( spacesOwned[pm.whosTurn][ spacesGroup[spaces[pid].color][i] ].houses <4 && spacesOwned[pm.whosTurn][ spacesGroup[spaces[pid].color][i] ].hotels!=1){canBuyHotel=false;}
				}				
				if(canBuyHotel){
					log('Hotel purchased on '+spaces[pid].name+' for $'+ spaces[pid].cost['hotelCost'] +' + 4 houses.','good');
					spacesOwned[pm.whosTurn][ pid ].houses = 0;
					spacesOwned[pm.whosTurn][ pid ].hotels = 1;
					pm.players[pm.whosTurn].money -=  spaces[pid].cost['hotelCost'];
					this.setAttribute('disabled','true')
				}else{
					log('All properties of same color must have 4 houses before buying hotels.','warning');
				}
			}else{
				log('You do not have enough money to buy a hotel.','warning');
			}
		}
	});
	document.getElementById('demolish').addEventListener('click',function(){
		var selected = document.querySelector('.propertyElm.active');
		var pid = selected.getAttribute('pid');
		var houseCount = spacesOwned[pm.whosTurn][pid].houses;
		console.log(selected,spacesOwned[pm.whosTurn][pid]);
		console.log(spaces[pid])
	});
	document.getElementById('mortgage').addEventListener('click',function(){
		var selected = document.querySelector('.propertyElm.active');
		var pid = selected.getAttribute('pid');		
		var property = spacesOwned[pm.whosTurn][pid];
 
		if(!property.mortgage){
			property.mortgage=true;
			pm.players[pm.whosTurn].money += spaces[pid].cost.mortgage;
			this.innerHTML = 'Pay Mortgage';
		}else{
			property.mortgage=false;
			pm.players[pm.whosTurn].money -= (spaces[pid].cost.mortgage + (spaces[pid].cost.mortgage * .1));
			this.innerHTML = 'Mortgage';
		}
	});
	document.getElementById('trade').addEventListener('click',function(){ trade.open(); });
	//auction events
	document.getElementById('inc_bid').addEventListener('click',function(){
		if((auc.player_bids[auc.player_turn]+auc.inc_dec) <= pm.players[auc.player_turn].money){
			auc.player_bids[auc.player_turn]+=auc.inc_dec;
			document.getElementById('bid_amount').innerHTML = "Players offer: $"+auc.player_bids[auc.player_turn];
		}
	});
	document.getElementById('dec_bid').addEventListener('click',function(){
		if((auc.player_bids[auc.player_turn]-auc.inc_dec) > auc.cur_bid ){
			auc.player_bids[auc.player_turn]-=auc.inc_dec;
			document.getElementById('bid_amount').innerHTML = "Players offer: $"+auc.player_bids[auc.player_turn];
		}
	});
	document.getElementById('place_bid').addEventListener('click',function(){auc.nextPlayer('bid');});
	document.getElementById('fold').addEventListener('click',function(){auc.nextPlayer('fold');});	

function draw(){
	canvas.foreground.clearRect(0, 0, 650, 650);
	canvas.foreground.save();
	canvas.foreground.scale(1, 1);  
	canvas.foreground.translate(0, 0);
		canvas.foreground.fillStyle = "#cde6d0"; 
		canvas.foreground.fillRect(0, 0, 650, 650);
		canvas.foreground.fill();

		for(let i=0; i<spaces.length; i++){
			spaces[i].draw(canvas.foreground);
		}

		document.getElementById('playerInfo').innerHTML = '<span class="playerInfoHeader">It is Player '+pm.whosTurn+'\'s turn</span><br>';

		canvas.foreground.drawImage(specialSpaces, 0  ,0,100,100,  551,1,98,98);//jail
		canvas.foreground.drawImage(specialSpaces, 100,0,100,100,  551,551,98,98);//free
		canvas.foreground.drawImage(specialSpaces, 200,0,100,100,    1,551,98,98);//go to
		canvas.foreground.drawImage(specialSpaces, 300,0,100,100,    1,1,98,98);//go			
		canvas.foreground.drawImage(specialSpaces, 750,0,468,448, 101,102,447,447);//centerboard
		
		pm.drawHouses(canvas.foreground);
		
		for(let i=0; i<pm.players.length; i++){
			document.getElementById('playerInfo').innerHTML += '<img src="'+pm.players[i].srcImg[i]+'"> <span class="playerInfoText">Player:'+i +' has  $'+pm.players[i].money+'</span><br>'; 
			pm.players[i].draw(canvas.foreground);
		}					
		dice.draw(canvas.foreground);
	canvas.foreground.restore();		
}

function log(msg,type='normal'){
	var elm = document.getElementById('log');
	elm.innerHTML += '<p class="'+type+'">'+msg+'</p>';
	elm.scrollTop = elm.scrollHeight;
	//console.log(msg);
}
