<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;

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
        ];

        $validator = Validator::make($request->all(), [
            'fotoPerfil' => 'required|string',
            'nombre' => 'required|string',
            'apellido' => 'required|string'
        ], $messages);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        try {
            $usuario = User::findOrFail($id);
            $usuario->update($request->all());
            return response()->json([
                "usuario" => $usuario,
                "message" => "Usuario modificado",
                "status" => 200
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function modificarPasswd(Request $request, $id)
    {
        $messages = [
            'required' => 'Campo obligatorio',
            'string' => 'El campo :nombre debe ser un texto',
            'password' => 'El campo :password debe ser un texto',
        ];

        $validator = Validator::make($request->all(), [
            'password' => 'required|string',
        ], $messages);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        } else {
            try {
                $usuario = User::findOrFail($id);
                $newPassword = $request->get('password');

                if (Hash::check($newPassword, $usuario->password)) {
                    return response()->json([
                        'error' => 'La nueva contraseña no puede ser la misma que la antigua',
                        'status' => 400
                    ], 400);
                }

                $usuario->password = Hash::make($newPassword);
                $usuario->save();

                return response()->json([
                    'message' => 'Contraseña modificada',
                    'status' => 200
                ], 200);
            } catch (\Exception $e) {
                return response()->json(['error' => $e->getMessage()], 500);
            }
        }
    }

    public function delete($id)
    {
        try {
            $usuario = User::findOrFail($id);
            $usuario->delete();
            return response()->json([
                'message' => 'Usuario eliminado',
                'id' => $id,
                'status' => 200
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
