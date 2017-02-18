// Canvas Variables
var canvas = undefined
var ctx = undefined

// Last Slider Positions
// Valid Slider Positions.  X {10, }
var SliderBlock = {
	lastPosX: 10,
	lastPosY: 125
}

$(document).ready(function(){
	canvas = document.getElementById("myCanvas")
	ctx = canvas.getContext("2d")

	ctx.fillStyle = "000000"
	ctx.fillRect(0,0,350,350)

	update(0, "red")
	updatePotentiometerStatus(true)
	updateSpeedAndPosition("Unset", "Unset")
})


function update(x, color) {
	// Repaint all the lines
	ctx.fillStyle = "FFFFFF"
	ctx.fillRect(8,75,2,215)
	ctx.fillRect(340,75,2,215)
	ctx.fillRect(174,75,2,215)

	// Move the block over
	ctx.fillStyle = "000000"
	ctx.fillRect(SliderBlock.lastPosX,SliderBlock.lastPosY,100,100);
	ctx.fillStyle = color=="red" ? "#e74c3c" : "#27ae60";
	ctx.fillRect(SliderBlock.lastPosX+x,SliderBlock.lastPosY,100,100);
	SliderBlock.lastPosX = SliderBlock.lastPosX + x;

	ctx.fillStyle = "FFFFFF"	
	ctx.fillRect(SliderBlock.lastPosX + 49, SliderBlock.lastPosY,2,100)
}

function updatePotentiometerStatus(working) {
	if (working) {
		ctx.fillStyle = "#27ae60"
		ctx.fillRect(0,300,350,50)
	}
	else {
		ctx.fillStyle = "#e74c3c"
		ctx.fillRect(0,300,350,50)
	}
}

function updateSpeedAndPosition(speed, position) {
	ctx.fillStyle = "000000"
	ctx.fillRect(0,0,350,75)
	ctx.fillStyle = "27ae60"
	ctx.font = "20px Arial";
	text = "SPEED: " + speed + " POSITION: " + position
	ctx.fillText(text,20,50);
}