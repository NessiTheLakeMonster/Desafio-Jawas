<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rol extends Model
{
    use HasFactory;

    protected $table = "rol";

    protected $fillable = ['id', 'nombre'];

    public $timestamps = false;

    public function usuarios()
    {
        return $this->belongsToMany(User::class, 'rol_asignado', 'id_rol', 'id_usuario');
    }

}
