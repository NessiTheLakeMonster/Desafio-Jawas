<?php

namespace App\Http\Controllers;

use App\Models\InfoLote;
use App\Models\Lote;
use App\Models\Inventario;
use App\Models\Componente;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class InfoLoteController extends Controller
{
    public function crear(Request $request, $idLote)
    {

        $messages = [
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
        ], $messages);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        try {
            $lote = Lote::findOrFail($idLote);
            $lote = Componente::findOrFail($request->idComponente);
            // Merge agrega idLote a la solicitud antes de crear el InfoLote. Esto asegura que idLote se incluya cuando se crea el InfoLote.
            $request->merge(['idLote' => $idLote]);
            $request->merge(['idComponente' => $request->idComponente]);
            $lote = InfoLote::create($request->all());

            $inventario = Inventario::where('idComponente', $request->idComponente)->first();
            if ($inventario) {
                $inventario->cantidad += $request->cantidad;
                $inventario->save();
            } else {
                Inventario::create([
                    'idComponente' => $request->idComponente,
                    'cantidad' => $request->cantidad
                ]);
            }

            return response()->json($lote, 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }


    public function mostrar($id)
    {

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
            $desguace = InfoLote::join('componente', 'info_lote.idComponente', '=', 'componente.id')
            ->select('info_lote.*', 'componente.nombre')
            ->where('idLote', $idLote)
            ->get();

            return response()->json($desguace, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
