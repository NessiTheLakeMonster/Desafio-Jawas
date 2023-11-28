const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        main: './js/app.js',
        login: './js/login.js',
        registro: './js/registro.js',
        home: './js/home.js',
        clases: './js/utils/clases.js',
        validaciones: './js/utils/validaciones.js',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './html/index.html',
            filename: 'index.html',
        }),
        new HtmlWebpackPlugin({
            template: './html/login.html',
            filename: 'login.html',
        }),
        new HtmlWebpackPlugin({
            template: './html/registro.html',
            filename: 'registro.html',
        }),
        new HtmlWebpackPlugin({
            template: './html/home.html',
            filename: 'home.html',
        }),
    ]
};