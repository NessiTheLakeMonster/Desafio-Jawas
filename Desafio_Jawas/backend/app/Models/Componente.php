<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Componente extends Model
{
    use HasFactory;

    protected $table = 'componente';

    protected $fillable = [
        'nombre',
        'hardware',
    ];

    public function getHardwareAttribute($value)
    {
        return $value == 1 ? 'SI' : 'NO';
    }
}
