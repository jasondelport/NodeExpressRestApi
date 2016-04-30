var webpack = require('webpack');
var path = require('path');

var DIST_DIR = path.resolve(__dirname, 'app/public');
var SRC_DIR = path.resolve(__dirname, 'src/app');
var NODE_MODULES_DIR = path.resolve(__dirname, 'node_modules');

var config = {
    entry: SRC_DIR + '/index.js',
    output: {
        path: DIST_DIR,
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\.jsx?/,
            exclude: NODE_MODULES_DIR,
            include: SRC_DIR,
            loader: 'babel'
        }]
    }
};

module.exports = config;
