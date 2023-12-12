<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InfoLote extends Model
{
    use HasFactory;
    protected $table = 'info_lote';

    protected $fillable = [
        'idLote',
        'idComponente',
        'descripcion',
        'cantidad',
    ];
}
