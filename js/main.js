// RULES 
//http://monopoly.wikia.com/wiki/Official_Rules
//

window.onload = function(){
		document.getElementById('noplayers').addEventListener('change',function(){
			document.getElementById('noPlayersDisplay').innerHTML = this.value+' Players';
		});
		document.getElementById('start').addEventListener('click',function(){
			document.getElementById('hiddenGame').classList.remove('hidden');
			document.getElementById('hiddenStart').classList.add('hidden');
			
			dice = new dice();
			specialSpaces = new Image();
			specialSpaces.src = 'images/spaces.png';	
			canvas = {foreground: document.getElementById('foreground').getContext("2d")}				
			pm = new playerManager(document.getElementById('noplayers').value);
			
			MainLoop.setUpdate(update).setDraw(draw).start();
		});	
		//this is only for dev
		document.getElementById('start').click();		
		
		document.getElementById('purchase').addEventListener('click',function(){
			//later this should not be a problem because as the rules say a player must buy the property OR auction the property off.
			if(pm.players[pm.whosTurn].doublesRolled >=1 || document.getElementById('dice').getAttribute('disabled')){
				if(pm.players[ pm.whosTurn ].spaceOptions.canBuy){
					if(pm.players[ pm.whosTurn ].money >= spaces[ pm.players[pm.whosTurn].space ].cost.purchase){
						spacesOwned[pm.whosTurn][ pm.players[pm.whosTurn].space ]={own:true,houses:0,hotels:0,mortgage:false};
						pm.players[pm.whosTurn].money -= spaces[ pm.players[pm.whosTurn].space ].cost.purchase;
						pm.players[ pm.whosTurn ].spaceOptions.canBuy = false;
						log('You bought '+spaces[ pm.players[pm.whosTurn].space ].name+' for $'+spaces[ pm.players[pm.whosTurn].space ].cost.purchase);
					}else{
						log('you do not have enough money to buy this property');
					}
				}
			}else{
				//auction will be here later
				log('roll before purchasing');	
			}
		});
		
		document.getElementById('nextTurn').addEventListener("click",function(){
			this.setAttribute('disabled',true);
			document.getElementById('dice').removeAttribute('disabled');
			pm.nextPlayer();
		});
		
		document.getElementById('dice').addEventListener('click',function(){
			if( !this.getAttribute('disabled') ){
				dice.roll();
				//dice.rolled[0] = 1; //dice.rolled[1] = 1;
				if(dice.rolled[0] == dice.rolled[1]){ 
					log('player '+pm.whosTurn +' rolled doubles: '+ pm.players[pm.whosTurn].doublesRolled );
					pm.players[pm.whosTurn].doublesRolled++;
					if(pm.players[pm.whosTurn].doublesRolled>=3){
						log('shame on you rolling 3 doubles');
						pm.players[pm.whosTurn].gotoJail();
						pm.players[pm.whosTurn].update(false);
						pm.players[pm.whosTurn].draw(canvas.foreground);
						pm.nextPlayer();
					}
				}else{
					this.setAttribute('disabled',true);
					document.getElementById("nextTurn").removeAttribute('disabled');
				}
				
				pm.updatePlayer(dice.rolled);					
			}
		});
		document.getElementById('sell').addEventListener('click',function(){});
		document.getElementById('build').addEventListener('click',function(){});
		document.getElementById('demolish').addEventListener('click',function(){});
		document.getElementById('mortgage').addEventListener('click',function(){});

	function draw(){
		canvas.foreground.clearRect(0, 0, 650, 650);

		canvas.foreground.save();
		canvas.foreground.scale(1, 1);  
		canvas.foreground.translate(0, 0);

			canvas.foreground.fillStyle = "#cde6d0"; 
			canvas.foreground.fillRect(0, 0, 650, 650);
			canvas.foreground.fill();
		
			for(let i=0; i<spaces.length; i++){
				spaces[i].id = i;
				spaces[i].draw(canvas.foreground);
			}

			document.getElementById('playerInfo').innerHTML = 'It is Player '+pm.whosTurn+'\'s turn<br>';
 
			canvas.foreground.drawImage(specialSpaces, 0  ,0,100,100,  551,1,98,98);//jail
			canvas.foreground.drawImage(specialSpaces, 100,0,100,100,  551,551,98,98);//free
			canvas.foreground.drawImage(specialSpaces, 200,0,100,100,    1,551,98,98);//goto
			canvas.foreground.drawImage(specialSpaces, 300,0,100,100,    1,1,98,98);//go			
			
			for(let i=0; i<pm.players.length; i++){
				document.getElementById('playerInfo').innerHTML += 'Player:'+i +' has  $'+pm.players[i].money+'<br>'; 
				pm.players[i].draw(canvas.foreground);
			}					
			
			dice.draw(canvas.foreground);
			
			pm.drawCardBlocks();
			pm.drawCards();
			pm.drawHouses(canvas.foreground);

		canvas.foreground.restore();		
	}
	function update(){}
};
function log(msg,display=true){
	if(display){
		var elm = document.getElementById('log');
		elm.value += msg+'\n\r';
		elm.scrollTop = elm.scrollHeight;
	}
	console.log(msg);
}