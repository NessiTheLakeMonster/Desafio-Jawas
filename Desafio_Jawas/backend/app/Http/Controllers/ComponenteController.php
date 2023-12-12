<?php

/**
 * @author Patricia Mota
 */

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

    public function crear(Request $request)
    {

        $messages = [
            'required' => 'Campo obligatorio',
            'string' => 'El campo :nombre debe ser un texto',
            'boolean' => 'El campo :hardware debe ser un booleano',
        ];

        $validator = Validator::make($request->all(), [
            'nombre' => 'required|string',
            'hardware' => 'required|boolean',
        ], $messages);

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

    public function mostrar($id)
    {

        try {
            $componente = Componente::findOrFail($id);
            return response()->json($componente);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function modificar(Request $request, $id)
    {

        $messages = [
            'required' => 'Campo obligatorio',
            'string' => 'El campo :nombre debe ser un texto',
            'boolean' => 'El campo :hardware debe ser un booleano',
        ];

        $validator = Validator::make($request->all(), [
            'nombre' => 'required|string',
            'hardware' => 'required|boolean',
        ], $messages);

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

    public function eliminar($id)
    {

        try {
            $componente = Componente::findOrFail($id);
            $componente->delete();
            return response()->json([
                'message' => 'Componente eliminado correctamente',
                'id' => $id,
                'status' => 200
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
