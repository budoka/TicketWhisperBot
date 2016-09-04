console.log('index.js loaded');

const ENV = process.env;
console.log("Enviroment: " + ENV.NODE_ENV);

if(ENV.NODE_ENV == 'dev') 
  require('dotenv').config();
else
  console.log("URL: " + ENV.BOT_URL);
console.log("Token: " + ENV.BOT_TOKEN);

var database = require('./mongodb')
    bot      = require('./bot');
//require('./app');
database(ENV.DB_SCHEMA, ENV.DB_IP, ENV.DB_PORT, ENV.DB_DATABASE, ENV.DB_USER, ENV.DB_PASSWORD);
bot(ENV.BOT_TOKEN, ENV.BOT_URL, ENV.PORT, database);
