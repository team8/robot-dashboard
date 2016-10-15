/*
Document structural elements.
*/
var Navbar = {
	locked: false,
	img: {
		elem: null,
		unlocked_img: "../Images/unlocked.jpeg",
		lock_img: "../Images/locked_img.jpeg"
	},
	MatchView: {
		in_: true,
		elem: null
	},
	DebugView: {
		in_: false,
		elem: null
	}
}

const NT_TABLE_ID_ADDRESS = "/RobotTable/"

function setElementStatus() {
	Navbar.img.elem = document.getElementById("locked")
	Navbar.MatchView.elem = document.getElementsByClassName("innerheader")[0]
	Navbar.DebugView.elem = document.getElementsByClassName("innerheader")[1]
	Navbar.MatchView.elem.style.textDecoration = "underline"
}
function onNavClick(view) {
	if (view == 'match') {
		if (Navbar.locked == true) return
		Navbar.MatchView.in_ = !Navbar.MatchView.in_
		Navbar.DebugView.in_ = !Navbar.MatchView.in_
		onMatchElemFunc()
	} else {
		// view == 'debug'
		if (Navbar.locked == true) return
		Navbar.DebugView.in_ = !Navbar.DebugView.in_
		Navbar.MatchView.in_ = !Navbar.DebugView.in_
		onDebugElemFunc()
	}
} 

/*
Do something to the elements on match view select.
*/
function onMatchElemFunc() {
	Navbar.MatchView.elem.style.textDecoration = "underline"
	Navbar.DebugView.elem.style.textDecoration = ""	
	Array.prototype.forEach.call(document.getElementsByClassName("match-container"), function(element) {
    	element.style.visibility = "visible"
	});
	Array.prototype.forEach.call(document.getElementsByClassName("debug-container"), function(element) {
    	element.style.visibility = "hidden"
	});
	Array.prototype.forEach.call(document.getElementsByClassName("subsystem-states"), function(element) {
		element.style.visibility = "hidden"
	});
	document.getElementById("robostatus").style.visibility = "hidden"
	document.getElementById("networkstatus").style.visibility = "hidden"
	document.getElementById("match-time").style.visibility = "hidden"
	document.getElementById("game-period").style.visibility = "hidden"
	document.getElementById("brownout-status").style.visibility = "hidden"
	document.getElementById("battery").style.visibility = "hidden"
	document.getElementById("gametime").style.visibility = "visible"
	document.getElementById("autonomouspath").style.position = "absolute"
	document.getElementById("autonomouspath").style.top = 370

	document.getElementById("robotstatusrectangle").style.visibility = "hidden"
	document.getElementById("networkstatusrectangle").style.visibility = "hidden"
	document.getElementById("matchtimerectangle").style.visibility = "hidden"
	document.getElementById("gameperiodrectangle").style.visibility = "hidden"
	document.getElementById("brownoutstatusrectangle").style.visibility = "hidden"
	document.getElementById("batterystatusrectangle").style.visibility = "hidden"
	document.getElementById("chooserrectangle").style.top = 435

	document.getElementById("autochooser").style.top = 400
	document.getElementById("chooser").style.top = 400
	document.getElementById("chooserbutton").style.top = 403
	document.getElementById("autochooserstatus").style.top = 400

	document.getElementById("drivetrainanimation").style.visibility = "hidden"
	document.getElementById("shooteranimation").style.visibility = "hidden"
	document.getElementById("grabbermacroanimation").style.visibility = "hidden"
	document.getElementById("grabbermicroanimation").style.visibility = "hidden"
	document.getElementById("accumulatoranimation").style.visibility = "hidden"
	document.getElementById("breachermacroanimation").style.visibility = "hidden"
	document.getElementById("breachermicroanimation").style.visibility = "hidden"

	document.getElementById("usbvideoelement").style.visibility = "visible"
	document.getElementById("feedgoal").style.visibility = "visible"
	document.getElementById("feedaccumulate").style.visibility = "visible"
}

