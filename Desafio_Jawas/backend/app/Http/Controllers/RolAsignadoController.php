<?php

/**
 * @author Inés Barrera
 */

namespace App\Http\Controllers;

use App\Models\RolAsignado;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RolAsignadoController extends Controller
{
    /**
     * @author Inés Mª Barrera Llerena
     * @summary Asignar roles a los usuarios
     *
     * @param int $idUsuario
     * @param int $idRol
     * @return void
     */
    public function asignarRol($idUsuario, $idRol)
    {
        try {
            $usuario = User::findOrFail($idUsuario);

            $rolAsignado = RolAsignado::where('id_usuario', $usuario->id)
                ->where('id_rol', $idRol)
                ->first();

            if ($rolAsignado != null) {

                $message = $this->mensajeError($idRol);

                return response()->json([
                    'message' => $message,
                    'status' => 400,
                    'ok' => true
                ], 400);
            } else {

                $rolAsignado = new RolAsignado();
                $rolAsignado->id_usuario = $usuario->id;
                $rolAsignado->id_rol = $idRol;
                $rolAsignado->save();

                $message = $this->mensajeExito($idRol);

                return response()->json([
                    'message' => $message,
                    'status' => 200,
                    'ok' => true
                ], 200);
            }
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al asignar usuario como administrador',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function mensajeExito($idRol)
    {
        $message = '';

        switch ($idRol) {
            case 1:
                $message = 'Usuario asignado como colaborador';
                break;
            case 2:
                $message = 'Usuario asignado como administrador';
                break;
            case 3:
                $message = 'Usuario asignado como diseñador';
                break;
            case 4:
                $message = 'Usuario asignado como clasificador';
                break;
            default:
                $message = 'Rol no reconocido';
                break;
        }
        return $message;
    }

    public function mensajeError($idRol)
    {
        $message = '';

        switch ($idRol) {
            case 1:
                $message = 'El usuario ya es colaborador';
                break;
            case 2:
                $message = 'El usuario ya es administrador';
                break;
            case 3:
                $message = 'El usuario ya es diseñador';
                break;
            case 4:
                $message = 'El usuario ya es clasificador';
                break;
            default:
                $message = 'Rol no reconocido';
                break;
        }

        return $message;
    }

    /**
     * @author Inés Mª Barrera Llerena
     * @summary Mostrar los roles de un usuario
     *
     * @param int $idUsuario
     * @return void
     */
    public function mostrarRoles($idUsuario)
    {
        try {
            $usuario = DB::table('users')->where('id', $idUsuario)->first();

            $roles = DB::table('rol_asignado')
                ->join('rol', 'rol_asignado.id_rol', '=', 'rol.id')
                ->where('rol_asignado.id_usuario', $usuario->id)
                ->select('rol_asignado.*', 'rol.nombre as nombre_rol')
                ->get();

            return response()->json($roles);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al mostrar roles',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
