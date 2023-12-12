<?php

/**
 * @author Patricia Mota
 */

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\IngredienteAsignado;
use App\Models\Inventario;
use Illuminate\Support\Facades\Validator;

class IngredienteAsignadoController extends Controller
{
    public function listar($id_receta)
    {
        try {
            $ingredientes = IngredienteAsignado::join('componente', 'ingrediente_asignado.id_componente', '=', 'componente.id')
                ->select('ingrediente_asignado.id', 'ingrediente_asignado.id_receta', 'ingrediente_asignado.id_componente', 'componente.nombre', 'ingrediente_asignado.cantidad')
                -> where('id_receta', $id_receta)->get();
            return response()->json($ingredientes, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function crear(Request $request, $id_receta)
    {

        $messages = [
            'required' => 'Campo obligatorio',
            'id_componente.required' => 'El campo id_componente es obligatorio',
            'cantidad.required' => 'El campo cantidad es obligatorio',
            'id_componente.integer' => 'El campo id_componente debe ser un número entero',
            'cantidad.integer' => 'El campo cantidad debe ser un número entero',
            'id_componente.exists' => 'El campo id_componente no existe',
        ];

        $validator = Validator::make($request->all(), [
            'id_componente' => 'required|integer|exists:componente,id',
            'cantidad' => 'required|integer',
        ], $messages);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        try {
            $ingrediente = new IngredienteAsignado;
            $ingrediente->id_receta = $id_receta;
            $ingrediente->id_componente = $request->get('id_componente');
            $ingrediente->cantidad = $request->get('cantidad');
            $ingrediente->save();
            return response()->json($ingrediente, 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function mostrar($id)
    {

        try {
            $ingrediente = IngredienteAsignado::findOrFail($id);
            return response()->json($ingrediente);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function modificarCantidad(Request $request, $id_receta)
    {

        $messages = [
            'required' => 'Campo obligatorio',
            'id_componente.required' => 'El campo id_componente es obligatorio',
            'cantidad.required' => 'El campo cantidad es obligatorio',
            'id_componente.integer' => 'El campo id_componente debe ser un número entero',
            'cantidad.integer' => 'El campo cantidad debe ser un número entero',
            'id_componente.exists' => 'El campo id_componente no existe',
        ];

        $validator = Validator::make($request->all(), [
            'id_componente' => 'required|integer|exists:componente,id',
            'cantidad' => 'required|integer',

        ], $messages);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        try {
            $ingrediente = IngredienteAsignado::where('id_receta', $id_receta)
            ->where('id_componente', $request->id_componente)
            ->firstOrFail();
            $ingrediente->cantidad = $request->cantidad;
            $ingrediente->save();
            return response()->json($ingrediente);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function eliminar($id)
    {

        try {
            $ingrediente = IngredienteAsignado::findOrFail($id);
            $ingrediente->delete();
            return response()->json(['message' => 'Ingrediente eliminado correctamente']);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