/*
Do something to the elements on debug mode select.
*/
function onDebugElemFunc() {
	Navbar.MatchView.elem.style.textDecoration = ""
	Navbar.DebugView.elem.style.textDecoration = "underline"
	Array.prototype.forEach.call(document.getElementsByClassName("match-container"), function(element) {
		element.style.visibility = "hidden"
	});
	Array.prototype.forEach.call(document.getElementsByClassName("debug-container"), function(element) {
    	element.style.visibility = "visible"
	});
	Array.prototype.forEach.call(document.getElementsByClassName("subsystem-states"), function(element) {
		element.style.visibility = "visible"
	});
	Array.prototype.forEach.call(document.getElementsByClassName("robot-status"), function(element) {
		element.style.visibility = "visible"
	});
	document.getElementById("robostatus").style.visibility = "visible"
	document.getElementById("networkstatus").style.visibility = "visible"
	document.getElementById("match-time").style.visibility = "visible"
	document.getElementById("game-period").style.visibility = "visible"
	document.getElementById("brownout-status").style.visibility = "visible"
	document.getElementById("battery").style.visibility = "visible"
	document.getElementById("gametime").style.visibility = "hidden"

	document.getElementById("robotstatusrectangle").style.visibility = "visible"
	document.getElementById("networkstatusrectangle").style.visibility = "visible"
	document.getElementById("matchtimerectangle").style.visibility = "visible"
	document.getElementById("gameperiodrectangle").style.visibility = "visible"
	document.getElementById("brownoutstatusrectangle").style.visibility = "visible"
	document.getElementById("batterystatusrectangle").style.visibility = "visible"
	document.getElementById("autonomouspath").style.top = 263
	document.getElementById("chooserrectangle").style.top = 328

	document.getElementById("autochooser").style.top = 381
	document.getElementById("chooser").style.top = 380
	document.getElementById("chooserbutton").style.top = 383
	document.getElementById("autochooserstatus").style.top = 381

	document.getElementById("drivetrainanimation").style.visibility = "visible"
	document.getElementById("shooteranimation").style.visibility = "visible"
	document.getElementById("grabbermacroanimation").style.visibility = "visible"
	document.getElementById("grabbermicroanimation").style.visibility = "visible"
	document.getElementById("accumulatoranimation").style.visibility = "visible"
	document.getElementById("breachermacroanimation").style.visibility = "visible"
	document.getElementById("breachermicroanimation").style.visibility = "visible"

	document.getElementById("usbvideoelement").style.visibility = "hidden"
	document.getElementById("feedgoal").style.visibility = "hidden"
	document.getElementById("feedaccumulate").style.visibility = "hidden"
}
/*
Updates the Status of the Lock Icon
*/
function updateLocked() {
	Navbar.locked = !Navbar.locked
	if (Navbar.locked) {
		Navbar.img.elem.src = Navbar.img.lock_img;
		// The mouse will display a certain symbol when hovering over the headers
		Navbar.MatchView.elem.style.cursor = "not-allowed"
		Navbar.DebugView.elem.style.cursor = "not-allowed"
	} else {
		Navbar.img.elem.src = Navbar.img.unlocked_img;
		Navbar.MatchView.elem.style.cursor = "pointer"
		Navbar.DebugView.elem.style.cursor = "pointer"
	}
}

$(document).ready(function(){
	setElementStatus()
	updateLocked()
	onMatchElemFunc()
	handleUSBVideo()
	//onRobotConnection(true)
	// sets a function that will be called when the websocket connects/disconnects
	NetworkTables.addWsConnectionListener(onNetworkTablesConnection, true);
	// sets a function that will be called when the robot connects/disconnects
	NetworkTables.addRobotConnectionListener(onRobotConnection, true);
	// sets a function that will be called when any NetworkTables key/value changes
	NetworkTables.addGlobalListener(onValueChanged, true);

	NetworkTables.addKeyListener(NT_TABLE_ID_ADDRESS + "match-time", matchTimeUpdate, true);

	NetworkTables.addKeyListener(NT_TABLE_ID_ADDRESS + "match-time", gameTimeUpdate, true);

	NetworkTables.addKeyListener(NT_TABLE_ID_ADDRESS + "game-period", gamePeriodUpdate, true);

	NetworkTables.addKeyListener(NT_TABLE_ID_ADDRESS + "brownout-status", brownoutUpdate, true);

	NetworkTables.addKeyListener(NT_TABLE_ID_ADDRESS + "battery", batteryUpdate, true);

	NetworkTables.addKeyListener(NT_TABLE_ID_ADDRESS+ "alliance", allianceUpdate, true);

	NetworkTables.addKeyListener(NT_TABLE_ID_ADDRESS + "drivetrainstate", updateDrivetrainState, true);

	NetworkTables.addKeyListener(NT_TABLE_ID_ADDRESS + "shooterstate", updateShooterState, true);

	NetworkTables.addKeyListener(NT_TABLE_ID_ADDRESS + "grabbermacrostate", updateGrabberMacroState, true);

	NetworkTables.addKeyListener(NT_TABLE_ID_ADDRESS + "grabbermicrostate", updateGrabberMicroState, true);

	NetworkTables.addKeyListener(NT_TABLE_ID_ADDRESS + "accumulatorstate", updateAccumulatorState, true);

	NetworkTables.addKeyListener(NT_TABLE_ID_ADDRESS + "breachermacrostate", updateBreacherMacroState, true);

	NetworkTables.addKeyListener(NT_TABLE_ID_ADDRESS + "breachermicrostate", updateBreacherMicroState, true);

	NetworkTables.addKeyListener(NT_TABLE_ID_ADDRESS + "pvalue", pValueUpdate, true);

	NetworkTables.addKeyListener(NT_TABLE_ID_ADDRESS + "dvalue", dValueUpdate, true);

	NetworkTables.addKeyListener(NT_TABLE_ID_ADDRESS + "ivalue", iValueUpdate, true);
});

