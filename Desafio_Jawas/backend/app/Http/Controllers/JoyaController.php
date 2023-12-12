<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Joya;
use App\Models\Receta;
use App\Models\Inventario;
use App\Models\IngredienteAsignado;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;



class JoyaController extends Controller
{

    public function listar()
    {
        try {
            $joyas = DB::table('joya')->join('tipo_joya', 'joya.idTipoJoya', '=', 'tipo_joya.id')
                ->select('joya.*', 'tipo_joya.nombre as tipo_joya')
                ->get();

            return response()->json($joyas, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /* public function crear (Request $request){ 
        
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
    } */

    public function mostrar($id)
    {

        try {
            $joya = DB::table('joya')
                ->join('tipo_joya', 'joya.idTipoJoya', '=', 'tipo_joya.id')
                ->select('joya.*', 'tipo_joya.nombre as tipo_joya')
                ->where('joya.id', '=', $id)
                ->first();
            return response()->json($joya);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function modificar(Request $request, $id)
    {
        $messages = [
            'max' => 'El campo se excede del tamaño máximo'
        ];
        
        $validator = Validator::make($request->all(), [
            'foto' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ], $messages);
        
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }
        
        try {
            $joya = Joya::findOrFail($id);
        
            if ($request->hasFile('foto')) {
                // Elimina la imagen antigua si existe
                if ($joya->foto) {
                    $fotoAntigua = str_replace(env('AWS_URL'), '', $joya->foto);
                    Storage::disk('s3')->delete($fotoAntigua);
                }
        
                // Almacena la nueva imagen
                $foto = $request->file('foto');
                $rutaFoto = $foto->store('joyas', 's3');
                $url = Storage::disk('s3')->url($rutaFoto);
        
                // Actualiza el campo 'foto' de la joya con la nueva URL
                $joya->foto = $url;
            }
        
            $joya->save();
            return response()->json($joya, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function eliminar($id)
    {

        try {
            $joya = Joya::findOrFail($id);
            $joya->delete();
            return response()->json(['message' => 'Joya eliminada correctamente']);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function generarJoyaAleatoria(Request $request)
    {
        try {
            $tipoJoya = intval($request->get('idTipoJoya'));
            $idReceta = intval($request->get('idReceta'));
            $foto = $request->get('foto');

            // Verificar si hay suficientes componentes
            $componentesSuficientes = $this->componenteSuficiente($idReceta);
            if ($componentesSuficientes->getStatusCode() != 200) {
                return $componentesSuficientes;
            }

            $nuevaJoya = new Joya();
            $nuevaJoya->idtipoJoya = $tipoJoya;
            $nuevaJoya->idReceta = $idReceta;
            $nuevaJoya->foto = $foto;

            $componentes = Inventario::all();
            $ingredientes = IngredienteAsignado::where('id_receta', $idReceta)->get();

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
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function componenteSuficiente($idReceta)
    {
        try {
            $ingredientes = IngredienteAsignado::where('id_receta', $idReceta)->get();

            $maxJoyasPosibles = PHP_INT_MAX;

            foreach ($ingredientes as $ingrediente) {
                $inventario = Inventario::where('idComponente', $ingrediente->id_componente)->first();
                if (!$inventario) {
                    return response()->json(['error' => 'Componente no encontrado en el inventario'], 500);
                }

                if ($inventario->cantidad < $ingrediente->cantidad) {
                    $cantidadFaltante = $ingrediente->cantidad - $inventario->cantidad;
                    $componente = $inventario->idComponente;

                    return response()->json([
                        'error' => 'No hay suficientes componentes en el inventario',
                        'componente' => $componente,
                        'cantidad Necesaria' => $ingrediente->cantidad,
                        'cantidad Inventario' => $inventario->cantidad,
                        'cantidad Faltante' => $cantidadFaltante
                    ], 500);
                }

                // se calcula las joyas q se pueden hacer con los componentes disponibles en el inventarioo
                $joyasPosibles = floor($inventario->cantidad / $ingrediente->cantidad);
                $maxJoyasPosibles = min($maxJoyasPosibles, $joyasPosibles);
            }

            return response()->json([
                'message' => 'Hay suficientes componentes en el inventario',
                'Cantidad de Joyas que puedes realizar' => $maxJoyasPosibles
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function cargarImagen(Request $request)
    {

        $messages = [
            'max' => 'El campo se excede del tamaño máximo'
        ];

        $validator = Validator::make($request->all(), [
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ], $messages);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 202);
        }

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $path = $file->store('joyas', 's3'); // 'perfiles' es la carpeta en tu bucket. Este método le asigna un UID a la imagen.

            //$path = $file->storeAs('joyas', $file->getClientOriginalName(), 's3');
            $url = Storage::disk('s3')->url($path);
            return response()->json(['path' => $path, 'url' => $url], 200);
        }

        return response()->json(['error' => 'No se recibió ningún archivo.'], 400);
    }
}
