<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

use App\Http\Controllers\LoteController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RolAsignadoController;
use App\Http\Controllers\InventarioController;

use App\Models\User;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('', function () {
    return response()->json("No autorizado", 203);
})->name('nologin');

//-------------------------RUTAS DE ASIGNACIÓN DE ROL-------------------------
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/asignarAdmin/{id}', [RolAsignadoController::class, 'asignarAdministrador']);
});

// RUTAS DE REGISTRO, LOGIN Y LOGOUT

Route::post('/registro', [AuthController::class, 'registro']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);

//-------------------------RUTAS ADMINISTRADOR-------------------------

//GESTIONAR USUARIOS

Route::middleware('auth:sanctum')->group(function () {
    Route::prefix('usuario')->group(function () {
        //LISTAR USUARIOS
        /* Route::get('/listar', [UserController::class, 'listar'])->middleware(['midAdmin', 'midColaborador', 'midClasificador', 'midDisenador']); */
        Route::get('/listar', [UserController::class, 'listar']);
        //MOSTRAR USUARIO BUSCADO POR ID
        Route::get('/mostrar/{id}', [UserController::class, 'buscar']);
        //MODIFICAR USUARIO
        Route::put('/modificar/{id}', [UserController::class, 'modificar']);
        //ELIMINAR USUARIO
        Route::delete('/eliminar/{id}', [UserController::class, 'delete']);
        // MODIFICAR CONTRASEÑA
        Route::put('/modPasswd/{id}', [UserController::class, 'modificarPasswd']);
        //CREAR USUARIO
        /* Route::post('/crear', [UserController::class, 'crear']); */
        Route::post('/registro', [AuthController::class, 'registro']);
    });
});


//GESTIONAR COMPONENTES
Route::prefix('componentes')->group(function () {

    //LISTAR COMPONENTES
    Route::get('/listar', [App\Http\Controllers\ComponenteController::class, 'listar']);
    //MOSTRAR COMPONENTE BUSCADO POR ID
    Route::get('/mostrar/{id}', [App\Http\Controllers\ComponenteController::class, 'mostrar']);
    //CREAR COMPONENTE
    Route::post('/crear', [App\Http\Controllers\ComponenteController::class, 'crear']);

    ///TODO: NO SE USA
    Route::put('/modificar/{id}', [App\Http\Controllers\ComponenteController::class, 'modificar']);
    Route::delete('/eliminar/{id}', [App\Http\Controllers\ComponenteController::class, 'eliminar']);
});

//GESTIONAR INVENTARIO
Route::prefix('inventario')->group(function () {
    //LISTAR INVENTARIO
    Route::get('/mostrar', [InventarioController::class, 'mostrar']);
    //MODIFICAR INVENTARIO (solo cantidades)
    Route::put('/modificar/{id}', [InventarioController::class, 'modificarCantidad']);

    //TODO: NO SE USA
    //MOSTRAR INVENTARIO BUSCADO POR ID
    //ELIMINAR INVENTARIO
    //CREAR INVENTARIO

});

//-------------------------RUTAS COLABORADOR-------------------------

//GESTIONAR LOTES
Route::prefix('lote')->group(function () {

    // MANDAR LOTE
    Route::post('/crear', [LoteController::class, 'crear']);
    //MOSTRAR LISTA DE TODOS LOS LOTES ENTREGADOS
    Route::get('/entregados', [LoteController::class, 'mostrarEntregados']);
    //MOSTRAR LOTE ENTREGADO BUSCADO POR ID 
    Route::get('/mostrar/{id}', [LoteController::class, 'mostrar']);
    //CANCELAR LOTES
    Route::put('/cancelar/{id}', [LoteController::class, 'cancelarLote']);

    //TODO:NO SE USA
    Route::get('/listar', [LoteController::class, 'listar']);
    Route::put('/modificar/{id}', [LoteController::class, 'modificar']);
    Route::delete('/eliminar/{id}', [LoteController::class, 'eliminar']);
});

//-------------------------RUTAS CLASIFICADOR-------------------------

