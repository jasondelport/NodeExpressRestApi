var express = require('express'),
    router = express.Router();

exports.index = function(req, res) {
    res.sendFile("index.html", {"root": 'app/public'});
};
