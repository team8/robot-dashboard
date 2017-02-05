var canvas = undefined
var ctx = undefined

var SliderBlock = {
	lastPosX: 125,
	lastPosY: 125
}


$(document).ready(function(){
	canvas = document.getElementById("myCanvas")
	ctx = canvas.getContext("2d")


	ctx.fillStyle = "000000"
	ctx.fillRect(0,0,350,350)

	update(0)
	updateLimitSwitches("false","false")
})

function update(x) {
	console.log(x)
	ctx.fillStyle = "000000"
	ctx.fillRect(SliderBlock.lastPosX,SliderBlock.lastPosY,100,100);
	ctx.fillStyle = "#FF0000";
	ctx.fillRect(SliderBlock.lastPosX+x,SliderBlock.lastPosY,100,100);
	SliderBlock.lastPosX = SliderBlock.lastPosX + x;
}

function updateLimitSwitches(left, right) {
	if (left == "true") {
		ctx.fillStyle = "00FF00"
		ctx.fillRect(20,250, 100,100)
	}
	else {
		ctx.fillStyle = "FF0000"
		ctx.fillRect(20,250, 100,100)
	}

	if (right == "true") {
		ctx.fillStyle = "00FF00"
		ctx.fillRect(230,250, 100,100)
	}
	else {
		ctx.fillStyle = "FF0000"
		ctx.fillRect(230,250, 100,100)
	}

}
