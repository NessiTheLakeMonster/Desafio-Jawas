<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class LoteFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        $entregado = $this->faker->boolean;
        $cancelado = $entregado ? 0 : $this->faker->boolean;

        return [
            'id_usuario' => User::all()->random()->id,
            'latitud' => $this->faker->latitude,
            'longitud' => $this->faker->longitude,
            'entregado' => $entregado,
            'cancelado' => $cancelado,
        ];

    }
}
