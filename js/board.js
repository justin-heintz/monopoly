spacesOwned = [[],[],[],[]];
spacesGroup = [];
spacesGroup['#864c38'] = [1,3];
spacesGroup['#abddf0'] = [6,8,9];
spacesGroup['#c53884'] = [11,13,14];
spacesGroup['#ec8b2c'] = [16,18,19];
spacesGroup['#db2428'] = [21,23,24];
spacesGroup['#fff004'] = [26,28,29];	
spacesGroup['#13a857'] = [31,32,34];
spacesGroup['#0066a4'] = [37,39];
spacesGroup['#5f9ea0'] = [12,27];
spacesGroup['#000000'] = [5,15,25,35];

spacesOwned[0][1] = {hotels:0,houses:3,mortgage:false,own:true}
spacesOwned[0][3] = {hotels:1,houses:0,mortgage:false,own:true}

spacesOwned[0][6] = {hotels:0,houses:4,mortgage:false,own:true}
spacesOwned[0][8] = {hotels:0,houses:4,mortgage:false,own:true}
spacesOwned[0][9] = {hotels:0,houses:4,mortgage:false,own:true}

spacesOwned[0][11] = {hotels:0,houses:2,mortgage:false,own:true}
spacesOwned[0][13] = {hotels:0,houses:1,mortgage:false,own:true}
spacesOwned[0][14] = {hotels:0,houses:2,mortgage:false,own:true}

spacesOwned[0][21] = {hotels:0,houses:0,mortgage:false,own:true}
spacesOwned[0][24] = {hotels:0,houses:0,mortgage:false,own:true}

//spacesOwned[1][19] = {hotels:0,houses:2,mortgage:false,own:true} 

spacesOwned[2][39] = {hotels:0,houses:2,mortgage:false,own:true}
spacesOwned[2][37] = {hotels:0,houses:0,mortgage:false,own:true}

//spacesOwned[3][18] = {hotels:0,houses:2,mortgage:false,own:true} 

 
spaces = [];
spaces.push( new space(0,'Go',{'purchase':0},'Gold',false,false, {x:0,y:0,h:100,w:100}));
spaces.push( new space(1,'Mediterranean Avenue',{'purchase':120,
		'rent':2,
		'housRent':{
			1:10,
			2:30,
			3:90,
			4:160},
		'hotelRent':{1:250},
		'mortgage':30,
		'houseCost':50,
		'hotelCost':50}
,'#864c38',true,true,{x:100,y:0,h:100,w:50}));
spaces.push( new space(2,'Community Chest',{'purchase':0},'FireBrick',false,false,{x:150,y:0,h:100,w:50},'chest'));
spaces.push( new space(3,'Baltic Avenue',{'purchase':120,
		'rent':4,
		'housRent':{
			1:20,
			2:60,
			3:180,
			4:320},
		'hotelRent':{1:450},
		'mortgage':30,
		'houseCost':50,
		'hotelCost':50},'#864c38',true,true,{x:200,y:0,h:100,w:50}));
spaces.push( new space(4,'Income Tax',{'purchase':0},'green',false,false,{x:250,y:0,h:100,w:50},'income'));
spaces.push( new space(5,'Reading Railroad',{'purchase':200,'rent':25,'mortgage':100},'#000000',true,false,{x:300,y:0,h:100,w:50},'train'));
spaces.push( new space(6,'Oriental Avenue',{'purchase':100,
		'rent':6,
		'housRent':{
			1:30,
			2:90,
			3:270,
			4:400},
		'hotelRent':{1:550},
		'mortgage':50,
		'houseCost':50,
		'hotelCost':50},'#abddf0',true,true,{x:350,y:0,h:100,w:50}));
spaces.push( new space(7,'Chance',{'purchase':0},'orange',false,false,{x:400,y:0,h:100,w:50},'chance'));
spaces.push( new space(8,'Vermont Avenue',{'purchase':100,
		'rent':6,
		'housRent':{
			1:30,
			2:90,
			3:270,
			4:400},
		'hotelRent':{1:550},
		'mortgage':50,
		'houseCost':50,
		'hotelCost':50},'#abddf0',true,true,{x:450,y:0,h:100,w:50}));
