<?php

namespace Database\Seeders;

use App\Models\InfoLote;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;


class InfoLoteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        InfoLote::factory(10)->create();
    }
}
