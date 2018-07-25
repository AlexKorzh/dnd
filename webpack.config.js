const path = require('path');
const webpack = require('webpack');

const DIST_DIR = path.resolve(__dirname, 'lib');

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: './src/index.js',
    output: {
        path: DIST_DIR,
        filename: 'index.js',
        publicPath: '/lib/',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            }
        ]
    }
};
