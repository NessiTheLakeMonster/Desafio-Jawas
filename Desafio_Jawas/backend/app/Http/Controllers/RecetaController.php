<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Receta;

class RecetaController extends Controller
{
    public function listar()
    {
        try {
            $recetas = Receta::join('users', 'receta.idUsuario', '=', 'users.id')
                ->join('tipo_joya', 'receta.idTipoJoya', '=', 'tipo_joya.id')
                ->select('receta.*', 'users.nombre', 'users.apellido', 'tipo_joya.nombre as tipo_joya')
                ->get();
            return response()->json($recetas, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function crear(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'idUsuario' => 'required|integer|exists:users,id',
            'idTipoJoya' => 'required|integer|exists:tipo_joya,id',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        try {
            $receta = Receta::create($request->all());
            return response()->json($receta, 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function mostrar($id)
    {

        try {
            $receta = Receta::join('users', 'receta.idUsuario', '=', 'users.id')
                ->join('tipo_joya', 'receta.idTipoJoya', '=', 'tipo_joya.id')
                ->select('receta.*', 'users.nombre', 'users.apellido', 'tipo_joya.nombre as tipo_joya')
                ->where('receta.id', $id)
                ->first();
            return response()->json($receta);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function modificar(Request $request, $id)
    {

        $validator = Validator::make($request->all(), [
            'idUsuario' => 'required|integer|exists:users,id',
            'idTipoJoya' => 'required|integer|exists:tipo_joya,id',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        try {
            $receta = Receta::findOrFail($id);
            $receta->update($request->all());
            return response()->json($receta, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function eliminar($id)
    {

        try {
            $receta = Receta::findOrFail($id);
            $receta->delete();
            return response()->json(['message' => 'Receta eliminada correctamente']);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function getRecetasPorJoya($idTipoJoya)
    {
        try {
            $recetas = Receta::where('idTipoJoya', $idTipoJoya)->get();
            return response()->json($recetas, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
