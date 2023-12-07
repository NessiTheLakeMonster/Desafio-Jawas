<?php

namespace App\Http\Controllers;

use App\Models\RolAsignado;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class RolAsignadoController extends Controller
{
    public function asignarAdministrador(Request $request, $id)
    {
        try {
            $auth = Auth::user();

            $rol = DB::table('rol_asignado')->insert([
                'id_usuario' => $id,
                'id_rol' => 2
            ]);

            $user = $request->user();

            if (!$user) {
                return response()->json([
                    'message' => 'No authenticated user',
                    'status' => 401,
                    'ok' => false
                ], 401);
            }

            $success['token'] =  $user->createToken('access_token', ["administrador"])->plainTextToken;

            return response()->json([
                'usuario' => $success,
                'message' => 'Rol asignado correctamente',
                'status' => 200,
                'ok' => true
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error en el servidor',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
