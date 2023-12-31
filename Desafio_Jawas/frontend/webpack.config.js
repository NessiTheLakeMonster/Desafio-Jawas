const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        main: './js/app.js',
        login: './js/login.js',
        registro: './js/registro.js',
        home: './js/home.js',
        preHome: './js/preHome.js',
        perfil: './js/perfil.js',
        gestionUsuarios: './js/gestionUsuarios.js',
        donaciones: './js/gestion_lotes.js',
        modificarCrearUsuario: './js/modificarCrearUsuario.js',
        donacion: './js/gestion_lotes.js',
        despieceLote: './js/despieceLote.js',
        despieceLoteDetalles: './js/despieceLoteDetalles.js',
        recetas: './js/recetas.js',
        recetasDetalles: './js/recetasDetalle.js',
        inventario: './js/inventario.js',
        componentes: './js/componentes.js',
        joyas: './js/joyas.js',
        joyasDetalle: './js/joyasDetalle.js',
        lotes: './js/lotes.js',
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