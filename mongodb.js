console.log('Loading mongodb.js');

module.exports = function(schema, ip, port, database, user, password){
  	try {
		const Mongoose = require('mongoose');

		const Uri = schema + '://' + user + ':' + password + '@' + ip + ':' + port + '/' + database;

		Mongoose.Promise = global.Promise;
		Mongoose.connect(Uri, function(error) {
			console.log("Connecting to database: " + Uri);
			if(error) {
				console.log("Connection failed.");
				throw error;
			} 
			else {
				console.log('Connection successfully.');
			}
		});

		var db_model_message = Mongoose.Schema({ 
				userid:       Number, 
				username:     String, 
				text:         String, 
				date:         Number
			});
		console.log('mongodb.js loaded correctly.');

		const Guests = Mongoose.model('guests', db_model_message);

        querySaveMessage = function (message) {
            var userid = message.from.id;
            var username = message.from.username;
            var text = message.text;
            var date = message.date;
            console.log('querySaveMessage()');
            console.log(message);
            var guest = new Guests({userid: userid, username: username, text: text, date: date});
            guest.save(function(error){
                if(error) throw error;
                console.log('Message saved');
            });
        }
	}
	catch (exception) {
		console.log(exception.message);
		console.log('mongodb.js failed at load. Exiting.');
		process.exit(1);
	}
};