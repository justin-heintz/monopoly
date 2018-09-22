class tradeObj{
	constructor(no_players){
		this.no_players = no_players;
		this.player_trading_with = -1;
	}
	open(){
		document.getElementById('tradeBoard').style.display = 'block';	
		this.init_player_select_html();
	}
	close(){ 
		pm.drawCardBlocks();
		document.getElementById('tradeBoard').style.display = 'none'; 
	}
	
	//PLAYER SELECTION SCREEEN
	init_player_select_html(){
		var html = '';
		html += '<p>Select a player to trade with</p>';
		for(var p=0; p<this.no_players; p++){
			if(p != pm.whosTurn){
				if(spacesOwned[p].length !=0){
					html+='<button class="selectPlayerTrade" player="'+p+'">Player '+p+'</button>';
				}
			}
		}
		html += '<button id="close_trade">Cancel Trade</button>';
		document.getElementById('tradeBoard').innerHTML=html;
		this.init_player_select_events();
	}
	init_player_select_events(){
		var btns = document.querySelectorAll('.selectPlayerTrade');
		document.getElementById('close_trade').addEventListener('click',function(){ this.close(); }.bind(this));
		for(let i=0;i<btns.length; i++){ 
			btns[i].addEventListener('click',function( ){
				trade.player_trading_with = parseInt(this.getAttribute('player'));
				trade.init_prop_select_html();
			} );
		}	
	}
	
	//PROPERTY SELECTION SCREEEN
	init_prop_select_html(){
		var html = '';
		html += '<div class="push-1 col-4">';
			html += '<p>Player: '+pm.whosTurn+'</p>';
			html += this.gen_prop_list(pm.whosTurn,trade.player_trading_with);
			html += '$<input class="number" type="text" pid="'+pm.whosTurn+'" onkeypress=\'return event.charCode >= 48 && event.charCode <= 57 && event.target.value.length < 5\'>';
			html += '<button class="unlock" disabled="true" pid="'+pm.whosTurn+'">Unlock Selection</button>';
			html += '<button class="lock" pid="'+pm.whosTurn+'">Lock Selection</button>';
		html += '</div>';
		html += '<div class="col-1"> </div>';
		html += '<div class="col-4">';
			html += '<p>Player: '+trade.player_trading_with+'</p>';
			html += this.gen_prop_list(trade.player_trading_with,pm.whosTurn);
			html += '$<input class="number" type="text" pid="'+trade.player_trading_with+'" onkeypress=\'return event.charCode >= 48 && event.charCode <= 57 && event.target.value.length < 5\'>';
			html += '<button class="unlock" disabled="true" pid="'+trade.player_trading_with+'">Unlock Selection</button>';
			html += '<button class="lock" pid="'+trade.player_trading_with+'">Lock Selection</button>';
		html += '</div>';
		
		html += '<div class="col-12">';
			html += '<button id="back_player_select">Back</button>';
			html += '<button id="close_trade">Cancel Trade</button>';
			html += '<button id="accept_trade" disabled="true">Accept Trade</button>';
		html += '</div>';
		
		document.getElementById('tradeBoard').innerHTML=html;
		this.init_prop_select_events();
	}
	gen_prop_list(player,opposite_player){
		var html = '';
		var curColor = '#864c38';
		var ignoreIds = [0,2,4,7,10,12,17,20,22,27,30,33,36,38,5,15,25,35];
		var starting = 1;
		opposite_player = parseInt(opposite_player);
		
		for(let spid=0; spid<spaces.length; spid++){
			if(ignoreIds.indexOf( spid ) == -1){
				if(starting == 1){html+=' <div class="column clearfix">';}
				if(curColor != spaces[spid].color ){html+='</div><div class="column clearfix">';}

				html += this.cardBlock(player,opposite_player,spid);
				
				if(curColor != spaces[spid].color){ curColor = spaces[spid].color; }
				starting = 0;
			}
		}
		html+='</div>'
	
		html+=' <div class="column clearfix">';
			for(let spid=5; spid<=35; spid+=10){ html += this.cardBlock(player,opposite_player,spid); }
		html+='</div>'
		
		html+=' <div class="column clearfix">';
			for(let spid=12; spid<=27; spid+=15){ html += this.cardBlock(player,opposite_player,spid); }
		html+='</div>'

		return html;		
	}
	cardBlock(player,opposite_player,spid){
		var html='';
		html+='<div class="propBlock" pid="'+player+'" opid="'+opposite_player+'" spid="'+spid+'" ';
		
		if(spacesOwned[player][spid] != undefined && spacesOwned[player][spid].own){
			if(!spacesOwned[player][spid].mortgage){//Not mortgage
				html+='mortgage="false" selected="false" style="background:'+ spaces[spid].color +'; border:1px solid #000"';
			}else{//mortgage
				html+='mortgage="true"  style="background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAAMFBMVEUAAAD///9SUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlKZdkYwAAAAD3RSTlMAABEiRFVmd4iZqrvM3e6QmQjxAAAAW0lEQVQY063QORKAMAzAQBEHTA7b//8tHZODEpVbiuMjfsAeIQDcEelFDwXAbMTWALLVEdUTUHRCiQswmZBW4ezMqA5FF5TIeFqQVq7Kimr13FDC2ZBeZvz55wM5wgUa3pf5vwAAAABJRU5ErkJggg==); border:1px solid #000"';
			}			
		}else{
			html+='selected="false" style="border:1px solid '+spaces[spid].color+'"';
		}
		html+='></div>';			
		return html;
	}	
	init_prop_select_events(){
		var props = document.querySelectorAll(".propBlock");
		var unlock = document.querySelectorAll(".unlock");
		var lock = document.querySelectorAll(".lock");
		
		//CLOSE TRADE WINDOW
		document.getElementById('close_trade').addEventListener('click',function(){ this.close(); }.bind(this));
		
		//BACK TO PLAYER SELECT
		document.getElementById('back_player_select').addEventListener('click',function(){ this.init_player_select_html(); }.bind(this));
		
		//BOTH PLAYERS HAVE ACCEPTED THE TRADE
		document.getElementById('accept_trade').addEventListener('click',function(){ 
			var pid = -1;
			var opid = -1;
			var spid = -1;
			var props = document.querySelectorAll(".propBlock[selected='true']");
			
			for(let i=0;i<props.length; i++){
				pid = parseInt(props[i].getAttribute('pid'));
				opid = parseInt(props[i].getAttribute('opid'));
				spid = parseInt(props[i].getAttribute('spid'));
				delete spacesOwned[pid][spid];
				spacesOwned[opid][spid]={hotels:0,houses:0,mortgage:false,own:true};
			}

			if(isNaN(parseInt(document.querySelector(".number[pid='"+pm.whosTurn+"']").value))){ document.querySelector(".number[pid='"+pm.whosTurn+"']").value = 0;}
			if(isNaN(parseInt(document.querySelector(".number[pid='"+this.player_trading_with+"']").value))){ document.querySelector(".number[pid='"+this.player_trading_with+"']").value = 0;}
			
			console.log( pm.players[pm.whosTurn].money , parseInt(document.querySelector(".number[pid='"+pm.whosTurn+"']").value) );
			console.log( pm.players[this.player_trading_with].money, parseInt(document.querySelector(".number[pid='"+this.player_trading_with+"']").value) );
			
			//subtrack money 
			pm.players[pm.whosTurn].money 				= pm.players[pm.whosTurn].money - parseInt(document.querySelector(".number[pid='"+pm.whosTurn+"']").value);
			pm.players[this.player_trading_with].money  = pm.players[this.player_trading_with].money - parseInt(document.querySelector(".number[pid='"+this.player_trading_with+"']").value);
			
			//add money from other player
			pm.players[pm.whosTurn].money = pm.players[pm.whosTurn].money + parseInt(document.querySelector(".number[pid='"+this.player_trading_with+"']").value);
			pm.players[this.player_trading_with].money = pm.players[this.player_trading_with].money + parseInt(document.querySelector(".number[pid='"+pm.whosTurn+"']").value);

			this.close();
 		}.bind(this));
		
		//UNLOCK TRADE
		for(let i=0;i<unlock.length; i++){
			unlock[i].addEventListener('click',function(){
				var pid = parseInt(this.getAttribute('pid'));
				var disabled = this.getAttribute('disabled');
				if(disabled==null){
					this.setAttribute('disabled',true);
					document.querySelector(".lock[pid='"+pid+"']").removeAttribute('disabled');
					document.querySelector(".number[pid='"+pid+"']").removeAttribute('disabled');
					document.getElementById('accept_trade').setAttribute('disabled',true);
				}
			});
		}
		
		//LOCKS TRADE
		for(let i=0;i<lock.length; i++){
			lock[i].addEventListener('click',function(){
				var pid = parseInt(this.getAttribute('pid'));
				var disabled = this.getAttribute('disabled');
				
				var tradeMoney = document.querySelector(".number[pid='"+pid+"']").value;
				tradeMoney = (isNaN(parseInt(tradeMoney)) ? 0 : parseInt(tradeMoney));
			
				//Trade amount is greater then total player has
				if(pm.players[pid].money - tradeMoney <= 0){
					log('Player:'+pid+'\'s trade funds exceeds their total funds.','bad'); 
					return false;
				}
				
				//No property or funds selected
				if(document.querySelectorAll(".propBlock[pid='"+pid+"'][selected='true']").length==0 && tradeMoney==0){
					log('Player:'+pid+' Select a property or funds to trade.','bad'); 
					return false;					
				}
 
				if(disabled==null){
					this.setAttribute('disabled',true);
					document.querySelector(".unlock[pid='"+pid+"']").removeAttribute('disabled');
					document.querySelector(".number[pid='"+pid+"']").setAttribute('disabled',true);
					
				}
				if(document.querySelectorAll(".lock[disabled='true']").length==2){
					document.getElementById('accept_trade').removeAttribute('disabled');
				} 
			});
		}	
		
		//SELECT PROPERTIES
		for(let i=0;i<props.length; i++){
			props[i].addEventListener('click',function(){
				var pid =  parseInt(this.getAttribute('pid'));
				var spid = parseInt(this.getAttribute('spid'));
				var mortgage = this.getAttribute('mortgage');
				var selected = this.getAttribute('selected');
				
				if( document.querySelector(".lock[disabled='true'][pid='"+pid+"']") == null ){
					if(spacesOwned[pid][spid] !=undefined && spacesOwned[pid][spid].own){// you can trade mortgaged properties !
						if(selected=='false'){
							this.style.border = "2px solid orange";
							this.setAttribute('selected',true);
						}else{
							this.style.border = "1px solid #000";
							this.setAttribute('selected',false);
						}
					}
				}else{
					console.log('locked');
				}
			});
		}
		
	}
}