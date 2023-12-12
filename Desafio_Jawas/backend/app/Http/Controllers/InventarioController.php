<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Inventario;
use Illuminate\Support\Facades\DB;

class InventarioController extends Controller
{
    public function listar($id)
    {
        try {
            $inventario = DB::table('inventario')
            ->join('componente', 'inventario.idComponente', '=', 'componente.id')
            ->select('inventario.*', 'componente.nombre as nombre_componente')
            ->where('inventario.idComponente', '=', $id)
            ->get();
            return response()->json($inventario);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    // TODO Aquí esta la plantilla para poder hacer join y cambiar columnas de las tablas
    public function mostrar()
    {
        try {
            $inventario = Inventario::join('componente', 'inventario.idComponente', '=', 'componente.id')
                ->select('inventario.*', 'componente.nombre as nombre_componente')
                ->get();
            return response()->json($inventario);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function modificarCantidad(Request $request, $id)
    {
        try {
            $inventario = Inventario::findOrFail($id);
            $inventario->cantidad = $request->cantidad;
            $inventario->save();
            return response()->json([
                'inventario' => $inventario,
                'message' => 'Cantidad modificada',
                'status' => 200
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function eliminar($id)
    {
        try {
            $inventario = Inventario::findOrFail($id);
            $inventario->delete();
            return response()->json([
                'inventario' => $inventario,
                'message' => 'Inventario eliminado',
                'status' => 200
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
