<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;


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

                $success['token'] =  $usuario->createToken('access_token', ["user"])->plainTextToken; // crear token

                return response()->json([
                    'usuario' => $success,
                    'message' => 'Inicio de sesión'
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
                return response()->json($validator->errors(), 422);
            } else {
                $usuario = new User();
                $usuario->fotoPerfil = $request->fotoPerfil;
                $usuario->nombre = $request->nombre;
                $usuario->apellido = $request->apellido;
                $usuario->email = $request->email;
                $usuario->password = Hash::make($request->password);
                $usuario->save();

                $success['token'] =  $usuario->createToken('access_token', ["user"])->plainTextToken;

                return response()->json([
                    'usuario' => $success,
                    'message' => 'usuario creado'
                ], 200);
            }
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error en el servidor',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /*
    TEORÍA VALIDATOR 
    - 'required' => es obligatorio => 'email' => 'required'
    - 'string' => debe ser un string => 'email' => 'string'
    - 'email' => debe ser un email => 'email' => 'email'
    - 'max:55' => longitud máxima de 55 caracteres => 'email' => 'max:55'
    - 'min:8' => longitud mínima de 8 caracteres => 'contraseña' => 'min:8'
    - 'unique' => debe ser único en la tabla => 'email' => 'unique'
    - 'confirmed' => debe ser igual al campo de confirmación => 'contraseña' => 'confirmed'
    - 'exists:usuarios,id' => debe existir en la tabla usuarios, en el campo id => 'id' => 'exists:usuarios,id'
    - 'exists:usuarios,id,rol,admin' => debe existir en la tabla usuarios, en el campo id, y el campo rol debe ser igual a admin => 'id' => 'exists:usuarios,id,rol,admin'
    - 'birthdate' => debe ser una fecha válida => 'birthdate' => 'birthdate'
    - integer => debe ser un número entero => 'id' => 'integer'
    - 'numeric' => debe ser un número   => 'id' => 'numeric'
    - 'digits_between:1,3' => debe tener entre 1 y 3 dígitos => 'id' => 'digits_between:1,3'
    - 'digits:3' => debe tener 3 dígitos => 'id' => 'digits:3'
    - 'date_format:Y-m-d' => debe tener el formato de fecha Y-m-d => 'birthdate' => 'date_format:Y-m-d'
    - 'regex' => debe cumplir una expresión regular => 'email' => 'regex:/^.+@.+$/i'
    */
}
