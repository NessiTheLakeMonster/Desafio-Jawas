<?php

/**
 * @author Inés Barrera
 */

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Rol;
use App\Models\RolAsignado;
use App\Models\User;
use Illuminate\Support\Facades\Validator;

class RolController extends Controller
{
    public function listar()
    {
        try {
            $roles = Rol::all();
            return response()->json($roles, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
