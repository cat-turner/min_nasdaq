// Define your db connections with mongoose
var mongoose = require('mongoose');

var dburl = "mongodb://" + process.env.IP + ':27017/app_data';

mongoose.connect(dburl);

// event listener for db connection
mongoose.connection.on('connected', function(){
    console.log('Mongoose connected to ' + dburl)
});

// event listener for disconnected

mongoose.connection.on('disconnected', function(){
    console.log('Mongoose disconnected')
});

// event listener for error
mongoose.connection.on('error', function(err){
    console.log('Mongoose connection error ' + err)
});

/// event listeners for different ways to terminate processes

// mongoose, disconnected through app termination
process.on('SIGINT', function(){
    mongoose.connection.close(function(){
        console.log('connection closed');
        process.exit(0);
    });
});


// mongoose, disconnected through app termination -for heroku
process.on('SIGTERM', function(){
    mongoose.connection.close(function(){
        console.log('connection closed');
        process.exit(0);
    });
});

// when you restart nodemon, you want to be able to kill the old connection
//for nodemon to pick up on the action 
// this happens when you hit 'rs' in the console

process.once('SIGUSR2', function(){
    mongoose.connection.close(function(){
        console.log('connection closed');
        process.kill(process.pid, 'SIGUSR2');
    });
});

// bring in the schemas and models
require('./stocks.model');
require('./users.model');
