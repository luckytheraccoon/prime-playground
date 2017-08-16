var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
    module: {
        rules: [
            { // sass / scss loader for webpack
                test: /\.(sass|scss)$/,
                loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
            },
            {
                test: /\.js$/, exclude: /node_modules/, loader: "babel-loader",
                query: {
                    presets: ["env", "react"],
                    plugins: ["transform-object-rest-spread", "transform-decorators-legacy"]
                }
            },
            { test: /\.css$/, loader: "style-loader!css-loader" },
            { test: /\.(png|jpg)$/, loader: "file-loader?emitFile=false&name=[path][name].[ext]" }
        ]
    },
    context: __dirname,
    devtool: debug ? "inline-sourcemap" : null,
    entry: "./src/index.js",
    output: {
        path: __dirname + "/src",
        filename: "index.min.js"
    },
    plugins: debug ? [] : [
        new ExtractTextPlugin("./src/App.css"),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
    ],
};