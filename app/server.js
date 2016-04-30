var express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    api = require('./routes/api.js'),
    website = require('./routes/website.js'),
    fs = require("fs");

var app = express();

var PORT = 3000;

app.use(morgan('dev'));
app.use(morgan('common', {
    stream: fs.createWriteStream('./access.log', {
        flags: 'a'
    })
}));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

//http://expressjs.com/en/guide/routing.html
app.use('/api', api);
app.get('/', website.index);
app.get('*', website.index);

app.listen(PORT, function () {
  console.log('App listening on port ' + PORT);
});
