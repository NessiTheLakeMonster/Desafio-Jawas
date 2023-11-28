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

    public function crear(Request $request)
    {
        $messages = [
            'required' => 'Campo obligatorio',
            'string' => 'El campo :nombre debe ser un texto',
            'email' => 'El campo :email debe ser un email',
            'password' => 'El campo :password debe ser un texto',
        ];

        $validator = Validator::make($request->all(), [
            'fotoPerfil' => 'required|string',
            'nombre' => 'required|string',
            'apellido' => 'required|string',
            'email' => 'required|string',
            'password' => 'required|string',
        ], $messages);

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

    public function buscar($id)
    {
        try {
            $usuario = User::findOrFail($id);
            return response()->json($usuario, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function modificar(Request $request, $id)
    {
        $messages = [
            'required' => 'Campo obligatorio',
            'string' => 'El campo :nombre debe ser un texto',
            'email' => 'El campo :email debe ser un email',
            'password' => 'El campo :password debe ser un texto',
        ];

        $validator = Validator::make($request->all(), [
            'fotoPerfil' => 'required|string',
            'nombre' => 'required|string',
            'apellido' => 'required|string',
            'email' => 'required|string',
            'password' => 'required|string',
        ], $messages);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        try {
            $usuario = User::findOrFail($id);
            $usuario->update($request->all());
            return response()->json($usuario, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
