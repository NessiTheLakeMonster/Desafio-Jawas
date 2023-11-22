<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Joya;
use App\Models\Receta;
use App\Models\Inventario;
use App\Models\IngredienteAsignado;

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
            'idTipoJoya' => 'required|integer|exists:tipo_joya,id',
            'idReceta' => 'required|integer|exists:receta,id',
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
            'idTipoJoya' => 'required|integer|exists:tipo_joya,id',
            'idReceta' => 'required|integer|exists:receta,id',
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
            return response()->json(['message' => 'Joya eliminada correctamente']);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    //TODO:INES MIRA AQUI, CUANDO SE GENERA LA JOYA LA FOTO ¿? CREA UNA RECETA ALEATORIA
    public function generarJoyaAleatoria (Request $request){

        try{
            $tipoJoya = $request->get('idTipoJoya');
            $joyas = Joya::where('idtipoJoya', $tipoJoya)->get();
    
            $componentes = Inventario::all();
    
            $nuevaJoya = new Joya();
            $nuevaJoya->idtipoJoya = $tipoJoya;
            $nuevaJoya->foto = 'prueba.jpg';
    
            foreach ($joyas as $joya) {
                $receta = Receta::where('id', $joya->idReceta)->first();
                $nuevaJoya->idReceta = $receta->id; 
    
                $ingredientes = IngredienteAsignado::where('id_receta', $receta->id)->get();
    
                foreach ($ingredientes as $ingrediente) {
                    foreach ($componentes as $componente) {
                        if ($ingrediente->id_componente == $componente->idComponente) {
                            $cantidad = $componente->cantidad - $ingrediente->cantidad;
                            $componente->cantidad = $cantidad;
                            $componente->save();
                        }
                    }
                }
            }
            $nuevaJoya->save();
            return response()->json(['message' => 'Joya creada correctamente']);
        }catch(\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }


}


