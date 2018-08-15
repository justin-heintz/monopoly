class space {
	constructor(id, name, cost, color, purchase, upgradeable, shape, type=null){
		this.id = id;
		this.name = name;
		this.cost = cost;
		this.color = color;
		this.purchase = purchase;
		this.upgradeable = upgradeable;
		this.shape = shape;
		this.type = type;
		this.img = {train:400,chest:450,chance:500,water:550,electric:600,income:650,luxury:700};

	}
	createDomElm(){
		if(this.cost.purchase!=0){
			var html = '';
			if(this.id >=1 && this.id<=9){
				html = '<div class="propertyElm" pid="'+this.id+'" style="width:50;height:100;margin:'+this.shape.y+'px 0 0 '+this.shape.x+'px; border:1px solid red"></div> ';	
			}
			if(this.id >=11 && this.id<=19){
				html = '<div class="propertyElm" pid="'+this.id+'" style="width:100;height:50;margin:'+this.shape.y+'px 0 0 550px ; border:1px solid red"></div> ';	
			}
			if(this.id >=21 && this.id<=29){
				html = '<div class="propertyElm" pid="'+this.id+'" style="width:50;height:100;margin:'+this.shape.y+'px 0 0 '+this.shape.x+'px; border:1px solid red"></div> ';	
			}
			if(this.id >=31 && this.id<=39){
				html = '<div class="propertyElm" pid="'+this.id+'" style="width:100;height:50;margin:'+this.shape.y+'px 0 0 0; border:1px solid red"></div> ';	
			}
			document.getElementById('spaceElm').innerHTML += html;
		}
	}
	draw(canvas){
		//box	
		canvas.beginPath();
		canvas.lineWidth="2";
		canvas.strokeStyle="#000";
		canvas.rect(this.shape.x, this.shape.y, this.shape.w, this.shape.h);
		canvas.fillStyle = "#cde6d0"; 
		canvas.fill();
		canvas.stroke();
		
		//colored bar
		canvas.font = "10px Arial";
		canvas.textAlign = "center";
		canvas.fillStyle=this.color;
		
		if(this.id >=1 && this.id<=9){
			if(!this.type){
				canvas.fillRect(this.shape.x+1, this.shape.y+79, this.shape.w-1, 20);
			}else{
				canvas.save();
					canvas.translate(50,100);
					canvas.rotate(180*Math.PI/180);
					canvas.drawImage(specialSpaces, this.img[ this.type ],0,50,100, -this.shape.x, this.shape.y, 50,100);
					canvas.strokeRect(-this.shape.x, this.shape.y , 50,100);
				canvas.restore();
			}
			canvas.save();
				canvas.translate(0,  0);
				canvas.rotate( Math.PI );
				canvas.textAlign = "left";
				canvas.fillStyle = "black";
				if(this.cost.purchase!=0){
					canvas.fillText("$"+this.cost.purchase, (-1*this.shape.x)-35 , -10);
				}
			canvas.restore();			
		}
 
		if(this.id >=11 && this.id<=19){
			if(!this.type){
				canvas.fillRect(this.shape.x+1 , this.shape.y+1 , this.shape.w-80, this.shape.h);
			}else{
				canvas.save();
					canvas.translate(50,100);
					canvas.rotate(-90*Math.PI/180);
					canvas.drawImage(specialSpaces, this.img[ this.type ],0,50,100,   this.shape.x, 500, 50, 100);
					canvas.strokeRect(this.shape.x, 500, 50, 100);
				canvas.restore();
			}
			canvas.save();
				canvas.translate( 650/2, 650/2 );
				canvas.rotate(-10 * Math.PI / 4 );
				canvas.textAlign = "right";
				canvas.fillStyle = "black";
				if(this.cost.purchase!=0){
					canvas.fillText("$"+this.cost.purchase, (this.shape.y*-1)+310 ,315);
				}
			canvas.restore();			
		}
		
		if(this.id >=21 && this.id<=29){
			if(!this.type){
				canvas.fillRect(this.shape.x+1, this.shape.y+1, this.shape.w-2, 20);
			}else{
				canvas.drawImage(specialSpaces, this.img[ this.type ],0,50,100, this.shape.x,this.shape.y ,50,100);
				canvas.strokeRect(this.shape.x,this.shape.y ,50,100);
			}
			
			canvas.fillStyle = "black";
			if(this.cost.purchase!=0){
				canvas.fillText("$"+this.cost.purchase,(this.shape.x+this.shape.w/2),this.shape.y+this.shape.h-10);
			}		
		}	
		
		if(this.id >=31 && this.id<=39){
			if(!this.type){
				canvas.fillRect(this.shape.x+79, this.shape.y-1, this.shape.w-80, this.shape.h);
			}else{
				canvas.save();
					canvas.translate(50,100);
					canvas.rotate(90*Math.PI/180);
					canvas.drawImage(specialSpaces, this.img[ this.type ],0,50,100,   this.shape.x, -50, 48,100);
					canvas.strokeRect(this.shape.x, -50, 50,100);
				canvas.restore()
			}
			
			canvas.save();
				canvas.translate( 650/2, 650/2 );
				canvas.rotate(10 * Math.PI / 4 );
				canvas.textAlign = "right";
				canvas.fillStyle = "black";
				if(this.cost.purchase!=0){
					if(this.name == 'Short Line'){
						//HACK
						canvas.fillText("$"+this.cost.purchase,  300-290,315);	
					}else{
						canvas.fillText("$"+this.cost.purchase,  this.shape.y-290,315);
					}
				}
			canvas.restore();			
		}	
	}
}