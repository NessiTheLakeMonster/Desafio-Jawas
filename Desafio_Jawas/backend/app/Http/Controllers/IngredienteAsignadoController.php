<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\IngredienteAsignado;
use Illuminate\Support\Facades\Validator;

class IngredienteAsignadoController extends Controller
{
    public function listar()
    {
        try {
            $ingredientes = IngredienteAsignado::all();
            return response()->json($ingredientes, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function crear (Request $request){
        
        $validator = Validator::make($request->all(), [
            'id_receta' => 'required|integer|exists:receta,id',
            'id_componente' => 'required|integer|exists:componente,id',
            'cantidad' => 'required|integer',

        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        try {
            $ingrediente = IngredienteAsignado::create($request->all());
            return response()->json($ingrediente, 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function mostrar($id){

        try {
            $ingrediente = IngredienteAsignado::findOrFail($id);
            return response()->json($ingrediente);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function modificar(Request $request, $id){

        $validator = Validator::make($request->all(), [
            'id_receta' => 'required|integer|exists:receta,id',
            'id_componente' => 'required|integer|exists:componente,id',
            'cantidad' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        try {
            $ingrediente = IngredienteAsignado::findOrFail($id);
            $ingrediente->update($request->all());
            return response()->json($ingrediente);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function eliminar($id){
        
        try {
            $ingrediente = IngredienteAsignado::findOrFail($id);
            $ingrediente->delete();
            return response()->json(['message' => 'Ingrediente eliminado correctamente']);
        
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
