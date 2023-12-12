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
        Schema::create('ingrediente_asignado', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_receta');
            $table->foreign('id_receta')->references('id')->on('receta');
            $table->unsignedBigInteger('id_componente');
            $table->foreign('id_componente')->references('id')->on('componente');   
            $table->integer('cantidad');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('_ingrediente_asignado');
    }
};
