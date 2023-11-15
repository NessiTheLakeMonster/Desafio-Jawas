<?php

namespace Database\Seeders;

use App\Models\RolAsignado;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RolAsignadoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        RolAsignado::factory(10)->create();
    }
}
