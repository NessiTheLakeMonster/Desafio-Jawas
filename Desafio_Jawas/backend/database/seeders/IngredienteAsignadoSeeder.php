<?php

namespace Database\Seeders;

use App\Models\IngredienteAsignado;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class IngredienteAsignadoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        IngredienteAsignado::factory(10)->create();
    }
}
