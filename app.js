console.log('app.js loaded');

var express 	= require('express'),
	http 		= require('http'),
	socketIO 	= require('socket.io'),
	app 		= express(),
	server 		= http.createServer(app),
	io 			= socketIO.listen(server),
	port 		= process.env.PORT;

app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res){ 
	res.sendFile(__dirname + '/public/views/index.html');
});  

server.listen(port, function(){
	console.log('\n					+-----------------------------+');
	console.log('					| Server Running - Port: ' + port + ' |');
	console.log('					+-----------------------------+\n');
}); 

setInterval(() => io.emit('time', new Date().toTimeString()), 1000);