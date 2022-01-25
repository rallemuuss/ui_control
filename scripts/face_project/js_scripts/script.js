//var url_ = "ws://192.168.87.18:9090"; 
var url_ = "ws://localhost:9090"
var url_ = "ws://0.0.0.0:9090"
var	ros;
var setMoodServer;

function connect() {
	ros	= new ROSLIB.Ros({
		url:  url_ });

	ros.on("connection", function () {
		console.log("Connected to websocket	server.");
		createRosConnections() 
	});

	ros.on("error",	function (error) {
		console.log("Error connecting to websocket server: ", error);
	});

	ros.on("close",	function () {
		console.log("Connection	to websocket server	closed.");
		setTimeout(connect,5000);
		console.log("Attempting reconnect")
	});
}
connect();


function createRosConnections() {
	// Subscribing to a	Topic
	// ----------------------
	// Currently unused...

	var	listener = new ROSLIB.Topic({
		ros: ros,
		name:	"/ui/look",
		messageType: "std_msgs/String" });


	listener.subscribe(function	(message) {
		console.log("Received	message	on " + listener.name + ": "	+ message.data);
	});

	// Creating a service 
	// ----------------------
	// The Service object does double duty for both calling and advertising services
	// Handles setting of mood of eyes.
	setMoodServer = new ROSLIB.Service({
		ros : ros,
		name : '/ui_control/setmood',
		serviceType : '/ui_control/ui_mood'
	});

	// Use the advertise() method to indicate that we want to provide this service
	setMoodServer.advertise(function(request, response) {
		console.log('Received service request on ' + setMoodServer.name + ': ' + request.mood);
		if (face_functionality.setMood(request.mood)) {
			response['response'] = 'Set successfully';
			console.log('I understood the assignment')
		}
		else {
			response['response'] = 'Unknown command';
			console.log("I don't know what mood = '" + request.mood + "' means")
		}
		return true;
	});

}

//import { look_around,	blink }	from './face_functionality.js';
import * as face_functionality from	'./face_functionality.js';
face_functionality.look_around(true);
face_functionality.blink(true);

console.log("Script.js loaded ok");
