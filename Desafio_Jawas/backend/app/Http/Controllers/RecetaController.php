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
            $recetas = Receta::all();
            return response()->json($recetas, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function crear(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'idUsuario' => 'required|integer|exists:users,id',
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
            $receta = Receta::findOrFail($id);
            return response()->json($receta);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function modificar(Request $request, $id)
    {

        $validator = Validator::make($request->all(), [
            'idUsuario' => 'required|integer|exists:users,id',
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
}
