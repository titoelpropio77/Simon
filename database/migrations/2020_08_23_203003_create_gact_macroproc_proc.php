<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGactMacroprocProc extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    private  $prefijo = "proc_";
    public function up()
    {
        
        Schema::create('gact_macroprocesos', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('macpro_nombre',30);
            $table->string('macpro_descripcion', 250);
            $table->softDeletes();
            $table->timestamps();
        });
       
        Schema::create('gact_procesos', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string($this->prefijo.'nombre',30);
            $table->enum($this->prefijo.'grado_automatizacion', ['Semiautomatizado', 'Automatizado']);
            $table->enum($this->prefijo.'grado_descentralizacion', ['Centralizado', 'Desentralizado']);
            $table->enum($this->prefijo.'periodo_ejecucion', ['Diario', 'Semanal', 'Mensual', 'Anual']);
            $table->string($this->prefijo.'reponsable_ejecucion',30)->nullable();
            $table->string($this->prefijo.'reponsable_revision',30)->nullable();
            $table->unsignedBigInteger($this->prefijo.'macroproceso_id');
            $table->foreign($this->prefijo.'macroproceso_id')->references('id')->on('gact_macroprocesos');
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
        Schema::dropIfExists('gact_macroprocesos');
        Schema::dropIfExists('gact_procesos');
    }
}
