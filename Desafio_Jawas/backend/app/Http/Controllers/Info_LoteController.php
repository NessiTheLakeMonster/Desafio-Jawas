<?php

namespace App\Http\Controllers;

use App\Models\InfoLote;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class Info_LoteController extends Controller
{
    public function crear (Request $request){
        
        $validator = Validator::make($request->all(), [
            'idLote' => 'required|integer|exists:lote,id',
            'idComponente' => 'required|integer|exists:componente,id',
            'descripcion' => 'required|string',
            'cantidad' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        try {
            $lote = InfoLote::create($request->all());
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

    public function listar()
    {
        try {
            $desguace = InfoLote::all();
            return response()->json($desguace, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

}
