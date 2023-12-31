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
        Schema::create('info_lote', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('idLote');
            $table->foreign('idLote')->references('id')->on('lote')->onDelete('cascade');
            $table->unsignedBigInteger('idComponente');
            $table->foreign('idComponente')->references('id')->on('componente');
            $table->string('descripcion');
            $table->integer('cantidad');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('info_lote');
    }
};
