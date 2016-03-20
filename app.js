var express =  require('express');
var app = express();
var router = require('./routes/routes.js')(app);
var server = require('http').Server(app);
var path = require("path");
var io = require('socket.io')(server);
var socket = require('./sockets/socket.js')

//var host = '172.16.1.203';
//var host = '172.16.4.146';
var host = 'localhost';
var port = 3000;

app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

app.use('/',  express.static(__dirname + '/public'));
app.use('/',  express.static(__dirname + '/node_modules'));

socket(io);

server.listen(port, host, function() {
    console.log('Listening on port %d %s time to shame', server.address().port, host);
});
