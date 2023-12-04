<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Inventario;


class InventarioController extends Controller
{
    public function listar($id)
    {
        try {
            $inventario = Inventario::where('id_componente', $id)->get();
            return response()->json($inventario);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

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
}
