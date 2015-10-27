'use strict';

/** ====================================================================================
    ====================================================================================
    WEBPACK CONFIGURATION - SEE BROWSERSYNC WHERE THIS IS PULLED IN AS MIDDLEWARE
    ====================================================================================
    ==================================================================================== */

import webpack from 'webpack';
import path from 'path';

const devServer = {
    contentBase: path.resolve(__dirname, '../../public'),
    colors: true,
    quiet: false,
    noInfo: false,
    publicPath: '/static/',
    historyApiFallback: true,
    host: '127.0.0.1',
    port: 4000,
    hot: true
};

module.exports = {
    debug: true,
    devServer: devServer,
    devtool: '#eval-source-map', //'#source-map'
    context: path.resolve(__dirname, '../../' ), //  __dirname,
    entry: [
        //'webpack-dev-server/client?http://localhost:8080',
        //'webpack/hot/only-dev-server',
        'webpack/hot/dev-server',
        'webpack-hot-middleware/client', //  'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
        './assets/main.js'
    ],
    output: {
        path: path.resolve(__dirname, '../../public/js'),
        filename: 'bundle.js',
        publicPath: '/static/', // this is basically store in memory
        pathinfo: true
    },

    module: {
        loaders: [
            { test: /\.js?$/, exclude: /node_modules/, loader: 'babel-loader' },
            { test: /\.html$/, loader: 'html-loader' },
        ],
    },
    progress: true,
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.OldWatchingPlugin(),
        new webpack.optimize.DedupePlugin(),
    ]
};





