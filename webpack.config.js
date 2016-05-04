var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'eval',
    entry: [
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server', // doesn’t reload the browser upon syntax errors & keeps state
        //'webpack/hot/dev-server', // reloads the entire browser if there's an error, loses state
        'react-hot-loader/patch',
        './src/index'
    ],
    output: {
        path: path.join(__dirname, 'app', 'dist'),
        filename: 'bundle.js',
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        loaders: [{
            test: /\.js$/,
            loaders: ['babel'],
            include: path.join(__dirname, 'src')
        }, {
            test: /\.scss$/,
            loaders: ['style', 'css', 'sass'],
            include: path.join(__dirname, 'src', 'stylesheets')
        }]
    }
};
