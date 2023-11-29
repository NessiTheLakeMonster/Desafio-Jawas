const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        main: './js/app.js',
        login: './js/login.js',
        registro: './js/registro.js',
        home: './js/home.js',
        gestionUsuarios: './js/gestionUsuarios.js',
        donacion: './js/gestion_lotes.js',
        despieceLote: './js/despieceLote.js',
        despieceLoteDetalles: './js/despieceLoteDetalles.js',
        recetas: './js/recetas.js',
        recetasDetalles: './js/recetasDetalle.js',
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