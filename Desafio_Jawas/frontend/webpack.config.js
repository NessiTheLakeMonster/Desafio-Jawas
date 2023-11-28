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
        gestionUsuarios: './js/gestionUsuarios.js',
        http_login: './js/http/http_login.js',
        http_registro: './js/http/http_registro.js',
        http_gestionUsuarios: './js/http/http_gestionUsuarios.js',
        donaciones: './js/gestion_lotes.js',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    /* plugins: [
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
        new HtmlWebpackPlugin({
            template: './html/gestionUsuarios.html',
            filename: 'gestionUsuarios.html',
        }
        new HtmlWebpackPlugin({
            template: './html/donacion.html',
            filename: 'donacion.html',
        }), 
    ] */

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