var express = require('express'),
    router = express.Router();

exports.index = function(req, res) {
    res.sendFile('./public/index.html');
};
