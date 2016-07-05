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
		in_: true, elem: null
	},
	DebugView: {
		in_: false,
		elem: null
	}
} 

function setElementStatus() {
	Navbar.img.elem = document.getElementById("locked")
	Navbar.MatchView.elem = document.getElementsByClassName("innerheader")[0]
	Navbar.DebugView.elem = document.getElementsByClassName("innerheader")[1]
	Navbar.MatchView.elem.style.backgroundColor = "#3d8e15"
	Navbar.MatchView.elem.style.color = "white"
}
function onNavClick(view) {
	if (view == 'match') {
		if (Navbar.locked == true) return
		Navbar.MatchView.in_ = !Navbar.MatchView.in_
		Navbar.DebugView.in_ = !Navbar.MatchView.in_
		// The selected view mode header will have a green background and white text
		Navbar.MatchView.elem.style.backgroundColor = "#3d8e15"
		Navbar.DebugView.elem.style.backgroundColor = ""
		Navbar.MatchView.elem.style.color = "white"
		Navbar.DebugView.elem.style.color = ""
		// Toggles the two display objects(one for each view)
		// Should probably put these in a structural element
		document.getElementsByClassName("testmatchobject")[0].style.visibility="visible"
		document.getElementsByClassName("testdebugobject")[0].style.visibility="hidden"
	} else {
		// view == 'debug'
		if (Navbar.locked == true) return
		Navbar.DebugView.in_ = !Navbar.DebugView.in_
		Navbar.MatchView.in_ = !Navbar.DebugView.in_
		Navbar.DebugView.elem.style.backgroundColor = "#3d8e15"
		Navbar.MatchView.elem.style.backgroundColor = ""
		Navbar.DebugView.elem.style.color = "white"
		Navbar.MatchView.elem.style.color = ""
		document.getElementsByClassName("testmatchobject")[0].style.visibility="hidden"
		document.getElementsByClassName("testdebugobject")[0].style.visibility="visible"
	}
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
		// sets a function that will be called when the websocket connects/disconnects
		NetworkTables.addWsConnectionListener(onNetworkTablesConnection, true);
		// sets a function that will be called when the robot connects/disconnects
		NetworkTables.addRobotConnectionListener(onRobotConnection, true);
		// sets a function that will be called when any NetworkTables key/value changes
		NetworkTables.addGlobalListener(onValueChanged, true);
});

/*
NetworkTable functions.
*/
function onRobotConnection(connected) {}
function onNetworkTablesConnection(connected) {}
function onValueChanged(key, value, isNew) {}