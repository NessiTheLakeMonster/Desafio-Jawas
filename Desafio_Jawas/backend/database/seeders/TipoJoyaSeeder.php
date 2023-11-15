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
        TipoJoya::factory(10)->create();
    }
}
