<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class TipoJoyaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $nombresDeJoyas = ['Anillo', 'Collar', 'Pulsera', 'Pendiente', 'Broche', 'Colgante', 'Gemelos', 'Tobillera'];

        return [
            'nombre' => $this->faker->randomElement($nombresDeJoyas),
        ];
    }
}
