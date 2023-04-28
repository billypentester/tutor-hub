var mongoose = require('mongoose');
require('dotenv').config();

var mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB, { useNewUrlParser: true });

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection: ' + 'Error'));
db.once('open', console.log.bind(console, 'MongoDB connection: ' + 'Successfull' ));

module.exports = db;
