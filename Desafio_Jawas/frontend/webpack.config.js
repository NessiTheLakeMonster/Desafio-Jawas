const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        main: './js/app.js',
        login: './js/login.js',
        registro: './js/registro.js',
        home: './js/home.js',
        gestionUsuarios: './js/gestionUsuarios.js',
        donaciones: './js/gestion_lotes.js',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        static: path.resolve(__dirname, '../'),
        port: 8090,
        open: {
            target: '/frontend/html/index.html',
        },
        headers: {
            'Access-Control-Allow-Origin': '*',

        },

    },
};