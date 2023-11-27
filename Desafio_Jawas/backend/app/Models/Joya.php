<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Joya extends Model
{
    use HasFactory;

    protected $table = 'joya';

    protected $fillable = [
        //TODO: foto
        'foto',
        'idTipoJoya',
        'idReceta',

    ];
}
