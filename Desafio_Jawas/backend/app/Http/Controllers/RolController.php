<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Rol;
use App\Models\RolAsignado;
use App\Models\User;
use Illuminate\Support\Facades\Validator;

class RolController extends Controller
{
    public function asignarRol(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'idUsuario' => 'required|integer',
            'idRol' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        try {
            $usuario = User::find($request->idUsuario);
            $rol = RolAsignado::create($request->all());
            return response()->json($rol, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
        
    }
}
