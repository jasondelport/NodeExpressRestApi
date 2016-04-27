var express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    nobelprizes = require('./routes/nobelprizes'),
    fs = require("fs");

var app = express();

app.use(morgan('dev'));
app.use(morgan('common', {
    stream: fs.createWriteStream('./access.log', {
        flags: 'a'
    })
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.get('/nobelprizes', nobelprizes.findAll);
app.get('/nobelprizes/:id', nobelprizes.findById);
app.post('/nobelprizes', nobelprizes.addNobelPrize);
app.put('/nobelprizes/:id', nobelprizes.updateNobelPrize);
app.delete('/nobelprizes/:id', nobelprizes.deleteNobelPrize);

if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

app.listen(3000);
console.log('Listening on port 3000');
