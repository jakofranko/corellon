const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
    GenerateSW
} = require('workbox-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const mode = process.env.NODE_ENV || 'development';

module.exports = function(env, args) {
    return {
        mode,
        devtool: 'inline-source-map',
        entry: './src/index.js',
        output: {
            filename: 'main.js',
            path: path.resolve(__dirname, 'docs'),
            clean: true
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    loader: "babel-loader",
                    options: { presets: ["@babel/env"] }
                },
                {
                    test: /\.css$/,
                    use: ["style-loader", "css-loader"]
                }
            ]
        },
        resolve: {
            extensions: ['*', '.js', '.jsx']
        },
        devServer: {
            port: 3000,
            compress: true,
            static: {
                directory: path.join(__dirname, 'public'),
            },
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new webpack.DefinePlugin({
                'build.mode': JSON.stringify(args.mode)
            }),
            new HtmlWebpackPlugin({
                title: 'Corellon 🌙',
                favicon: './public/assets/favicon.png',
                template: './src/index.ejs',
                meta: {
                    'mobile-web-app-capable': 'yes',
                    'apple-mobile-web-app-capable': 'yes',
                    'application-name': 'Corellon',
                    'apple-mobile-web-app-title': 'Corellon',
                    'theme-color': '#444444',
                    'msapplication-navbutton-color': '#444444',
                    'apple-mobile-web-app-status-bar-style': 'black-translucent',
                    'msapplication-starturl': '/corellon',
                    'viewport': 'width=device-width, initial-scale=1, shrink-to-fit=no'
                }
            }),
            new CopyPlugin({
                patterns: [{
                        from: './public/assets',
                        to: 'assets'
                    },
                    {
                        from: './public/manifest.json',
                        to: 'manifest.json'
                    }
                ]
            }),
            new GenerateSW({
                mode,
                clientsClaim: true,
                skipWaiting: true,
                runtimeCaching: [{
                    urlPattern: /\.js$/,
                    handler: 'NetworkFirst'
                }]
            }),
        ]
    };
}
