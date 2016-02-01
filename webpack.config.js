var webpack = require('webpack');
var path = require('path');

var root = __dirname;

module.exports = {
	entry: {
		shamer: './views/entries/shameEntry.jsx',
		shameBoard: './views/entries/shameBoardEntry.jsx',
        testBoard: './views/entries/testBuildEntry.jsx',
	},
	output: {
		path: path.join(__dirname,'public/js'),
		filename: '[name].js',
	},
	module: {
		loaders: [
            { test: /\.jsx$/, loader: 'jsx-loader' },
            { test: /\.css$/, loader: "style-loader!css-loader" },
            { test: /\.scss$/, loaders: ["style", "css", "sass"]},
            
            { test: /bootstrap\/js\//, loader: 'imports?jQuery=jquery' },
            { test: /\.png$/, loader: 'file-loader' },
            { test: /\.(woff|woff2)$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,    loader: "url-loader?limit=10000&minetype=application/octet-stream" },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,    loader: "file-loader" },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,    loader: "url-loader?limit=10000&minetype=image/svg+xml" }

        ],
	},
	resolve: {
        extensions: ['', '.js', '.jsx','.styl','.scss'],
        alias: {
        	alias_socket_io: root + '/node_modules/socket.io-client/lib/index.js',
        }

    },
    devtool: 'sourcemap',
};