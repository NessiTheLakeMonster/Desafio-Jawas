<?php

namespace App\Http\Controllers;

use App\Models\InfoLote;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class Info_LoteController extends Controller
{
    public function crear (Request $request, $idLote){

        $messages =[
            'required' => 'Campo obligatorio',
            'idComponente.required' => 'El campo idComponente es obligatorio',
            'descripcion.required' => 'El campo descripcion es obligatorio',
            'cantidad.required' => 'El campo cantidad es obligatorio',
            'idComponente.integer' => 'El campo idComponente debe ser un número entero',
            'cantidad.integer' => 'El campo cantidad debe ser un número entero',
            'idComponente.exists' => 'El campo idComponente no existe',
        ];
        
        $validator = Validator::make($request->all(), [
            'idComponente' => 'required|integer|exists:componente,id',
            'descripcion' => 'required|string',
            'cantidad' => 'required|integer',
        ],$messages);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        try {
            $lote = new InfoLote;
            $lote->idLote = $idLote;
            $lote->idComponente = $request->get('idComponente');
            $lote->descripcion = $request->get('descripcion');
            $lote->cantidad = $request->get('cantidad');
            $lote->save();
            return response()->json($lote, 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }


    public function mostrar($id){

        try {
            $desguace = InfoLote::findOrFail($id);
            return response()->json($desguace);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function listar($idLote)
    {
        try {
            $desguace = InfoLote::where('idLote', $idLote)->get(['idComponente', 'descripcion', 'cantidad']);
            return response()->json($desguace, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

}