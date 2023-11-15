<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('joya', function (Blueprint $table) {
            $table->id();
            $table->string('foto');
            $table->unsignedBigInteger('idTipoJoya');
            $table->foreign('idTipoJoya')->references('id')->on('tipo_joya');
            $table->unsignedBigInteger('idReceta');
            $table->foreign('idReceta')->references('id')->on('receta');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('joya');
    }
};
