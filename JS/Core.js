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
    	console.log("hi")
	});
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
	//onRobotConnection(true)
	// sets a function that will be called when the websocket connects/disconnects
	NetworkTables.addWsConnectionListener(onNetworkTablesConnection, true);
	// sets a function that will be called when the robot connects/disconnects
	NetworkTables.addRobotConnectionListener(onRobotConnection, true);
	// sets a function that will be called when any NetworkTables key/value changes
	NetworkTables.addGlobalListener(onValueChanged, true);

<<<<<<< HEAD
	NetworkTables.addKeyListener(NT_TABLE_ID_ADDRESS + "match-time", matchTimeUpdate, true);

	NetworkTables.addKeyListener(NT_TABLE_ID_ADDRESS + "game-period", gamePeriodUpdate, true);

	NetworkTables.addKeyListener(NT_TABLE_ID_ADDRESS + "brownout-status", brownoutUpdate, true);

	NetworkTables.addKeyListener(NT_TABLE_ID_ADDRESS + "battery", batteryUpdate, true);

	NetworkTables.addKeyListener(NT_TABLE_ID_ADDRESS+ "alliance", allianceUpdate, true);

	NetworkTables.addKeyListener("drivetrainstate", updateDrivetrainState(), true);

	NetworkTables.addKeyListener("shooterstate", updateShooterState(), true);

	NetworkTables.addKeyListener("grabberstate", updateGrabberState(), true);

	NetworkTables.addKeyListener("accumulatorstate", updateAccumulatorState(), true);

	NetworkTables.addKeyListener("breacherstate", updateBreacherState(), true);
});

function updateDrivetrainState(key, value, isNew) {
	document.getElementById("drivetrainstate").innerHTML = "Drivetrain state: " + value;
	unfade("drivetrainanimation");
}

function updateShooterState(key, value, isNew) {
	document.getElementById("shooterstate").innerHTML = "Shooter state: " + value;
	unfade("shooteranimation");
}

function updateGrabberState(key, value, isNew) {
	document.getElementById("grabberstate").innerHTML = "Grabber state: " + value;
	unfade("grabberanimation");
}

function updateAccumulatorState(key, value, isNew) {
	document.getElementById("accumulatorstate").innerHTML = "Accumulator state: " + value;
	unfade("accumulatoranimation");
}

function updateBreacherState(key, value, isNew) {
	document.getElementById("breacherstate").innerHTML = "Breacher state: " + value;
	unfade("breacheranimation");
}

function unfade(e) {
	element = document.getElementById(e);
    var opacity = 0.0; 
    element.style.display = 'block';
    var timer = setInterval(function () {
        if (opacity >= 1){
            clearInterval(timer);
        }
        element.style.opacityacity = opacity;
        element.style.filter = 'alpha(opacityacity=' + opacity * 100 + ")";
        opacity += 0.03;
    }, 10);
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
	if (time < 30 && time > 15) {
		document.getElementById("match-time").innerHTML = "Match almost over: " + (120 - (Math.round(time * 100) / 100)) + " seconds left!";
		document.getElementById("matchtimerectangle").style.backgroundColor = "FFCC00";
	} else if (time <= 15) {
		document.getElementById("match-time").innerHTML = "Less than 15 seconds: " + (120 - (Math.round(time * 100) / 100)) + " seconds left!";
		document.getElementById("matchtimerectangle").style.backgroundColor = "B20000";
	} else {
		document.getElementById("match-time").innerHTML = "Match time left: " + (120 - (Math.round(time * 100) / 100)) + " seconds left";
		document.getElementById("matchtimerectangle").style.backgroundColor = "green";
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

function onValueChanged(key, value, isNew) {
	console.log(key + ": " + value)
}