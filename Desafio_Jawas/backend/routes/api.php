<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoteController;

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

Route::middleware(['auth:sanctum'])->group(function () {
    Route::prefix('colaborador')->group(function () {
    });

    Route::prefix('administrador')->group(function () {
    });

    Route::prefix('clasificador')->group(function () {
    });

    Route::prefix('diseñador')->group(function () {
    });
});

//RUTAS COLABORADOR 

Route::prefix('lote')->group(function () {

    //GESTIONAR LOTES
    Route::get('/listar', [LoteController::class, 'listar']);
    Route::post('/guardar', [LoteController::class, 'guardar']);
    Route::get('/mostrar/{id}', [LoteController::class, 'mostrar']);
    Route::put('/modificar/{id}', [LoteController::class, 'modificar']);
    Route::delete('/eliminar/{id}', [LoteController::class, 'eliminar']);

    //COMPROBAR LISTA DE ENTREGAS
    Route::get('/entregados', [LoteController::class, 'comprobarEntregas']);
    //ENTREGAR LOTES
    Route::put('/entregar/{id}', [LoteController::class, 'entregarLote']);
    //CANCELAR LOTES
    Route::put('/cancelar/{id}', [LoteController::class, 'cancelarLote']);
});

//RUTAS CLASIFICADOR

Route::prefix('info_lote')->group(function () {
    
    //DESGUAZARÁ Y CLASIFICARÁ EL LOTE
    Route::post('/desguazar', [App\Http\Controllers\Info_LoteController::class, 'crear']);
    Route::get('/mostrar/{id}', [App\Http\Controllers\Info_LoteController::class, 'mostrar']);
    Route::get('/listar', [App\Http\Controllers\Info_LoteController::class, 'listar']);
});

Route::prefix('componentes')->group(function () {

    //TENDRÁ ACCESO A LOS COMPONENTES
    Route::get('/listar', [App\Http\Controllers\ComponenteController::class, 'listar']);
    Route::get('/mostrar/{id}', [App\Http\Controllers\ComponenteController::class, 'mostrar']);
    Route::post('/crear', [App\Http\Controllers\ComponenteController::class, 'crear']);
    Route::put('/modificar/{id}', [App\Http\Controllers\ComponenteController::class, 'modificar']);
    Route::delete('/eliminar/{id}', [App\Http\Controllers\ComponenteController::class, 'eliminar']);
    Route::get('/esHardware/{id}', [App\Http\Controllers\ComponenteController::class, 'esHardware']);
});

//RUTAS DISEÑADOR

Route::prefix('joya')->group(function () {

    //GESTIONAR CRUD JOYAS
    Route::get('/listar', [App\Http\Controllers\JoyaController::class, 'listar']);
    Route::get('/mostrar/{id}', [App\Http\Controllers\JoyaController::class, 'mostrar']);
    Route::post('/crear', [App\Http\Controllers\JoyaController::class, 'crear']);
    Route::put('/modificar/{id}', [App\Http\Controllers\JoyaController::class, 'modificar']);
    Route::delete('/eliminar/{id}', [App\Http\Controllers\JoyaController::class, 'eliminar']);
});

Route::prefix('receta')->group(function () {

     //GESTIONAR CRUD RECETAS
    Route::get('/listar', [App\Http\Controllers\RecetaController::class, 'listar']);
    Route::get('/mostrar/{id}', [App\Http\Controllers\RecetaController::class, 'mostrar']);
    Route::post('/crear', [App\Http\Controllers\RecetaController::class, 'crear']);
    Route::put('/modificar/{id}', [App\Http\Controllers\RecetaController::class, 'modificar']);
    Route::delete('/eliminar/{id}', [App\Http\Controllers\RecetaController::class, 'eliminar']);
});

Route::prefix('ingrediente')->group(function () {

    //CRUD de componentes para cada receta --> CRUD INGREDIENTE_ASIGNADO
    Route::get('/listar', [App\Http\Controllers\IngredienteAsignadoController::class, 'listar']);
    Route::get('/mostrar/{id}', [App\Http\Controllers\IngredienteAsignadoController::class, 'mostrar']);
    Route::post('/crear', [App\Http\Controllers\IngredienteAsignadoController::class, 'crear']);
    Route::put('/modificar/{id}', [App\Http\Controllers\IngredienteAsignadoController::class, 'modificar']);
    Route::delete('/eliminar/{id}', [App\Http\Controllers\IngredienteAsignadoController::class, 'eliminar']);

});


