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

if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

app.listen(PORT, function() {
    console.log('Server listening on port ' + PORT);
})