spaces.push( new space(9,'Connecticut Avenue',{'purchase':120,
		'rent':8,
		'housRent':{
			1:40,
			2:100,
			3:300,
			4:450},
		'hotelRent':{1:600},
		'mortgage':60,
		'houseCost':50,
		'hotelCost':50},'#abddf0',true,true,{x:500,y:0,h:100,w:50}));
spaces.push( new space(10,'Jail',{'purchase':0},'Gold',false,false, {x:550,y:0,h:100,w:100}));
/**-----------------------------------------------------------------------------------------------------------*/
spaces.push( new space(11,'St. Charles Place',{'purchase':140,
		'rent':50,
		'housRent':{
			1:10,
			2:150,
			3:450,
			4:625},
		'hotelRent':{1:750},
		'mortgage':70,
		'houseCost':100,
		'hotelCost':100},'#c53884',true,true,{x:550,y:100,h:50,w:100}));
spaces.push( new space(12,'Electric Company',{'purchase':150,'mortgage':75},'#5f9ea0',true,false,{x:-100,y:150,h:50,w:100},'electric'));
spaces.push( new space(13,'States Avenue',{'purchase':140,
		'rent':10,
		'housRent':{
			1:50,
			2:150,
			3:450,
			4:625},
		'hotelRent':{1:750},
		'mortgage':70,
		'houseCost':100,
		'hotelCost':100},'#c53884',true,true,{x:550,y:200,h:50,w:100}));
spaces.push( new space(14,'Virginia Avenue',{'purchase':160,
		'rent':12,
		'housRent':{
			1:60,
			2:180,
			3:500,
			4:700},
		'hotelRent':{1:900},
		'mortgage':80,
		'houseCost':100,
		'hotelCost':100},'#c53884',true,true,{x:550,y:250,h:50,w:100}));
spaces.push( new space(15,'Pennsylvania Railroad',{'purchase':200,'rent':25,'mortgage':100},'#000000',true,false,{x:-250,y:300,h:50,w:100},'train'));
spaces.push( new space(16,'St. James Place',{'purchase':180,
		'rent':14,
		'housRent':{
			1:70,
			2:200,
			3:550,
			4:750},
		'hotelRent':{1:950},
		'mortgage':90,
		'houseCost':100,
		'hotelCost':100},'#ec8b2c',true,true, {x:550,y:350,h:50,w:100}));
spaces.push( new space(17,'Community Chest',{'purchase':0},'FireBrick',false,false, {x:-350,y:400,h:50,w:100},'chest'));
spaces.push( new space(18,'Tennessee Avenue',{'purchase':180,
		'rent':14,
		'housRent':{
			1:70,
			2:200,
			3:550,
			4:750},
		'hotelRent':{1:950},
		'mortgage':90,
		'houseCost':100,
		'hotelCost':100},'#ec8b2c',true,true, {x:550,y:450,h:50,w:100}));
spaces.push( new space(19,'New York Avenue',{'purchase':200,
		'rent':16,
		'housRent':{
			1:80,
			2:220,
			3:600,
			4:800},
		'hotelRent':{1:1000},
		'mortgage':100,
		'houseCost':100,
		'hotelCost':100},'#ec8b2c',true,true, {x:550,y:500,h:50,w:100}));
spaces.push( new space(20,'Free Parking',{'purchase':0},'Gold',false,false, {x:550,y:550,h:100,w:100}));
/**-----------------------------------------------------------------------------------------------------------*/
spaces.push( new space(21,'Kentucky Avenue',{'purchase':220,
		'rent':18,
		'housRent':{
			1:90,
			2:250,
			3:700,
			4:875},
		'hotelRent':{1:1050},
		'mortgage':110,
		'houseCost':150,
		'hotelCost':150},'#db2428',true,true, {x:500,y:550,h:100,w:50}));
spaces.push( new space(22,'Chance',{'purchase':0},'orange',false,false,{x:450,y:550,h:100,w:50},'chance'));
spaces.push( new space(23,'Indiana Avenue',{'purchase':220,
		'rent':18,
		'housRent':{
			1:90,
			2:250,
			3:700,
			4:875},
		'hotelRent':{1:1050},
		'mortgage':110,
		'houseCost':150,
		'hotelCost':150},'#db2428',true,true,{x:400,y:550,h:100,w:50}));
