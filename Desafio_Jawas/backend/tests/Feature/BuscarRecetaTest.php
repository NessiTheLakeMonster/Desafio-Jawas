<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Auth;
use Tests\TestCase;
use App\Models\User;

class BuscarRecetaTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_example(): void
    {
        if(Auth::attempt(['email' => 'inesmballe@gmail.com', 'password' => 'admin123'])){
            $auth = Auth::user();
        }

        $token = $auth->createToken('access_token_test')->plainTextToken;
        $headers = ['Authorization' => "Bearer $token"];

        // Hacer la solicitud
        $this->json('GET', '/api/receta/mostrar/1', [], $headers)
            ->assertStatus(200)
            ->assertJsonStructure([
                "id",
                "idUsuario",
                "idTipoJoya",
                "created_at",
                "updated_at",
                "nombre",
                "apellido",
                "tipo_joya"
            ]);
    }
} 

