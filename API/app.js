var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

var db = mongoose.connect('mongodb://localhost/projectapi');

var Project = require('./models/projectModel');
var app = express();

var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'origin, content-type, accept');
    if (req.accepts('json' || 'xml' || 'x-www-form-urlencoded')) {
        next();
    } else {
        res.sendStatus(406);
    }
});

//FOR APP

//app2.use(express.static('APP'));


projectRouter = require('./Routes/projectRoutes')(Project);


app.use('/api/Projects', projectRouter);


app.get('/', function(req, res){
    res.send('welcome to my API!');
});

app.listen(port, function(){
    console.log('RUNNING ON PORT:' + port);
});