//GESTIONAR DESGUACES
Route::prefix('info_lote')->group(function () {

    //MOSTRAR LISTA DE TODOS LOS LOTES ENTREGADOS PARA CLASIFICAR
    Route::get('/listar', [LoteController::class, 'listar']);
    //MOSTRAR LOTE ENTREGADO BUSCADO POR ID 
    Route::get('/mostrar/{id}', [LoteController::class, 'mostrar']);
    //CREAR COMPONENTE
    Route::post('/crear', [App\Http\Controllers\ComponenteController::class, 'crear']);
    //DESGUAZARÁ Y CLASIFICARÁ EL LOTE
    Route::post('/desguazar/{idLote}', [App\Http\Controllers\InfoLoteController::class, 'crear']);
    //MOSTRAR COMPONENTES DEL LOTE DESGUAZADO
    Route::get('/listar/{idLote}', [App\Http\Controllers\InfoLoteController::class, 'listar']);

    //TODO:NO SE USA
    Route::get('/mostrarr/{id}', [App\Http\Controllers\InfoLoteController::class, 'mostrar']);
});


//-------------------------RUTAS DISEÑADOR-------------------------

//GESTIONAR JOYAS
Route::prefix('joya')->group(function () {

    //MOSTRAR LISTA TIPOS DE JOYAS
    Route::get('/tipos', [App\Http\Controllers\TipoJoyaController::class, 'listar']);
    //MOSTRAR LISTA DE TODAS LAS JOYAS
    Route::get('/listar', [App\Http\Controllers\JoyaController::class, 'listar']);
    //MOSTRAR JOYA BUSCADA POR ID
    Route::get('/mostrar/{id}', [App\Http\Controllers\JoyaController::class, 'mostrar']);
    //BORRAR JOYA
    Route::delete('/eliminar/{id}', [App\Http\Controllers\JoyaController::class, 'eliminar']);
    //MODIFICAR LA IMG DE LA JOYA
    Route::put('/modificar/{id}', [App\Http\Controllers\JoyaController::class, 'modificar']);
    //GENERADOR DE JOYAS ALEATORIAS
    Route::post('/generar', [App\Http\Controllers\JoyaController::class, 'generarJoyaAleatoria']);
    //VERIFICAR SI HAY SUFICIENTES COMPONENTES EN EL INVENTARIO Y CUANTAS JOYAS PUEDE HACER
    Route::get('/componentes/{idReceta}', [App\Http\Controllers\JoyaController::class, 'componenteSuficiente']);
    //MOSTRAR INVENTARIO > CREAR CONTROLADOR

    //GESTIONAR CRUD JOYAS 
    Route::post('/crear', [App\Http\Controllers\JoyaController::class, 'crear']); //TODO:NO SE USA

});

//GESTIONAR RECETAS
Route::prefix('receta')->group(function () {

    //MOSTRAR LISTA DE TODAS LAS RECETAS
    Route::get('/listar', [App\Http\Controllers\RecetaController::class, 'listar']);
    //MOSTRAR RECETA BUSCADA POR ID
    Route::get('/mostrar/{id}', [App\Http\Controllers\RecetaController::class, 'mostrar']);
    //VER INGREDIENTES DE LA RECETA CONCRETA
    Route::get('/listar/{id_receta}', [App\Http\Controllers\IngredienteAsignadoController::class, 'listar']);
    //CREAR RECETA NUEVA -> BOTÓN DE CREAR RECETA
    Route::post('/crear', [App\Http\Controllers\RecetaController::class, 'crear']);


    //TODO: NO SE USA
    Route::put('/modificar/{id}', [App\Http\Controllers\RecetaController::class, 'modificar']);
    Route::delete('/eliminar/{id}', [App\Http\Controllers\RecetaController::class, 'eliminar']);
});

//GESTIONAR INGREDIENTES (CRUD INGREDIENTE_ASIGNADO)
Route::prefix('ingrediente')->group(function () {

    //AÑADIR INGREDIENTE A LA RECETA 
    Route::post('/crear/{id_receta}', [App\Http\Controllers\IngredienteAsignadoController::class, 'crear']);
    //VER INGREDIENTES DE LA RECETA CONCRETA
    Route::get('/listar/{id_receta}', [App\Http\Controllers\IngredienteAsignadoController::class, 'listar']);
    //MODIFICAR LA CANTIDAD DE INGREDIENTE DE LA RECETA
    Route::put('/modificar/{id_receta}', [App\Http\Controllers\IngredienteAsignadoController::class, 'modificarCantidad']);

    //TODO: NO SE USA
    Route::get('/mostrar/{id}', [App\Http\Controllers\IngredienteAsignadoController::class, 'mostrar']);
    Route::delete('/eliminar/{id}', [App\Http\Controllers\IngredienteAsignadoController::class, 'eliminar']);
});
