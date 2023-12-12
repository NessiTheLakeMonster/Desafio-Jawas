<?php

/**
 * @author Patricia Mota
 */

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\TipoJoya;

class TipoJoyaController extends Controller
{
    public function listar ()
    {
        try {
            $tipo_joyas = TipoJoya::all();
            return response()->json($tipo_joyas, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
