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
            $lotes = Lote::where('entregado', true)->get();
            return response()->json($lotes, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function crear(Request $request)
    {

        $messages = [
            'required' => 'Campo obligatorio',
            'id_usuario.required' => 'El campo id_usuario es obligatorio',
            'lugar_recogida.required' => 'El campo lugar_recogida es obligatorio',
            'id_usuario.integer' => 'El campo id_usuario debe ser un número entero',
            'id_usuario.exists' => 'El campo id_usuario no existe',
        ];

        $validator = Validator::make($request->all(), [
            'id_usuario' => 'required|integer|exists:users,id',
            'lugar_recogida' => 'required|string',
        ], $messages);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        try {
            $lote = new Lote;
            $lote->id_usuario = $request->id_usuario;
            $lote->lugar_recogida = $request->lugar_recogida;
            $lote->entregado = 1;
            $lote->cancelado = 0;

            if ($lote->save()) {
                return response()->json(['success' => 'Lote creado con éxito'], 201);
            } else {
                return response()->json(['error' => 'Error al crear el lote'], 500);
            }
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function mostrar($id)
    {

        try {
            $lote = Lote::where('id', $id)->where('entregado', true)->first();

            if ($lote) {
                return response()->json($lote);
            } else {
                return response()->json(['error' => 'Lote no encontrado'], 404);
            }
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function modificar(Request $request, $id)
    {

        $messages = [
            'required' => 'Campo obligatorio',
            'id_usuario.required' => 'El campo id_usuario es obligatorio',
            'lugar_recogida.required' => 'El campo lugar_recogida es obligatorio',
            'id_usuario.integer' => 'El campo id_usuario debe ser un número entero',
            'id_usuario.exists' => 'El campo id_usuario no existe',
        ];

        $validator = Validator::make($request->all(), [
            'id_usuario' => 'required|integer|exists:users,id',
            'lugar_recogida' => 'required|string',
        ], $messages);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        try {
            $lote = Lote::find($id);

            if ($lote) {
                $lote->id_usuario = $request->get('id_usuario');
                $lote->lugar_recogida = $request->get('lugar_recogida');
                $lote->entregado = $request->get('entregado');
                $lote->cancelado = $request->get('cancelado');

                if ($lote->save()) {
                    return response()->json(['success' => 'Lote modificado con éxito']);
                } else {
                    return response()->json(['error' => 'Error al modificar el lote']);
                }
            } else {
                return response()->json(['error' => 'Lote no encontrado']);
            }
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function eliminar($id)
    {

        try {
            $lote = Lote::findOrFail($id);
            $lote->delete();
            return response()->json(['message' => 'Lote eliminado correctamente']);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function mostrarLotes($idUsuario)
    { // SOLO COLABORADORES PODRÁN VER ESTA LISTA
        try {
            $lotes = Lote::where('id_usuario', $idUsuario)->get();
            return response()->json($lotes);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function mostrarEntregados($idUsuario)
    { // SOLO COLABORADORES PODRÁN VER ESTA LISTA
        try {
            $lotes = Lote::where('id_usuario', $idUsuario)->where('entregado', true)->where('cancelado', false)->get();
            return response()->json($lotes);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function mandarLote($id)
    {
        try {
            $lote = Lote::where('id', $id)->where('entregado', false)->where('cancelado', true)->first();

            if ($lote) {
                $lote->entregado = 1;
                $lote->cancelado = 0;

                if ($lote->save()) {
                    return response()->json(['success' => 'Lote mandado con éxito']);
                } else {
                    return response()->json(['error' => 'El lote ya está mandado']);
                }
            } else {
                return response()->json(['error' => 'Error al mandar el lote'], 404);
            }
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function cancelarLote($id)
    {
        try {
            $lote = Lote::where('id', $id)->where('entregado', true)->where('cancelado', false)->first();

            if ($lote) {
                $lote->entregado = 0;
                $lote->cancelado = 1;

                if ($lote->save()) {
                    return response()->json(['success' => 'Lote cancelado con éxito']);
                } else {
                    return response()->json(['error' => 'El lote ya está cancelado']);
                }
            } else {
                return response()->json(['error' => 'Error al cancelar el lote'], 404);
            }
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
