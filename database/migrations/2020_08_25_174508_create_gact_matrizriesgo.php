<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGactMatrizriesgo extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('gact_matrizriesgo', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->enum('mtr_nivel', ['Muy Alto', 'Alto', 'Medio', 'Bajo', 'Muy bajo', 'Ninguno']);
            $table->enum('mtr_sigla', ['MA', 'A', 'M', 'B', 'MB', 'Ninguno']);
            $table->smallInteger('mtr_valor_inicial');
            $table->smallInteger('mtr_valor_final');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('gact_matrizriesgo');
    }
}
