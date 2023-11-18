<?php

namespace Database\Seeders;

use App\Models\TipoJoya;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TipoJoyaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tiposDeJoyas = ['Anillo', 'Collar', 'Pulsera', 'Pendiente', 'Broche', 'Colgante', 'Gemelos', 'Tobillera'];

        foreach ($tiposDeJoyas as $tipo) {
            TipoJoya::factory()->create(['nombre' => $tipo]);
        }
    }
}
