<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Lote;
use Illuminate\Support\Facades\Validator;

class LoteController extends Controller
{
    public function listar()
    {
        try {
            $lotes = Lote::all();
            return response()->json($lotes, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function guardar (Request $request){
        
        $validator = Validator::make($request->all(), [
            'id_usuario' => 'required|integer|exists:users,id',
            'lugar_recogida' => 'required|string',
            'entregado' => 'required|boolean',
            'cancelado' => 'required|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        try {
            $lote = Lote::create($request->all());
            return response()->json($lote, 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function mostrar($id){

        try {
            $lote = Lote::findOrFail($id);
            return response()->json($lote);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function modificar(Request $request, $id){

        $validator = Validator::make($request->all(), [
            'id_usuario' => 'required|integer|exists:users,id',
            'lugar_recogida' => 'required|string',
            'entregado' => 'required|boolean',
            'cancelado' => 'required|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        try {
            $lote = Lote::findOrFail($id);
            $lote->update($request->all());
            return response()->json($lote);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function eliminar($id){
        
        try {
            $lote = Lote::findOrFail($id);
            $lote->delete();
            return response()->json(['message' => 'Lote eliminado correctamente']);
        
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function comprobarEntregas(){
        try {
            $lotes = Lote::where('entregado', true)->get();
            return response()->json($lotes);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function cancelarLote($id){
        try {
            $lote = Lote::where('id', $id)->where('cancelado', false)->first();
    
            if ($lote) {
                $lote->update(['cancelado' => true]);
                return response()->json($lote);
            } else {
                return response()->json(['error' => 'Lote no encontrado o ya está cancelado'], 404);
            }
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function entregarLote($id){
        try {
            $lote = Lote::where('id', $id)->where('entregado', false)->where('cancelado', false)->first();
    
            if ($lote) {
                $lote->update(['entregado' => true]);
                return response()->json($lote);
            } else {
                return response()->json(['error' => 'Lote no encontrado o ya está entregado o está cancelado'], 404);
            }
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }


}

