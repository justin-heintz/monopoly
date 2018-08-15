class auction{
	constructor(no_players){
		this.board_elm    = document.getElementById('auctionBoard');
		this.cur_bid_elm  =  document.getElementById('current_Bid')	

		this.init_html();

		this.controls_elm = document.getElementsByClassName('player_bid_controls');		
 
		this.no_players = no_players;
		this.inc_dec = 1;
		this.cur_bid = 0;
		this.property_id = 0;
		this.player_turn = 0;
		this.player_bids = [];
		this.folded_players = [];
		
		this.board_elm.style.opacity = 0;
	}
	init_html(){
		var html='';
			html+='<div id="player_bid_controls">';
				html+='<div id="set_bid">';
					html+='<div id="bid_amount">Players offer: $1</div>';
					html+='<button id="inc_bid">Inc</button>';
					html+='<button id="dec_bid">Dec</button>';
					
					html+='<div id="set_amount">';
						html+='<button id="one" amount="1" active="true">$1</button>';
						html+='<button id="five" amount="5" active="false">$5</button>';
						html+='<button id="ten" amount="10" active="false">$10</button>';
						html+='<button id="fifty" amount="50" active="false">$50</button>';
					html+='</div>';
					
				html+='</div>';
				html+='<button id="place_bid" >Place Bid</button>';
				html+='<button id="fold" >Fold</button>';
			html+='</div>';
		this.board_elm.innerHTML+=html;
	}
	open(property_id){
		this.property_id = property_id;
		//disable buttons
		document.getElementById('purchase').setAttribute('disabled',true);
		document.getElementById('dice').setAttribute('disabled',true);
		document.getElementById('nextTurn').setAttribute('disabled',true);
		
		this.player_turn = pm.whosTurn;
		//setting vars 
		this.cur_bid = Math.ceil(spaces[property_id].cost.purchase * .25);
		this.player_bids = [];
		this.folded_players = [];		
		for(let p=0; p<this.no_players; p++){this.player_bids.push( this.cur_bid );}
		for(let p=0; p<this.no_players; p++){this.folded_players.push(false);}		

		//handling visuals 
		this.board_elm.style.opacity = 1;
		this.set_ui();
	}
	close(){
		this.board_elm.style.opacity = 0;
		document.getElementById('dice').removeAttribute('disabled');
	}	
	set_ui(){
		document.getElementById('bidding_player').innerHTML = 'Player: '+this.player_turn;
		document.getElementById('current_Bid').innerHTML = 'Current Bid: $'+this.cur_bid;
		document.getElementById('bid_amount').innerHTML = 'Players offer: $'+ this.player_bids[this.player_turn];	
	}
	nextPlayer(action){
		var folded=0;
		var winner=99;
		var hold_player = this.player_turn;
 
		if(action == 'bid'){
			this.cur_bid = this.player_bids[this.player_turn];
			this.set_ui();
		}
		
		if(action == 'fold'){
			this.folded_players[this.player_turn] = true;
		}

		for(let i=0,p=this.player_turn; i<this.no_players; i++,p++){
			if(p>this.no_players-1){p=0;}
			if(p != this.player_turn){ 
				if(pm.players[p].money > this.cur_bid+1){
					if(!this.folded_players[p]){
						this.player_turn = p;
						this.player_bids[this.player_turn] = this.cur_bid+1;
						break;
					}
				}else{
					this.folded_players[p]=true;
				}
			}
		}	
 
		this.set_ui();

		for(let i=0; i<this.folded_players.length; i++){
			folded += (this.folded_players[i]?1:0);
			winner = (!this.folded_players[i]?i:winner);
		}

		if(folded==this.folded_players.length - 1){
			this.close();
			pm.players[winner].money -= this.cur_bid;
			spacesOwned[winner][ this.property_id ]={own:true, houses:0, hotels:0, mortgage:false};
			log('Player ' + winner + ' won ' + spaces[this.property_id].name);
			//pm.nextPlayer();
		}
		 
	}
}








