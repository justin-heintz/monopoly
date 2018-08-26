cards = {chest:[],chance:[]};

cards.chest.push(function(player){
	var msg = 'Advance to Go Collect $200';
	player.space = 0;
	player.money += 200;
	return {'msg':msg,'type':'good'};
});
cards.chest.push(function(player){
	var msg = 'Bank error in your favor - Collect $200';
	player.money += 200;
	return {'msg':msg,'type':'good'};
});
cards.chest.push(function(player){
	var msg = 'Doctor\'s fees - Pay $50 ';
	player.money -= 50;
	return {'msg':msg,'type':'bad'};
});
cards.chest.push(function(player){
	var msg = 'From sale of stock you get $50';
	player.money += 50;
	return {'msg':msg,'type':'good'};
});
cards.chest.push(function(player){
	var msg = 'Get Out of Jail Free - This card may be kept until needed or sold';
	player.getOutOfJail = true;
	return {'msg':msg,'type':'good'};
});
cards.chest.push(function(player){
	var msg = 'Go to Jail - Go directly to jail - Do not pass Go - Do not collect $200';
	player.gotoJail();
	return {'msg':msg,'type':'bad'};
});
cards.chest.push(function(player,otherPlayers){/*NEEDS TO BE FINISHED*/
	var msg = 'Grand Opera Night - Collect $50 from every player for opening night seats';
	player.money += 50;
	return {'msg':msg,'type':'good'};
});
cards.chest.push(function(player){
	var msg = 'Holiday Fund matures - Receive $100';
	player.money += 100;
	return {'msg':msg,'type':'good'};
});
cards.chest.push(function(player){
	var msg = 'Income tax refund - Collect $20';
	player.money += 20;
	return {'msg':msg,'type':'good'};
});
cards.chest.push(function(player){
	var msg = 'Life insurance matures - Collect $100';
	player.money += 100;
	return {'msg':msg,'type':'good'};
});
cards.chest.push(function(player){
	var msg = 'Pay hospital fees of $100';
	player.money -= 100;
	return {'msg':msg,'type':'bad'};
});
cards.chest.push(function(player){
	var msg = 'Pay school fees of $150';
	player.money -= 150;
	return {'msg':msg,'type':'bad'};
});
cards.chest.push(function(player){
	var msg = 'Receive $25 consultancy fee';
	player.money += 25;
	return {'msg':msg,'type':'good'};
});
cards.chest.push(function(player){/*NEEDS TO BE FINISHED*/
	var msg = 'You are assessed for street repairs - $40 per house - $115 per hotel';
	return {'msg':msg,'type':'bad'};
});
cards.chest.push(function(player){
	var msg = 'You have won second prize in a beauty contest - Collect $10';
	player.money += 10;
	return {'msg':msg,'type':'good'};
});
cards.chest.push(function(player){
	var msg = 'You inherit $100';
	player.money += 100;
	return {'msg':msg,'type':'good'};
});

/**---------------------------------------------------------------------------------------*/

cards.chance.push(function(player){
	var msg = 'Advance to Go Collect $200';
	player.space = 0;
	player.money += 200;
	return {'msg':msg,'type':'good'};
});
cards.chance.push(function(player){/*NEEDS TO BE FINISHED*/
	var msg = 'Advance to Illinois Ave. - If you pass Go, collect $200';
	return {'msg':msg,'type':'good'};
});
cards.chance.push(function(player){/*NEEDS TO BE FINISHED*/
	var msg = 'Advance to St. Charles Place - If you pass Go, collect $200';
	return {'msg':msg,'type':'good'};
});
cards.chance.push(function(player){/*NEEDS TO BE FINISHED*/
	var msg = 'Advance token to nearest Utility. If unowned, you may buy it from the Bank. If owned, throw dice and pay owner a total ten times the amount thrown.';
	return {'msg':msg,'type':'good'};
});
cards.chance.push(function(player){/*NEEDS TO BE FINISHED*/
	var msg = 'Advance token to the nearest Railroad and pay owner twice the rental to which he/she {he} is otherwise entitled. If Railroad is unowned, you may buy it from the Bank.';
	return {'msg':msg,'type':'good'};
});
cards.chance.push(function(player){
	var msg = 'Bank pays you dividend of $50';
	player.money += 50;
	return {'msg':msg,'type':'good'};
});
cards.chance.push(function(player){
	var msg = 'Get out of Jail Free - This card may be kept until needed, or traded/sold';
	player.getOutOfJail = true;
	return {'msg':msg,'type':'good'};
});
cards.chance.push(function(player){/*NEEDS TO BE FINISHED*/
	var msg = 'Go Back 3 Spaces';
	return {'msg':msg,'type':'normal'};
});
cards.chance.push(function(player){
	var msg = 'Go to Jail - Go directly to jail - Do not pass Go - Do not collect $200';
	player.gotoJail();
	return {'msg':msg,'type':'bad'};
});
cards.chance.push(function(player){/*NEEDS TO BE FINISHED*/
	var msg = 'Make general repairs on all your property - For each house pay $25 - For each hotel $100';
	return {'msg':msg,'type':'bad'};
});
cards.chance.push(function(player){
	var msg = 'Pay poor tax of $15';
	player.money -= 15;
	return {'msg':msg,'type':'bad'};
});
cards.chance.push(function(player){
	var msg = 'Take a trip to Reading Railroad';
	player.space = 5;
	return {'msg':msg,'type':'normal'};
});
cards.chance.push(function(player){
	var msg = 'Take a walk on the Boardwalk - Advance token to Boardwalk.';
	player.space = 39;
	return {'msg':msg,'type':'normal'};
});
cards.chance.push(function(player){/*NEEDS TO BE FINISHED*/
	var msg = 'You have been elected Chairman of the Board - Pay each player $50';
	player.money -= 50;
	return {'msg':msg,'type':'bad'};
});
cards.chance.push(function(player){
	var msg = 'Your building loan matures - Collect $150 ';
	player.money += 150;
	return {'msg':msg,'type':'good'};
});