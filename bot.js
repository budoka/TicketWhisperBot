console.log('bot.js loaded');
/*
var Guests = mongoose.model('guests', db_model_guest);

module.exports = Guests;
*/
module.exports = function (token, url, port, database) {
    try {
        const TelegramBot = require('node-telegram-bot-api');

        if (!token) {
            console.log('Telegram bot token is missing. Exiting.');
            throw error;
        }

        var botOptions = {};

        if (url) {
            console.log('Request mode: WebHook/Push');
            botOptions.webHook = {
                port: port,
                host: '0.0.0.0'
            };
        } 
        else {
            console.log('Request mode: Update/Polling');
            botOptions.polling = true;
        }

        var bot = new TelegramBot(token, botOptions);

        if (url) {
            //const cert = './crt.pem';
            //bot.setWebHook(url + ':443/bot' + token, cert);
            bot.setWebHook(url + ':443/bot' + token);
        }

        // Matches /r [whatever]
        bot.onText(/\/r (.+)/, function (message, match) {
            var user = message.from.id;
            var text = match[1];
            bot.sendMessage(user, text);
        });

        // Any kind of message
        bot.on('message', function (message) {
            console.log('New message!');
            if(database) {
                querySaveMessage(message);
            }
            //var photo = './public/assets/image/cats-0001.jpg';
            //bot.sendPhoto(user, photo, {caption: 'Lovely kittens'});
        }); 
    }
    catch (Exception) {
        process.exit(1);
    }
};

