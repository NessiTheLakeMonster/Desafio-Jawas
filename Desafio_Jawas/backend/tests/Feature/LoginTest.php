<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class LoginTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_example(): void
    {
        $datosLogin = [
            'email' => 'inesmballe@gmail.com',
            'password' => 'admin123'
        ];

        $this->json('POST', '/api/login', $datosLogin)
            ->assertStatus(200)
            ->assertJsonStructure([
                "token",
                "usuario" => [
                    "id",
                    "fotoPerfil",
                    "nombre",
                    "apellido",
                    "email",
                    "email_verified_at",
                    "created_at",
                    "updated_at"
                ],
                "message",
                "status",
                "ok"
            ]);
    }
}
