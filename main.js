
let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');

let lineWidth = 2;
let using = false;
let eraserEnabled = false;

autoSetPage();
listenToUser();

function listenToUser(){
	let previousDot = {x: undefined, y: undefined};

	if(document.body.ontouchstart !== undefined){
		// 触控设备
		canvas.ontouchstart = function(a){
			console.log('down')
			using = true;
			let {clientX, clientY} = a;
			if(eraserEnabled){
				context.clearRect(clientX,clientY,20,20);
			}else{
				previousDot = {x: clientX, y: clientY};
			}
		}
		canvas.ontouchmove = function(a){
			console.log('move')
			let x = a.clientX;
			let y = a.clientY;
			if(eraserEnabled){
				if(using){
					context.clearRect(x,y,20,20)
				}
			}else{
				if(using){
					let presentDot = {x: x, y: y};
					drawLine(previousDot.x, previousDot.y, presentDot.x, presentDot.y)
					previousDot = presentDot
				}	
			}
		
		}
		canvas.ontouchend = function(a){
			console.log('up')
			using = false;
		}
		
	}else{
		// 非触控设备
		canvas.onmousedown = function(a){
			console.log('down')
			using = true;
			let {clientX, clientY} = a;
			if(eraserEnabled){
				context.clearRect(clientX,clientY,20,20);
			}else{
				previousDot = {x: clientX, y: clientY};
			}
		}
		canvas.onmousemove = function(a){
			console.log('move')
			let x = a.clientX;
			let y = a.clientY;
			if(eraserEnabled){
				if(using){
					context.clearRect(x,y,20,20)
				}
			}else{
				if(using){
					let presentDot = {x: x, y: y};
					drawLine(previousDot.x, previousDot.y, presentDot.x, presentDot.y)
					previousDot = presentDot
				}	
			}
		
		}
		canvas.onmouseup = function(a){
			console.log('up')
			using = false;
		}

	}
}




function drawCircle(x,y){
	context.beginPath();
	context.arc(x,y,1,0,Math.PI*2);
	context.fill();
}

function drawLine(x1,y1,x2,y2){
	context.beginPath();
	context.moveTo(x1,y1);
	context.lineTo(x2,y2);
	context.stroke();
	context.closePath();
}

function autoSetPage(){
	setPageWidth();
	window.onresize = function(){
		setPageWidth;
	}

	function setPageWidth(){
		let pageWidth = document.documentElement.clientWidth;
		let pageHeight = document.documentElement.clientHeight;
		canvas.width = pageWidth;
		canvas.height = pageHeight;
	}
}
