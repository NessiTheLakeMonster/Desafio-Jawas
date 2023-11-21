<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoteController;
use App\Http\Controllers\UserController;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

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

/* Route::middleware(['auth:sanctum'])->group(function () {
    Route::prefix('colaborador')->group(function () {
    });

    Route::prefix('administrador')->group(function () {
    });

    Route::prefix('clasificador')->group(function () {
    });

    Route::prefix('diseñador')->group(function () {
    });
}); */

//RUTAS COLABORADOR 
Route::prefix('lote')->group(function () {
    Route::get('/listar', [LoteController::class, 'listar']);
    Route::post('/guardar', [LoteController::class, 'guardar']);
    Route::get('/mostrar/{id}', [LoteController::class, 'mostrar']);
    Route::put('/modificar/{id}', [LoteController::class, 'modificar']);
    Route::delete('/eliminar/{id}', [LoteController::class, 'eliminar']);
});

// Rutas registro y login
Route::post('/registro', [AuthController::class, 'registro']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);

Route::get('/usuario/listar', [UserController::class, 'listar']);
