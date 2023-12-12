<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Receta;
use App\Models\Componente;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class IngredienteAsignadoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'id_receta' => Receta::all()->random()->id,
            'id_componente' => Componente::all()->random()->id,
            'cantidad' => $this->faker->numberBetween(1, 100),
        ];
    }
}
