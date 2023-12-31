<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

use App\Http\Controllers\LoteController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RolAsignadoController;
use App\Http\Controllers\InventarioController;
use App\Http\Controllers\RolController;
use App\Http\Controllers\JoyaController;
use App\Models\User;
use App\Http\Controllers\RecetaController;

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

// ----------------------RUTAS DE REGISTRO, LOGIN, LOGOUT Y SUBIR FOTO PERFIL ----------------------

Route::post('/registro', [AuthController::class, 'registro']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout/{id}', [AuthController::class, 'logout']);

Route::post('/subir', [AuthController::class, 'cargarImagenUsuario']);


//-------------------------RUTAS ADMINISTRADOR-------------------------

//RUTAS DE ASIGNACIÓN DE ROL

Route::middleware('auth:sanctum')->group(function () {
    //ASIGNAR UN NUEVO ROL AL USUARIO
    Route::post('/asignarRol/{idUsuario}/{idRol}', [RolAsignadoController::class, 'asignarRol'])->middleware(['midAdmin']);
    //VER LOS ROLES ASIGNADOS AL USUARIO
    Route::get('/roles/{id}', [RolAsignadoController::class, 'mostrarRoles']);
    //LISTAR TODOS LOS ROLES
    Route::get('/roles', [RolController::class, 'listar']);
});

Route::get('/noPermisos', function () {
    return view('noPermisos');
});

//GESTIONAR USUARIOS
Route::middleware(['auth:sanctum', 'midAdmin'])->group(function () {

    Route::prefix('usuario')->group(function () {
        //LISTAR USUARIOS
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
        Route::post('/registro', [AuthController::class, 'registro']);
    });
});

Route::middleware(['auth:sanctum', 'midAdmin', 'midClasificador'])->group(function () {

    //GESTIONAR COMPONENTES
    Route::prefix('componentes')->group(function () {

        //LISTAR COMPONENTES
        Route::get('/listar', [App\Http\Controllers\ComponenteController::class, 'listar']);
        //MOSTRAR COMPONENTE BUSCADO POR ID
        Route::get('/mostrar/{id}', [App\Http\Controllers\ComponenteController::class, 'mostrar']);
        //CREAR COMPONENTE
        Route::post('/crear', [App\Http\Controllers\ComponenteController::class, 'crear']);
        //ELIMINAR COMPONENTE
        Route::delete('/eliminar/{id}', [App\Http\Controllers\ComponenteController::class, 'eliminar']);
        ///MODIFICAR COMPONENTE
        Route::put('/modificar/{id}', [App\Http\Controllers\ComponenteController::class, 'modificar']);
    });
});

Route::middleware(['auth:sanctum', 'midAdmin'])->group(function () {

    //GESTIONAR INVENTARIO
    Route::prefix('inventario')->group(function () {

        //LISTAR INVENTARIO
        Route::get('/mostrar', [InventarioController::class, 'mostrar']);
        //MODIFICAR INVENTARIO (solo cantidades)
        Route::put('/modificar/{id}', [InventarioController::class, 'modificarCantidad']);
        //ELIMINAR COMPONENTE DEL INVENTARIO
        Route::delete('/eliminar/{id}', [InventarioController::class, 'eliminar']);
    });
});

//-------------------------RUTAS COLABORADOR-------------------------

Route::middleware(['auth:sanctum', 'midColaborador'])->group(function () {

    //GESTIONAR LOTES PANTALLA JAIME
    Route::prefix('lote')->group(function () {

        // MANDAR LOTE [INSERTADA X INES Y PATRICIA]
        Route::post('/crear', [LoteController::class, 'crear']);
        //MOSTRAR LISTA DE TODOS LOS LOTES [INSERTADO X JAIME]
        //Route::get('/listar/{idUsuario}', [LoteController::class, 'mostrarLotes']);
        //MOSTRAR LISTA DE TODOS LOS LOTES ENTREGADOS [INSERTADA X INES Y PATRICIA]
        Route::get('/entregados/{idUsuario}', [LoteController::class, 'mostrarEntregados']);
        //MOSTRAR LOTE ENTREGADO BUSCADO POR ID [INSERTADO X JAIME] --> es la misma funcion 'mostrar' pero le falta un parametro
        //Route::get('/mostrar/{id}', [LoteController::class, 'mostrar']);
        //MANDAR LOTES [INSERTADO X JAIME] --> ESTA FUNCION YA SE HACE EN /CREAR (la primera ruta)
        //Route::put('/mandar/{id}', [LoteController::class, 'mandarLote']);
        //MOSTRAR LOTE ENTREGADO BUSCADO POR ID [INSERTADA X INES Y PATRICIA]
        Route::get('/mostrar/{idLote}/{idUsuario}', [LoteController::class, 'mostrar']);
        //CANCELAR LOTES [INSERTADA X INES Y PATRICIA]
        Route::put('/cancelar/{id}', [LoteController::class, 'cancelarLote']);
    });
});

//ANTES DEL MERGE DE JAIME DEL DIA 12 A MEDIODIA

/*
//GESTIONAR LOTES
Route::prefix('lote')->group(function () {

    // MANDAR LOTE
    Route::post('/crear', [LoteController::class, 'crear']);
    //MOSTRAR LISTA DE TODOS LOS LOTES ENTREGADOS
    Route::get('/entregados/{idUsuario}', [LoteController::class, 'mostrarEntregados']);
    //MOSTRAR LOTE ENTREGADO BUSCADO POR ID 
    Route::get('/mostrar/{idLote}/{idUsuario}', [LoteController::class, 'mostrar']);
    //CANCELAR LOTES
    Route::put('/cancelar/{id}', [LoteController::class, 'cancelarLote']);

    //TODO:NO SE USA
    Route::get('/listar', [LoteController::class, 'listar']);
    Route::put('/modificar/{id}', [LoteController::class, 'modificar']);
    Route::delete('/eliminar/{id}', [LoteController::class, 'eliminar']);
});*/

//-------------------------RUTAS CLASIFICADOR-------------------------

//GESTIONAR DESGUACES
Route::prefix('info_lote')->group(function () {

    //MOSTRAR LISTA DE TODOS LOS LOTES ENTREGADOS PARA CLASIFICAR
    Route::get('/listar', [LoteController::class, 'listar']);
    //MOSTRAR LOTE ENTREGADO BUSCADO POR ID
    Route::get('/mostrar/{id}', [LoteController::class, 'buscar']);
    //MOSTRAR TODOS LOS LOTES A DESPIEZAR
    Route::get('/lotes/{id}', [LoteController::class, 'mostrarLotesTotales']);
    //CREAR COMPONENTE
    Route::post('/crear', [App\Http\Controllers\ComponenteController::class, 'crear']);
    //DESGUAZARÁ Y CLASIFICARÁ EL LOTE
    Route::post('/desguazar/{idLote}', [App\Http\Controllers\InfoLoteController::class, 'crear']);
    //MOSTRAR COMPONENTES DEL LOTE DESGUAZADO
    Route::get('/listar/{idLote}', [App\Http\Controllers\InfoLoteController::class, 'listar']);
});

Route::middleware(['auth:sanctum', 'midClasificador'])->group(function () {

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
    });
});


