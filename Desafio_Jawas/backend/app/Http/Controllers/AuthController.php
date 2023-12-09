<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;


class AuthController extends Controller
{
    public function login(Request $request)
    {

        try {

            $message = [
                'email.required' => 'El campo email es obligatorio',
                'email.email' => 'El campo email debe ser un email válido',
                'email.max' => 'El campo email debe tener como máximo 55 caracteres',
                'password.required' => 'El campo contraseña es obligatorio',
                'password.min' => 'El campo contraseña debe tener como mínimo 8 caracteres',
            ];
            $validator = Validator::make($request->all(), [ // validacion de los campos
                'email' => 'required|string|email|max:55',
                'password' => 'required|string|min:8',
            ], $message);

            if ($validator->fails()) {
                return response()->json($validator->errors(), 422);
            } else {
                $usuario = User::where('email', $request->email)->first(); // buscar usuario por email
            }

            if (!$usuario || !Hash::check($request->password, $usuario->password)) {
                return response()->json([
                    'message' => 'datos incorrectos'
                ], 401);
            } else {

                /* $success['token'] =  $usuario->createToken('access_token', ["user"])->plainTextToken; */
                $success['token'] =  $usuario->createToken('access_token', ["colaborador"])->plainTextToken; // crear token

                return response()->json([
                    'token' => $success['token'], // retornar token
                    'usuario' => $usuario,
                    'message' => 'Inicio de sesión',
                    'status' => 200,
                    'ok' => true
                ], 200);
            }
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error en el servidor',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function logout(Request $request)
    {
        try {
            $auth = Auth::user();

            $nombre = $auth->nombre; // ejemplo de como seria util usar -> $auth = Auth::user(); para acceder a los datos del usuario que ha iniciado sesion

            $request->user()->tokens()->delete();

            return response()->json([
                'message' => 'sesion cerrada',
                'nombre' => $nombre
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error en el servidor',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function registro(Request $request)
    {

        try {

            $message = [
                'nombre.required' => 'El campo nombre es obligatorio',
                'apellido.required' => 'El campo apellido es obligatorio',
                'email.required' => 'El campo email es obligatorio',
                'password.required' => 'El campo contraseña es obligatorio',
                'email' => 'El campo :email debe ser un email',
                'max' => 'El campo :nombre debe tener como máximo :max caracteres',
                'min' => 'El campo :contraseña debe tener como mínimo :min caracteres',
                'unique' => 'El campo :email ya existe',
                'confirmed' => 'El campo :contraseña debe ser igual al campo de confirmación',

            ];

            $validator = Validator::make($request->all(), [ // validacion de los campos
                'fotoPerfil' => 'string',
                'nombre' => 'required|string|min:2|max:55',
                'apellido' => 'required|string|min:2|max:55',
                'email' => 'required|string|email|max:55|unique:users',
                'password' => 'required|string|min:8|confirmed',

            ], $message);

            if ($validator->fails()) {
                return response()->json($validator->errors(), 304);
            } else {
                $usuario = new User();
                $usuario->fotoPerfil = $request->fotoPerfil;
                $usuario->nombre = $request->nombre;
                $usuario->apellido = $request->apellido;
                $usuario->email = $request->email;
                $usuario->password = Hash::make($request->password);
                $usuario->save();

                DB::table('rol_asignado')->insert([
                    'id_Usuario' => $usuario->id,
                    'id_Rol' => 1
                ]);

                $success['token'] =  $usuario->createToken('access_token', ["colaborador"])->plainTextToken;

                return response()->json([
                    'usuario' => $success,
                    'message' => 'usuario creado',
                    'status' => 200
                ], 200);
            }
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error en el servidor',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
