<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class midDisenador
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if ($user->tokenCan('diseñador')) {
            return $next($request);
        } else {
            return response()->json([
                "success" => false,
                "message" => "No tienes permisos para realizar esta acción"
            ], 401);
        }
    }
}
