<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lote extends Model
{
    use HasFactory;
    protected $table = 'lote';

    protected $fillable = [
        'id_usuario',
        'lugar_recogida',
        'entregado',
        'cancelado',
    ];

    public function getEntregadoAttribute($value)
    {
        return $value == 1 ? 'SI' : 'NO';
    }

    public function getCanceladoAttribute($value)
    {
        return $value == 1 ? 'SI' : 'NO';
    }
}

