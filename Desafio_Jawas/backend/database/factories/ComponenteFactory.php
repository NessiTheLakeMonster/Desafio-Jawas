<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class ComponenteFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        $componentesHardware = [
            1 => 'RAM',
            2 => 'CPU',
            3 => 'GPU',
            4 => 'Disco duro',
            5 => 'Placa base',
            6 => 'Fuente de alimentación',
            7 => 'Cable de red',
            8 => 'Cable de alimentación',
            9 => 'Cable de datos',
            10 => 'Cable de audio',
        ];

        $componentesNoHardware = [
            1 => 'Gominola',
            2 => 'Papelera',
            3 => 'hilo metalico',
            4 => 'enganches',
            5 => 'tornillos',
            6 => 'tuerca',
            7 => 'arandela',

        ];

        $esHardware = $this->faker->boolean;

        if ($esHardware) {
            $nombre = $this->faker->randomElement($componentesHardware);
        } else {
            $nombre = $this->faker->randomElement($componentesNoHardware);
        }

        return [
            'nombre' => $nombre,
            'hardware' => $esHardware ? 1 : 0,
        ];
    }
}
