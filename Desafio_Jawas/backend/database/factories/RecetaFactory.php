<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
use App\Database\Factories\ComponenteFactory;
use App\Models\Componente;


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
        $componentesFactory = new ComponenteFactory();

        $numerosHardware = $this->faker->randomElements(array_keys($componentesFactory->componentesHardware), $this->faker->numberBetween(1, count($componentesFactory->componentesHardware)));
        $numerosNoHardware = $this->faker->randomElements(array_keys($componentesFactory->componentesNoHardware), $this->faker->numberBetween(1, count($componentesFactory->componentesNoHardware)));

        // ingredientes hace un array merge para unir los componentes hardware y no hardware y un arrat intersect key para obtener los elementos de los arrays de componentes hardware y no hardware que estan en los arrays de numeros hardware y no hardware y 
        // un array flip para intercambiar las claves por los valores
        $ingredientes = array_merge(array_intersect_key($componentesFactory->componentesHardware, array_flip($numerosHardware)), array_intersect_key($componentesFactory->componentesNoHardware, array_flip($numerosNoHardware)));

        return [
            'idUsuario' => User::factory(),
            'ingredientes' => implode(', ', $ingredientes),
        ];
    }
}
