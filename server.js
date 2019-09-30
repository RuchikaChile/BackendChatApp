//Configure the database
require('./config/config');
var mongodb =require("./config/database");
var userCtrl = require('./controller/user_controller');
//require express
var express = require("express");
var app = express();
const http = require('http');
var server = http.createServer(app);



//require cors

var cors = require('cors');

//require express-validator
var expressvalidator = require('express-validator');

var route = require('./routes/user_routes');

//require body-parser
var bodyParser = require("body-parser");

//connecting to frontend 
app.use(express.static('../ChatAppFrontEnd'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressvalidator());
app.use(cors());

//Define a simple route
app.use('/',route);
app.get('/', (req, res) => {
    res.json(
    {
        "Message": "Welcome to Chat App"
    })
});

//Listen for requests
server.listen(process.env.PORT, () => {
    console.log("Server is listening on port", process.env.PORT);
    mongodb.connect;
});

//socket.io
const io = require('socket.io')(server);

io.on('connection',function(socket) {
    console.log('Socket Connected Successfully!!');
    socket.on('createMessage', function (message) {
        console.log(" listening create message ", message);     
        userCtrl.addNewMessage(message, (err, data) => {
            console.log('Message from user', message)
            if (err) {
                console.log("Error..", err);
            }
            else {
                console.log(message, "Message");
                io.emit(message.receiverId, message);
            }
        })
    })                                                                                                                                                  
    socket.on('disconnect' , function() {
        console.log("Socket disconnected");
    })
});