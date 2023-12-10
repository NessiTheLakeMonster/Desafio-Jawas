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

    /**
     * @author Inés Mª Barrera Llerena
     * @summary Inicio de sesión
     * 
     * @param Request $request
     * @return void
     */
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

                $success = $this->crearToken($usuario);

                return response()->json([
                    'token' => $success['token'],
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

    /**
     * @author Inés Mª Barrera Llerena
     * @summary Creación del token mirando los roles asignados al usuario
     * 
     * @param User $usuario
     * @return success, el cual contiene el token
     */
    public function crearToken($usuario)
    {
        $abilities = [];
        $rolAsignado = DB::table('rol_asignado')->where('id_usuario', $usuario->id)->get();
        $rolesTotales = DB::table('rol')->get();

        for ($i = 0; $i < count($rolAsignado); $i++) {
            for ($j = 0; $j < count($rolesTotales); $j++) {
                if ($rolAsignado[$i]->id_rol == $rolesTotales[$j]->id) {
                    $abilities[] = $rolesTotales[$j]->nombre;
                }
            }
        }

        $success['token'] =  $usuario->createToken('access_token', $abilities)->plainTextToken;

        return $success;
    }

    /**
     * @author Inés Mª Barrera Llerena
     * @summary Registro de un nuevo usuario
     * 
     * @param Request $request
     * @return void
     */
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

            $validator = Validator::make($request->all(), [ 
                'fotoPerfil' => 'string',
                'nombre' => 'required|string|min:2|max:55',
                'apellido' => 'required|string|min:2|max:55',
                'email' => 'required|string|email|max:55|unique:users', // El email debe ser único
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

                // Por defecto se asigna el rol de colaborador
                DB::table('rol_asignado')->insert([
                    'id_Usuario' => $usuario->id,
                    'id_Rol' => 1
                ]);

                return response()->json([
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

    /**
     * @author Inés Mª Barrera Llerena
     * @summary Cierre de sesión de un usuario
     * 
     * @param Request $request
     * @return void
     */
    public function logout(Request $request)
    {
        try {
            $auth = Auth::user();

            $nombre = $auth->nombre;

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
}
