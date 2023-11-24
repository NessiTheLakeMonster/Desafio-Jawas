<?php

namespace App\Http\Controllers;

use App\Models\InfoLote;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class Info_LoteController extends Controller
{
    public function crear (Request $request){

        $messages =['required' => 'Campo obligatorio',
                    'idLote.required' => 'El campo idLote es obligatorio',
                    'idComponente.required' => 'El campo idComponente es obligatorio',
                    'descripcion.required' => 'El campo descripcion es obligatorio',
                    'cantidad.required' => 'El campo cantidad es obligatorio',
                    'idLote.integer' => 'El campo idLote debe ser un número entero',
                    'idComponente.integer' => 'El campo idComponente debe ser un número entero',
                    'cantidad.integer' => 'El campo cantidad debe ser un número entero',
                    'idLote.exists' => 'El campo idLote no existe',
                    'idComponente.exists' => 'El campo idComponente no existe',
        ];
        
        $validator = Validator::make($request->all(), [
            'idLote' => 'required|integer|exists:lote,id',
            'idComponente' => 'required|integer|exists:componente,id',
            'descripcion' => 'required|string',
            'cantidad' => 'required|integer',
        ],$messages);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        try {
            $lote = new InfoLote;
            $lote->idLote = $request->get('idLote');
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
