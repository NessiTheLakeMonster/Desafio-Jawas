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
            $usuario = User::findOrFail($id);

            if ($usuario == null) {

                return response()->json([
                    'message' => 'Usuario no encontrado',
                    'status' => 404,
                    'ok' => false
                ], 404);
            } else {

                $rolAsignado = RolAsignado::where('id_usuario', $usuario->id)
                    ->where('id_rol', 2)
                    ->first();

                if ($rolAsignado != null) {

                    return response()->json([
                        'message' => 'Usuario ya es administrador',
                        'status' => 200,
                        'ok' => true
                    ], 200);
                } else {

                    $rolAsignado = new RolAsignado();
                    $rolAsignado->id_usuario = $usuario->id;
                    $rolAsignado->id_rol = 2;
                    $rolAsignado->save();

                    return response()->json([
                        'message' => 'Usuario asignado como administrador',
                        'status' => 200,
                        'ok' => true
                    ], 200);
                }
            }
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al asignar usuario como administrador',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
