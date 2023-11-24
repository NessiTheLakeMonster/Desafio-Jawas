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

// Rutas registro y login
Route::post('/registro', [AuthController::class, 'registro']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);

Route::get('/usuario/listar', [UserController::class, 'listar']);

//RUTAS COLABORADOR 

Route::prefix('lote')->group(function () {

    //GESTIONAR LOTES - CRUD LOTES 
    //TODO:MIRAR SI EL ENUNCIADO PIDE ESTAS RUTAS O PREGUNTAR A FERNANDO SI AUNQ NO LO PIDAN LO DEJAMOS O NO
    Route::get('/listar', [LoteController::class, 'listar']);
    Route::put('/modificar/{id}', [LoteController::class, 'modificar']);
    Route::delete('/eliminar/{id}', [LoteController::class, 'eliminar']);

    // MANDAR LOTE
    Route::post('/crear', [LoteController::class, 'crear']);
    //MOSTRAR LISTA DE TODOS LOS LOTES ENTREGADOS
    Route::get('/entregados', [LoteController::class, 'mostrarEntregados']);
    //MOSTRAR LISTA DEL LOTE ENTREGADO BUSCADO POR ID 
    Route::get('/mostrar/{id}', [LoteController::class, 'mostrar']);
    //CANCELAR LOTES
    Route::put('/cancelar/{id}', [LoteController::class, 'cancelarLote']);
});

//RUTAS CLASIFICADOR

Route::prefix('info_lote')->group(function () {
    
    //MOSTRAR LISTA DE TODOS LOS LOTES ENTREGADOS PARA CLASIFICAR
    Route::get('/listar', [LoteController::class, 'listar']);
    //MOSTRAR LISTA DEL LOTE ENTREGADO BUSCADO POR ID 
    Route::get('/mostrar/{id}', [LoteController::class, 'mostrar']);
    //DESGUAZARÁ Y CLASIFICARÁ EL LOTE
    Route::post('/desguazar', [App\Http\Controllers\Info_LoteController::class, 'crear']);
    //MOSTRAR COMPONENTES DEL LOTE DESGUAZADO
    Route::get('/listar/{idLote}', [App\Http\Controllers\Info_LoteController::class, 'listar']);
    
    //Route::get('/mostrar/{id}', [App\Http\Controllers\Info_LoteController::class, 'mostrar']); //TODO: NO LO UTILIZAMOS EN NUESTRAS PANTALLAS

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

    //GENERADOR DE JOYAS ALEATORIAS
    Route::post('/generar', [App\Http\Controllers\JoyaController::class, 'generarJoyaAleatoria']);
});

Route::prefix('receta')->group(function () {

     //GESTIONAR CRUD RECETAS
    Route::get('/listar', [App\Http\Controllers\RecetaController::class, 'listar']);
    Route::get('/mostrar/{id}', [App\Http\Controllers\RecetaController::class, 'mostrar']);
    Route::post('/crear', [App\Http\Controllers\RecetaController::class, 'crear']);
    Route::put('/modificar/{id}', [App\Http\Controllers\RecetaController::class, 'modificar']);
    Route::delete('/eliminar/{id}', [App\Http\Controllers\RecetaController::class, 'eliminar']);

    //VERIFICAR SI HAY SUFICIENTES COMPONENTES EN EL INVENTARIO Y CUANTAS JOYAS PUEDE HACER
    Route::get('/componentes/{id}', [App\Http\Controllers\IngredienteAsignadoController::class, 'componenteSuficiente']);
});

Route::prefix('ingrediente')->group(function () {

    //CRUD de componentes para cada receta --> CRUD INGREDIENTE_ASIGNADO
    Route::get('/listar', [App\Http\Controllers\IngredienteAsignadoController::class, 'listar']);
    Route::get('/mostrar/{id}', [App\Http\Controllers\IngredienteAsignadoController::class, 'mostrar']);
    Route::post('/crear', [App\Http\Controllers\IngredienteAsignadoController::class, 'crear']);
    Route::put('/modificar/{id}', [App\Http\Controllers\IngredienteAsignadoController::class, 'modificar']);
    Route::delete('/eliminar/{id}', [App\Http\Controllers\IngredienteAsignadoController::class, 'eliminar']);

});



