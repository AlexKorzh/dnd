const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const LIB_DIR = path.resolve(__dirname, 'lib');

module.exports = merge(common, {
    mode: 'production',
    entry: {
        index: './src/components/index.js'
    },
    output: {
        path: LIB_DIR,
        filename: '[name].js',
        library: '',
        libraryTarget: 'commonjs'
    },
    resolve: {
        alias: {
            'react': path.resolve(__dirname, './node_modules/react'),
            'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
        }
    },
    // exclude react from the bundle
    externals: {
        react: {
            commonjs: "react",
            commonjs2: "react",
            amd: "React",
            root: "React"
        },
        "react-dom": {
            commonjs: "react-dom",
            commonjs2: "react-dom",
            amd: "ReactDOM",
            root: "ReactDOM"
        }
    }
});
