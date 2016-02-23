var webpack = require('webpack');
var path = require('path');

var root = __dirname;

module.exports = {
	entry: {
		shamer: './views/entries/shameEntry.jsx',
		shameBoard: './views/entries/shameBoardEntry.jsx',
        buildAlertBoard: './views/entries/buildAlertEntry.jsx',
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
            { test: /\.png$/, loader: 'file-loader?name=/img/[name].[ext]' },
            { test: /\.jpg$/, loader: 'file-loader' },
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?public/font-awesome/limit=10000&minetype=application/font-woff" },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,    loader: "url-loader?limit=10000&minetype=application/octet-stream" },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,    loader: "file-loader" },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,    loader: "url-loader?limit=10000&minetype=image/svg+xml" },
            {
                test: /[\/\\]node_modules[\/\\]some-module[\/\\]index\.js$/,
                loader: "imports?this=>window"
            }

        ],
	},
	resolve: {
        extensions: ['', '.js', '.jsx','.styl','.scss'],
        alias: {
        	alias_socket_io: root + '/node_modules/socket.io-client/lib/index.js',
        }

    },

    devtool: 'sourcemap',
    plugins: [
        //the magic that this provides is unreal
        new webpack.ProvidePlugin({
            $: path.join(root, "/bower_components/jquery/dist/jquery.js"),
            jQuery: path.join(root, "/bower_components/jquery/dist/jquery.js")
        })
    ]
};