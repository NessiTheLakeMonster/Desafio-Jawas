<?php

namespace Database\Seeders;

use App\Models\Rol;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RolSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = ['colaborador', 'administrador', 'diseñador', 'clasificador'];

        foreach ($roles as $index => $nombre) {
            Rol::create([
                'id' => $index + 1,
                'nombre' => $nombre,
            ]);
        }
    }
}
