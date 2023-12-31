<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class midColaborador
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if ($user -> tokenCan('colaborador')) {
            return $next($request);
        } else {
            return response()->json([
                "success" => false,
                "message" => "No tienes permisos para realizar esta acción",
                "status" => 401
            ], 401);
        }
    }
}
