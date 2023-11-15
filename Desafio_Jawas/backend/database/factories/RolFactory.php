<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class RolFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        //TODO: ROL MIRAR ID DE ROLES
        $roles = [
            1 => 'administrador',
            2 => 'clasificador',
            3 => 'diseñador',
            4 => 'colaborador'
        ];
    
        return [
            'nombre' => $this->faker->randomElement($roles),
        ];
    }
}
