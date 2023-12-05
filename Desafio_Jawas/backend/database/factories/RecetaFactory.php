<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
use App\Database\Factories\ComponenteFactory;
use App\Models\TipoJoya;
use App\Models\RolAsignado;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class RecetaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'idUsuario' => RolAsignado::where('id_rol', 3)->get('id_usuario')->random()->id_usuario,
            'idTipoJoya' => TipoJoya::all()->random()->id, 
        ];
    }
}
