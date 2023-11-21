<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Componente;


class ComponenteController extends Controller
{
    public function listar()
    {
        try {
            $componentes = Componente::all();
            return response()->json($componentes, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function crear (Request $request){
        
        $validator = Validator::make($request->all(), [
            'nombre' => 'required|string',
            'hardware' => 'required|boolean',
        ]);
    
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }
    
        try {
            $componente = Componente::create($request->all());
            return response()->json($componente, 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function mostrar($id){

        try {
            $componente = Componente::findOrFail($id);
            return response()->json($componente);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function modificar(Request $request, $id){

        $validator = Validator::make($request->all(), [
            'nombre' => 'required|string',
            'hardware' => 'required|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }
    
        try {
            $componente = Componente::findOrFail($id);
            $componente->update($request->all());
            return response()->json($componente, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function eliminar($id){
        
        try {
            $componente = Componente::findOrFail($id);
            $componente->delete();
            return response()->json(null, 204);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function esHardware($id){
        try {
            $componente = Componente::findOrFail($id);
            return response()->json($componente->hardware, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

//TODO: hacer que el administrador habilite y deshabulite el que ???

}
