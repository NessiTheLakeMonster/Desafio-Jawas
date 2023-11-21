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

    //CRUD LOTE
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


