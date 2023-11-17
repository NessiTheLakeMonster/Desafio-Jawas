<?php

namespace Database\Seeders;

use App\Models\RolAsignado;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Rol;

class RolAsignadoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $usuarios = User::all();

        // todos los users pueden ser 'colaborador'
        foreach ($usuarios as $usuario) {
            RolAsignado::create([
                'id_usuario' => $usuario->id,
                'id_rol' => Rol::where('nombre', 'colaborador')->first()->id,
            ]);
        }

        // 'diseñador' y 'clasificador'
        foreach ($usuarios->random(rand(1, $usuarios->count())) as $usuario) {
            RolAsignado::create([
                'id_usuario' => $usuario->id,
                'id_rol' => Rol::whereIn('nombre', ['diseñador', 'clasificador'])->get()->random()->id,
            ]);
        }

        //'administrador'
        RolAsignado::create([
            'id_usuario' => $usuarios->random()->id,
            'id_rol' => Rol::where('nombre', 'administrador')->first()->id,
        ]);
    }
}
