<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\TipoJoya;
use App\Models\Receta;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class JoyaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'foto' => $this->faker->imageUrl(),
            'idTipoJoya' => TipoJoya::all()->random()->id,
            'idReceta' => Receta::all()->random()->id,
        ];
    }
}