spaces.push( new space(24,'Illinois Avenue',{'purchase':240,
		'rent':20,
		'housRent':{
			1:100,
			2:300,
			3:750,
			4:925},
		'hotelRent':{1:1100},
		'mortgage':120,
		'houseCost':150,
		'hotelCost':150},'#db2428',true,true,{x:350,y:550,h:100,w:50}));
spaces.push( new space(25,'B. & O. Railroad',{'purchase':200,'rent':25,'mortgage':100},'#000000',true,false,{x:300,y:550,h:100,w:50},'train'));
spaces.push( new space(26,'Atlantic Avenue',{'purchase':260,
		'rent':22,
		'housRent':{
			1:110,
			2:330,
			3:800,
			4:975},
		'hotelRent':{1:1150},
		'mortgage':130,
		'houseCost':150,
		'hotelCost':150},'#fff004',true,true, {x:250,y:550,h:100,w:50}));
spaces.push( new space(27,'Water Works',{'purchase':150,'mortgage':75},'#5f9ea0',true,false,{x:200,y:550,h:100,w:50},'water'));
spaces.push( new space(28,'Ventnor Avenue',{'purchase':260,
		'rent':22,
		'housRent':{
			1:110,
			2:330,
			3:800,
			4:975},
		'hotelRent':{1:1150},
		'mortgage':130,
		'houseCost':150,
		'hotelCost':150},'#fff004',true,true,{x:150,y:550,h:100,w:50}));
spaces.push( new space(29,'Marvin Gardens',{'purchase':280,
		'rent':24,
		'housRent':{
			1:120,
			2:360,
			3:850,
			4:1025},
		'hotelRent':{1:1200},
		'mortgage':140,
		'houseCost':150,
		'hotelCost':150},'#fff004',true,true,{x:100,y:550,h:100,w:50}));	
/**-----------------------------------------------------------------------------------------------------------*/
spaces.push( new space(30,'Go To Jail',{'purchase':0},'Gold',false,false, {x:0,y:550,h:100,w:100}));
spaces.push( new space(31,'Pacific Avenue',{'purchase':300,
		'rent':26,
		'housRent':{
			1:130,
			2:390,
			3:900,
			4:1100},
		'hotelRent':{1:1275},
		'mortgage':150,
		'houseCost':200,
		'hotelCost':200},'#13a857',true,true,{x:0,y:500,h:50,w:100}));
spaces.push( new space(32,'North Carolina Avenue',{'purchase':300,
		'rent':26,
		'housRent':{
			1:130,
			2:390,
			3:900,
			4:1100},
		'hotelRent':{1:1275},
		'mortgage':150,
		'houseCost':200,
		'hotelCost':200},'#13a857',true,true,{x:0,y:450,h:50,w:100}));
spaces.push( new space(33,'Community Chest',{'purchase':0},'FireBrick',false,false, {x:300,y:-400,h:50,w:100},'chest'));
spaces.push( new space(34,'Pennsylvania Avenue',{'purchase':320,
		'rent':28,
		'housRent':{
			1:150,
			2:450,
			3:1000,
			4:1200},
		'hotelRent':{1:1400},
		'mortgage':160,
		'houseCost':200,
		'hotelCost':200},'#13a857',true,true,{x:0, y:350,h:50,w:100}));
spaces.push( new space(35,'Short Line',{'purchase':200,'rent':25,'mortgage':100},'#000000',true,false,{x:200,y:-400,h:50,w:100},'train'));
spaces.push( new space(36,'Chance',{'purchase':0},'orange',false,false,{x:150,y:-400,h:50,w:100},'chance'));
spaces.push( new space(37,'Park Place',{'purchase':350,
		'rent':35,
		'housRent':{
			1:175,
			2:500,
			3:1100,
			4:1300},
		'hotelRent':{1:1500},
		'mortgage':175,
		'houseCost':200,
		'hotelCost':200},'#0066a4',true,true, {x:0,y:200,h:50,w:100}));
spaces.push( new space(38,'Sales Tax',{'purchase':0},'green',false,false,{x:50,y:-400,h:50,w:100},'luxury'));
spaces.push( new space(39,'Boardwalk',{'purchase':400,
		'rent':50,
		'housRent':{
			1:200,
			2:600,
			3:1400,
			4:1700},
		'hotelRent':{1:2000},
		'mortgage':200,
		'houseCost':200,
		'hotelCost':200},'#0066a4',true,true, {x:0,y:100,h:50,w:100}));