function updateDrivetrainState(key, value, isNew) {
	document.getElementById("drivetrainstate").innerHTML = "Drivetrain state: " + value;
	unfade("drivetrainanimation");
}

function updateShooterState(key, value, isNew) {
	document.getElementById("shooterstate").innerHTML = "Shooter state: " + value;
	unfade("shooteranimation");
}

function updateGrabberMacroState(key, value, isNew) {
	document.getElementById("grabbermacrostate").innerHTML = "Grabber macro state: " + value;
	unfade("grabbermacroanimation");
}

function updateGrabberMicroState(key, value, isNew) {
	document.getElementById("grabbermicrostate").innerHTML = "Grabber micro state: " + value;
	unfade("grabbermicroanimation");
}

function updateAccumulatorState(key, value, isNew) {
	document.getElementById("accumulatorstate").innerHTML = "Accumulator state: " + value;
	unfade("accumulatoranimation");
}

function updateBreacherMacroState(key, value, isNew) {
	document.getElementById("breachermacrostate").innerHTML = "Breacher macro state: " + value;
	unfade("breachermacroanimation");
}

function updateBreacherMicroState(key, value, isNew) {
	document.getElementById("breachermicrostate").innerHTML = "Breacher micro state: " + value;
	unfade("breachermicroanimation");
}

function unfade(e) {
	element = document.getElementById(e);
    var opacity = 0.0; 
    element.style.display = 'block';
    var timer = setInterval(function () {
        if (opacity >= 1){
            clearInterval(timer);
        }
        element.style.opacity = opacity;
        element.style.filter = 'alpha(opacity=' + opacity * 100 + ")";
        opacity += 0.01;
    }, 10);
}

/*
Retrieves the entered autonomous path from the input form
and submits it to the networktables 
*/
function submitAutoPath() {
	var path = document.getElementById("chooser").value;
	NetworkTables.putValue(NT_TABLE_ID_ADDRESS + "autopath", path);
	document.getElementById("autonomouspath").innerHTML = "Current auto path: " + path;
	document.getElementById("autochooserstatus").style.opacity = 1.0;
	document.getElementById("chooserrectangle").style.backgroundColor = "green";
	unfade("chooserrectangle");
}

function submitP() {
	var p = document.getElementById("setp").value;
	NetworkTables.putValue(NT_TABLE_ID_ADDRESS + "pvalue", p);
}

function submitI() {
	var i = document.getElementById("seti").value;
	NetworkTables.putValue(NT_TABLE_ID_ADDRESS + "ivalue", i);
}

function submitD() {
	var d = document.getElementById("setd").value;
	NetworkTables.putValue(NT_TABLE_ID_ADDRESS + "dvalue", d);
}

/*
NetworkTable functions.
*/
function onRobotConnection(connected) {
	if (connected) {
		document.getElementById("robostatus").innerHTML = "Robot status: CONNECTED";
		document.getElementById("robotstatusrectangle").style.backgroundColor = "green";
	} 
	else {
		document.getElementById("robostatus").innerHTML = "Robot status: DISCONNECTED";
		document.getElementById("robotstatusrectangle").style.backgroundColor = "red";
	}
}

/*
Displays network connection status. Changes color to red
if not connected 
*/
function onNetworkTablesConnection(connected) {
	if (connected) {
		document.getElementById("networkstatus").innerHTML = "Network status: CONNECTED";
		document.getElementById("networkstatusrectangle").style.backgroundColor = "green";
	} else {
		document.getElementById("networkstatus").innerHTML = "Network status: DISCONNECTED";
		document.getElementById("networkstatusrectangle").style.backgroundColor = "red";
	}
}

