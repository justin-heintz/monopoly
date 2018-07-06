class dice{
	constructor(){
		this.rolled = [];
		this.engine = Random.engines.mt19937().autoSeed();
	}
	roll(){
		this.rolled = [];
		this.rolled.push(Random.integer(1, 6)(this.engine));
		this.rolled.push(Random.integer(1, 6)(this.engine));
	}
	draw(canvas){
		for(let i=0; i<this.rolled.length; i++){
			this.drawDice(canvas, 250 + (i*100), 150, 35, this.rolled[i], "#fff", "#000");		
		}
 	}
	drawDice(canvas, x, y, size, value, diceColor, dotColor){
		var dots = [];
	
		canvas.save();
			canvas.fillStyle = diceColor;
			canvas.translate(x, y);
			this.roundRect(canvas, 0, 0, size, size, size*0.1, true, true);

			//define dot locations
			var padding = 0.25;
			var x, y;
			
			x = padding*size;
			y = padding*size;
			
			dots.push({x: x, y: y});
			y = size*0.5;
			
			dots.push({x: x, y: y});
			y = size * (1-padding);
			
			dots.push({x: x, y: y});
			x = size*0.5;
			y = size*0.5;
			
			dots.push({x: x, y: y});
			x = size * (1-padding);
			y = padding*size;
			
			dots.push({x: x, y: y});
			y = size*0.5;
			
			dots.push({x: x, y: y});
			y = size * (1-padding);
			dots.push({x: x, y: y});
	 
			var dotsToDraw;
			
			if (value == 1){ 
				dotsToDraw = [3];
			}else if (value == 2){
				dotsToDraw = [0, 6];
			}else if (value == 3){ 
				dotsToDraw = [0, 3, 6];
			}else if (value == 4){ 
				dotsToDraw = [0, 2, 4, 6];
			}else if (value == 5){ 
				dotsToDraw = [0, 2, 3, 4, 6];
			}else if (value == 6){ 
				dotsToDraw = [0, 1, 2, 4, 5, 6];
			}

			canvas.fillStyle = dotColor;
			for (var i=0; i<dotsToDraw.length; i++) {
				canvas.beginPath();
					var j = dotsToDraw[i];
					canvas.arc(dots[j].x, dots[j].y, size*0.07, 0, 2*Math.PI);
					canvas.fill();
				canvas.closePath();
			}
		canvas.restore()
	}	
	roundRect(canvas, x, y, width, height, radius=5, fill, stroke) {

		radius = {tl: radius, tr: radius, br: radius, bl: radius};

		canvas.beginPath();
			canvas.moveTo(x + radius.tl, y);
			canvas.lineTo(x + width - radius.tr, y);
			canvas.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
			canvas.lineTo(x + width, y + height - radius.br);
			canvas.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
			canvas.lineTo(x + radius.bl, y + height);
			canvas.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
			canvas.lineTo(x, y + radius.tl);
			canvas.quadraticCurveTo(x, y, x + radius.tl, y);
		canvas.closePath();
		
		canvas.fill();   
		canvas.lineWidth="0.5";
		canvas.stroke(); 
		 
	}	
}