var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

var PORT = 8080;

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true,
    proxy: {
        '/api*': {
            target: 'http://localhost:3000',
            secure: false
        }
    }
}).listen(PORT, 'localhost', function(err, result) {
    if (err) {
        return console.log(err);
    }

    console.log('Listening on port ' + PORT);
});