/*
Displays match time. Changes color to yellow if under 30 seconds 
and to red if under 15 seconds, with different messages for each.
*/
function matchTimeUpdate(key, time, isNew) {
	if (Math.round(time) < 30 && Math.round(time) > 15) {
		document.getElementById("match-time").innerHTML = "Match almost over: " + Math.round(time) + " seconds left!";
		document.getElementById("matchtimerectangle").style.backgroundColor = "yellow";
	} else if (Math.round(time) <= 15) {
		document.getElementById("match-time").innerHTML = "Less than 15 seconds: " + Math.round(time) + " seconds left!";
		document.getElementById("matchtimerectangle").style.backgroundColor = "red";
	} else {
		document.getElementById("match-time").innerHTML = "Match time left: " + Math.round(time) + " seconds left";
		document.getElementById("matchtimerectangle").style.backgroundColor = "blue";
	}
}

/*
Displays the game period. Changes color to red if disabled, but
otherwise remains black. 
*/
function gamePeriodUpdate(key, period, isNew) {
	if (period == "DISABLED") {
		document.getElementById("game-period").innerHTML = "Game period: " + period;
		document.getElementById("gameperiodrectangle").style.backgroundColor = "B20000";
	} else {
		document.getElementById("game-period").innerHTML = "Game period: " + period;
		document.getElementById("gameperiodrectangle").style.backgroundColor = "green";
	}
}

/*
Displays the battery voltage. Changes color to yellow if voltage is below 7.5
*/
function batteryUpdate(key, voltage, isNew) {
	if (voltage < 7.5) {
		document.getElementById("battery").innerHTML = "We might be browning out at: " + (Math.round(voltage * 100) / 100) + " volts.";
		document.getElementById("batterystatusrectangle").style.backgroundColor = "FFCC00";
	} else {
		document.getElementById("battery").innerHTML = "Battery voltage: " + (Math.round(voltage * 100) / 100) + " volts";
		document.getElementById("batterystatusrectangle").style.backgroundColor = "green";
	}
}

/*
Displays whether or not we are browning out. If we are, change the color to 
red with a different message
*/
function brownoutUpdate(key, status, isNew) { //True for browning out, false if we are good on battery
	if (status) {
		document.getElementById("brownout-status").innerHTML = "We are browning out!";
		document.getElementById("brownoutstatusrectangle").style.backgroundColor = "B20000";
	} else {
		document.getElementById("brownout-status").innerHTML = "Not browning out now.";
		document.getElementById("brownoutstatusrectangle").style.backgroundColor = "green";
	}
}

/*
Displays what alliance we are on by coloring in the menu bar at the top. 
*/
function allianceUpdate(key, alliance, isNew) {
	if (alliance == "red") {
		document.getElementById("header").style.backgroundColor = "red";
	} else if (alliance == "blue") {
		document.getElementById("header").style.backgroundColor = "blue";
	}
}

function gameTimeUpdate(key, time, isNew) {
	document.getElementById("gametime").innerHTML = Math.round(time);
	if (Math.round(time) < 30 && Math.round(time) > 15) {
		document.getElementById("gametime").style.color = "yellow";
	} else if (Math.round(time) <= 15) {
		document.getElementById("gametime").style.color = "red";
	} else {
		document.getElementById("gametime").style.color = "blue";
	}
}

function pValueUpdate(key, p, isNew) {
	document.getElementById("pvalue").innerHTML = p;
}

function iValueUpdate(key, i, isNew) {
	document.getElementById("ivalue").innerHTML = i;
}

function dValueUpdate(key, d, isNew) {
	document.getElementById("dvalue").innerHTML = d;
}

function onValueChanged(key, value, isNew) {
	console.log(key + ": " + value)
}

function unfade(e) {
	element = document.getElementById(e);
    var opacity = 0.0; 
    element.style.display = 'block';
    var timer = setInterval(function () {
        if (opacity >= 1){
            clearInterval(timer);
        }
        element.style.opacity = opacity;
        element.style.filter = 'alpha(opacity=' + opacity * 100 + ")";
        opacity += 0.01;
    }, 10);
}

function handleUSBVideo() {
	var video = document.querySelector("#usbvideoelement");
 
	navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;
 
	if (navigator.getUserMedia) {       
    	navigator.getUserMedia({video: true}, handleVideo, videoError);
	}
 
	function handleVideo(stream) {
    	video.src = window.URL.createObjectURL(stream);
	}
 
	function videoError(e) {
    	// do something
	}
}