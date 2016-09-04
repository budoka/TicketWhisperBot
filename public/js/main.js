$(document).ready(function(){
	var socket = io();

	$('#toggleChat').on("click", function(){
		 console.log("click");
	});

	$('form').submit(function(){
		var message = $('#message').val();
		if(message.length == 0)
			return false;		
		socket.emit('chat message', $('#message').val());
		$('#message').val('');
		return false;
	});

	socket.on('user connected', function(msg){
    	$('#messages').append($('<li>').text(msg));
	});

	socket.on('user disconnected', function(msg){
    	$('#messages').append($('<li>').text(msg));
	});

	socket.on('chat history', function(msg){
		for(var i = 0; i < msg.length; i++)
    		$('#messages').append($('<li>').text(msg[i].message));
	});

	socket.on('chat message', function(msg){
    	$('#messages').append($('<li>').text(msg));
	});
});