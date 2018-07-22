var express = require('express');
var app = express();                                        // create our app w/ express

//var morgan = require('morgan');                           // log requests to the console (express4)
var bodyParser = require('body-parser');                    // pull information from HTML POST (express4)
var methodOverride = require('method-override');            // simulate DELETE and PUT (express4)
var path = require('path');

var mailerApi = require('./server/mailerApi');              // mailer api module


// configuration =================

//app.use(express.static('.'));
app.use(express.static(__dirname + '/app'));                // set the static files location /public/img will be /img for users
//app.use(morgan('dev'));                                   // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));        // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                 // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

// listen (start app with node server.js) ======================================
app.listen(8123, function () {
    console.log('Express server started!!!');
    console.log("App listening on port 8123");
});


// api definition =================

app.post('/api/mail', function (request, response) {
    mailerApi.sendMail(request.body)
    .then(message =>
    {
        console.log('****app.post(/api/mail OK *****' + message);
        response.status(200).send({message: message});        
    })
    .catch(err=>
    {
        console.log('****app.post(/api/mail FAIL *****' + err);
        response.status(400).send({message: err});
    })
    
});

app.get('/', function (request, response) {
    response.sendFile('index.html', { root: path.join(__dirname, './app') });
});



