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

    public function crear (Request $request){ // NO SE USA
        
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
            'foto' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }
    
        try {
            $joya = Joya::findOrFail($id);
            $joya->foto = $request->get('foto');
            $joya->save();
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
            $foto = $request->get('foto'); 

            $componentes = Inventario::all();
    
            $nuevaJoya = new Joya();
            $nuevaJoya->idtipoJoya = $tipoJoya;
            $nuevaJoya->foto = $foto;

            //selecc una receta random TODO:mirar hasta que punto es legal
            $receta = Receta::inRandomOrder()->first();
            $nuevaJoya->idReceta = $receta->id; 

            $ingredientes = IngredienteAsignado::where('id_receta', $receta->id)->get();

            if (!$this->componenteSuficiente($ingredientes, $componentes)) {
                return response()->json(['error' => 'No hay suficientes componentes en el inventario'], 500);
            }

                foreach ($ingredientes as $ingrediente) {

                    foreach ($componentes as $componente) {
                        if ($ingrediente->id_componente == $componente->idComponente) {
                            $cantidad = $componente->cantidad - $ingrediente->cantidad;
                            $componente->cantidad = $cantidad;
                            $componente->save();
                    }
                }
            }
            $nuevaJoya->save();
            return response()->json(['message' => 'Joya creada correctamente']);
        }catch(\Exception $e) {
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


