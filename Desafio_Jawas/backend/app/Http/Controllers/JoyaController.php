<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Joya;

class JoyaController extends Controller
{

    public function listar()
    {
        try {
            $joyas = Joya::all();
            return response()->json($joyas, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function crear (Request $request){
        
        $validator = Validator::make($request->all(), [
            //TODO: foto
            //'foto' => 'required|string',
            'idTipoJoya' => 'required|integer',
            'idReceta' => 'required|integer',
        ]);
    
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }
    
        try {
            $joya = Joya::create($request->all());
            return response()->json($joya, 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function mostrar($id){

        try {
            $joya = Joya::findOrFail($id);
            return response()->json($joya);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function modificar(Request $request, $id){

        $validator = Validator::make($request->all(), [
            //'foto' => 'required|string',
            'idTipoJoya' => 'required|integer',
            'idReceta' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }
    
        try {
            $joya = Joya::findOrFail($id);
            $joya->update($request->all());
            return response()->json($joya, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function eliminar($id){
        
        try {
            $joya = Joya::findOrFail($id);
            $joya->delete();
            return response()->json(null, 204);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

}