//-------------------------RUTAS DISEÑADOR-------------------------

Route::middleware(['auth:sanctum', 'midDisenador'])->group(function () {

    //GESTIONAR JOYAS
    Route::prefix('joya')->group(function () {

        //MOSTRAR LISTA TIPOS DE JOYAS
        Route::get('/tipos', [App\Http\Controllers\TipoJoyaController::class, 'listar']);
        //MOSTRAR LISTA DE TODAS LAS JOYAS
        Route::get('/listar', [App\Http\Controllers\JoyaController::class, 'listar']);
        //MOSTRAR JOYA BUSCADA POR ID
        Route::get('/mostrar/{id}', [App\Http\Controllers\JoyaController::class, 'mostrar']);
        //MODIFICAR LA IMG DE LA JOYA
        Route::post('/modificar/{id}', [App\Http\Controllers\JoyaController::class, 'modificar']);
        //GENERADOR DE JOYAS ALEATORIAS
        Route::post('/generar', [App\Http\Controllers\JoyaController::class, 'generarJoyaAleatoria']);
        //VERIFICAR SI HAY SUFICIENTES COMPONENTES EN EL INVENTARIO Y CUANTAS JOYAS PUEDE HACER
        Route::get('/componentes/{idReceta}', [App\Http\Controllers\JoyaController::class, 'componenteSuficiente']);
        //MOSTRAR INVENTARIO > /INVENTARIO/MOSTAR
    });
});

//SUBIR IMAGEN JOYA
Route::post('/joya/subir', [JoyaController::class, 'cargarImagen']);

Route::middleware(['auth:sanctum', 'midDisenador'])->group(function () {

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
        //SACA LAS RECETAS DE UN TIPO DE JOYA CONCRETO
        Route::get('/tipo/{idTipoJoya}', [App\Http\Controllers\RecetaController::class, 'getRecetasPorJoya']);
    });
});

Route::middleware(['auth:sanctum', 'midDisenador'])->group(function () {

    //GESTIONAR INGREDIENTES (CRUD INGREDIENTE_ASIGNADO)
    Route::prefix('ingrediente')->group(function () {

        //AÑADIR INGREDIENTE A LA RECETA
        Route::post('/crear/{id_receta}', [App\Http\Controllers\IngredienteAsignadoController::class, 'crear']);
        //VER INGREDIENTES DE LA RECETA CONCRETA
        Route::get('/listar/{id_receta}', [App\Http\Controllers\IngredienteAsignadoController::class, 'listar']);
        //MODIFICAR LA CANTIDAD DE INGREDIENTE DE LA RECETA
        Route::put('/modificar/{id_receta}', [App\Http\Controllers\IngredienteAsignadoController::class, 'modificarCantidad']);
    });
});

Route::middleware('auth:sanctum')->group(function () {

    //GESTIONAR PERFIL
    Route::prefix('perfil')->group(function () {

        // BUSCAR USUARIO QUE VA A EDITAR SU PERFIL
        Route::get('/buscar/{id}', [UserController::class, 'buscar']);
        // MODIFICAR IMAGEN DE PERFIL
        Route::post('/modificarFoto/{id}', [UserController::class, 'modificarFoto']);
        // MODIFICAR PERFIL
        Route::put('/modificar/{id}', [UserController::class, 'modificar']);
        // MODIFICAR CONTRASEÑA
        Route::put('/modPasswd/{id}', [UserController::class, 'modificarPasswd']);
    });
});
