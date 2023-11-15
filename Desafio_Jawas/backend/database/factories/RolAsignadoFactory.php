<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\RolAsignado;
use App\Models\User;
use App\Models\Rol;


/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class RolAsignadoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        /* $usuario = User::factory()->create();
        $rol = Rol::factory()->create();

        return [
            'id_usuario' => $usuario->id,
            'id_rol' => $rol->id,
        ]; */

        return [
            'id_usuario' => User::all()->random()->id,
            'id_rol' => Rol::all()->random()->id,
        ];
    }
}
