<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function listar()
    {
        try {
            $usuarios = User::all();
            return response()->json($usuarios, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function guardar(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'fotoPerfil' => 'required|string',
            'nombre' => 'required|string',
            'apellido' => 'required|string',
            'email' => 'required|string',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        try {
            $usuario = User::create($request->all());
            return response()->json($usuario, 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
