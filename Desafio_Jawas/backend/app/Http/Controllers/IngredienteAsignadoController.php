<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\IngredienteAsignado;
use App\Models\Inventario;
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

        $messages =['required' => 'Campo obligatorio',
                    'id_receta.required' => 'El campo id_receta es obligatorio',
                    'id_componente.required' => 'El campo id_componente es obligatorio',
                    'cantidad.required' => 'El campo cantidad es obligatorio',
                    'id_receta.integer' => 'El campo id_receta debe ser un número entero',
                    'id_componente.integer' => 'El campo id_componente debe ser un número entero',
                    'cantidad.integer' => 'El campo cantidad debe ser un número entero',
                    'id_receta.exists' => 'El campo id_receta no existe',
                    'id_componente.exists' => 'El campo id_componente no existe',
        ];
        
        $validator = Validator::make($request->all(), [
            'id_receta' => 'required|integer|exists:receta,id',
            'id_componente' => 'required|integer|exists:componente,id',
            'cantidad' => 'required|integer',

        ],$messages);

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

        $messages =['required' => 'Campo obligatorio',
                    'id_receta.required' => 'El campo id_receta es obligatorio',
                    'id_componente.required' => 'El campo id_componente es obligatorio',
                    'cantidad.required' => 'El campo cantidad es obligatorio',
                    'id_receta.integer' => 'El campo id_receta debe ser un número entero',
                    'id_componente.integer' => 'El campo id_componente debe ser un número entero',
                    'cantidad.integer' => 'El campo cantidad debe ser un número entero',
                    'id_receta.exists' => 'El campo id_receta no existe',
                    'id_componente.exists' => 'El campo id_componente no existe',
        ];
        
        $validator = Validator::make($request->all(), [
            'id_receta' => 'required|integer|exists:receta,id',
            'id_componente' => 'required|integer|exists:componente,id',
            'cantidad' => 'required|integer',

        ],$messages);
        
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

    //TODO: INES MIRA AQUI
    public function componenteSuficiente ($idReceta){

        try{

            $ingredientes = IngredienteAsignado::where('id_receta', $idReceta)->get();
            $maxJoyasPosibles= null;
    
            foreach ($ingredientes as $ingrediente) {

                $inventario = Inventario::where('idComponente', $ingrediente->id_componente)->first();
                if (!$inventario) {
                    return response()->json(['error' => 'Componente no encontrado en el inventario'], 500);
                }
    
                if ($inventario->cantidad < $ingrediente->cantidad) {
                    $cantidadFaltante = $ingrediente->cantidad - $inventario->cantidad;
                    return response()->json([
                        'error' => 'No hay suficientes componentes en el inventario',
                        'cantidad Necesaria' => $ingrediente->cantidad,
                        'cantidad Inventario' => $inventario->cantidad,
                        'cantidad Faltante' => $cantidadFaltante
                    ], 500);
                }
            }

            // se calcula las joyas q se pueden hacer con los componentes disponibles en el inventarioo
            $joyasPosibles = floor($inventario->cantidad / $ingrediente->cantidad);
                if ($maxJoyasPosibles === null) {
                    $maxJoyasPosibles = $joyasPosibles;
                } else {
                    $maxJoyasPosibles = min($maxJoyasPosibles, $joyasPosibles);
                }
    
            return response()->json([
                'message' => 'Hay suficientes componentes en el inventario',
                'cantidad Necesaria' => $ingrediente->cantidad,
                'cantidad Inventario' => $inventario->cantidad,
                'Cantidad de Joyas que puedes realizar' => $maxJoyasPosibles
            ]);
            
        } catch(\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
