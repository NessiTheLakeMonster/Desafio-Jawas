<?php

namespace App\Http\Controllers;

use App\Models\RolAsignado;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

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

    public function modificarFoto(Request $request, $id)
    {
        $messages = [
            'required' => 'Campo obligatorio',
        ];

        $validator = Validator::make($request->all(), [
            'fotoPerfil' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ], $messages);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        try {
            $usuario = User::findOrFail($id);

            if ($request->hasFile('fotoPerfil')) {
                // Se elimina la foto anterior
                if ($usuario->fotoPerfil) {
                    $fotoAntigua = str_replace(env('AWS_URL'), '', $usuario->fotoPerfil);
                    Storage::disk('s3')->delete($fotoAntigua);
                }

                // Se guarda la nueva foto
                $foto = $request->file('fotoPerfil');
                $rutaFotoPerfil = $foto->store('usuarios', 's3');
                $urlFotoPerfil = Storage::disk('s3')->url($rutaFotoPerfil);

                // Se actualiza el usuario
                $usuario->fotoPerfil = $urlFotoPerfil;
            }

            $usuario->save();
            return response()->json([
                "usuario" => $usuario,
                "message" => "Foto de perfil modificada",
                "status" => 200
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function modificar(Request $request, $id)
    {
        $messages = [
            'required' => 'Campo obligatorio',
            'string' => 'El campo :nombre debe ser un texto',
        ];

        $validator = Validator::make($request->all(), [
            /* 'fotoPerfil' => 'required|string', */
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
            $rol = RolAsignado::where('id_usuario', $id)->delete();
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
