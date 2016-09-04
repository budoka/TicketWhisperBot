console.log('bot.js loaded');

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

        

        // Matches /d [whatever]
        bot.onText(/\/d (.+)/, function (message, match) {
            var user = message.from.id; //168103840
            var text = match[0].substring(3).toUpperCase();
            console.log(text);

            switch(text) {
                case 'BK EOYC 2015':
                    text = 'https://api.soundcloud.com/tracks/238258275/download?client_id=02gUJC0hH2ct1EGOcYXQIzRFU91c72Ea';
                    break;
                case 'BK GROOVE 2016':
                    text = 'https://api.soundcloud.com/tracks/271991862/download?client_id=02gUJC0hH2ct1EGOcYXQIzRFU91c72Ea';
                    break;
                default:
                    text = 'Set doesn\'t found';
            }


               // text = '"uri":"https://api.soundcloud.com/tracks/238258275/download?client_id=02gUJC0hH2ct1EGOcYXQIzRFU91c72Ea';
        
            bot.sendMessage(user, text);
           // setInterval(() => bot.sendMessage(112255432, text), 1000);
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

