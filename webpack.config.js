const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const EslingPlugin = require('eslint-webpack-plugin');
const CopyWebpackIcon = require("copy-webpack-plugin");

const baseConfig = {
    entry: path.resolve(__dirname, './src/index'),
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif|svg|mp3)$/,
                type: 'asset/resource'
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            { 
                test: /\.ts$/i, use: 'ts-loader' 
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, './dist'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
            filename: 'index.html',
        }),
        new CleanWebpackPlugin(),
        new EslingPlugin({ 
            extensions: 'ts' 
        }),
        new CopyWebpackIcon({
            patterns: [
              { 
                from: path.resolve(__dirname, './src/img/github.png'), 
                to: path.resolve(__dirname, './dist/img/') 
            },
            { 
                from: path.resolve(__dirname, './src/img/RSS.svg'), 
              to: path.resolve(__dirname, './dist/img/') 
            }
        ],
    })
    ],
};

module.exports = ({ mode }) => {
    const isProductionMode = mode === 'prod';
    const envConfig = isProductionMode ? require('./webpack.prod.config') : require('./webpack.dev.config');

    return merge(baseConfig, envConfig);
};
