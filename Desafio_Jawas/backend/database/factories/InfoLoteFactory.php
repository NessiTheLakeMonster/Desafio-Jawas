<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Lote;
use App\Models\Componente;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class InfoLoteFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        //TODO:hacer modelos de lote y componente
        return [
            'idLote' => Lote::all()->random()->id,
            'idComponente' => Componente::all()->random()->id,
            'descripcion' => $this->faker->sentence,
            'cantidad' => $this->faker->numberBetween(1, 100),
        ];
    }
}
