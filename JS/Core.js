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

	document.getElementById("autochooser").style.top = 400
	document.getElementById("chooser").style.top = 400
	document.getElementById("chooserbutton").style.top = 403
	document.getElementById("autochooserstatus").style.top = 400

	document.getElementById("usbvideoelement").style.visibility = "visible"
	document.getElementById("feedgoal").style.visibility = "visible"
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

	document.getElementById("autochooser").style.top = 450
	document.getElementById("chooser").style.top = 450
	document.getElementById("chooserbutton").style.top = 450
	document.getElementById("autochooserstatus").style.top = 450

	document.getElementById("usbvideoelement").style.visibility = "hidden"
	document.getElementById("feedgoal").style.visibility = "hidden"
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
});

/*
Retrieves the entered autonomous path from the input form
and submits it to the networktables 
*/
function submitAutoPath() {
	var path = document.getElementById("chooser").value;
	NetworkTables.putValue(NT_TABLE_ID_ADDRESS + "autopath", path);
	document.getElementById("autonomouspath").innerHTML = "Current auto path: " + path;
	document.getElementById("autonomouspath").style.opacity = 1.0;
	document.getElementById("autonomouspath").style.backgroundColor = "green";
	unfade("chooserrectangle");
}

/*
NetworkTable functions.
*/
function onRobotConnection(connected) {
	if (connected) {
		document.getElementById("robostatus").innerHTML = "Robot status: CONNECTED";
		document.getElementById("robostatus").style.backgroundColor = "green";
	} 
	else {
		document.getElementById("robostatus").innerHTML = "Robot status: DISCONNECTED";
		document.getElementById("robostatus").style.backgroundColor = "red";
	}
}

/*
Displays network connection status. Changes color to red
if not connected 
*/
function onNetworkTablesConnection(connected) {
	console.log(connected)
	if (connected) {
		document.getElementById("networkstatus").innerHTML = "Network status: CONNECTED";
		document.getElementById("networkstatus").style.backgroundColor = "green";
	} else {
		document.getElementById("networkstatus").innerHTML = "Network status: DISCONNECTED";
		document.getElementById("networkstatus").style.backgroundColor = "red";
	}
}

/*
Displays match time. Changes color to yellow if under 30 seconds 
and to red if under 15 seconds, with different messages for each.
*/
function matchTimeUpdate(key, time, isNew) {
	if (Math.round(time) < 30 && Math.round(time) > 15) {
		document.getElementById("match-time").innerHTML = "Match almost over: " + Math.round(time) + " seconds left!";
		document.getElementById("match-time").style.backgroundColor = "yellow";
	} else if (Math.round(time) <= 15) {
		document.getElementById("match-time").innerHTML = "Less than 15 seconds: " + Math.round(time) + " seconds left!";
		document.getElementById("match-time").style.backgroundColor = "red";
	} else {
		document.getElementById("match-time").innerHTML = "Match time left: " + Math.round(time) + " seconds left";
		document.getElementById("match-time").style.backgroundColor = "blue";
	}
}

/*
Displays the game period. Changes color to red if disabled, but
otherwise remains black. 
*/
function gamePeriodUpdate(key, period, isNew) {
	if (period == "DISABLED") {
		document.getElementById("game-period").innerHTML = "Game period: " + period;
		document.getElementById("game-period").style.backgroundColor = "B20000";
	} else {
		document.getElementById("game-period").innerHTML = "Game period: " + period;
		document.getElementById("game-period").style.backgroundColor = "green";
	}
}

/*
Displays the battery voltage. Changes color to yellow if voltage is below 7.5
*/
function batteryUpdate(key, voltage, isNew) {
	if (voltage < 7.5) {
		document.getElementById("battery").innerHTML = "We might be browning out at: " + (Math.round(voltage * 100) / 100) + " volts.";
		document.getElementById("battery").style.backgroundColor = "FFCC00";
	} else {
		document.getElementById("battery").innerHTML = "Battery voltage: " + (Math.round(voltage * 100) / 100) + " volts";
		document.getElementById("battery").style.backgroundColor = "green";
	}
}

/*
Displays whether or not we are browning out. If we are, change the color to 
red with a different message
*/
function brownoutUpdate(key, status, isNew) { //True for browning out, false if we are good on battery
	if (status) {
		document.getElementById("brownout-status").innerHTML = "We are browning out!";
		document.getElementById("brownout-status").style.backgroundColor = "B20000";
	} else {
		document.getElementById("brownout-status").innerHTML = "Not browning out now.";
		document.getElementById("brownout-status").style.backgroundColor = "green";
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

function onValueChanged(key, value, isNew) {
	console.log(key + ": " + value)
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